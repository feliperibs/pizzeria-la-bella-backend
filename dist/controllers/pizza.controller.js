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
exports.getPizzas = exports.register = void 0;
const pizza_schema_1 = require("../schemas/pizza-schema");
const register = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const pizzas = req.body;
        let createdPizzas = [];
        yield pizzas.forEach((pizza) => __awaiter(void 0, void 0, void 0, function* () {
            const { name, description, imageUrl, price } = pizza;
            const pizzaRequest = new pizza_schema_1.PizzaModel({
                name,
                description,
                imageUrl,
                price
            });
            createdPizzas.push(yield pizzaRequest.save());
        }));
        res.status(201).json(createdPizzas);
    }
    catch (error) {
        next(error);
    }
});
exports.register = register;
const getPizzas = (_req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const pizzas = yield pizza_schema_1.PizzaModel.find();
        res.json(pizzas);
    }
    catch (err) {
        res.status(500).json({ error: "Internal server error" });
        next(err);
        throw Error(err);
    }
});
exports.getPizzas = getPizzas;
