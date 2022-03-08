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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const auth_config_1 = __importDefault(require("../config/auth-config"));
const index_1 = __importDefault(require("../models/index"));
const User = index_1.default.user;
const verifyToken = (req, res, next) => {
    let token = req.headers["x-access-token"];
    if (!token) {
        return res.status(403).send({
            message: "No token provided!",
        });
    }
    jsonwebtoken_1.default.verify(token, auth_config_1.default.secret, (err, decoded) => {
        if (err) {
            return res.status(401).send({
                message: "Unauthorized!",
            });
        }
        req.userId = decoded.id;
        next();
    });
};
const isAdmin = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield User.findByPk(req.userId);
    const roles = yield user.getRoles();
    for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === "admin") {
            next();
            return;
        }
    }
    res.status(403).send({
        message: "Require Admin Role!",
    });
    return;
});
const isModerator = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const user = User.findByPk(req.userId);
    const roles = user.getRoles();
    for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === "moderator") {
            next();
            return;
        }
    }
    res.status(403).send({
        message: "Require Moderator Role!",
    });
});
const isModeratorOrAdmin = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const user = User.findByPk(req.userId);
    const roles = user.getRoles();
    for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === "moderator") {
            next();
            return;
        }
        if (roles[i].name === "admin") {
            next();
            return;
        }
    }
    res.status(403).send({
        message: "Require Moderator or Admin Role!",
    });
});
const authJwt = {
    verifyToken: verifyToken,
    isAdmin: isAdmin,
    isModerator: isModerator,
    isModeratorOrAdmin: isModeratorOrAdmin,
};
exports.default = authJwt;
