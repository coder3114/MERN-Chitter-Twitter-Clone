import express from "express";

import { postPeep, getPeeps } from "../controllers/post.controller.js";
import newPeepValidation from "../middlewares/peeps.validation.js";

const router = express.Router();

router.route(`/`).post(newPeepValidation, postPeep);
router.route(`/`).get(getPeeps);

export { router as PostRoute };
