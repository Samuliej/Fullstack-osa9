import { parseHeightAndWeight } from "./utils";

// Bmi value with the bmiUpperLimit defining the bmi
type BmiValues = {
  bmiUpperLimit: number;
  description: string;
};

const calculateBmi = (height: number, weight: number): string => {

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

  const heightMeters: number = height / 100;
  const bmi: number = weight / (heightMeters ** 2);

  try {
    const value = bmiVals.find((value) => bmi < value.bmiUpperLimit);
    return value.description;
  } catch (error: unknown) {
    throw new Error(`Something went wrong calculating bmi with the arguments height: ${height}. weight: ${weight}`);
  }
}

try {
  const { height, weight } = parseHeightAndWeight(process.argv);
  console.log(calculateBmi(height, weight));
} catch (error: unknown) {
  let errorMessage = 'Something went wrong calculating BMI: ';
  if (error instanceof Error) {
    errorMessage += ' Error ' + error.message;
  }
  console.log(errorMessage);
}