"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const todos_1 = __importDefault(require("./routes/todos"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
const PORT = process.env.PORT || 8080;
const corsOption = {
    origin: "http://localhost:8081"
};
app.use((0, cors_1.default)(corsOption));
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use(todos_1.default);
app.listen(PORT, () => console.log("server running in port: ", PORT));
