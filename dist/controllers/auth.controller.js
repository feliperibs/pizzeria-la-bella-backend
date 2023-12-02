"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.register = void 0;
const jwt = __importStar(require("jsonwebtoken"));
const user_schema_1 = require("../schemas/user-schema");
const moment_1 = __importDefault(require("moment"));
const register = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, cpf, email, password } = req.body;
    try {
        const userExists = yield user_schema_1.UserModel.findOne({ email });
        if (userExists === null || userExists === void 0 ? void 0 : userExists.email) {
            res.status(403).json({ message: "Email already registered" });
        }
        else {
            const user = new user_schema_1.UserModel({
                name,
                address: {
                    street: req.body.street,
                    city: req.body.city,
                    number: req.body.number,
                    POST_CODE: req.body.POST_CODE,
                    state: req.body.state,
                },
                cpf,
                creation_date: (0, moment_1.default)(),
                email,
                password,
                is_admin: false,
            });
            const createdUser = yield user.save();
            res.status(201).json({ message: "Registration successful" });
        }
    }
    catch (error) {
        next(error);
    }
});
exports.register = register;
const login = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        const user = yield user_schema_1.UserModel.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        const passwordMatch = yield user.comparePassword(password);
        if (!passwordMatch) {
            return res.status(401).json({ message: "Incorrect password" });
        }
        const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY, {
            expiresIn: "1 hour",
        });
        res.status(200).json({ token, user });
    }
    catch (error) {
        next(error);
    }
});
exports.login = login;
//# sourceMappingURL=auth.controller.js.map