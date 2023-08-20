import { check } from "express-validator";

const newPeepValidation = [
  check("userId").exists(),
  check("content").exists(),
  check("time").exists().isISO8601(),
];

export default newPeepValidation;
