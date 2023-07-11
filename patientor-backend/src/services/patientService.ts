import data from "../../data/patients";
import { PatientNoSsn, NewPatient, Patient } from '../types';
import { v1 as uuid } from 'uuid';

const getPatients = (): Patient[] => {
  return data.map(({ id, ssn, name, dateOfBirth, gender, occupation }) => ({
    id, ssn, name, dateOfBirth, gender, occupation, entries: []
  }));
};

const getPatientsNoSsn = (): PatientNoSsn[] => {
  return data.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id, name, dateOfBirth, gender, occupation, entries: []
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

const findPatient = (id: string): Patient => {
  const patientToFind = data.find(patient => id === patient.id);
  if (patientToFind) {
    return {
      ...patientToFind, entries: []
    };
  } else {
    throw new Error(`Patient with id: ${id} could not be found`);
  }
};

export default {
  getPatients,
  getPatientsNoSsn,
  addPatient,
  findPatient
};
