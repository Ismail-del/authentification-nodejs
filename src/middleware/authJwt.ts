import jwt from "jsonwebtoken";

import config from "../config/auth-config";

import db from "../models/index";
const User = db.user;

const verifyToken = (req: any, res: any, next: any) => {
  let token = req.headers["x-access-token"];
  if (!token) {
    return res.status(403).send({
      message: "No token provided!",
    });
  }
  jwt.verify(token, config.secret, (err: any, decoded: any) => {
    if (err) {
      return res.status(401).send({
        message: "Unauthorized!",
      });
    }
    req.userId = decoded.id;
    next();
  });
};

const isAdmin = async (req: any, res: any, next: any) => {
  const user = await User.findByPk(req.userId);
  const roles = await user.getRoles();

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
};

const isModerator = async (req: any, res: any, next: any) => {
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
};

const isModeratorOrAdmin = async (req: any, res: any, next: any) => {
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
};
const authJwt = {
  verifyToken: verifyToken,
  isAdmin: isAdmin,
  isModerator: isModerator,
  isModeratorOrAdmin: isModeratorOrAdmin,
};

export default authJwt;
