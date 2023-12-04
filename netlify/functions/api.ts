import express from "express";
import serverless from "serverless-http";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import { router } from "../../src/routes";

const api = express();
router.get("/hello", (req, res) => res.send("Hello World!"));
dotenv.config();
api.use(bodyParser.json());
api.use(bodyParser.urlencoded({ extended: true }));

const apiHandler = serverless(api);
export const handler = async (event, context) => {
  mongoose
  .connect("mongodb+srv://felipeerib:gi5n4tPohI55gg7s@cluster0.yfo4rfk.mongodb.net/")
  .then(() => {
    api.use("/api", router);
  })
  .catch((err) => {
    throw new Error(err);
  });
  const result = await apiHandler(event, context);
  // and here
  return result;
};

