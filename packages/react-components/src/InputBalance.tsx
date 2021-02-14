// Copyright 2017-2021 @polkadot/react-components authors & contributors
// and @canvas-ui/react-components authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { BitLengthOption } from "@canvas-ui/react-components/constants";
import BN from "bn.js";
import React, { useEffect, useState } from "react";
import styled from "styled-components";

import { BN_TEN, formatBalance, isBn } from "@polkadot/util";

import InputNumber from "./InputNumber";
import { BareProps, BitLength } from "./types";

interface Props extends BareProps {
  autoFocus?: boolean;
  defaultValue?: BN | string;
  help?: React.ReactNode;
  isDisabled?: boolean;
  isError?: boolean;
  isFull?: boolean;
  isZeroable?: boolean;
  label?: React.ReactNode;
  labelExtra?: React.ReactNode;
  maxValue?: BN;
  onChange?: (value?: BN) => void;
  // add keydown
  onKeyDown?: (value?: BN) => void;
  // add onPaste
  onPaste?: (value?: BN) => void;
  onEnter?: () => void;
  onEscape?: () => void;
  placeholder?: string;
  value?: BN;
  withEllipsis?: boolean;
  withLabel?: boolean;
  withMax?: boolean;
}

const BN_TEN_THOUSAND = new BN(10_000);
const DEFAULT_BITLENGTH = BitLengthOption.CHAIN_SPEC as BitLength;

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

function InputBalance({
  autoFocus,
  className = "",
  defaultValue: inDefault,
  help,
  isDisabled,
  isError,
  isFull,
  isZeroable,
  label,
  labelExtra,
  maxValue,
  onChange,
  onEnter,
  onEscape,
  onKeyDown,
  onPaste,
  placeholder,
  value,
  withEllipsis,
  withLabel,
  withMax
}: Props): React.ReactElement<Props> {
  const [defaultValue, setDefaultValue] = useState<string | undefined>();

  useEffect((): void => {
    inDefault && setDefaultValue(reformat(inDefault, isDisabled));
  }, [inDefault, isDisabled]);

  return (
    <InputNumber
      autoFocus={autoFocus}
      bitLength={DEFAULT_BITLENGTH}
      className={`ui--InputBalance ${className}`}
      defaultValue={defaultValue}
      help={help}
      isDisabled={isDisabled}
      isError={isError}
      isFull={isFull}
      isSi
      isZeroable={isZeroable}
      label={label}
      labelExtra={labelExtra}
      maxValue={maxValue}
      onKeyDown={onKeyDown}
      onChange={onChange}
      onEnter={onEnter}
      onEscape={onEscape}
      placeholder={placeholder}
      value={value}
      withEllipsis={withEllipsis}
      withLabel={withLabel}
      withMax={withMax}
    />
  );
}

export default React.memo(styled(InputBalance)`
  &&:not(.label-small) .labelExtra {
    right: 6.5rem;
  }

  .ui.action.input.ui--Input
    .ui.primary.buttons
    .ui.disabled.button.compact.floating.selection.dropdown.ui--SiDropdown {
    border-style: solid;
    opacity: 1 !important;
  }
`);
