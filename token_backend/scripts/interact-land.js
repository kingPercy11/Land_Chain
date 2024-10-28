// scripts/interact-land.js
async function main() {
    // Get the deployed contract
    const contractAddress = "YOUR_DEPLOYED_CONTRACT_ADDRESS";
    const LandToken = await ethers.getContractFactory("LandToken");
    const landToken = LandToken.attach(contractAddress);
    
    // Register a new land parcel
    console.log("Registering new land...");
    const tx = await landToken.registerLand(
        "0xYOUR_ADDRESS", // owner address
        "123 Main St, City, Country", // location
        1000, // area in square meters
        "LAND123" // official land registry ID
    );
    await tx.wait();
    console.log("Land registered successfully!");
    
    // Verify the land
    const tokenId = 1; // The first token
    await landToken.verifyLand(tokenId);
    console.log("Land verified successfully!");
    
    // Get land details
    const landDetails = await landToken.getLandDetails(tokenId);
    console.log("Land Details:", landDetails);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });