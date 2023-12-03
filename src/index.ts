import mongoose from "mongoose";
import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import { router } from "./routes";

dotenv.config();
export const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const url ="mongodb+srv://felipeerib:gi5n4tPohI55gg7s@cluster0.yfo4rfk.mongodb.net/";

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

mongoose
  .connect(url)
  .then(() => {
    app.get("/", (_req: express.Request, res: express.Response) => {
      return res.send("Express Typescript on Vercel");
    });

    app.use("/api", router);
  })
  .catch((err) => console.log("Database connection error", err));
