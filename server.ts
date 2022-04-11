import express from 'express';
import bodyParser from "body-parser";
import { routerApi } from "./src/app/Routes/ApiRoute";

const app = express();

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

app.use(routerApi);

app.listen(8080, () => {
    console.log('server running on port 8080');
});
