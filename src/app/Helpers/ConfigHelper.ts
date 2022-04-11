import dotenv from "dotenv";
import {Response} from "express";

export default class ConfigHelper {

    public getRandomInt(min: number, max: number): number {
        return Math.floor(Math.random() * (max - min)) + min;
    }

    public serviceAccount(): object {

        dotenv.config();

        const ENV = process.env;

        return {
            "type": ENV.FIRESTORE_TYPE,
            "project_id": ENV.FIRESTORE_PROJECT_ID,
            "private_key_id": ENV.FIRESTORE_PRIVATE_KEY_ID,
            "private_key": ENV.FIRESTORE_PRIVATE_KEY,
            "client_email": ENV.FIRESTORE_CLIENT_EMAIL,
            "client_id": ENV.FIRESTORE_CLIENT_ID,
            "auth_uri": ENV.FIRESTORE_AUTH_URI,
            "token_uri": ENV.FIRESTORE_TOKEN_URI,
            "auth_provider_x509_cert_url": ENV.FIRESTORE_AUTH_CERT_PROVIDER,
            "client_x509_cert_url": ENV.FIRESTORE_CLIENT_CERT_URL
        }
    }

    public responseSuccessful(_response: Response, _data: object): Response {
        return _response.status(200).json(
            {
                "successful": true,
                "response": _data
            });
    }
    
    public responseError(_response: Response, _data: object):Response{
        return _response.status(200).json(
            {
                "successful": false,
                "response": _data
            });
    }
}