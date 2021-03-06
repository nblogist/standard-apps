import React, { useState, useEffect, useRef } from "react";
import { Values, INITIAL_STATE } from "../BalanceInput";

function useSwap(input1to2: Function, input2to1: Function): Array<any> {
  const [input1, setInput1] = useState(INITIAL_STATE);
  const [input2, setInput2] = useState(INITIAL_STATE);

  const onInput1Change = (values: Values) => {
    setInput1(values);
    const _input2FV = input1to2(values.floatValue);
    setInput2({ value: _input2FV.toString(), floatValue: _input2FV });
  };

  const onInput2Change = (values: Values) => {
    setInput2(values);
    const _input1FV = input2to1(values.floatValue);
    setInput1({ value: _input1FV.toString(), floatValue: _input1FV });
  };

  return [input1, onInput1Change, input2, onInput2Change];
}

export default useSwap;
