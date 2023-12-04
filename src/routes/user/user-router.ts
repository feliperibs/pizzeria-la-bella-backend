import express from "express";
import { authenticateMiddleware } from "../../middlewares/auth-middleware";
import { getUser, getUsers, register } from "../../controllers/user.controller";

export const UserRouter = express.Router();

UserRouter.get("/", authenticateMiddleware, getUsers);
UserRouter.get("/:id", authenticateMiddleware, getUser);
UserRouter.get("/create", register);
