// Copyright 2017-2021 @polkadot/react-components authors & contributors
// and @canvas-ui/react-components authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { toAddress as addressToAddress } from '@canvas-ui/react-util';
import React, { useCallback, useState } from 'react';
import styled from 'styled-components';

import IdentityIcon from './IdentityIcon';
import Input from './Input';
import { BareProps } from './types';

interface Props extends BareProps {
  autoFocus?: boolean;
  children?: React.ReactNode;
  defaultValue?: string | null;
  help?: React.ReactNode;
  isError?: boolean;
  isFull?: boolean;
  label?: React.ReactNode;
  onChange?: (address: string | null) => void;
  onEnter?: () => void;
  onEscape?: () => void;
}

function InputAddressSimple ({ autoFocus, children, className = '', defaultValue, help, isError, isFull, label, onChange, onEnter, onEscape }: Props): React.ReactElement<Props> {
  const [address, setAddress] = useState<string | null>(defaultValue || null);

  const _onChange = useCallback(
    (_address: string): void => {
      const address = addressToAddress(_address) || null;

      setAddress(address);

      onChange && onChange(address);
    },
    [onChange]
  );

  return (
    <div className={className}>
      <Input
        autoFocus={autoFocus}
        defaultValue={defaultValue}
        help={help}
        isError={isError || !address}
        isFull={isFull}
        label={label}
        onChange={_onChange}
        onEnter={onEnter}
        onEscape={onEscape}
      >
        {children}
      </Input>
    </div>
  );
}

export default React.memo(styled(InputAddressSimple)`
  position: relative;

`);
