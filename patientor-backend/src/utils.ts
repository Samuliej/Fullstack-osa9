import {
  NewPatient,
  ValidSsn,
  Gender,
  NewEntry,
  Diagnose,
  NewBaseEntry,
  OccupationalHealthcareEntry,
  HealthCheckEntry,
  HospitalEntry,
  SickLeave,
  HealthCheckRating,
  Discharge
} from "./types";

// Person parsing

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


export const toNewPatient = (object: unknown): NewPatient => {
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

// Person parsing ends




// Entry parsing

const parseDescription = (description: unknown): string => {
  if (!isString(description)) {
    throw new Error(`Incorrect description ${description}`);
  }

  return description;
};

const parseSpecialist = (specialist: unknown): string => {
  if (!isString(specialist)) {
    throw new Error(`Incorrect specialist ${specialist}`);
  }

  return specialist;
};

const parseDiagnosisCodes = (object: unknown): Array<Diagnose['code']> =>  {
  if (!object || typeof object !== 'object' || !('diagnosisCodes' in object)) {
    // we will just trust the data to be in correct form
    return [] as Array<Diagnose['code']>;
  }

  return object.diagnosisCodes as Array<Diagnose['code']>;
};

const parseEmployer = (employer: unknown): string => {
  if (!isString(employer)) {
    throw new Error(`Incorrect employer: ${employer}`);
  }

  return employer;
};

const isOccupationalHealthcareEntry = (entry: object): entry is OccupationalHealthcareEntry => {
  if ('employerName' in entry) {
    return true;
  }
  return false;
};

const parseSickLeave = (sickLeave: object): SickLeave => {
  if ('startDate' in sickLeave && 'endDate' in sickLeave) {
    if (!isString(sickLeave.startDate)) {
      throw new Error(`Malformatted sick leave start: ${sickLeave.startDate}`);
    }
    if (!isDate(sickLeave.startDate)) {
      throw new Error(`Malformatted sick leave start: ${sickLeave.endDate}`);
    }
    if (!isString(sickLeave.endDate)) {
      throw new Error(`Malformatted sick leave end: ${sickLeave.endDate}`);
    }
    if (!isDate(sickLeave.endDate)) {
      throw new Error(`Malformatted sick leave end: ${sickLeave.endDate}`);
    }

    return {
      startDate: sickLeave.startDate,
      endDate: sickLeave.endDate
    };
  }
  throw new Error(`Something else went wrong: ${sickLeave}`);
};



const isHealthCheckEntry = (entry: object): entry is HealthCheckEntry => {
  if ('healthCheckRating' in entry) {
    return true;
  }
  return false;
};

const parseHealthCheckRating = (rating: unknown): HealthCheckRating => {
  if (!isHealthCheckRating(rating)) {
    throw new Error(`malformatted healthCheckRating: ${rating}`);
  }

  return rating;
};

const isHealthCheckRating = (rating: unknown): rating is HealthCheckRating => {
  if (isNaN(Number(rating))) {
    throw new Error(`HealthCheckRating is not a number ${rating}`);
  }
  if (!Object.values(HealthCheckRating).includes(Number(rating))) {
    throw new Error(`Malformatted HealthCheckRating ${rating}`);
  }
  return true;
};

const isHospitalEntry = (entry: object): entry is HospitalEntry => {
  if ('discharge' in entry) {
    return true;
  }
  return false;
};

const parseDischarge = (discharge: object) => {
  if (!isDischarge(discharge)) {
    throw new Error(`Incorrect or missing discharge: ${discharge}`);
  }
  return discharge;
};

const isDischarge = (discharge: object): discharge is Discharge => {
  if (!('date' in discharge && 'criteria' in discharge)) {
    throw new Error(`Incorrect discharge: ${discharge}`);
  }
  if (!isString(discharge.date)) {
    throw new Error(`Malformatted discharge date: ${discharge.date}`);
  }
  if (!isDate(discharge.date)) {
    throw new Error(`Malformatted discharge date: ${discharge.date}`);
  }
  if (!isString(discharge.criteria)) {
    throw new Error(`Malformatted discharge criteria: ${discharge.criteria}`);
  }
  return true;
};


export const toNewEntry = (object: unknown): NewEntry => {
  if (!object || typeof object !== 'object') {
    throw new Error('Incorrect or missing data');
  }

  if ('description' in object && 'date' in object && 'specialist' in object) {
    let newEntry: NewBaseEntry = {
      description: parseDescription(object.description),
      date: parseDate(object.date),
      specialist: parseSpecialist(object.specialist),
    };

    if ('diagnosisCodes' in object) {
      newEntry = {
        ...newEntry, diagnosisCodes: parseDiagnosisCodes(object.diagnosisCodes)
      };
    }

    if (isOccupationalHealthcareEntry(object)) {
      let newOccupationalEntry: NewEntry = {
        ...newEntry,
        type: 'OccupationalHealthcare',
        employerName: parseEmployer(object.employerName)
      };

      if ('sickLeave' in object) {
        if (object.sickLeave) {
          newOccupationalEntry = {
            ...newOccupationalEntry,
            sickLeave: parseSickLeave(object.sickLeave)
          };
        }
      }

      return newOccupationalEntry;
    } else if (isHealthCheckEntry(object)) {
      const newHealthCareEntry: NewEntry = {
        ...newEntry,
        type: 'HealthCheck',
        healthCheckRating: parseHealthCheckRating(object.healthCheckRating)
      };

      return newHealthCareEntry;
    } else if (isHospitalEntry(object)) {
      const newHospitalEntry: NewEntry = {
        ...newEntry,
        type: 'Hospital',
        discharge: parseDischarge(object.discharge)
      };

      return newHospitalEntry;
    } else {
      throw new Error(`Incorrect entry type: ${newEntry}`);
    }

  }

  throw new Error('Incorrect data: some fields are missing');
};




// Entry parsing ends
