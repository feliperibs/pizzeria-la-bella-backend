import express from "express";
import { authenticateMiddleware } from "../../middlewares/auth-middleware";
import { getAllOrders, getUserOrders, registerOrder } from "../../controllers/order.controller";

export const OrderRouter = express.Router();

OrderRouter.post("/create", authenticateMiddleware, registerOrder); 
OrderRouter.get("/user/:id", authenticateMiddleware, getUserOrders);
OrderRouter.get("/", authenticateMiddleware, getAllOrders);
