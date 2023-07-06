interface HeightWeight {
  height: number;
  weight: number;
}

interface ExerciseData {
  targetHours: number;
  dailyHours: number[];
}

export const parseHeightAndWeight = (height: string, weight: string): HeightWeight => {
  if (!isNaN(Number(height)) && !isNaN(Number(weight))) {
    return {
      height: Number(height),
      weight: Number(weight)
    };
  } else {
    throw new Error('Provided values were not numbers');
  }
};

export const parseExerciseData = (args: string[]): ExerciseData => {
  if (args.length < 4) throw new Error('Not enough arguments');

  if (!isNaN(Number(args[2]))) {
    const targetHours = Number(args[2]);
    let dailyHours: number[] = [];

    for (let i = 3; i < args.length; i++) {
      const hours = Number(args[i]);
      if ( !isNaN(hours) ) {
        dailyHours = dailyHours.concat(hours);
      } else {
        throw new Error('Provided daily hours were not numbers');
      }
    }
    return {
      targetHours: targetHours,
      dailyHours: dailyHours
    };
  } else {
  throw new Error('Provided target hours was not a number');
  }
};