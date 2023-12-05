import * as express from "express";
import { OrderModel } from "../schemas/order-schema";
import moment from "moment";
import {
  IAllOrdersResponse,
  IOrder,
  IOrderRequest,
  IOrderResponse,
} from "../models/order.interface";
import { IPizza } from "../models/pizza";
import { PizzaModel } from "../schemas/pizza-schema";
import { UserModel } from "../schemas/user-schema";

export const getAllOrders = async (
  _req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    let orders: IOrder[] = await OrderModel.find();
    const ordersResponse: IAllOrdersResponse[] = [];

    orders = orders?.sort((a: IOrder, b: IOrder) => {
      return moment(a.orderDate).diff(b.orderDate);
    });

    for (const order of orders) {
      let pizzas: IPizza[] = [];
      for (const pizzaId of order.pizzasIds) {
        const pizza = await PizzaModel.findOne({ _id: pizzaId });
        if (pizza) {
          pizzas.push(pizza);
        }
      }
      const user = await UserModel.findOne({ _id: order.userId });
      if (user)
        ordersResponse.push({
          user,
          orderDate: order.orderDate,
          totalPrice: order.totalPrice,
          pizzas,
        });
    }

    res.json(ordersResponse);
  } catch (err: any) {
    res.status(500).json({ error: "Internal server error" });
    next(err);
    throw Error(err);
  }
};

export const registerOrder = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    const order = req.body as IOrderRequest;

    const { pizzasIds, userId } = order;
    let totalPrice: number = 0;

    for (const pizzaId of pizzasIds) {
      const pizza: IPizza | null = await PizzaModel.findOne({ _id: pizzaId });

      if (pizza) {
        totalPrice = totalPrice + pizza.price;
      } else {
        res.status(500).json({ message: "Pizza not found" });
        return;
      }
    }

    const orderRequest = new OrderModel({
      pizzasIds,
      userId,
      totalPrice,
      orderDate: moment(),
    });

    res.status(201).json(await orderRequest.save());
  } catch (error) {
    next(error);
  }
};

export const getUserOrders = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    const userId = req.params.id;
    const ordersResponse: IOrderResponse[] = [];
    let orders: IOrder[] = await OrderModel.find({ userId });

    orders = orders?.sort((a: IOrder, b: IOrder) => {
      return moment(a.orderDate).diff(b.orderDate);
    });

    for (const order of orders) {
      let pizzas: IPizza[] = [];
      for (const pizzaId of order.pizzasIds) {
        const pizza = await PizzaModel.findOne({ _id: pizzaId });
        if (pizza) {
          pizzas.push(pizza);
        }
      }
      ordersResponse.push({
        userId: order.userId,
        orderDate: order.orderDate,
        totalPrice: order.totalPrice,
        pizzas,
      });
    }

    res.json(ordersResponse);
  } catch (err: any) {
    res.status(500).json({ error: "Internal server error" });
    next(err);
    throw Error(err);
  }
};
