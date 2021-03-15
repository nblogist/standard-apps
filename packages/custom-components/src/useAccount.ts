import useCurrentUser from "./UseCurrentUser";
import { useApi } from "@canvas-ui/react-hooks";

export default function useAccount() {
  const api = useApi().api;
  const address = useCurrentUser().currentAddress;

  const getBalance = () => {
    return api.query.balances.account(address);
  };

  return [getBalance];
}
