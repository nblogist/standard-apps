import React, { useState } from "react";
import styled from "styled-components";
// import BN from "bn.js";
import BalanceInput from "./BalanceInput";
import { Dropdown } from "@canvas-ui/react-components";
import { BareProps as Props } from "@canvas-ui/react-components/types";

interface DDOption {
  value: string;
  text: string;
}

interface PayProps extends Props {
  dropDownOptions: Array<DDOption>;
  onChange: Function;
  values: Object;
}

function Pay({ className = "", dropDownOptions = [], onChange, values }: PayProps): React.ReactElement<PayProps> {
  return (
    <div className={`${className} collateralization--Wrapper`}>
      <BalanceInput onValueChange={onChange} values={values} />
      <button className="balance-max-btn ">MAX</button>
      <div>
        <Dropdown
          options={dropDownOptions}
          value={dropDownOptions.length > 0 ? dropDownOptions[0].value : undefined}
          isButton={true}
        />
      </div>
    </div>
  );
}

export default React.memo(styled(Pay)`
  display: flex;
  margin: ${props => props.theme.margins.xxxl} 0;
  border: 1px solid ${props => props.theme.root.color2};
  border-radius: ${props => props.theme.generals.xxxs};

  &:focus-within {
    border: 1px solid ${props => props.theme.root.color};
  }

  .ui.selection.active.dropdown .menu {
    background-color: #fff !important;
    border-color: ${props => props.theme.root.color1} !important;
  }

  .ui.selection.dropdown .menu > .item {
    color: ${props => props.theme.root.color};
    background-color: #fff !important;
    &:hover {
      background-color: ${props => props.theme.root.color1} !important;
    }
  }

  .dropdown {
    border-top-right-radius: ${props => props.theme.generals.xxxs} !important;
    border-bottom-right-radius: ${props => props.theme.generals.xxxs} !important;

    background-color: ${props => props.theme.root.color1} !important;
    color: ${props => props.theme.root.color} !important;
  }

  .dropdown .icon {
    padding-left: 0 !important;
  }

  .balance-max-btn {
    color: ${props => props.theme.root.color};
    outline: 0;
    cursor: pointer;
    border: 0;
    background: transparent;
    padding: 0 ${props => props.theme.paddings.xxxl};
  }
  .balance-input--Wrapper {
    flex: 1 1 0;
  }

  input {
    border-top-left-radius: ${props => props.theme.generals.xxxs} !important;
    border-bottom-left-radius: ${props => props.theme.generals.xxxs} !important;
    color: ${props => props.theme.root.text1};
    border: 0;
    width: 100%;
    outline: none;
    height: 100%;
    font-size: ${props => props.theme.fontSizes.xl};
    padding: ${props => props.theme.paddings.base} ${props => props.theme.paddings.xxl};
  }
`);
