import express from "express";

import { registerUser } from "../controllers/user.controller.js";
import { newUserValidation } from "../middlewares/users.validation.js";

const router = express.Router();

router.route(`/`).post(newUserValidation, registerUser);

export { router as RegisterRoute };
