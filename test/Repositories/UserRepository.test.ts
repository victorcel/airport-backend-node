import UserRepository from "../../src/app/Repositories/UserRepository";

describe('UserRepository all method', function () {

    it('should createSeederUser list Users', async function () {
        const numberCreateUser = 1;
        const userRepository = await new UserRepository()
            .createSeederUser(numberCreateUser);

        expect(userRepository).toHaveLength(numberCreateUser);
    });

});