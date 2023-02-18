const arweave_wallet = require("./YSReuO6vzkBWd4Tdfe8HE0YLXj4tJokfatsORv7iZ94.json");
const { rpc, contractTxId } = require("./config");
const { isNil } = require("ramda");
// const WeaveDB = require ('weavedb-node-client')
// const sdk = new WeaveDB({
//   contractTxId: contractTxId,
//   arweave_wallet: arweave_wallet,
//   wallet: arweave_wallet,
//   rpc: rpc,
//   // rpc: '3.252.243.108:9090',
//   // rpc: '34.245.150.161:9090',
// });

const WeaveDB = require("weavedb-sdk-node");
const sdk = new WeaveDB({
  // wallet: arweave_wallet,
  arweave_wallet: arweave_wallet,
  contractTxId: contractTxId,
});
// In case the wallet is not set, you can run initializeWithoutWallet() after the instantiation.
// await sdk.initializeWithoutWallet()
// // Or you can assign the wallet later. Note initialize() is not an async-function.
sdk.initialize({
  // wallet: ADMIN_ARWEAVE_WALLET_JSON
  wallet: arweave_wallet,
});
(async () => {
  console.log(`INFO: start.. ${contractTxId}`);
  console.log(
    `INFO: url: https://sonar.warp.cc/#/app/contract/${contractTxId}`
  );
  const collectionName = "test";

  // setRules
  try {
    const ret1 = await sdk.setRules({ "allow write": true }, collectionName);
    console.log("ret1.success: ", ret1.success);
  } catch (e) {
    console.log(e.message);
  }

  // add
  try {
    const ret2 = await sdk.add(
      { text: `hello world ${Date.now()}` },
      collectionName
    );
    console.log("ret2['docId']: ", ret2["docID"]);
  } catch (e) {
    console.log(e.message);
  }

  // get
  try {
    const list = await sdk.cget(collectionName, 100, true);
    list.forEach((item) => {
      if (
        isNil(item) ||
        isNil(item.id) ||
        isNil(item.data) ||
        isNil(item.data.text)
      )
        return;
      console.log(`${item.id} => ${item.data.text}`);
    });
  } catch (e) {
    console.log(e.message);
  }
  process.exit();
})();
