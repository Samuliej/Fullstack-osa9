import data from "../../data/patients";
import { Patient, PatientNoSsn, NewPatient } from '../types';
import { v1 as uuid } from 'uuid';

const getPatients = (): Patient[] => {
  return data;
};

const getPatientsNoSsn = (): PatientNoSsn[] => {
  return data.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id, name, dateOfBirth, gender, occupation
  }));
};

const addPatient = (info: NewPatient): Patient => {
  const newPatient = {
    id: uuid(),
    ...info
  };

  data.push(newPatient);
  return newPatient;
};

export default {
  getPatients,
  getPatientsNoSsn,
  addPatient
};
