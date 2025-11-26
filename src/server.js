"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const users_1 = __importDefault(require("./handlers/users"));
const product_1 = __importDefault(require("./handlers/product"));
const orders_1 = __importDefault(require("./handlers/orders"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT || 3000;
app.use(body_parser_1.default.json());
(0, users_1.default)(app);
(0, product_1.default)(app);
(0, orders_1.default)(app);
app.get('/', (_req, res) => {
    res.send('Storefront API running');
});
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
exports.default = app;
