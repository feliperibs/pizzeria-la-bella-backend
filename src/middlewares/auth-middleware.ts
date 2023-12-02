import * as jwt from "jsonwebtoken";
import * as express from "express";
import { UserModel } from "../schemas/user-schema";

export const authenticateMiddleware = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  const token = req.headers.authorization?.replace("Bearer ", "");

  if (!token) {
    return res.status(401).json({ message: "Authentication required" });
  }

  try {
    let decodedToken: any;
    jwt.verify(token, process.env.SECRET_KEY as string, async (err, decoded) => {;
      if (err) {
        next(err);
      }
      decodedToken = decoded as any;
      const user = await UserModel.findById(decodedToken?.userId);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      next();
    });
  } catch (error) {
    res.status(401).json({ message: "Invalid token", error });
  }
};
