import React, { useState } from "react";
import styled from "styled-components";
import NumberFormat from "react-number-format";
import { BareProps as Props, BitLength } from "@canvas-ui/react-components/types";

interface Value {
  value: string;
  floatValue: number;
}

interface BalanceProps extends Props {
  max: number;
  onValueChange: Function;
  values: Value;
}

function BalanceInput({
  className = "",
  max = Number.MAX_VALUE,
  onValueChange,
  values
}: BalanceProps): React.ReactElement<BalanceProps> {
  return (
    <div className={`${className} balance-input--Wrapper`}>
      <NumberFormat
        thousandSeparator={true}
        allowNegative={false}
        allowLeadingZeros={false}
        isNumericString={true}
        value={values.value}
        onValueChange={({ value, floatValue }) => {
          if (floatValue === undefined) floatValue = 0;
          else if (floatValue === Infinity || parseFloat(value) > max) value = max.toString();
          onValueChange(value, floatValue);
          // setValue({ value, floatValue });
        }}
      />
    </div>
  );
}

export default React.memo(styled(BalanceInput)`
  input {
    &:focus {
      color: ${props => props.theme.colors.black};
    }
  }
`);
