import * as express from "express";
import { UserModel } from "../schemas/user-schema";
import { IUser } from "../models/user";

export const getUsers = async (
  _req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    const users: IUser[] = await UserModel.find();

    res.json(users);
  } catch (err: any) {
    res.status(500).json({ error: "Internal server error" });
    next(err);
    throw Error(err);
  }
};

export const getUser = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    const id = req.params.id;
    const user: IUser | null = await UserModel.findOne({ id });

    res.json(user);
  } catch (err: any) {
    res.status(500).json({ error: "Internal server error" });
    next(err);
    throw Error(err);
  }
};
