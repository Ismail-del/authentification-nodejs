"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const roleUser = (sequelize, Sequelize) => {
    const Role = sequelize.define("roles", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true
        },
        name: {
            type: Sequelize.STRING
        }
    });
    return Role;
};
exports.default = roleUser;
