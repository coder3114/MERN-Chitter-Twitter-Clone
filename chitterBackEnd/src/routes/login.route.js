import express from "express";

import { loginUser } from "../controllers/user.controller.js";
import { userValidation } from "../middlewares/users.validation.js";

const router = express.Router();

router.route(`/`).post(userValidation, loginUser);

export { router as LoginRoute };
