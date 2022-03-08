"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const verifySignUp_1 = __importDefault(require("../middleware/verifySignUp"));
const auth_controller_1 = require("../controllers/auth-controller");
const express_1 = require("express");
const router = (0, express_1.Router)();
router.post("/api/auth/singup", [verifySignUp_1.default.checkDuplicateUsernameOrEmail, verifySignUp_1.default.checkRolesExisted], auth_controller_1.singup);
router.post("/api/auth/signin", auth_controller_1.signin);
router.get("/api/test", (req, res) => {
    res.status(200).send({ message: "works" });
});
exports.default = router;
