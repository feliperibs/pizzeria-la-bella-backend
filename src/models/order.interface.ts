import { Moment } from "moment";
import { IPizza } from "./pizza";
import { IUser } from "./user";

export interface IOrderRequest {
  userId: string;
  pizzasIds: string[];
}

export interface IOrder {
  userId: string;
  pizzasIds: string[];
  orderDate: Moment;
  totalPrice: number;
}

export interface IOrderResponse {
  userId: string;
  pizzas: IPizza[];
  orderDate: Moment;
  totalPrice: number;
}

export interface IAllOrdersResponse {
  user: IUser;
  pizzas: IPizza[];
  orderDate: Moment;
  totalPrice: number;
}
