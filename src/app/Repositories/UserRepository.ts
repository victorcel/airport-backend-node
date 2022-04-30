import faker from "@faker-js/faker";
import UserModel from "../Models/UserModel";
import ConfigHelper from "../Helpers/ConfigHelper";
import QueueService from "../Services/QueueService";

export default class UserRepository {
    globalHelper = new ConfigHelper();

    public createSeederUser(count: number): UserModel[] {
        const countTicket = 2;
        let listUser: UserModel[] = [];
        let listTickets: UserModel[][] = [];

        for (let _i = 0; _i < count; _i++) {
            let user = new UserModel();
            user.ID = faker.datatype.uuid();
            user.name = faker.name.firstName() + ' ' + faker.name.lastName();
            user.ega = this.globalHelper.getRandomInt(20, 99);
            user.email = faker.internet.email();
            listUser.push(user);
        }

        const groupTicket = Math.ceil(listUser.length / countTicket)

        let queueServices = new QueueService('queueTickets');
        let initial = 0
        let interval = countTicket;

        for (let i = 0; i < groupTicket; i++) {
            listTickets.push(listUser.slice(initial, interval));
            let ram = Math.floor(Math.random() * (99999999 - 99999)) + 1;
            initial += countTicket
            interval += countTicket;
        }

        listTickets.map((data) => {

            queueServices.addQueue(data)
        })
        //user.save(user);
        return listUser;
    }

}