import faker from "@faker-js/faker";
import UserModel from "../Models/UserModel";
import ConfigHelper from "../Helpers/ConfigHelper";
import QueueService from "../Services/QueueService";

export default class UserRepository {
    globalHelper = new ConfigHelper();
    userModel = new UserModel();

    public async createSeederUser(count: number): Promise<UserModel[][]> {
        const countTicket = 2;
        let listUser: UserModel[] = [];
        let listUserPerFlight: UserModel[][] = [];

        for (let _i = 0; _i < count; _i++) {
            let user = new UserModel();
            user.ID = faker.datatype.uuid();
            user.name = faker.name.firstName() + ' ' + faker.name.lastName();
            user.ega = this.globalHelper.getRandomInt(20, 99);
            user.email = faker.internet.email();
            listUser.push(user);
            this.userModel.save(user).catch(console.error);
        }
        let listWaitUser = await this.userModel
            .listWaitingForFlight()

        listWaitUser.forEach((data) => {
            listUser.push(data)
        })

        const groupTicket = Math.ceil(listUser.length / countTicket)

        let queueServices = new QueueService('queueTickets');
        let initial = 0
        let interval = countTicket;

        for (let i = 0; i < groupTicket; i++) {
            listUserPerFlight.push(listUser.slice(initial, interval));
            let ram = Math.floor(Math.random() * (99999999 - 99999)) + 1;
            initial += countTicket
            interval += countTicket;
        }

        listUserPerFlight.map((data) => {

            if (data.length == countTicket) {
                queueServices.addQueue(data)
                return;
            }

            this.userModel.waitingForFlight(data).catch(console.error)
        })

        return listUserPerFlight;
    }

}