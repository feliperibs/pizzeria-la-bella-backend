import express, { Router } from "express";
import serverless from "serverless-http";
import { router } from "../../src/routes"

const api = express();

router.get("/hello", (req, res) => res.send("Hello World!"));

api.use("/api/", router);

export const handler = serverless(api);