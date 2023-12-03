import express from "express";
import serverless from "serverless-http";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import { router } from "../../src/routes";

const api = express();
router.get("/hello", (req, res) => res.send("Hello World!"));

dotenv.config();
const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose
  .connect("mongodb+srv://felipeerib:gi5n4tPohI55gg7s@cluster0.yfo4rfk.mongodb.net/")
  .then(() => {
    app.get("/", (_req: express.Request, res: express.Response) => {
      return res.send("Express Typescript on Vercel");
    });

    app.use("/api", router);
  })
  .catch((err) => {
    throw new Error(err);
  });

export const handler = serverless(api);

