import express from "express";
import { type IUser } from "../../models/user";
import { UserModel } from "../../schemas/user-schema";
import { authenticateMiddleware } from "../../middlewares/auth-middleware";
import { getUser, getUsers } from "../../controllers/user.controller";

export const UserRouter = express.Router();

UserRouter.get("/", authenticateMiddleware, getUsers );
UserRouter.get("/:id",authenticateMiddleware, getUser );
