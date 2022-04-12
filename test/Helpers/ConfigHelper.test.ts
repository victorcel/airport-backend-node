import ConfigHelper from "../../src/app/Helpers/ConfigHelper";

describe('ConfigHelper all method', function () {
    let configHelper = new ConfigHelper()
    it('should getRandomInt', function () {
        const minim = 10;
        const maxim = 99;
        expect(configHelper.getRandomInt(minim,maxim)).toBeGreaterThan(minim);
    });
});