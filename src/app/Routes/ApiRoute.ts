import express from 'express';
import UserController from "../Controller/UserController";

let routerApi = express.Router();

// Home page route.
routerApi.get('/', function (_request, _response) {
    _response.send('API Airport Londres');
})


routerApi.post('/user', UserController.handle)

export{ routerApi };