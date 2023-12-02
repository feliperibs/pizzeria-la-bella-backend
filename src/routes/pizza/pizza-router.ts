import express from "express";
import { authenticateMiddleware } from "../../middlewares/auth-middleware";
import { getPizzas, register } from "../../controllers/pizza.controller";

export const PizzaRouter = express.Router();

PizzaRouter.get("/",authenticateMiddleware, getPizzas);
PizzaRouter.post("/create", authenticateMiddleware, register); 
