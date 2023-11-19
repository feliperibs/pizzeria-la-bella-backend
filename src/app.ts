import mongoose from "mongoose";
import express from "express";
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import { router } from "./routes";

dotenv.config();
const app = express();
const port = process.env.PORT || 3000;;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const url = "mongodb://127.0.0.1:27017/pizzeria-la-bella";

mongoose
  .connect(url)
  .then(() => {
    app.listen(port, () => {
      console.log(`Server running at http://localhost:${port}`);
    });

    app.use('/api', router)
  })
  .catch((err) => console.log("Database connection error", err));
