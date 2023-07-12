/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import express from 'express';
import patientService from '../services/patientService';
import { toNewPatient, toNewEntry } from '../utils';
import patients from '../../data/patients';
import { NewEntry, Patient } from '../types';

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


router.post('/:id/entries', (req, res) => {
  const id = req.params.id;
  let newEntry: NewEntry = req.body;
  const patient: Patient | undefined = patients.find(patient => patient.id === id);

  if (!newEntry) {
    return res.status(400).send('Entry missing or invalid');
  }

  if (!patient) {
    return res.status(404).send('Patient could not be found');
  }

  try {
    newEntry = toNewEntry(newEntry);
  } catch (error: unknown) {
    let errorMessage = 'Something went wrong parsing the new entry ';
    if (error instanceof Error) {
      errorMessage += error.message;
    }

    return res.status(400).send(errorMessage);
  }


  try {
    const updatedPatient = patientService.addEntry(patient, newEntry);
    return res.status(200).json(updatedPatient);
  } catch (error: unknown) {
    let errorMessage = 'Something went wrong adding an entry';
    // eslint-disable-next-line
    if (error instanceof Error) {
      errorMessage += error.message;
    }
    return res.status(500).send(errorMessage);
  }
});

export default router;