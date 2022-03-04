import express from 'express';
import bodyParser from 'body-parser';
import routerToDo from './routes/todos';

const app = express();
const port = 8080;

app.use(bodyParser.json());

app.use(routerToDo);

app.listen(port, () => console.log("server running in port: ", port))