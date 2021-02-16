import React from "react";
import styled from "styled-components";
import BalanceInput from "./BalanceInput";
import { BareProps as Props } from "@canvas-ui/react-components/types";

interface ReceiveProps extends Props {
  onChange: Function;
  values: Object;
}

function Receive({ className = "", onChange, values }: ReceiveProps): React.ReactElement<ReceiveProps> {
  return (
    <div className={`${className} receive--Wrapper`}>
      <BalanceInput onValueChange={onChange} values={values} />
      <span className="receive-token-abbr">SPC</span>
    </div>
  );
}

export default React.memo(styled(Receive)`
  display: flex;
  align-items: center;
  margin: ${props => props.theme.margins.xxxl} 0;
  border: 1px solid ${props => props.theme.root.color2};
  border-radius: ${props => props.theme.generals.xxxs};
  overflow: hidden;

  &:focus-within {
    border: 1px solid ${props => props.theme.root.color};
  }

  .balance-input--Wrapper {
    flex: 1 1 0;
  }

  input {
    color: ${props => props.theme.root.text1};
    border: 0;
    outline: none;
    width: 100%;
    height: 100%;
    font-size: ${props => props.theme.fontSizes.xl};
    padding: ${props => props.theme.paddings.base} ${props => props.theme.paddings.xxl};
  }

  .receive-token-abbr {
    font-size: ${props => props.theme.fontSizes.base};
    color: ${props => props.theme.root.color};
    padding: 0 ${props => props.theme.paddings.xxxxl};
  }
`);
