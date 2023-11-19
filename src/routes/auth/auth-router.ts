import express from "express";
import { login, register } from "../../controllers/auth.controller";

export const AuthRouter = express.Router();

AuthRouter.post("/register", register);
AuthRouter.post("/login", login);