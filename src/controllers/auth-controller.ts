import db from "../models/index";
import config from "../config/auth-config";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { Op } from "@sequelize/core";

const User = db.user;
const Role = db.role;

export const singup = async (req: any, res: any) => {
  try {
    const newPassword = await bcrypt.hashSync(req.body.password, 8);
    const user = await User.create({
      username: req.body.username,
      email: req.body.email,
      password: await newPassword,
    });
    console.log("user = ", user);

    if (req.body.roles) {
      const roles = await Role.findAll({
        where: {
          name: {
            [Op.or]: [req.body.roles],
          },
        },
      });
      user.setRoles(roles).then(() => {
        res.send({ message: "User was registered successfully!" });
      });
    } else {
      // user role = 1
      user.setRoles([1]).then(() => {
        res.send({ message: "User was registered successfully!" });
      });
    }
  } catch (err: any) {
    res.status(500).send({ message: err.message, error: "error" });
  }
};

export const signin = async (req: any, res: any) => {
  try {
    const user = await User.findOne({
      where: {
        username: req.body.username,
      },
    });

    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }
    const passwordIsValid = bcrypt.compareSync(
      req.body.password,
      user.password
    );
    if (!passwordIsValid) {
      return res.status(401).send({
        accessToken: null,
        message: "Invalid Password",
      });
    }
    const token = jwt.sign({ id: user.id }, config.secret, {
      expiresIn: 86400,
    });

    const authorities = [];
    const roles = await user.getRoles();
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
  } catch (err: any) {
    res.status(500).send({ message: err.message });
  }
};
