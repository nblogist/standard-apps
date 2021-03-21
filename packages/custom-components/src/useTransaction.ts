import React, { useContext } from "react";
import useCurrentUser from "./useCurrentUser";
import { useApi } from "@canvas-ui/react-hooks";
import { toast } from "react-toastify";

import { web3FromAddress } from "@polkadot/extension-dapp";
import BN from "bn.js";

interface UseTransaction {
  send: Function;
  initTransfer: Function;
}
// returns an array of all the injected sources
// (this needs to be called first, before other requests)

// the address we use to use for signing, as injected

// finds an injector for an address

// sign and send our transaction - notice here that the address of the account
// (as retrieved injected) is passed through as the param to the `signAndSend`,
// the API then calls the extension to present to the user and get it signed.
// Once complete, the api sends the tx + signature via the normal process

export const TransactionContext = React.createContext<UseTransaction>(({} as unknown) as UseTransaction);

export function useTransactionContext() {
  return useContext(TransactionContext);
}

export default function useTransaction() {
  const api = useApi().api;
  const currentUserAccout = useCurrentUser();
  const SENDER = currentUserAccout.currentAddress;
  const send = async (receiver: string, amount: BN) => {
    if (SENDER && currentUserAccout.isReady) {
      console.log("sender", SENDER, amount.toNumber());
      // return;
      //const accountPair: KeyringPair = keyring.getPair(SENDER);

      const injector = await web3FromAddress(SENDER);
      api.setSigner(injector.signer);
      api.tx.balances
        .transfer(receiver, amount.toNumber())
        .signAndSend(SENDER, (result: any) => {
          if (result.isInBlock) {
            toast(`Transaction in block at blockHash ${result.status.asInBlock}`);
            console.log(`Transaction in block at blockHash ${result.status.asInBlock}`);
          } else if (result.isFinalized) {
            toast.success(`Transaction finalized at blockHash ${result.status.asFinalized}`);
            console.log(`Transaction finalized block at blockHash ${result.status.asFinalized}`);
          } else if (result.isError) {
            toast.error(result.status);
          } else if (result.isWarning) {
            toast.warn(result.status);
          }
        })
        .catch(err => {
          console.log("Error", err);
        });
    }
  };

  return [send];
}
function web3FromSource(source: any) {
  throw new Error("Function not implemented.");
}
