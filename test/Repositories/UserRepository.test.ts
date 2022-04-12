import UserRepository from "../../src/app/Repositories/UserRepository";

describe('UserRepository all method', function () {

    it('should createSeederUser list Users', function () {
        const numberCreateUser = 10;
        const userRepository = new UserRepository()
            .createSeederUser(numberCreateUser);

        expect(userRepository).toHaveLength(numberCreateUser);
    });

});