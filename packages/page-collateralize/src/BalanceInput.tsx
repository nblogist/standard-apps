import React, { useState } from "react";
import styled from "styled-components";
import NumberFormat from "react-number-format";
import { BareProps as Props } from "@canvas-ui/react-components/types";

interface Value {
  value: string;
  floatValue: number;
}

interface BalanceProps extends Props {
  max: number;
  onValueChange: Function;
  values: Value;
  classNames?: string;
}

function BalanceInput({
  className = "",
  max = Number.MAX_VALUE,
  onValueChange,
  values,
  classNames
}: BalanceProps): React.ReactElement<BalanceProps> {
  return (
    <div className={`${className} balance-input--Wrapper ${classNames}`}>
      <NumberFormat
        thousandSeparator={true}
        allowNegative={false}
        allowLeadingZeros={false}
        isNumericString={true}
        value={values.value}
        onValueChange={({ value, floatValue }) => {
          if (floatValue === undefined) floatValue = 0;
          else if (floatValue === Infinity || parseFloat(value) > max) value = max.toString();
          onValueChange && onValueChange(value, floatValue);
          // setValue({ value, floatValue });
        }}
      />
    </div>
  );
}

export default React.memo(styled(BalanceInput)``);
