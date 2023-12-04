import * as jwt from "jsonwebtoken";
import * as express from "express";
import { UserModel } from "../schemas/user-schema";
import { IUserRequest } from "../models/user-request";
import moment from "moment";
import { ILoginRequest } from "../models/login-request copy";

export const register = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  const { name, cpf, email, password } = req.body as IUserRequest;
  try {
    const userExists = await UserModel.findOne({ email });

    if (userExists?.email) {
      res.status(403).json({ message: "Email already registered" });
    } else {

      const user = new UserModel({
        name,
        address: {
          street: req.body.street,
          city: req.body.city,
          number: req.body.number,
          postcode: req.body.postcode,
          state: req.body.state,
        },
        cpf,
        creation_date: moment(),
        email,
        password,
        is_admin: false,
      });

      const createdUser = await user.save();

      res.status(201).json({ message: "Registration successful" });
    }
  } catch (error) {
    next(error);
  }
};

export const login = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  const { email, password } = req.body as ILoginRequest;

  try {
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const passwordMatch = await user.comparePassword(password);
    if (!passwordMatch) {
      return res.status(401).json({ message: "Incorrect password" });
    }

    const token = jwt.sign(
      { userId: user._id },
      process.env.SECRET_KEY as string,
      {
        expiresIn: "1 hour",
      }
    );
    res.status(200).json({ token, user});
  } catch (error) {
    next(error);
  }
};
