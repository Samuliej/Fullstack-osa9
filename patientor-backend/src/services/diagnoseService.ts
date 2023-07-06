import data from "../../data/diagnoses";
import { Diagnose } from "../types";

const getDiagnoses = (): Diagnose[] => {
  return data;
};

export default {
  getDiagnoses
};
