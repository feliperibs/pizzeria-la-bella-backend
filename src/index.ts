import mongoose from "mongoose";
import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import { router } from "./routes";

dotenv.config();
 const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Authorization');
  next();
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

mongoose
  .connect(process.env.MONGODB_URI as string,
    )
  .then(() => {
    app.get("/", (_req: express.Request, res: express.Response) => {
      return res.send("Express Typescript on Vercel");
    });
    
    app.use("/api", router);
  })
  .catch((err) => { throw new Error(err)});
