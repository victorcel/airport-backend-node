import UserModel from "../../src/app/Models/UserModel";

describe('UserModel all method', function () {

    const userModel = new UserModel();

    const id = "eeef-eef";
    const name = "victor";
    const ega = 28;
    const email = "me@local.com";

    userModel.ID = id;
    userModel.name = name;
    userModel.ega = ega;
    userModel.email = email;

    it('should return toJson', function () {
        expect(userModel.toJson()).toEqual({
            id: id,
            ega: ega,
            email: email,
            name: name,
            isBoarded: false,

        });
    });

    it('should test set name, ega, email', function () {
        expect(userModel.name).toEqual(name);
        expect(userModel.ega).toEqual(ega);
        expect(userModel.email).toEqual(email);
    });

    it('should save successful = true', async function () {
        expect(await userModel.save(userModel)).toBe(true);
    });

});