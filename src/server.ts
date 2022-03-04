import express from 'express';
import bodyParser from 'body-parser';
import routerToDo from './routes/todos';
import cors from 'cors';
import db from './models/index';

const app = express();
const PORT = process.env.PORT || 8080;
const corsOption = {
    origin:"http://localhost:8081"
}

app.use(cors(corsOption));

app.use(bodyParser.urlencoded({ extended:true }));

app.use(routerToDo);

const Role = db.role;

db.sequelize.sync({force:true}).then(() => {
    console.log('drop and Resync Db');
    initial();
})

const initial = () => {
    Role.create({
    id: 1,
    name: "user"
  });
 
  Role.create({
    id: 2,
    name: "moderator"
  });
 
  Role.create({
    id: 3,
    name: "admin"
  });
}

app.listen(PORT, () => console.log("server running in port: ", PORT));