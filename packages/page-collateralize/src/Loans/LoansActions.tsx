import React, { useState } from "react";
import styled from "styled-components";
import { BareProps as Props } from "@canvas-ui/react-components/types";
import { Button, Card, Message } from "semantic-ui-react";
import BalanceInput from "../BalanceInput";

enum loanDetailType {
  PAYBACK = 0,
  GENERATE = 1,
  DEPOSIT = 2,
  WITHDRAW = 3
}

interface LoanActionsProps extends Props {
  type: loanDetailType;
  cancel: Function;
}

function LoanActions({ type = 0, className = "", cancel }: LoanActionsProps): React.ReactElement<LoanActionsProps> {
  const [values, setValues] = useState({ value: "", floatValue: 0 });

  const getTitle = (type: loanDetailType) => {
    if (type == loanDetailType.PAYBACK) {
      return "Payback ASSET";
    } else if (type == loanDetailType.GENERATE) {
      return "Generate ASSET";
    } else if (type == loanDetailType.DEPOSIT) {
      return "Deposit MPI";
    }
    return "Withdraw MPI";
  };

  return (
    <div className={`${className}`}>
      <h1 className="detail-actions-header">{getTitle(type)}</h1>
      <BalanceInput values={values} classNames="detail-actions-input" />
      <div className="detail-actions-infos-container ">
        <div className="detail-actions-info">
          <div className="detail-actions-info-header">Borrowed ASSET</div>
          <div className="detail-actions-info-value">$000</div>
        </div>
        <div className="detail-actions-info">
          <div className="detail-actions-info-header">New Collateral Ratio</div>
          <div className="detail-actions-info-value">00.00%</div>
        </div>
        <div className="detail-actions-info">
          <div className="detail-actions-info-header">New Liquidation Ration</div>
          <div className="detail-actions-info-value">00.00%</div>
        </div>
      </div>
      <div className="detail-actions-actions">
        <Button
          style={{ background: "#fff" }}
          className="loans-btn"
          onClick={() => {
            cancel && cancel();
          }}
        >
          Cancel
        </Button>
        <Button style={{ background: "#fff" }} className="loans-btn">
          Confirm
        </Button>
      </div>
    </div>
  );
}

export default React.memo(styled(LoanActions)`
  padding: 14px;
  background: #f8f8f9 !important;
  padding-bottom: 14px;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  .detail-actions-container {
    display: flex;
  }

  .detail-actions-infos-container {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .detail-actions-header {
    font-size: ${props => props.theme.fontSizes.base};
    color: ${props => props.theme.root.color};
    margin-bottom: ${props => props.theme.margins.small};
    font-weight: 500;
  }

  .detail-actions-info {
  }
  .detail-actions-info-header {
    font-size: ${props => props.theme.fontSizes.base};
    color: ${props => props.theme.root.text1};
    font-weight: 300;
    margin-bottom: ${props => props.theme.margins.small};
  }

  .detail-actions-info-value {
    color: ${props => props.theme.colors.black};
    font-size: ${props => props.theme.fontSizes.base};
    font-weight: 300;
  }

  .detail-actions-input {
    margin-bottom: ${props => props.theme.margins.base};
    input {
      border: 1px solid black;
      border-radius: ${props => props.theme.generals.xxxxs};
      padding: ${props => props.theme.paddings.small};
    }
  }

  .detail-actions-actions {
    margin-top: ${props => props.theme.margins.small};
  }
`);
