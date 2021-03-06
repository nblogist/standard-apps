import React, { useState } from "react";
import styled from "styled-components";
import NumberFormat from "react-number-format";
import { BareProps as Props } from "@canvas-ui/react-components/types";

export interface Values {
  value: string;
  floatValue: number | undefined;
}

interface BalanceProps extends Props {
  max: number;
  onValueChange?: Function;
  values?: Values;
}

export const INITIAL_STATE: Values = { value: "", floatValue: undefined };

function BalanceInput({
  className = "",
  max = Number.MAX_VALUE,
  onValueChange,
  values
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
        onValueChange={({ value, floatValue }) => {
          if (floatValue === Infinity || (floatValue !== undefined && floatValue >= max)) {
            floatValue = max;
            value = floatValue.toString();
          }
          if (!values) setData({ value, floatValue });
          onValueChange && onValueChange({ value, floatValue });
          // setValue({ value, floatValue });
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
