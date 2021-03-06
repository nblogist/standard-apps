import React, { useState } from "react";
import styled from "styled-components";
import { BareProps as Props } from "@canvas-ui/react-components/types";
import BalanceInput, { Values } from "./index";

interface UnitInputProps extends Props {
  max: number;
  onValueChange?: Function;
  unit: string;
  values: Values;
}

function UnitInput({
  className = "",
  max = Number.MAX_VALUE,
  onValueChange,
  unit,
  values
}: UnitInputProps): React.ReactElement<UnitInputProps> {
  const onMaxClick = () => {
    onValueChange && onValueChange({ value: max.toString(), floatValue: max });
  };

  return (
    <div className={`${className} dropwdown-input--Wrapper`}>
      <BalanceInput onValueChange={onValueChange} values={values} max={max} />
      <button className="unit-input-max" onClick={onMaxClick}>
        MAX
      </button>
      <button className="unit-input-unit">{unit}</button>
    </div>
  );
}

export default React.memo(styled(UnitInput)`
  min-height: 66px;
  display: flex;
  align-self: flex-start;
  align-items: center;
  justify-content: flex-end;
  border-radius: 12px;
  background: ${props => props.theme.backgroundlight};
  color: ${props => props.theme.color};
  padding: 0 16px;

  .unit-input-max {
    color: ${props => props.theme.textlight};
    border: 0;
    background: transparent;
    outline: none;
    cursor: pointer;
  }

  .unit-input-unit {
    color: ${props => props.theme.text};
    border: 0;
    background: transparent;
    outline: none;
    cursor: pointer;
    padding-left: 12px;
    padding-right: 16px;
  }

  .balance-input--Wrapper {
    flex: 1 1 0;
    input {
      border: 0;
      font-size: 16px;
      background: transparent;
      padding: 8px;
      padding-left: 16px;
      color: ${props => props.theme.text};
    }
  }
`);
