import React, { useEffect, useState } from 'react';
import { Diary } from './types';
import { getAllDiaries } from './diaryService';
import DiaryForm from './components/DiaryForm';

interface DiariesProps {
  diaries: Diary[];
}

interface SingleDiaryProps {
  diary: Diary;
}

const SingleDiary = (props: SingleDiaryProps) => {
  return (
    <div>
      <h3>{props.diary.date}</h3>
      <div key={props.diary.id}>
        <p>Weather: {props.diary.weather}</p>
        <p>Visibility: {props.diary.visibility}</p>
        {props.diary.comment &&
        <p>Comment: {props.diary.comment}</p>
        }
      </div>
    </div>
  )
};

const Diaries = (props: DiariesProps) => {


  return (
    <div>
      <h2>Diary entries</h2>
      {props.diaries.map(diary => <SingleDiary key={diary.id} diary={diary} />)}
    </div>
  )
};

function App() {
  const [diaries, setDiaries] = useState<Diary[]>([]);

  useEffect(() => {
    getAllDiaries().then(data => {
      setDiaries(data);
    });
  }, [diaries]);

  return (
    <div>
      <DiaryForm />
      <Diaries diaries={diaries} />
    </div>
  );
}

export default App;
