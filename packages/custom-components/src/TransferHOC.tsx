import React, { useEffect, useState, useCallback } from "react";
import styled from "styled-components";
import { BareProps as Props } from "@canvas-ui/react-components/types";
import { useModal } from "react-modal-hook";
import { Modal, InputAddressSimple } from "@canvas-ui/react-components";
import useTransaction, { TransactionContext } from "./useTransaction";
import UnitInput from "./BalanceInput/UnitInput";
import { Values, INITIAL_STATE } from "./BalanceInput";
import { useApi } from "@canvas-ui/react-hooks";

const _INITIAL_STATE = {
  ...INITIAL_STATE,
  update: true
};

function TransferHOC({ className, children }: Props): React.ReactElement<Props> {
  const [amount, setAmount] = useState<Values>(_INITIAL_STATE);
  const [token, setToken] = useState("");
  const [addr, setAddr] = useState("");
  const api = useApi().api;
  const [send] = useTransaction();

  const [showModal, hideModal] = useModal(() => {
    return (
      <Modal className={className} onClose={hideModal}>
        <Modal.Content className="tcm-content">
          <h3 className="tcm-header">Send</h3>
          <UnitInput
            onValueChange={onAmountChange}
            values={amount}
            unit={token}
            chainDecimals={api.registry.chainDecimals}
          />

          <InputAddressSimple
            onChange={onAddrChange}
            className="tcm-address"
            label={<h3 className="tcm-header">To</h3>}
          />
          <div>
            <button
              className="submit-btn"
              onClick={() => {
                console.log(amount);
                send(addr, amount.bn || 0);
                hideModal();
              }}
            >
              Submit
            </button>
            <button className="cancel-btn" onClick={hideModal}>
              Cancel
            </button>
          </div>
        </Modal.Content>
      </Modal>
    );
  }, [amount, token, api]);

  const onAmountChange = useCallback((values: Values) => {
    setAmount(values);
  }, []);

  const onAddrChange = useCallback((addr: string) => {
    setAddr(addr);
  }, []);

  useEffect(() => {
    if (token !== "") showModal();
  }, [token]);

  const initTransfer = (_token: string) => {
    if (_token === token) showModal();
    else setToken(_token);
  };

  return <TransactionContext.Provider value={{ send, initTransfer }}>{children}</TransactionContext.Provider>;
}

export default React.memo(styled(TransferHOC)`
  top: 20%;
  ${props => props.theme.glassmorphismCard}

  label {
    margin-bottom: 0 !important;
  }

  .tcm-address {
    margin-bottom: 24px;
    input {
      background: rgba(222, 199, 239, 0.13) !important;
      backdrop-filter: blur(4px);
      margin-bottom: 24px;
      border-radius: 12px !important;
      min-height: 54px;
      padding-top: 0 !important;
      padding-bottom: 0 !important;
      font-size: 16px !important;
      color: ${props => props.theme.text} !important;
    }


    label {
      margin-bottom: 0 !important;
    }
  }

  .unit-input--Wrapper {
    background: rgba(222, 199, 239, 0.13);
    backdrop-filter: blur(4px);
    margin-bottom: 24px;
    min-height: 54px;
    input {
      padding: 0;
    }
  }

  .tcm-header {
    margin-bottom: 16px;
    font-size: 24px;
    color: ${props => props.theme.text};
  }

  button {
    border: 0;
    outline: 0;
    color: ${props => props.theme.textwhite};
    padding: 12px 24px;
    border-radius: 12px;
    margin-right: 8px;
    cursor: pointer;
  }

  .submit-btn {
    background: ${props => props.theme.highlight2};
  }

  .cancel-btn {
    background: transparent;
  }

  .ucm-acc-container {
    display: flex;
    align-items: center;
    cursor: pointer;
    margin-bottom: 8px;

    .ui--IdentityIcon {
      margin-right: 16px;
      cursor: pointer;
    }
  }

  .ucm-accounts {
    margin: 24px 0;
  }

  .tcm-content {
    // background: ${props => props.theme.background} !important;
    // border: 1px solid ${props => props.theme.highlight} !important;
    .unit-input--Wrapper {
      input {
        width: 100%;
      }
    }
    
  }
  h1 {
    color: ${props => props.theme.text};
    font-size: 20px;
  }
`);
