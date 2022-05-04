import {Request, Response} from "express";
import {Type, validate} from "validate-typescript";
import UserRepository from "../Repositories/UserRepository";

export default class UserController {

    static handle(_request: Request, _response: Response): Response {

        try {

            const {numberOfPassengers} = _request.body;
            const schema = {
                numberOfPassengers: Type(Number),
            };
            const fromRequest = {
                numberOfPassengers
            }
            const responseValidate = validate(schema, fromRequest);

            new UserRepository().createSeederUser(Number(responseValidate.numberOfPassengers));

            return _response
                .status(200)
                .json(responseValidate);
        } catch (error) {
            return _response
                .status(500)
                .json(Object(error))
        }
    }
}