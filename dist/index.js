"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const dotenv_1 = __importDefault(require("dotenv"));
const routes_1 = require("./routes");
dotenv_1.default.config();
exports.app = (0, express_1.default)();
const port = process.env.PORT || 3000;
exports.app.use(body_parser_1.default.json());
exports.app.use(body_parser_1.default.urlencoded({ extended: true }));
const url = "mongodb+srv://felipeerib:gi5n4tPohI55gg7s@cluster0.yfo4rfk.mongodb.net/";
exports.app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
mongoose_1.default
    .connect(url)
    .then(() => {
    exports.app.get("/", (_req, res) => {
        return res.send("Express Typescript on Vercel");
    });
    exports.app.use("/api", routes_1.router);
})
    .catch((err) => { throw new Error(err); });
//# sourceMappingURL=index.js.map