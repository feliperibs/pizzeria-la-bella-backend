"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRouter = void 0;
const express_1 = __importDefault(require("express"));
const auth_middleware_1 = require("../../middlewares/auth-middleware");
const user_controller_1 = require("../../controllers/user.controller");
exports.UserRouter = express_1.default.Router();
exports.UserRouter.get("/", auth_middleware_1.authenticateMiddleware, user_controller_1.getUsers);
exports.UserRouter.get("/:id", auth_middleware_1.authenticateMiddleware, user_controller_1.getUser);