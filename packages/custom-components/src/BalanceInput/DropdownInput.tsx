import React, { useState } from "react";
import styled from "styled-components";
import { BareProps as Props } from "@canvas-ui/react-components/types";
import BalanceInput, { Values } from "./index";
import { Dropdown } from "@canvas-ui/react-components";
import DropDown from "../DropDown";

interface DropdownInputProps extends Props {
  max: number;
  onValueChange?: Function;
  onDrodpDownChange?: Function;
  options: Array<any>;
  def: number;
  values: Values;
}

function DropdownInput({
  className = "",
  max = Number.MAX_VALUE,
  onValueChange,
  onDrodpDownChange,
  options,
  values,
  def = 0
}: DropdownInputProps): React.ReactElement<DropdownInputProps> {
  const onMaxClick = () => {
    onValueChange && onValueChange({ value: max.toString(), floatValue: max });
  };

  return (
    <div className={`${className} dropwdown-input--Wrapper`}>
      <BalanceInput onValueChange={onValueChange} values={values} max={max} />
      <button className="dropdown-input-max" onClick={onMaxClick}>
        MAX
      </button>
      <DropDown menu={options} onChange={onDrodpDownChange} />
    </div>
  );
}

export default React.memo(styled(DropdownInput)`
  min-height: 66px;
  display: flex;
  align-self: flex-start;
  align-items: center;
  justify-content: flex-end;
  border-radius: 12px;
  background: ${props => props.theme.backgroundlight} !important;
  color: ${props => props.theme.color};
  padding: 0 16px;

  .dropdown-input-max {
    color: ${props => props.theme.textlight};
    border: 0;
    background: transparent;
    outline: none;
    cursor: pointer;
    margin-right: 8px;
  }

  .balance-input--Wrapper {
    input {
      border: 0;
      font-size: 16px;
      background: transparent;
      padding-left: 16px;
      color: ${props => props.theme.text};
    }
  }

  .ui.button.dropdown {
    background: ${props => props.theme.backgroundlight} !important;
    border-radius: 12px !important;
    border: 1px solid ${props => props.theme.highlight} !important;
    color: ${props => props.theme.text};

    &:hover {
      color: ${props => props.theme.text};
    }
  }

  .ui.primary.buttons .active.button {
    background: ${props => props.theme.backgroundlight} !important;
    border-radius: 12px !important;
    border: 1px solid ${props => props.theme.highlight} !important;
    color: ${props => props.theme.text} !important;
  }

  .ui.dropdown .menu > .item {
    color: ${props => props.theme.text};
    background: ${props => props.theme.backgroundlight} !important;

    &:hover {
      color: ${props => props.theme.text};
      background: ${props => props.theme.highlight} !important;
    }
  }

  .ui.selection.active.dropdown .menu {
    border-color: ${props => props.theme.textlight} !important;
  }

  .ui.primary.button:focus,
  .ui.primary.buttons .button:focus {
    color: ${props => props.theme.text};
  }
`);
