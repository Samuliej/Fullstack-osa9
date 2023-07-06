import data from "../../data/patients";
import { Patient, PatientNoSsn } from '../types';

const getPatients = (): Patient[] => {
  return data;
};

const getPatientsNoSsn = (): PatientNoSsn[] => {
  return data.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id, name, dateOfBirth, gender, occupation
  }));
};

export default {
  getPatients,
  getPatientsNoSsn
};
