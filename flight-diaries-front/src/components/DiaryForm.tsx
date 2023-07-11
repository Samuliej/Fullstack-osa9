import { useState } from 'react';
import { Visibility, Weather } from '../types';
import { createDiary } from '../diaryService';

const DiaryForm = () => {
  const [date, setDate] = useState<string>('');
  const [visibility, setVisibility] = useState<Visibility>(Visibility.Good);
  const [weather, setWeather] = useState<Weather>(Weather.Sunny);
  const [comment, setComment] = useState<string>('');

  const handleSubmit = (event: React.SyntheticEvent) => {
    event.preventDefault()
    createDiary({
      date: date,
      weather: weather,
      visibility: visibility,
      comment: comment
    })
  }

  return (
    <div>
      <h2>Add a new entry</h2>
      <form onSubmit={handleSubmit}>
        <div>
          date
          <input
            value={date}
            onChange={({ target }) => setDate(target.value)}
          />
        </div>
        <div>
          visibility
          <input
            value={visibility}
            onChange={({ target }) => setVisibility(target.value as Visibility)}
          />
        </div>
        <div>
          weather
          <input
            value={weather}
            onChange={({ target }) => setWeather(target.value as Weather)}
          />
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