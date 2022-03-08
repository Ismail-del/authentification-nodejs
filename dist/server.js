"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const index_1 = __importDefault(require("./models/index"));
const auth_routes_1 = __importDefault(require("./routes/auth-routes"));
const user_routes_1 = __importDefault(require("./routes/user-routes"));
const app = (0, express_1.default)();
const PORT = process.env.PORT || 8080;
const corsOption = {
    origin: "http://localhost:8081",
};
app.use((0, cors_1.default)(corsOption));
app.use(express_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Headers", "x-access-token, Origin, Content-Type, Accept");
    next();
});
app.use(auth_routes_1.default);
app.use(user_routes_1.default);
const Role = index_1.default.role;
index_1.default.sequelize.sync({ force: true }).then(() => {
    console.log("drop and Resync Db");
    initial();
});
const initial = () => {
    Role.create({
        id: 1,
        name: "user",
    });
    Role.create({
        id: 2,
        name: "moderator",
    });
    Role.create({
        id: 3,
        name: "admin",
    });
};
app.listen(PORT, () => console.log("server running in port: ", PORT));
