// scripts/deploy-land.js
async function main() {
    console.log("Deploying LandToken contract...");
    
    // Deploy LandToken contract
    const LandToken = await ethers.getContractFactory("LandToken");
    const landToken = await LandToken.deploy();
    
    await landToken.waitForDeployment();
    const address = await landToken.getAddress();
    
    console.log("LandToken deployed to:", address);
    
    // Verify contract on Etherscan (optional but recommended)
    console.log("Waiting for block confirmations...");
    await landToken.deployTransaction.wait(6); // wait for 6 block confirmations
    
    await hre.run("verify:verify", {
        address: address,
        constructorArguments: [],
    });
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });