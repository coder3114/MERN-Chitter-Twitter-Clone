import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import HTTPS from "https";

dotenv.config({ path: ".env" });

const app = express();

app.use(cors());
app.use(bodyParser.json());

// Routes

// Mongoose setup
const main = async () => {
  console.log(`Connecting to: ${process.env.DB_URI}`);
  await mongoose.connect(process.env.DB_URI);
};

main()
  .then(`Connected to database`)
  .catch((error) => console.log(`${error} did not connect`));

const server = HTTPS.createServer(app).listen(process.env.PORT, () => {
  const SERVERHOST = server.address().address;
  const SERVERPORT = server.address().port;
  console.log(`Server is running on https://${SERVERHOST}:${SERVERPORT}`);
});

export default server;
