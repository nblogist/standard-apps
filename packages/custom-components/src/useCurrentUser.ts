import React, { useEffect, useState, useContext } from "react";
import useInjectedAccounts, { UseAccounts } from "./useInjectedAccounts";

import store from "store";

const STORAGE_KEY = "options:InputAddress";

interface UseCurrentUser extends UseAccounts {
  currentAddress: string;
  setCurrentUser: Function;
}

const CONTEXT_PLACEHOLDER = {
  currentAddress: "",
  setCurrentUser: () => {}
};

function readOptions(): Record<string, Record<string, string>> {
  return (store.get(STORAGE_KEY) as Record<string, Record<string, string>>) || { defaults: {} };
}

function getLastValue(): string {
  const options = readOptions();
  return options.defaults.account || "";
}

function setLastValue(value: string): void {
  const options = readOptions();
  options.defaults.account = value;
  store.set(STORAGE_KEY, options);
}

export const CurrentUserContext = React.createContext<UseCurrentUser>(({} as unknown) as UseCurrentUser);

export function useCurrentUserContext() {
  return useContext(CurrentUserContext);
}

export default function useCurrentUser(): UseCurrentUser {
  const [currentAddress, setCurrentAddress] = useState<string>("");
  const accountsInfo = useInjectedAccounts();

  const setCurrentUser = (address: string) => {
    if (accountsInfo.getAccount(address) !== undefined) {
      setCurrentAddress(address);
    }
  };

  useEffect(() => {
    setCurrentAddress(getLastValue());
  }, []);

  // useEffect(() => {
  //   if (accountsInfo.isReady && !accountsInfo.isAccount(lastValue)) {
  //     setCurrentAddress("");
  //   }
  // }, [accountsInfo, lastValue]);

  useEffect(() => {
    if (currentAddress !== "") {
      setLastValue(currentAddress);
    }
  }, [currentAddress]);

  return { currentAddress, ...accountsInfo, setCurrentUser };
}
