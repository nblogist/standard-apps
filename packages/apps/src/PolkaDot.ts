import { ApiPromise, WsProvider } from "@polkadot/api";
import { Keyring } from "@polkadot/api";

const keyring = new Keyring({ type: "sr25519" });

let pdApi: Promise<ApiPromise> = (async () => {
  const wsProvider = new WsProvider("");
  const api = await ApiPromise.create({ provider: wsProvider });
  return api;
})();

let testTx: Promise<void> = (async () => {
  console.log("testTx");
  const api = await pdApi;
  const alice = keyring.addFromUri("//Alice", { name: "Alice default" });
  const bob = keyring.addFromUri("//Bob", { name: "Bob default" });

  const unsub = await api.tx.balances.transfer(bob.address, 12345678).signAndSend(alice, result => {
    console.log(`Current status is ${result.status}`);

    if (result.status.isInBlock) {
      console.log(`Transaction included at blockHash ${result.status.asInBlock}`);
    } else if (result.status.isFinalized) {
      console.log(`Transaction finalized at blockHash ${result.status.asFinalized}`);
      unsub();
    }
  });
})();

export { testTx };
export default pdApi;
