"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUser = exports.getUsers = void 0;
const user_schema_1 = require("../schemas/user-schema");
const getUsers = (_req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield user_schema_1.UserModel.find();
        res.json(users);
    }
    catch (err) {
        res.status(500).json({ error: "Internal server error" });
        next(err);
        throw Error(err);
    }
});
exports.getUsers = getUsers;
const getUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const user = yield user_schema_1.UserModel.findOne({ id });
        res.json(user);
    }
    catch (err) {
        res.status(500).json({ error: "Internal server error" });
        next(err);
        throw Error(err);
    }
});
exports.getUser = getUser;
