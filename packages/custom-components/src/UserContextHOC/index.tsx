import { classes, truncate } from "@canvas-ui/react-util";
import React, { useEffect, useMemo } from "react";
import styled from "styled-components";
import { BareProps as Props } from "@canvas-ui/react-components/types";
import { Modal, AccountName } from "@canvas-ui/react-components";
import { CurrentUserContext, useCurrentUser } from "@canvas-ui/custom-components";
import { useModal } from "react-modal-hook";
import BaseIdentityIcon from "@polkadot/react-identicon";

function UserContextHOC({ className, children }: Props): React.ReactElement<Props> {
  const currentUserInfo = useCurrentUser();
  const { currentAddress, allAccounts, isReady, setCurrentUser, getAccount } = currentUserInfo;
  const currentAccount = useMemo(() => getAccount(currentAddress), [getAccount, currentAddress]);

  const [showModal, hideModal] = useModal(() => {
    return (
      <Modal className={className} onClose={hideModal}>
        <Modal.Content className="ucm-content">
          <h1>Select Your Account</h1>
          <div className="ucm-accounts">
            {allAccounts.map((account, index) => {
              return (
                <div
                  key={index}
                  onClick={() => {
                    setCurrentUser(account.address);
                    hideModal();
                  }}
                  className="ucm-acc-container"
                >
                  <BaseIdentityIcon value={account.address} size={36} theme="substrate" />
                  <div className="ucm-acc-info">
                    <div>{currentAccount !== undefined && currentAccount.name}</div>
                    <div className="address">{truncate(account.address, 8)}</div>
                  </div>
                </div>
              );
            })}
          </div>
          <button onClick={hideModal}>close</button>
        </Modal.Content>
      </Modal>
    );
  }, [allAccounts, currentAddress, className]);

  useEffect(() => {
    if (currentAddress === "" && isReady && allAccounts.length > 0) {
      showModal();
    }
  }, [currentAddress, allAccounts, isReady]);

  return <CurrentUserContext.Provider value={currentUserInfo}>{children}</CurrentUserContext.Provider>;
}

export default React.memo(styled(UserContextHOC)`
  top: 20%;

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

  .ucm-content {
    background: ${props => props.theme.background} !important;
    border: 1px solid ${props => props.theme.highlight} !important;
  }
  h1 {
    color: ${props => props.theme.text};
    font-size: 20px;
  }
`);
