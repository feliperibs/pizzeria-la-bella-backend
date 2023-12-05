import * as express from "express";
import { IPizza } from "../models/pizza";
import { PizzaModel } from "../schemas/pizza-schema";

export const register = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  
  try {
  const pizzas =req.body as IPizza[];
  let createdPizzas: IPizza[] = [];

  await pizzas.forEach(async pizza => {
    const { name, description, imageUrl, price } = pizza;

    const pizzaRequest = new PizzaModel({
      name,
      description,
      imageUrl,
      price
    });

    createdPizzas.push(await pizzaRequest.save());
  })
    res.status(201).json(createdPizzas);
  } catch (error) {
    next(error);
  }
};

export const getPizza = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    const id = req.params.id;
    const pizza: IPizza | null = await PizzaModel.findOne({ _id: id });

    res.json(pizza);
  } catch (err: any) {
    res.status(500).json({ error: "Internal server error" });
    next(err);
    throw Error(err);
  }
};

export const getPizzas = async (
  _req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    const pizzas: IPizza[] = await PizzaModel.find();

    res.json(pizzas);
  } catch (err: any) {
    res.status(500).json({ error: "Internal server error" });
    next(err);
    throw Error(err);
  }
};

