import TicketModel from "../Models/TicketModel";

export default class CreateTicket {


    public static handler(ticket: TicketModel) {
       new TicketModel().create(ticket).catch(console.error)
    }

}