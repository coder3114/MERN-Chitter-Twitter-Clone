import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import HTTPS from "https";
import bodyParser from "body-parser";

import { PostRoute } from "./src/routes/post.route.js";

import { peeps, users } from "./sampleData.js";
import Peep from "./src/models/PeepModel.js";
import User from "./src/models/UserModel.js";

dotenv.config({
  path: `.env${process.env.NODE_ENV ? `.${process.env.NODE_ENV}` : ""}`,
});

const PORT = process.env.PORT;
const HOST = process.env.HOST;

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use(`/`, PostRoute);

const main = async () => {
  console.log(`Connecting to DB @ ${process.env.DB_URI}`);
  await mongoose.connect(process.env.DB_URI);
  console.log(`Connected to DB @ ${process.env.DB_URI}`);
};

main().catch((err) => console.log(err));

const server = app.listen(PORT, HOST, () => {
  const SERVERHOST = server.address().address;
  const SERVERPORT = server.address().port;
  console.log(`Server is listening at http://${SERVERHOST}:${SERVERPORT}`);
});

export default server;
