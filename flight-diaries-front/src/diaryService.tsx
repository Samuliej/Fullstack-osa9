import axios from 'axios';
import { Diary, NewDiary } from './types';

const baseUrl = 'http://localhost:3001/api/diaries';

export const getAllDiaries = () => {
  return axios
    .get<Diary[]>(baseUrl)
    .then(response => response.data);
};

export const createDiary = (newDiary: NewDiary) => {
  return axios
    .post<Diary>(baseUrl, newDiary)
    .then(response => response.data);
};