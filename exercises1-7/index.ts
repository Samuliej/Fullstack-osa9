import express from 'express';
import { calculateBmi } from './bmiCalculator';
import { calculateExercises } from './exerciseCalculator';
const app = express();
app.use(express.json());

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

app.post('/exercises', (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { daily_exercises, target } = req.body;

  // handle invalid parameters
  if (!target) return res.status(400).send({ error: 'parameters missing' });
  if (daily_exercises && daily_exercises instanceof Array) {
    // handle empty array
    if (daily_exercises.length === 0) return res.status(400).send({ error: 'malformatted parameters' });

    // Handle invalid values
    const invalidValues = daily_exercises.filter((value) => typeof value !== 'number' || isNaN(value));
    if (invalidValues.length > 0) {
      return res.status(400).send({ error: 'malformatted parameters' });
    }

    // handle target validation
    if (isNaN(Number(target))) return res.status(400).send({ error: 'malformatted parameters' });
  } else {
    return res.status(400).send({ error: 'parameters missing' });
  }

  const result = calculateExercises(daily_exercises as number[], Number(target));
  return res.send({ result });
});

const PORT = 3002;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});