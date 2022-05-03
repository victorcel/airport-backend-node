import express from 'express';
import bodyParser from "body-parser";
import {routerApi} from "./src/app/Routes/ApiRoute";
import dotenv from "dotenv";
import UserModel from "./src/app/Models/UserModel";
import QueueService from "./src/app/Services/QueueService";

const app = express();

dotenv.config();

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({extended: true}));

app.use(routerApi);

let queueServices = new QueueService("queueTickets");
queueServices.process();

app.listen(8080, () => {
    console.log('server running on port 8080');
});
