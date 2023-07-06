import { parseExerciseData } from "./utils";

interface WeeklyOverview {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

type SuccessRating = {
  description: string;
  averageHours: number;
  rating: number;
};


const calculateExercises = (dailyHours: number[], targetHours: number): WeeklyOverview => {

  // Hard coded training goals to handle as many cases as possible
  const trainingGoals: SuccessRating[] = [
    // Handling cases with a lot of exercise per week
    { description: `Excellent work! You exceeded your goal of ${targetHours}h/day.`, averageHours: (targetHours * 1.8), rating: 3 },
    { description: `Outstanding effort! You consistently achieved ${targetHours}h/day. Keep up the good work!`, averageHours: (targetHours * 1.6), rating: 3 },
    { description: `Impressive dedication! You're making remarkable progress towards your goal of ${targetHours}h/day. Keep it up!`, averageHours: (targetHours * 1.4), rating: 3 },
    { description: `Great job! You're on track to achieve your goal of ${targetHours}h/day. Keep pushing yourself!`, averageHours: (targetHours * 1.2), rating: 3 },
    { description: `Well done! You're consistently meeting your goal of ${targetHours}h/day. Keep up the good work!`, averageHours: (targetHours * 1.1), rating: 3 },

    // Handling cases with moderate exercise per week
    { description: `Good job! You reached your goal of ${targetHours}h/day. Keep it up!`, averageHours: targetHours, rating: 2 },
    { description: `Nice work! You're getting closer to your goal of ${targetHours}h/day. Keep pushing yourself!`, averageHours: (targetHours * 0.9), rating: 2 },
    { description: `Good effort! You're making progress towards your goal of ${targetHours}h/day. Keep going!`, averageHours: (targetHours * 0.8), rating: 2 },
    { description: `Keep going! You're on the right track to reach your goal of ${targetHours}h/day. Stay motivated!`, averageHours: (targetHours * 0.7), rating: 2 },
    { description: `You have room for improvement to reach your goal of ${targetHours}h/day. Keep pushing yourself!`, averageHours: (targetHours * 0.6), rating: 2 },

    // Handling cases with low exercise per week
    { description: `You're not meeting your goal of ${targetHours}h/day. Keep pushing yourself to improve!`, averageHours: (targetHours * 0.5), rating: 1 },
    { description: `You have some catching up to do to reach your goal of ${targetHours}h/day. Stay committed!`, averageHours: (targetHours * 0.4), rating: 1 },
    { description: `You're falling behind your goal of ${targetHours}h/day. Push yourself harder to make progress!`, averageHours: (targetHours * 0.3), rating: 1 },
    { description: `You're far from reaching your goal of ${targetHours}h/day. Make a stronger effort to improve!`, averageHours: (targetHours * 0.2), rating: 1 },
    { description: `You're not making sufficient progress towards your goal of ${targetHours}h/day. Reassess your commitment and strive for improvement!`, averageHours: (targetHours * 0.1), rating: 1 },
  ];

  const periodLength: number = dailyHours.length;
  let trainingDays = 0;
  // Calculate trained days
  dailyHours.forEach(hours => hours > 0 ? trainingDays += 1 : null );

  // Calculate trained hours
  const trainedHours: number = dailyHours.reduce((sum ,current) => sum + current, 0);
  const averageHours: number = trainedHours / periodLength;

  // Find the fitting SuccessRating object place an Object with default values if one is not found
  const rating: SuccessRating =
    (trainingGoals.find((rating) => averageHours >= rating.averageHours))
    || { description: '', averageHours: 0, rating: 0};

  // In the case where a fitting rating can't be found, return an object with description as an arreor message
  if (!rating) {
    return {
      periodLength: 0,
      trainingDays: 0,
      success: false,
      rating: 0,
      ratingDescription: 'Something went wrong calculating the result',
      target: 0,
      average: 0
    };
  }

  // Check if target is met
  const success: boolean = rating.averageHours >= targetHours;

  return {
    periodLength: periodLength,
    trainingDays: trainingDays,
    success: success,
    rating: rating.rating,
    ratingDescription: rating.description,
    target: targetHours,
    average: averageHours
  };
};

try {
  const exerciseData = parseExerciseData(process.argv);
  console.log(exerciseData);
  console.log(calculateExercises(exerciseData.dailyHours, exerciseData.targetHours));
} catch (error: unknown) {
  let errorMessage = 'Something went wrong: ';
  if (error instanceof Error) {
    errorMessage += ' Error ' + error.message;
  }
  console.log(errorMessage);
}