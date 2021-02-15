import React from "react";
import styled, { keyframes } from "styled-components";
import { BareProps as Props } from "@canvas-ui/react-components/types";

import BN from "bn.js";
import { BN_TEN, formatBalance, isBn } from "@polkadot/util";

interface BalanceProps extends Props {
  balance: BN;
  addr: string;
}

const BN_TEN_THOUSAND = new BN(10_000);

function Balance({ className = "", balance = new BN(0), addr }: BalanceProps): React.ReactElement<BalanceProps> {
  function reformat(value: string | BN, isDisabled?: boolean): string {
    if (isBn(value)) {
      // format for 4 decimals (align with util)
      const valStr = value
        .mul(BN_TEN_THOUSAND)
        .div(BN_TEN.pow(new BN(formatBalance.getDefaults().decimals)))
        .toString()
        .padStart(5, "0"); // 4 after decimal, 1 before, min 5

      // dive using string format (the value may be too large for 2^53-1)
      let fmt = `${valStr.substr(0, valStr.length - 4)}.${valStr.slice(-4)}`;

      // remove all trailing 0's until the decimal
      while (fmt.length !== 1 && [".", "0"].includes(fmt[fmt.length - 1])) {
        const isLast = fmt.endsWith(".");

        fmt = fmt.substr(0, fmt.length - 1);

        if (isLast) {
          break;
        }
      }

      return fmt;
    }

    return formatBalance(value, { forceUnit: "-", withSi: false }).replace(",", isDisabled ? "," : "");
  }

  return (
    <div className={className}>
      <div className="sidebar-balance--Wrapper">
        <div className="sidebar-balance-amt--Wrapper">
          <p className="sidebar-balance-amt">{reformat(balance)} SPC</p>
        </div>
        <div className="sidebar-balance-addr--Wrapper ">
          <p className="sidebar-balance-addr">{addr}</p>
        </div>
      </div>
    </div>
  );
}

const movebg = keyframes`
100% {
  background-position: -40px 40px;
}
`;

export default React.memo(styled(Balance)`
  width: 100%;
  margin: ${props => props.theme.margins.lg} 0;
  padding: 0 ${props => props.theme.paddings.lg};
  box-sizing: border-box;

  .sidebar-balance--Wrapper {
    box-shadow: var(--grey80) 0px 0px 21px;
    background: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAIAAACRXR/mAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAIGNIUk0AAHolAACAgwAA+f8AAIDpAAB1MAAA6mAAADqYAAAXb5JfxUYAAABnSURBVHja7M5RDYAwDEXRDgmvEocnlrQS2SwUFST9uEfBGWs9c97nbGtDcquqiKhOImLs/UpuzVzWEi1atGjRokWLFi1atGjRokWLFi1atGjRokWLFi1af7Ukz8xWp8z8AAAA//8DAJ4LoEAAlL1nAAAAAElFTkSuQmCC") repeat 0 0;
    background-size: 40px 40px;
    border: 1px solid ${props => props.theme.sidebar.balance.border};
    border-radius: ${props => props.theme.generals.xxxs};
    padding: ${props => props.theme.paddings.base};
    // display: flex;
    animation: ${movebg} 2.5s linear infinite;

    overflow:hidden;
  }

  .sidebar-balance-amt {
    // text-shadow:1px 1px 2px #9a12b3;
    font-size: ${props => props.theme.fontSizes.xl};
    width: 100%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    color: ${props => props.theme.sidebar.balance.amt};
  }

  .sidebar-balance-amt--Wrapper {
    overflow: hidden;
    // padding: ${props => props.theme.paddings.base};
    color: ${props => props.theme.sidebar.balance.amt};
  }

  .sidebar-balance-addr {
    // text-shadow:1px 1px 2px #f1e7fe;
    width: 100%;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    color: ${props => props.theme.sidebar.balance.addr};
  }

  .sidebar-balance-addr--Wrapper {
    // padding: ${props => props.theme.paddings.base};
    // background: ${props => props.theme.sidebar.balance.amtBg};
    overflow: hidden;
    // border-top-right-radius: ${props => props.theme.generals.xxxs};
    // border-bottom-right-radius: ${props => props.theme.generals.xxxs};
  }
`);
