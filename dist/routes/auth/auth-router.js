"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthRouter = void 0;
const express_1 = __importDefault(require("express"));
const auth_controller_1 = require("../../controllers/auth.controller");
exports.AuthRouter = express_1.default.Router();
exports.AuthRouter.post("/register", auth_controller_1.register);
exports.AuthRouter.post("/login", auth_controller_1.login);
