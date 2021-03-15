import React, { useContext } from "react";
import useCurrentUser from "./useCurrentUser";
import { useApi } from "@canvas-ui/react-hooks";
import { Keyring } from "@polkadot/api";

import {
  web3Accounts,
  web3Enable,
  web3FromAddress,
  web3ListRpcProviders,
  web3UseRpcProvider
} from "@polkadot/extension-dapp";

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

  const send = async (receiver: string, amount: number) => {
    if (SENDER !== "") {
      const injector = await web3FromAddress(SENDER);
      api.tx.balances.transfer(receiver, amount).signAndSend(SENDER, { signer: injector.signer }, status => {});
    }
  };

  return [send];
}
