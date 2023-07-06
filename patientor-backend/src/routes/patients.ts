/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import express from 'express';
import patientService from '../services/patientService';

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(patientService.getPatientsNoSsn());
});

router.post('/', (req, res) => {
  const {
    name,
    dateOfBirth,
    ssn,
    gender,
    occupation
  } = req.body;
  const addedPatient = patientService.addPatient({
    name, dateOfBirth, ssn, gender, occupation
  });
  res.json(addedPatient);
});

export default router;