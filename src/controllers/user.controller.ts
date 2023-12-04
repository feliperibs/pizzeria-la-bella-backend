import * as express from "express";
import { UserModel } from "../schemas/user-schema";
import { IUser } from "../models/user";
import moment from "moment";

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

export const register = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    const user = req.body as IUser;

    const { name, cpf, email, password } = user;
    const address = user.address;

    const pizzaRequest = new UserModel({
      name,
      cpf,
      creation_date: moment(),
      address,
      email,
      password,
      is_admin: false,
    });

    res.status(201).json(await pizzaRequest.save());
  } catch (error) {
    next(error);
  }
};
