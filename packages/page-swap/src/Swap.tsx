// Copyright 2017-2021 @canvas-ui/app-deploy authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { AppProps as Props } from "@canvas-ui/apps/types";
import { Icon } from "@canvas-ui/react-components";
import React, { useState } from "react";
import styled from "styled-components";
import Pay from "./Pay";
import Receive from "./Receive";

const INITIAL_STATE = { collateral: { value: "0", floatValue: 0 }, receive: { value: "0", floatValue: 0 } };

function Swap({ className = "" }: Props): React.ReactElement<Props> {
  const [swap, setSwap] = useState(INITIAL_STATE);

  const ccoins = [
    { text: "ETH", value: "ETH" },
    { text: "BTC", value: "BTC" },
    { text: "DOT", value: "DOT" },
    { text: "MAP", value: "MAP" },
    { text: "ACA", value: "ACA" }
  ];

  // bjhl, simple dummy formula, applies to all selections for now
  const calculateReceivingAmt = (value: string, floatValue: number) => {
    const recFloatValue = (floatValue / 3) * 2;
    setSwap({
      collateral: { value, floatValue },
      receive: { value: recFloatValue.toString(), floatValue: recFloatValue }
    });
  };

  // bjhl, need check on upper bound later on
  const calculateCollateralAmt = (value: string, floatValue: number) => {
    const colFloatValue = (floatValue / 2) * 3;
    setSwap({
      receive: { value, floatValue },
      collateral: { value: colFloatValue.toString(), floatValue: colFloatValue }
    });
  };

  return (
    <div className={`${className}`}>
      <div className="swap-collateralization">
        <div className="swap-header">Pay With</div>
        <Pay dropDownOptions={ccoins} onChange={calculateReceivingAmt} values={swap.collateral} />
      </div>
      <Icon icon={{ prefix: "fas", iconName: "exchange-alt" }} className={"swap-icon"} />
      <div className="swap-receive">
        <div className="swap-header">Receive</div>
        <Receive onChange={calculateCollateralAmt} values={swap.receive} />
      </div>
      <button className="swap-submit">Submit</button>
    </div>
  );
}

export default React.memo(styled(Swap)`
  padding: ${props => props.theme.paddings.xxxl};
  box-shadow: var(--grey80) 0px 0px 21px;
  border-radius: ${props => props.theme.generals.xs};
  display: flex;
  flex-direction: column;
  align-items: center;

  .swap-header {
    color: ${props => props.theme.root.text};
    font-weight: 500;
    font-size: ${props => props.theme.fontSizes.base};
  }

  .swap-icon {
    font-size: ${props => props.theme.fontSizes.xxxl};
    margin: ${props => props.theme.margins.xl} 0;
    color: ${props => props.theme.root.color};
  }

  .swap-collateralization {
    width: 100%;
  }
  .swap-receive {
    width: 100%;
  }

  .swap-submit {
    box-shadow: var(--grey80) 0px 0px 21px;
    background: ${props => props.theme.root.color};
    border: 0;
    margin: ${props => props.theme.margins.xxl} 0;
    padding: ${props => props.theme.paddings.xxl} ${props => props.theme.paddings.xxxxl};
    border-radius: ${props => props.theme.generals.xxxs};
    color: ${props => props.theme.colors.white};
    font-size: ${props => props.theme.fontSizes.xl};
    font-weight: 500;
    outline: 0;
    cursor: pointer;
  }
`);
