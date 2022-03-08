"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const authJwt_1 = __importDefault(require("../middleware/authJwt"));
const user_controller_1 = require("../controllers/user-controller");
const express_1 = require("express");
const router = (0, express_1.Router)();
router.get("/api/test/all", user_controller_1.allAccess);
router.get("/api/test/user", [authJwt_1.default.verifyToken, authJwt_1.default.isModerator], user_controller_1.moderatorBoard);
router.get("/api/test/admin", [authJwt_1.default.verifyToken, authJwt_1.default.isAdmin], user_controller_1.adminBoard);
exports.default = router;
