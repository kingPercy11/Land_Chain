const { expect } = require("chai");

describe("SimpleStorage", function () {
    let simpleStorage;

    beforeEach(async function () {
        const SimpleStorage = await ethers.getContractFactory("SimpleStorage");
        simpleStorage = await SimpleStorage.deploy();
        await simpleStorage.deployed();
    });

    it("Should return the new value once changed", async function () {
        await simpleStorage.setValue(42);
        expect(await simpleStorage.getValue()).to.equal(42);
    });
});