"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PizzaRouter = void 0;
const express_1 = __importDefault(require("express"));
const auth_middleware_1 = require("../../middlewares/auth-middleware");
const pizza_controller_1 = require("../../controllers/pizza.controller");
exports.PizzaRouter = express_1.default.Router();
exports.PizzaRouter.get("/", auth_middleware_1.authenticateMiddleware, pizza_controller_1.getPizzas);
exports.PizzaRouter.post("/create", auth_middleware_1.authenticateMiddleware, pizza_controller_1.register);
