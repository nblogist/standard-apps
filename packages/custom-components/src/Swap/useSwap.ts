import React, { useState, useEffect, useRef } from "react";
import { Values, INITIAL_STATE } from "../BalanceInput";
import { isValidNumber } from "@canvas-ui/custom-components";
import { formatBalance } from "@polkadot/util";
import { useApi } from "@canvas-ui/react-hooks";
import BN from "bn.js";

const _INITIAL_STATE: Values = { ...INITIAL_STATE, update: true };

function useSwap(input1to2: Function, input2to1: Function, max?: BN): Array<any> {
  const [input1, setInput1] = useState(_INITIAL_STATE);
  const [input2, setInput2] = useState(_INITIAL_STATE);
  const api = useApi().api;

  const _formatBalance = (amt: string) => {
    return formatBalance(amt, { withSi: false, forceUnit: "-" }, api.registry.chainDecimals);
  };

  const onInput1Change = (values: Values) => {
    setInput1({ ...input1, ...values });
    if (values.bn) {
      console.log("valuesb1", values.bn.toString());
      const _input2bn = input1to2(values.bn);
      const _input2str = _formatBalance(_input2bn);
      console.log("input2str", _input2str);
      const validity = isValidNumber(_input2bn, undefined, false, max);
      setInput2({ value: _input2str, bn: _input2bn, validity, update: false });
    }
  };

  const onInput2Change = (values: Values) => {
    setInput2({ ...input2, ...values });
    if (values.bn) {
      console.log("valuesb2", values.bn.toString());
      const _input1bn = input2to1(values.bn);
      const _input1str = _formatBalance(_input1bn);
      console.log("input1str", _input1str);
      const validity = isValidNumber(_input1bn, undefined, false, max);
      setInput1({ value: _input1str, bn: _input1bn, validity, update: false });
    }
  };

  return [input1, onInput1Change, input2, onInput2Change];
}

export default useSwap;
