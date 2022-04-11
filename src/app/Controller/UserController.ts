import {Request, Response} from "express";
import {Type, validate} from "validate-typescript";
import UserRepository from "../Repositories/UserRepository";
import ConfigHelper from "../Helpers/ConfigHelper";

export default class UserController {

    static handle(_request: Request, _response: Response): Response {
        const _configHelper = new ConfigHelper();
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

            return _configHelper.responseSuccessful(_response, responseValidate);
        } catch (error) {
            return _configHelper.responseError(_response,400, Object(error))

        }
    }
}