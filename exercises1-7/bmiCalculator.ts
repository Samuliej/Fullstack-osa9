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

  // Find the matching bmi value
  const value = bmiVals.find((value) => bmi < value.bmiUpperLimit);
  return value ? value.description : 'Something went wrong calculating BMI';
}

console.log(calculateBmi(182, 55.78));
console.log(calculateBmi(180, 40));

console.log(calculateBmi(180, 60));
console.log(calculateBmi(180, 74));

console.log(calculateBmi(170, 110));
console.log(calculateBmi(190, 210));