import { parseHeightAndWeight } from "./utils";

// Bmi value with the bmiUpperLimit defining the bmi
type BmiValues = {
  bmiUpperLimit: number;
  description: string;
};

// New type for return data
type BmiOverview = {
  weight: number;
  height: number;
  bmi: string;
}

export const calculateBmi = (height: string, weight: string): BmiOverview => {
  let measurements;
  try {
    measurements = parseHeightAndWeight(height, weight);
  } catch (error: unknown) {
    let errorMessage = 'Something went wrong calculating BMI: ';
    if (error instanceof Error) {
      errorMessage += ' Error ' + error.message;
    }
    console.log(errorMessage);
  }

  // array of Hard coded bmi values according to wikipedia
  const bmiVals: BmiValues[] = [
    { bmiUpperLimit: 16, description: 'Underweight (severe thinness weight)' },
    { bmiUpperLimit: 16.9, description: 'Underweight (moderate thinness weight)' },
    { bmiUpperLimit: 18.4, description: 'Underweight (mild thinness weight)' },
    { bmiUpperLimit: 25, description: 'Normal (healthy weight)' },
    { bmiUpperLimit: 30, description: 'Overweight (pre-obese weight)' },
    { bmiUpperLimit: 34.9, description: 'Obese (Class I obese weight)' },
    { bmiUpperLimit: 39.9, description: 'Obese (Class II obese weight)' },
    { bmiUpperLimit: Infinity, description: 'Obese (Class III obese weight)' },
  ];

  if (measurements) {
    const heightMeters: number = measurements.height / 100;
    const bmi: number = measurements.weight / (heightMeters ** 2);

    try {
      const value = bmiVals.find((value) => bmi < value.bmiUpperLimit);
      if (value) return {
        weight: measurements.weight,
        height: measurements.height,
        bmi: value.description
      }
    } catch (error: unknown) {
      throw new Error(`Something went wrong calculating bmi with the arguments height: ${height}. weight: ${weight}`);
    }
  }

  return {
    weight: 0,
    height: 0,
    bmi: 'Bmi could not be calculated'
  }
}
