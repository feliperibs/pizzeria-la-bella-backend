import express from "express";
import { authenticateMiddleware } from "../../middlewares/auth-middleware";
import { getPizza, getPizzas, register } from "../../controllers/pizza.controller";

export const PizzaRouter = express.Router();

PizzaRouter.get("/", getPizzas);
PizzaRouter.get("/:id", getPizza);
PizzaRouter.post("/create", authenticateMiddleware, register); 
