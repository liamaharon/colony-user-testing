const { getNetworkClient } = require('@colony/colony-js-client');
const { open } = require('@colony/purser-software');
const BN = require('bn.js');


const COLONY_ADDR = '0x99D0708E496E5532aaA42ED7B7181F5d192d1Fc4';
const PRIV_KEY = '...'

(async () => {

  // Open Wallet
  const wallet = await open({
    privateKey: PRIV_KEY 
  });

  console.log(wallet.address);

  // Get Network Client
  const networkClient = await getNetworkClient('rinkeby', wallet);

  console.log('Network address: ', networkClient.contract.address);

  // Get a colony client instance using the network client instance
  const colonyClient = await networkClient.getColonyClientByAddress(
    COLONY_ADDR,
  );

  // Set token client owner
  // await colonyClient.tokenClient.setOwner.send({ owner: wallet.address });

  // Mint 10,000 tokens
  const amount = new BN(10000);
  const options = { gasLimit: 500000 };
  const res = await colonyClient.mintTokens.send({ amount }, options);
  console.log(res);

})()
  .then(() => process.exit())
  .catch(error => console.error(error));
