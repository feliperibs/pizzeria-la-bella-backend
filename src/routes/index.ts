import express from "express";
import { UserRouter } from "./user/user-router";
import { AuthRouter } from "./auth/auth-router";
import { PizzaRouter } from "./pizza/pizza-router";
import { OrderRouter } from "./order/order-router";

export const router = express.Router();

router.use("/users", UserRouter);
router.use("/auth", AuthRouter);
router.use("/pizzas", PizzaRouter);
router.use("/orders/", OrderRouter);
