import React from "react";
import styled from "styled-components";
import { BareProps as Props } from "@canvas-ui/react-components/types";
import BalanceInput, { Values } from "./index";
import BN from "bn.js";

interface UnitInputProps extends Props {
  max?: BN;
  onValueChange?: Function;
  unit: string;
  values: Values;
  chainDecimals: number;
}

function UnitInput({
  className = "",
  max,
  onValueChange,
  unit,
  values,
  chainDecimals
}: UnitInputProps): React.ReactElement<UnitInputProps> {
  const onMaxClick = () => {
    // onValueChange && onValueChange({ value: max.toString(), floatValue: max });
  };

  return (
    <div className={`${className} unit-input--Wrapper`}>
      <BalanceInput onValueChange={onValueChange} values={values} max={max} chainDecimals={chainDecimals} />
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
