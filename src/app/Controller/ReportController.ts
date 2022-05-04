import {Request, Response} from "express";
import TicketModel from "../Models/TicketModel";
import UserModel from "../Models/UserModel";

export default class ReportController {


    static async handler(request: Request, response: Response) {
        try {
            const userModel = new UserModel()
            const flightsGenerated = await new TicketModel().flightsGenerated()
            const clientsServed = await userModel.clientsServed()
            const peopleWaiting = await userModel.peopleWaiting()
            const averageAgeOfPeopleServed = await userModel.averageAgeOfPeopleServed()

            return response
                .status(200)
                .json({
                    "flightsGenerated": flightsGenerated,
                    "clientsServed": clientsServed,
                    "averageAgeOfPeopleServed": averageAgeOfPeopleServed,
                    "maximumWaitingTime": flightsGenerated,
                    "peoplewaiting": peopleWaiting
                });

        } catch (error) {
            return response
                .status(500)
                .json(Object(error))
        }
    }
}