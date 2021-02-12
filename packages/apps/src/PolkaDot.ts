import { ApiPromise, WsProvider } from "@polkadot/api";
import { Keyring } from "@polkadot/api";

const keyring = new Keyring({ type: "sr25519" });

let pdApi: Promise<ApiPromise> = (async () => {
  const wsProvider = new WsProvider("wss:///billjhlee.playground.substrate.dev/wss");
  const api = await ApiPromise.create({ provider: wsProvider });
  return api;
})();

let testTx: Promise<void> = (async () => {
  console.log("PolkaDotJS API Test: testTx");
  const api = await pdApi;
  const alice = keyring.addFromUri("//Alice", { name: "Alice default" });
  const bob = keyring.addFromUri("//Bob", { name: "Bob default" });

  console.log('PolkaDotJs API Test: Send balances from Alice to Bob')
  const unsub = await api.tx.balances.transfer(bob.address, 12345678).signAndSend(alice, result => {
    console.log(`PolkaDotJS API Test:  Current status is ${result.status}`);

    if (result.status.isInBlock) {
      console.log(`PolkaDotJS API Test:  Transaction included at blockHash ${result.status.asInBlock}`);
    } else if (result.status.isFinalized) {
      console.log(`PolkaDotJS API Test:  Transaction finalized at blockHash ${result.status.asFinalized}`);
      unsub();
    }
  });
})();

export { testTx };
export default pdApi;
