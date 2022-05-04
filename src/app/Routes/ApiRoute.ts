import express from 'express';
import UserController from "../Controller/UserController";
import ReportController from "../Controller/ReportController";

let routerApi = express.Router();

// Home page route.
routerApi.get('/', function (_request, _response) {
    _response.send('API Airport Londres');
})

routerApi.post('/v1/user', UserController.handle)

routerApi.get('/v1/metric', ReportController.handler)

export{ routerApi };