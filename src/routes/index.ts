import express from "express";
import { UserRouter } from "./user/user-router";
import { AuthRouter } from "./auth/auth-router";
import { PizzaRouter } from "./pizza/pizza-router";

export const router = express.Router();

router.use("/users", UserRouter);
router.use("/auth", AuthRouter);
router.use("/pizzas", PizzaRouter);
// // middleWare for authentication
// router.use('/owner', authMiddleware)
// // check that owner is an owner and not a simple user
// router.use('/owner', typeChecker.ownerMiddleware)
// // route owner
// router.use('/owner', owner)
