import faker from "@faker-js/faker";
import UserModel from "../Models/UserModel";

export default class UserRepository {
    user = new UserModel();
    public createSeederUser(count: number) {

        for (let _i = 0; _i < count; _i++) {
            this.user.ega = 20;
          //  this.userModel.name ="victor";
            //console.log(faker.name.firstName());
            console.log(this.user.ega);
        }
    }
}