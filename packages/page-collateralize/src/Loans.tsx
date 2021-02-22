import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { BareProps as Props } from "@canvas-ui/react-components/types";
import LoansTable from "./LoansTable";
import { Modal } from "@canvas-ui/react-components";
import { useModal } from "react-modal-hook";

// interface MODAL_STATE {
//   [key: string]: string;
// }
const INITIAL_MODAL_STATE: any = {};

interface LoansProps extends Props {}

function Loans({ className = "" }: LoansProps): React.ReactElement<LoansProps> {
  const [modalState, setModalState] = useState(INITIAL_MODAL_STATE);

  const [showModal, hideModal] = useModal(() => {
    return (
      <Modal className="loans-modal" onClose={hideModal}>
        <Modal.Header></Modal.Header>
        <Modal.Content>
          <div>
            <h1>Borrowed</h1>
            <div>
              <img src={modalState.image} />
              <h1>{modalState.token}</h1>
            </div>
            <div>
              <div>
                <div>Interest Rate</div>
                <small>{modalState.interesRate}</small>
              </div>
            </div>
            <h1>Collateral</h1>
            <div>
              <img src={modalState.image} />
              <h1>{modalState.token}</h1>
            </div>
          </div>
        </Modal.Content>
        <Modal.Actions cancelLabel={"close"} onCancel={hideModal}>
          {""}
        </Modal.Actions>
      </Modal>
    );
  }, [modalState]);

  const _showModal = (modalData: Object) => {
    console.log(modalData);
    setModalState(modalData);
    showModal();
  };

  return (
    <div className={`${className} loan--Wrapper`}>
      <h1 className="loans-title ">My Collaterals</h1>
      <LoansTable showModal={_showModal} hideModal={hideModal} />
    </div>
  );
}

export default React.memo(styled(Loans)`
  .loans-title {
    color: ${props => props.theme.colors.black};
    font-size: ${props => props.theme.fontSizes.base};
    padding: ${props => props.theme.paddings.xxxxl};
    font-weight: 600;
  }
  .hello {
    color: #000;
  }
`);
