import useCurrentUser from "./UseCurrentUser";
import { useApi } from "@canvas-ui/react-hooks";

export default function useAccount() {
  const api = useApi().api;
  const address = useCurrentUser().currentAddress;
  console.log("address", address);

  const getBalance = () => {
    if (address !== "") {
      console.log("addr", address);
      return api.query.balances.account(address);
    }
    return null;
  };

  return [getBalance];
}
