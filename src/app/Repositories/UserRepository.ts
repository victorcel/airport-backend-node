import faker from "@faker-js/faker";
import UserModel from "../Models/UserModel";
import ConfigHelper from "../Helpers/ConfigHelper";

export default class UserRepository {
    globalHelper =new ConfigHelper();

    public  createSeederUser(count: number) :UserModel[] {
        let user = new UserModel();
        let listUser = [];
        for (let _i = 0; _i < count; _i++) {
            user.name = faker.name.firstName() + ' ' + faker.name.lastName();
            user.ega = this.globalHelper.getRandomInt(20, 99);
            user.email = faker.internet.email();
            listUser.push(user);
            user.save(user);
        }
        return listUser;

    }

}