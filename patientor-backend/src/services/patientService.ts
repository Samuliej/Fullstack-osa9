import patients from "../../data/patients";
import { PatientNoSsn, NewPatient, Patient, Entry } from '../types';
import { v1 as uuid } from 'uuid';

const getPatients = (): Patient[] => {
  console.log(patients);
  return patients;
};

const getPatientsNoSsn = (): PatientNoSsn[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation, entries }) => ({
    id, name, dateOfBirth, gender, occupation, entries
  }));
};

const addPatient = (info: NewPatient): Patient => {
  const newPatient = {
    id: uuid(),
    ...info
  };

  patients.push(newPatient);
  return newPatient;
};

const findPatient = (id: string): Patient => {
  const patientToFind = patients.find(patient => id === patient.id);
  if (patientToFind) {
    return patientToFind;
  } else {
    throw new Error(`Patient with id: ${id} could not be found`);
  }
};

const addEntry = (updatedPatient: Patient, entry: Entry) => {
  const patientToUpdate = patients.find(patient => (patient.id === updatedPatient.id));
  const newEntry = {
    ...entry, id: uuid()
  };
  if (patientToUpdate) {
    patientToUpdate.entries = patientToUpdate.entries.concat(newEntry);
    patients.filter(patient => patient.id !== patientToUpdate.id ? patient : patientToUpdate);
    return patientToUpdate;
  } else {
    throw new Error(`Patient could not be found: ${updatedPatient.id}`);
  }
};

export default {
  getPatients,
  getPatientsNoSsn,
  addPatient,
  findPatient,
  addEntry
};
