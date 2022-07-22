// // We require the Hardhat Runtime Environment explicitly here. This is optional
// // but useful for running the script in a standalone fashion through `node <script>`.
// //
// // You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// // will compile your contracts, add the Hardhat Runtime Environment's members to the
// // global scope, and execute the script.
// const hre = require("hardhat");

// async function main() {
//   const currentTimestampInSeconds = Math.round(Date.now() / 1000);
//   const ONE_YEAR_IN_SECS = 365 * 24 * 60 * 60;
//   const unlockTime = currentTimestampInSeconds + ONE_YEAR_IN_SECS;

//   const lockedAmount = hre.ethers.utils.parseEther("1");

//   const Lock = await hre.ethers.getContractFactory("Lock");
//   const lock = await Lock.deploy(unlockTime, { value: lockedAmount });

//   await lock.deployed();

//   console.log("Lock with 1 ETH deployed to:", lock.address);
// }

// // We recommend this pattern to be able to use async/await everywhere
// // and properly handle errors.
// main().catch((error) => {
//   console.error(error);
//   process.exitCode = 1;
// });



// // We require the Hardhat Runtime Environment explicitly here. This is optional
// // but useful for running the script in a standalone fashion through `node <script>`.
// //
// // When running the script with `npx hardhat run <script>` you'll find the Hardhat
// // Runtime Environment's members available in the global scope.
// const hre = require("hardhat");
// const fs = require("fs");

// const FContract = "Factory";
// const EContract = "Escrow";

// async function main() {
//   // Hardhat always runs the compile task when running scripts with its command
//   // line interface.
//   //
//   // If this script is run directly using `node` you may want to call compile
//   // manually to make sure everything is compiled
//   // await hre.run('compile');

//   // We get the contract to deploy
//   const FactoryContract = await hre.ethers.getContractFactory(FContract);
//   const factory = await Contract.deploy();

//   console.log("Contract deployed to:", factory.address);

//   // Write contract address to artifact
//   fs.writeFileSync(
//     __dirname +
//       "/../frontend/src/artifacts/contracts/" +
//       FContractt +
//       ".sol/contract-address.json",
//     JSON.stringify({ address: contract.address }, undefined, 2)
//   );
// }

// // We recommend this pattern to be able to use async/await everywhere
// // and properly handle errors.
// main()
//   .then(() => process.exit(0))
//   .catch((error) => {
//     console.error(error);
//     process.exit(1);
//   });

//---------------------------------------------------

const hre = require("hardhat");

async function main() {
  // const ESCROW_OWNER = escrowOwner;
  // const [escrowOwner, seller, buyer, externalWallet] = await hre.ethers.getSigners();

  const Factory = await hre.ethers.getContractFactory("Factory");
  const factory = await Factory.deploy();

  await factory.deployed();
  console.log("Contract address:", factory.address);

  saveFrontendFiles(factory);
}

// the magical code that links you contract to the frontend
function saveFrontendFiles(contract) {
  const fs = require("fs");
  const contractsDir = __dirname + "/../frontend/src/abis";

  if (!fs.existsSync(contractsDir)) {
    fs.mkdirSync(contractsDir);
  }

  fs.writeFileSync(
    contractsDir + "/contract-address.json",
    JSON.stringify({ Factory: contract.address }, undefined, 2)
  );

  const FactoryArtifact = hre.artifacts.readArtifactSync("Factory");

  fs.writeFileSync(
    contractsDir + "/Factory.json",
    JSON.stringify(FactoryArtifact, null, 2)
  );
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.log(error);
    process.exit(1);
  });