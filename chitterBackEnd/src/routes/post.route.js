import express from "express";

import { postPeepController } from "../controllers/post.controller.js";

const router = express.Router();

router.route(`/post`).post(postPeepController);

export { router as postPeep };
