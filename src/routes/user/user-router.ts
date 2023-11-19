import express from "express";
import { type IUser } from "../../models/user";
import { UserModel } from "../../schemas/user-schema";
import { authenticateMiddleware } from "../../middlewares/auth-middleware";

export const UserRouter = express.Router();

UserRouter.get("/getUsers",authenticateMiddleware, async (_req, res) => {
  try {
    const users: IUser[] = await UserModel.find();

    res.json(users);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

UserRouter.get("/:id", async (_req, res) => {
  try {
    const users: IUser[] = await UserModel.find();

    res.json(users);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});
