/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import express from 'express';
import patientService from '../services/patientService';
import toNewPatient from '../utils';
import patients from '../../data/patients';
import { HealthCheckEntry, HospitalEntry, OccupationalHealthcareEntry, BaseEntry, Patient, Entry } from '../types';

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(patientService.getPatients());
});

router.get('/:id', (req, res) => {
  const id = req.params.id;
  try {
    const foundPatient = patientService.findPatient(id);
    res.json(foundPatient);
  } catch (error: unknown) {
    let errorMessage = 'Something went wrong';
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }

    res.status(400).send(errorMessage);
  }
});

router.post('/', (req, res) => {
  try {
    const newPatient = toNewPatient(req.body);
    const addedPatient = patientService.addPatient(newPatient);
    res.json(addedPatient);
  } catch (error: unknown) {
    let errorMessage = 'Something went wrong';
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }

    res.status(400).send(errorMessage);
  }
});

function isBaseEntry(entry: object): entry is BaseEntry {
  if ('description' in entry && 'date' in entry && 'specialist' in entry) {
    return true;
  }
  return false;
}

function isOccupationalHealthcareEntry(entry: BaseEntry): entry is OccupationalHealthcareEntry {
  if ('employerName' in entry) {
    return true;
  }
  return false;
}

function isHealthCheckEntry(entry: BaseEntry): entry is HealthCheckEntry {
  if ('healthCheckRating' in entry) {
    return true;
  }
  return false;
}

function isHospitalEntry(entry: BaseEntry): entry is HospitalEntry {
  if ('discharge' in entry) {
    return true;
  }
  return false;
}

router.post('/:id/entries', (req, res) => {
  const id = req.params.id;
  let newEntry: Entry = req.body;
  const patient: Patient | undefined = patients.find(patient => patient.id === id);

  if (!newEntry) {
    throw new Error('Entry missing or invalid');
  }

  if (!patient) {
    throw new Error('Patient could not be found');
  }

  if (!isBaseEntry(newEntry)) {
    throw new Error('Entry invalid');
  }


  if (isOccupationalHealthcareEntry(newEntry)) {
    newEntry = {
      ...newEntry, type: 'OccupationalHealthcare'
    };
  } else if(isHealthCheckEntry(newEntry)) {
    newEntry = {
      ...newEntry, type: 'HealthCheck'
    };
  } else if(isHospitalEntry(newEntry)) {
    newEntry = {
      ...newEntry, type: 'Hospital'
    };
  } else {
    throw new Error('Entry could not be specified');
  }

  try {
    const updatedPatient = patientService.addEntry(patient, newEntry);
    return res.status(200).json(updatedPatient);
  } catch (error: unknown) {
    let errorMessage = 'Something went wrong adding an entry';
    if (error instanceof Error) {
      errorMessage += error.message;
    }
    return res.status(500).send(errorMessage);
  }
});

export default router;