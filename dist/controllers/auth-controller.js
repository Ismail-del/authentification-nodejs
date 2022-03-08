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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signin = exports.singup = void 0;
const index_1 = __importDefault(require("../models/index"));
const auth_config_1 = __importDefault(require("../config/auth-config"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const core_1 = require("@sequelize/core");
const User = index_1.default.user;
const Role = index_1.default.role;
const singup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newPassword = yield bcryptjs_1.default.hashSync(req.body.password, 8);
        const user = yield User.create({
            username: req.body.username,
            email: req.body.email,
            password: yield newPassword,
        });
        console.log("user = ", user);
        if (req.body.roles) {
            const roles = yield Role.findAll({
                where: {
                    name: {
                        [core_1.Op.or]: [req.body.roles],
                    },
                },
            });
            user.setRoles(roles).then(() => {
                res.send({ message: "User was registered successfully!" });
            });
        }
        else {
            // user role = 1
            user.setRoles([1]).then(() => {
                res.send({ message: "User was registered successfully!" });
            });
        }
    }
    catch (err) {
        res.status(500).send({ message: err.message, error: "error" });
    }
});
exports.singup = singup;
const signin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield User.findOne({
            where: {
                username: req.body.username,
            },
        });
        if (!user) {
            return res.status(404).send({ message: "User not found" });
        }
        const passwordIsValid = bcryptjs_1.default.compareSync(req.body.password, user.password);
        if (!passwordIsValid) {
            return res.status(401).send({
                accessToken: null,
                message: "Invalid Password",
            });
        }
        const token = jsonwebtoken_1.default.sign({ id: user.id }, auth_config_1.default.secret, {
            expiresIn: 86400,
        });
        const authorities = [];
        const roles = yield user.getRoles();
        for (let i = 0; i < roles.length; i++) {
            authorities.push("ROLE_" + roles[i].name.toUpperCase());
        }
        res.status(200).send({
            id: user.id,
            username: user.username,
            email: user.email,
            roles: authorities,
            accessToken: token,
        });
    }
    catch (err) {
        res.status(500).send({ message: err.message });
    }
});
exports.signin = signin;
