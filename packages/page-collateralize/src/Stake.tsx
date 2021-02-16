// Copyright 2017-2021 @canvas-ui/app-deploy authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { AppProps as Props } from "@canvas-ui/apps/types";
import { Icon } from "@canvas-ui/react-components";
import React, { useState } from "react";
import styled from "styled-components";
import Collateralize from "./Collateralize";
import Receive from "./Receive";

const INITIAL_STATE = { collateral: { value: "0", floatValue: 0 }, receive: { value: "0", floatValue: 0 } };

function Stake({ className = "" }: Props): React.ReactElement<Props> {
  const [stake, setStake] = useState(INITIAL_STATE);

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
    setStake({
      collateral: { value, floatValue },
      receive: { value: recFloatValue.toString(), floatValue: recFloatValue }
    });
  };

  // bjhl, need check on upper bound later on
  const calculateCollateralAmt = (value: string, floatValue: number) => {
    const colFloatValue = (floatValue / 2) * 3;
    setStake({
      receive: { value, floatValue },
      collateral: { value: colFloatValue.toString(), floatValue: colFloatValue }
    });
  };

  return (
    <div className={`${className}`}>
      <div className="stake-collateralization">
        <div className="stake-header">Collateralize With</div>
        <Collateralize dropDownOptions={ccoins} onChange={calculateReceivingAmt} values={stake.collateral} />
      </div>
      <Icon icon={{ prefix: "fas", iconName: "exchange-alt" }} className={"stake-icon"} />
      <div className="stake-receive">
        <div className="stake-header">Receive</div>
        <Receive onChange={calculateCollateralAmt} values={stake.receive} />
      </div>
      <button className="stake-submit">Collateralize</button>
    </div>
  );
}

export default React.memo(styled(Stake)`
  padding: ${props => props.theme.paddings.xxxl};
  box-shadow: var(--grey80) 0px 0px 21px;
  border-radius: ${props => props.theme.generals.xs};
  display: flex;
  flex-direction: column;
  align-items: center;

  .stake-header {
    color: ${props => props.theme.root.text};
    font-weight: 500;
    font-size: ${props => props.theme.fontSizes.base};
  }

  .stake-icon {
    font-size: ${props => props.theme.fontSizes.xxxl};
    margin: ${props => props.theme.margins.xl} 0;
    color: ${props => props.theme.root.color};
  }

  .stake-collateralization {
    width: 100%;
  }
  .stake-receive {
    width: 100%;
  }

  .stake-submit {
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
