import mongoose, { InferSchemaType, Schema } from "mongoose";
import { IPizza } from "../models/pizza";

const pizzaSchema = new Schema<IPizza>({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  imageUrl: { type: String, required: false },
}, {collection: 'pizza'});

export const PizzaModel = mongoose.model('Pizza', pizzaSchema);
