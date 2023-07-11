import { useState, useEffect } from 'react';
import { Visibility, Weather } from '../types';
import { createDiary } from '../diaryService';
import axios from 'axios';

interface ErrorProps {
  message: string;
}

const Error = (props: ErrorProps) => {
  if (props.message) {
    return (
      <div style={{ color: 'red' }}>{props.message}</div>
    );
  } else {
    return <div></div>
  }
};

const DiaryForm = () => {
  const [error, setError] = useState<string>('');
  const [date, setDate] = useState<string>('');
  const [visibility, setVisibility] = useState<Visibility>(Visibility.Good);
  const [weather, setWeather] = useState<Weather>(Weather.Sunny);
  const [comment, setComment] = useState<string>('');


  useEffect(() => {
    if (error) {
      const timeout = setTimeout(() => {
        setError('');
      }, 5000);

      return () => {
        clearTimeout(timeout);
      };
    }
  }, [error]);


  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      await createDiary({
        date: date,
        weather: weather,
        visibility: visibility,
        comment: comment,
      });

      setDate('');
      setVisibility(Visibility.Good);
      setWeather(Weather.Sunny);
      setComment('');
      setError('');
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setError(error.response?.data);
      } else {
        console.error(error);
      }
    }
  };

  return (
    <div>
      <h2>Add a new entry</h2>
      {error && <Error message={error} />}
      <form onSubmit={handleSubmit}>
        <div>
          date
          <input
            type='date'
            value={date}
            onChange={({ target }) => setDate(target.value)}
          />
        </div>
        <div>
          visibility
          {Object.values(Visibility).map((value) => (
            <label key={value}>
              <input
                type="radio"
                name="visibility"
                value={value}
                checked={visibility === value}
                onChange={({ target }) => setVisibility(target.value as Visibility)}
              />
              {value}
            </label>
          ))}
        </div>
        <div>
          weather
          {Object.values(Weather).map((value) => (
            <label key={value}>
              <input
                type="radio"
                name="weather"
                value={value}
                checked={weather === value}
                onChange={({ target }) => setWeather(target.value as Weather)}
              />
              {value}
            </label>
          ))}
        </div>
        <div>
          comment
          <input
            value={comment}
            onChange={({ target }) => setComment(target.value)}
          />
        </div>
        <button type='submit'>add</button>
      </form>
    </div>
  );
};

export default DiaryForm;