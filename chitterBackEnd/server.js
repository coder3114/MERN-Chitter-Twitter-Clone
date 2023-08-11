import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import HTTPS from "https";
import { postPeep } from "./src/routes/post.route.js";
import { peeps, users } from "./test/testData/sampleData.js";
import Peep from "./src/models/Peep.js";
import User from "./src/models/User.js";

dotenv.config({ path: ".env" });

const app = express();

app.use(cors());

// Routes
app.use(express.json());
app.use(cors());
app.use(`/post`, postPeep);

// Mongoose setup
const main = async () => {
  console.log(`Connecting to: ${process.env.DB_URI}`);
  await mongoose.connect(process.env.DB_URI);
  console.log(`Connected to @ ${process.env.DB_URI}`);
};

main().catch((error) => console.log(`${error} did not connect`));

const server = HTTPS.createServer(app).listen(process.env.PORT, () => {
  const SERVERHOST = server.address().address;
  const SERVERPORT = server.address().port;
  console.log(`Server is running on https://${SERVERHOST}:${SERVERPORT}`);
  Peep.insertMany(peeps);
  User.insertMany(users);
});

export default server;
