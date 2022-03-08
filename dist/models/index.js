"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const db_config_1 = __importDefault(require("../config/db-config"));
const sequelize_1 = require("sequelize");
const user_model_1 = __importDefault(require("./user.model"));
const role_model_1 = __importDefault(require("./role-model"));
const sequelize = new sequelize_1.Sequelize(db_config_1.default.DB, db_config_1.default.USER, db_config_1.default.PASSWORD, {
    host: db_config_1.default.HOST,
    dialect: db_config_1.default.dialect,
    pool: {
        max: db_config_1.default.pool.max,
        min: db_config_1.default.pool.min,
        acquire: db_config_1.default.pool.acquire,
        idle: db_config_1.default.pool.idle,
    },
});
const db = {
    Sequelize: sequelize_1.Sequelize,
    sequelize: sequelize,
    user: (0, user_model_1.default)(sequelize, sequelize_1.Sequelize),
    role: (0, role_model_1.default)(sequelize, sequelize_1.Sequelize),
    ROLES: ["user", "admin", "moderator"],
};
db.role.belongsToMany(db.user, {
    through: "user_roles",
    foreignKey: "roleId",
    otherKey: "userId",
});
db.user.belongsToMany(db.role, {
    through: "user_roles",
    foreignKey: "userId",
    otherKey: "roleId",
});
exports.default = db;
