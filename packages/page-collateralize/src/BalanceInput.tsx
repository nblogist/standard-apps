import React, { useState } from "react";
import styled from "styled-components";
import NumberFormat from "react-number-format";
import { BareProps as Props } from "@canvas-ui/react-components/types";
// import { inputToBn } from "@canvas-ui/custom-components/inputBn";

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
  console.log("asdfs");
  return (
    <div className={`${className} balance-input--Wrapper ${classNames}`}>
      <NumberFormat
        thousandSeparator={true}
        allowNegative={false}
        allowLeadingZeros={false}
        isNumericString={true}
        value={values.value}
        onValueChange={({ value, floatValue }) => {
          console.log("vuechange", value);
          const [result, validity] = inputToBn(value);
          console.log("hello", result);
          validity && onValueChange && onValueChange(value, floatValue);
          // setValue({ value, floatValue });
        }}
      />
    </div>
  );
}

export default React.memo(styled(BalanceInput)``);
