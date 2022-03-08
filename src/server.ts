import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import db from "./models/index";
import routerAuth from "./routes/auth-routes";
import routerUser from "./routes/user-routes";

const app = express();
const PORT = process.env.PORT || 8080;
const corsOption = {
  origin: "http://localhost:8081",
};

app.use(cors(corsOption));
app.use(express.json());

app.use(bodyParser.urlencoded({ extended: true }));

app.use(function (req, res, next) {
  res.header(
    "Access-Control-Allow-Headers",
    "x-access-token, Origin, Content-Type, Accept"
  );
  next();
});

app.use(routerAuth);
app.use(routerUser);

const Role = db.role;

db.sequelize.sync({ force: true }).then(() => {
  console.log("drop and Resync Db");
  initial();
});

const initial = () => {
  Role.create({
    id: 1,
    name: "user",
  });

  Role.create({
    id: 2,
    name: "moderator",
  });

  Role.create({
    id: 3,
    name: "admin",
  });
};

app.listen(PORT, () => console.log("server running in port: ", PORT));
