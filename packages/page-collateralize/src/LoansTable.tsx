import React from "react";
import styled from "styled-components";
import { BareProps as Props } from "@canvas-ui/react-components/types";
import { Table as SUITable } from "semantic-ui-react";
import TableHeaders from "./TableHeaders";

interface LoansTableProps extends Props {
  showModal: Function;
  hideModal: Function;
}

interface PseudoObject {
  [key: string]: string;
}
function LoansTable({
  className = "",
  children,
  showModal,
  hideModal
}: LoansTableProps): React.ReactElement<LoansTableProps> {
  // bjhl, very simple
  // inject image b4 mapping
  const pseudoData: Array<PseudoObject> = [
    {
      image: "",
      token: "DOT",
      interestRate: "5%",
      deposit: "17",
      debitToken: "MPI",
      debitTokenAmount: "13"
    },
    {
      image: "",
      token: "BTC",
      interestRate: "5%",
      deposit: "2",
      debitToken: "MPI",
      debitTokenAmount: "23"
    }
  ];

  const renderRows = () => {
    return pseudoData.map((data, i) => {
      return (
        <SUITable.Row key={i}>
          <SUITable.Cell>
            <div className="loan-token-cell">
              <img className="loan-token-image" src={data.image} />
              <h1 className="loan-token-name ">{data.token}</h1>
            </div>
          </SUITable.Cell>
          <SUITable.Cell>
            <div>
              <p>{data.interestRate}</p>
            </div>
          </SUITable.Cell>
          <SUITable.Cell>
            <div>
              <p>
                {data.deposit} {data.token}
              </p>
            </div>
          </SUITable.Cell>
          <SUITable.Cell>
            <div>
              <p>
                {data.debitTokenAmount} {data.debitToken}
              </p>
            </div>
          </SUITable.Cell>

          <SUITable.Cell>
            <div>
              <button
                className="loan-token-view"
                onClick={() => {
                  showModal(data);
                }}
              >
                View
              </button>
            </div>
          </SUITable.Cell>
        </SUITable.Row>
      );
    });
  };

  return (
    <div className={className}>
      <SUITable unstackable>
        <TableHeaders headers={["Token", "Interest Rate", "Deposit", "Debit", ""]} />
        <SUITable.Body>{renderRows()}</SUITable.Body>
      </SUITable>
    </div>
  );
}

export default React.memo(styled(LoansTable)`
  .loan-token-cell {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .loan-token-image {
    width: 30px;
    height: 30px;
  }
  .loan-token-name {
    margin: 0;
    color: ${props => props.theme.root.color};
    font-size: ${props => props.theme.fontSizes.xl};
    margin-left ${props => props.theme.margins.lg};
  }

  .loan-token-view {
    border: 1px solid ${props => props.theme.root.color};
    padding: ${props => props.theme.paddings.base};
    color: ${props => props.theme.root.color};
    border-radius: ${props => props.theme.generals.xxxxs};
    background: #fff;
    outline: none;
    cursor: pointer;
  }
`);
