"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const db_config = {
    HOST: "localhost",
    USER: "root",
    PASSWORD: "admin",
    DB: "databasetodolist",
    dialect: "mysql",
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000,
    },
};
exports.default = db_config;
