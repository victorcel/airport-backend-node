import UserModel from "../../src/app/Models/UserModel";

describe('UserModel all method', function () {

    const userModel = new UserModel();

    const name = "victor";
    const ega = 28;
    const email = "me@local.com";

    userModel.name = name;
    userModel.ega = ega;
    userModel.email = email;

    it('should return toJson', function () {
        expect(userModel.toJson()).toEqual({
            ega: ega,
            email: email,
            name: name,
        });
    });

    it('should test set name, ega, email', function () {
        expect(userModel.name).toEqual(name);
        expect(userModel.ega).toEqual(ega);
        expect(userModel.email).toEqual(email);
    });

    it('should save successful = true', function () {
        expect(userModel.save(userModel)).toBe(true);
    });

});