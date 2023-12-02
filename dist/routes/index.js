"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = __importDefault(require("express"));
const user_router_1 = require("./user/user-router");
const auth_router_1 = require("./auth/auth-router");
const pizza_router_1 = require("./pizza/pizza-router");
exports.router = express_1.default.Router();
exports.router.use("/users", user_router_1.UserRouter);
exports.router.use("/auth", auth_router_1.AuthRouter);
exports.router.use("/pizzas", pizza_router_1.PizzaRouter);
// // middleWare for authentication
// router.use('/owner', authMiddleware)
// // check that owner is an owner and not a simple user
// router.use('/owner', typeChecker.ownerMiddleware)
// // route owner
// router.use('/owner', owner)
//# sourceMappingURL=index.js.map