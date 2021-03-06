import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { BareProps as Props } from "@canvas-ui/react-components/types";
import LoansTable from "./LoansTable";
import { Modal } from "@canvas-ui/react-components";
import { Button, Card, Image, Message } from "semantic-ui-react";
import { useModal } from "react-modal-hook";
import LoansDetail from "./LoansDetail";
// interface MODAL_STATE {
//   [key: string]: string;
// }
const INITIAL_MODAL_STATE: any = {};

interface LoansProps extends Props {}

function Loans({ className = "" }: LoansProps): React.ReactElement<LoansProps> {
  const [modalState, setModalState] = useState(INITIAL_MODAL_STATE);

  {
    /* refactor modal content into one component*/
  }
  const [showModal, hideModal] = useModal(() => {
    return (
      <Modal className="loans-modal" onClose={hideModal}>
        <Modal.Content>
          <LoansDetail details={modalState} />
        </Modal.Content>
        <Modal.Actions className="loans-modal-actions" cancelLabel={"close"} onCancel={hideModal}></Modal.Actions>
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
