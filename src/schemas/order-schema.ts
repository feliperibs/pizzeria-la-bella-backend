import mongoose, { InferSchemaType, Schema } from "mongoose";
import { IOrder } from "../models/order.interface";

const orderSchema = new Schema<IOrder>({
  pizzasIds: [{ type: String, required: true }],
  userId: { type: String, required: true },
  totalPrice: { type: Number, required: true },
  orderDate: { type: String, required: false },
}, {collection: 'order'});

export const OrderModel = mongoose.model('Order', orderSchema);
