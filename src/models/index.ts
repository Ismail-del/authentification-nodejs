import config from '../config/db-config';
import { Sequelize } from 'sequelize';
import modelUser from './user.model';
import roleModel from './role-model';


const sequelize = new Sequelize(
    config.DB,
    config.USER,
    config.PASSWORD,
    {
        host:config.HOST,
        dialect:config.dialect as 'mysql',
        pool:{
            max:config.pool.max,
            min:config.pool.min,
            acquire:config.pool.acquire,
            idle:config.pool.idle
        }

    }
)

const db = {
    Sequelize:Sequelize,
    sequelize:sequelize,
    user:modelUser(sequelize, Sequelize),
    role:roleModel(sequelize, Sequelize),
    ROLES:["user", "admin", "moderator"]
}

db.role.belongsToMany(db.user, {
  through: "user_roles",
  foreignKey: "roleId",
  otherKey: "userId"
});

db.user.belongsToMany(db.role, {
  through: "user_roles",
  foreignKey: "userId",
  otherKey: "roleId"
});

export default db;
