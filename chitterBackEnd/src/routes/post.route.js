import express from "express";

import { postPeep, getPeeps } from "../controllers/post.controller.js";

const router = express.Router();

router.route(`/`).post(postPeep);
router.route(`/`).get(getPeeps);

export { router as PostRoute };
