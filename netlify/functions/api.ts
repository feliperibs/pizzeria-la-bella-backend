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

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

export const handler = async (event) => {
  try {
    mongoose
      .connect("process.env.MONGODB_URI as string")
      .then(() => {
        app.get("/", (_req: express.Request, res: express.Response) => {
          return res.send("Express Typescript on Vercel");
        });
        
        app.use("/api", router);
        return serverless(api)
      })
      .catch((err) => {
        throw new Error(err);
      });
  } catch (error) {
    throw new Error(error);
  }
};
