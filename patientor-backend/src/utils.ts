import { NewPatient, ValidSsn, Gender } from "./types";

const parseOccupation = (occupation: unknown): string => {
  if (!isString(occupation)) {
    throw new Error('Incorrect or missing occupation: ' + occupation);
  }

  return occupation;
};


const isGender = (gender: string): gender is Gender => {
  return Object.values(Gender).map(v => v.toString()).includes(gender);
};

const parseGender = (gender: unknown): Gender => {
  if (!isString(gender) || !isGender(gender)) {
    throw new Error('Incorrect or missing gender '+ gender);
  }

  return gender;
};


const parseSsn = (ssn: unknown, date: unknown): string => {
  const validSsn = isSsn(ssn, date);

  if (!validSsn || !validSsn.valid) {
    throw new Error('Social security number missing or invalid: ' + ssn);
  }

  return validSsn.ssn;
};


const isSsn = (ssn: unknown, date: unknown): ValidSsn => {
  if (isString(ssn) && isString(date)) {
    const yearMonthDay: string[] = date.split('-');
    const day = ssn.substring(0, 2);
    const month = ssn.substring(2, 4);
    const year = ssn.substring(4, 6);
    if (yearMonthDay.length === 3) {
      if (yearMonthDay[0].includes(year) && yearMonthDay[1].includes(month) && yearMonthDay[2].includes(day)) {
        return {
          date: date,
          ssn: ssn,
          valid: true
        };
      } else {
        throw new Error('Date doesn\'t match with social security number: ' + `ssn: ${ssn}. date: ${date}.`);
      }
    } else {
      throw new Error('Malformatted date: ' + date);
    }
  } else {
    throw new Error('Social security number or date incorrect: ' + `ssn: ${ssn}. date: ${date}.`);
  }
};


const parseDate = (date: unknown): string => {
  if (!isString(date) || !isDate(date)) {
    throw new Error('Incorrect or missing date: ' + date);
  }

  return date;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};


const parseName = (name: unknown): string => {
  if (!isString(name)) {
    throw new Error('Incorrect or missing name');
  }

  return name;
};

const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String;
};


const toNewPatient = (object: unknown): NewPatient => {
  if (!object || typeof object !== 'object') {
    throw new Error('Incorrect or missing data');
  }

  if ('name' in object && 'dateOfBirth' in object && 'ssn' in object && 'gender' in object && 'occupation' in object) {
    const newPatient: NewPatient = {
      name: parseName(object.name),
      dateOfBirth: parseDate(object.dateOfBirth),
      ssn: parseSsn(object.ssn, object.dateOfBirth),
      gender: parseGender(object.gender),
      occupation: parseOccupation(object.occupation),
      entries: []
    };

    return newPatient;
  }

  throw new Error('Incorrect data: some fields are missing');
};

export default toNewPatient;