import React, { useState } from "react";
import styled from "styled-components";
import NumberFormat from "react-number-format";
import { BareProps as Props } from "@canvas-ui/react-components/types";
import { inputToBn } from "@canvas-ui/custom-components";
import { useApi } from "@canvas-ui/react-hooks";
import BN from "bn.js";

export interface Values {
  value: string;
  bn: BN;
  validity: Boolean;
  update?: Boolean;
}

interface BalanceProps extends Props {
  max?: BN;
  chainDecimals: number;
  onValueChange?: Function;
  values?: Values;
}

export const INITIAL_STATE: Values = { value: "", bn: new BN(0), validity: true };

function BalanceInput({
  className = "",
  max,
  onValueChange,
  values,
  chainDecimals
}: BalanceProps): React.ReactElement<BalanceProps> {
  const [data, setData] = useState(INITIAL_STATE);

  return (
    <div className={`${className} balance-input--Wrapper`}>
      <NumberFormat
        thousandSeparator={true}
        allowEmptyFormatting={true}
        allowNegative={false}
        allowLeadingZeros={false}
        isNumericString={true}
        value={values ? values.value : data.value}
        onValueChange={({ value }) => {
          console.log("value", value);
          let valueSplit = value.split(".");
          console.log("valueSplit", valueSplit);
          console.log(chainDecimals);
          if (valueSplit[1] !== undefined) {
            console.log(chainDecimals - valueSplit[1].length + 1);
            valueSplit[1] += new Array(chainDecimals - valueSplit[1].length + 1).join("0");
          } else {
            valueSplit[1] = new Array(chainDecimals + 1).join("0");
          }
          console.log("valuesplit", valueSplit.join(""));

          const [bn, validity] = inputToBn(valueSplit.join(""), null, undefined, false, max);
          if (!values) setData({ value, bn, validity });
          values && values.update
            ? onValueChange && onValueChange({ value, bn, validity, update: true })
            : onValueChange && onValueChange({ update: true });
        }}
      />
    </div>
  );
}

export default React.memo(styled(BalanceInput)`
  input {
    &:focus {
      color: #131523;
      outline: 0;
    }
    color: #131523;
  }
`);
