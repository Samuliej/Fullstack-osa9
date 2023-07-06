import express from 'express';
import { calculateBmi } from './bmiCalculator';
const app = express();

app.get('/hello', (_req, res) => {
  res.send('Hello FullStack!');
});

app.get('/bmi', (req, res) => {
  const { height, weight } = req.query;

  try {
    if (typeof height === 'string' && typeof weight === 'string') {
    const responseJson = calculateBmi(height, weight);
    res.json(responseJson);
    } else {
      res.status(400).json({ error: 'malformatted parameters' });
    }
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(400).json({ error: error.message });
    }
  }
});

const PORT = 3002;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});