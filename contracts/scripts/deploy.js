const { ethers, network } = require('hardhat');
const utils = require('./utils.js');

async function main() {
  const [owner] = await ethers.getSigners();
  console.log('Deploying to: ', network.name);
  console.log('Deploying from: ', owner.address);

  const contract = await utils.deployContract('NFT4Ukraine');
  console.log('Deployed to:', contract.address);

  await new Promise((resolve) => setTimeout(resolve, 30000));

  await utils.verifyContract(contract.address);
  console.log('Contract verified');
  console.log('Deploy finished');
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
