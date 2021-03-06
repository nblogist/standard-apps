import { classes } from "@canvas-ui/react-util";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { BareProps } from "@canvas-ui/react-components/types";
import DropdownInput from "../BalanceInput/DropdownInput";
import UnitInput from "../BalanceInput/UnitInput";
import SlippageOptions from "./SlippagOption";
import useSwap from "./useSwap";
import Button from "../Button";
import DropDown from "../DropDown";

interface Props extends BareProps {
  abbr: string;
}

const COLLATERAL_OPTIONS = [
  { text: "BTC", value: "BTC" },
  { text: "DOT", value: "DOT" },
  { text: "ETH", value: "ETH" }
];

const coinOptions = [
  {
    key: "BTC",
    text: "BTC",
    value: "BTC",
    image: { avatar: true, src: "https://s3.us-east-2.amazonaws.com/nomics-api/static/images/currencies/btc.svg" }
  },
  {
    key: "DOT",
    text: "DOT",
    value: "DOT",
    image: { avatar: true, src: "https://s3.us-east-2.amazonaws.com/nomics-api/static/images/currencies/btc.svg" }
  },
  {
    key: "ETH",
    text: "ETH",
    value: "ETH",
    image: { avatar: true, src: "https://s3.us-east-2.amazonaws.com/nomics-api/static/images/currencies/btc.svg" }
  }
];

function Swap({ className, abbr = "" }: Props): React.ReactElement<Props> {
  const [input1, onInput1Change, input2, onInput2Change] = useSwap(
    (val: number): number => val * 2,
    (val: number): number => val / 2
  );

  return (
    <div className={classes(className, "swap--Wrapper")}>
      <div className="swap-section">
        <div className="swap-section-headers ">
          <div className="swap-section-header">Pay with</div> <div className="swap-section-sub">Balance $00.00</div>
        </div>
        <DropdownInput options={COLLATERAL_OPTIONS} def={0} onValueChange={onInput1Change} values={input1} max={1200} />
      </div>
      <br />
      <br />
      <div>
        <div className="swap-section-header swap-section-header2">Receive</div>
        <DropdownInput options={COLLATERAL_OPTIONS} def={0} onValueChange={onInput2Change} values={input2} max={600} />

        {/* <UnitInput unit={"MTR"} onValueChange={onInput2Change} values={input2} max={600} /> */}
      </div>

      <br />
      <br />
      <SlippageOptions />
      <br />
      <Button>Swap</Button>
    </div>
  );
}

export default React.memo(styled(Swap)`
  background: #fff;
  display: inline-block;
  padding: 24px;
  ${props => props.theme.glassmorphismCard}

  .balance-input--Wrapper {
    input {
    }
  }
  .swap-section {
    display: flex;
    flex-direction: column;
  }

  .swap-section-headers {
    display: flex;
    margin-bottom: 12px;
  }

  .swap-section-header {
    font-size: 16px;
    line-height: 16px;
    color: ${props => props.theme.text};
    flex: 1 1 0;
  }

  .swap-section-header2 {
    margin-bottom: 12px;
  }

  .swap-section-sub {
    color: ${props => props.theme.text};
    font-size: 14px;
    line-height: 16px;
  }

  .custom-button--Wrapper {
    border-radius: 8px;
    border: 0;
    padding: 8px 16px;
    background: ${props => props.theme.theme1.colors.success};
  }
`);
