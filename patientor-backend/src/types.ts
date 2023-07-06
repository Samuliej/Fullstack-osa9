export interface Diagnose {
  code: string;
  name: string;
  latin?: string;
}

export enum Gender {
  Male = 'male',
  Female = 'female',
  Other = 'other'
}

export interface ValidSsn {
  date: string,
  ssn: string,
  valid: boolean
}

export interface Patient {
  id: string;
  name: string;
  dateOfBirth: string;
  ssn: string;
  gender: string;
  occupation: string;
}

export type PatientNoSsn = Omit<Patient, 'ssn'>;

export type NewPatient = Omit<Patient, 'id'>;