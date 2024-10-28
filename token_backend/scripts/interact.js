async function main() {
    const [deployer] = await ethers.getSigners();
    const LandToken = await ethers.getContractFactory("LandToken");
    const landToken = await LandToken.attach("0x182C5e0999125884e4DeA7375B076AeF6cE92eFb");

    // Mint a new land token with details
    const tx = await landToken.mintLand(
        "123 Main St, Springfield",
        5000, // area in square feet
        "Residential",
        "First owner: Alice"
    );
    await tx.wait();

    console.log("Minted new land token with specific details");

    // Retrieve and log land details
    const landDetails = await landToken.getLandDetails(0);
    console.log("Land Details:", landDetails);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
