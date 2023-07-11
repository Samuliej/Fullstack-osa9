import axios from 'axios';
import { Diary, NewDiary } from './types';

const baseUrl = 'http://localhost:3001/api/diaries';

export const getAllDiaries = () => {
  return axios
    .get<Diary[]>(baseUrl)
    .then(response => response.data);
};

export const createDiary = async (newDiary: NewDiary) => {
  const response = await axios.post<Diary>( baseUrl, newDiary );
  return response.data;
};