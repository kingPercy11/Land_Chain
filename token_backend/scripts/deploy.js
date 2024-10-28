async function main() {
    const LandToken = await ethers.getContractFactory("LandToken");
    const landToken = await LandToken.deploy();
    await landToken.deployed();

    console.log("LandToken deployed to:", landToken.address);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });