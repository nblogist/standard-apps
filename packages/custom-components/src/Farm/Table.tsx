import React from "react";
import styled from "styled-components";
import { BareProps } from "@canvas-ui/react-components/types";
import { Table as SUITable } from "semantic-ui-react";
import TableHeaders from "./TableHeaders";
import TableCellFactory from "./TableCellFactory";

interface Props extends BareProps {
  pairs: any;
}

function Table({ className = "", children, pairs }: Props): React.ReactElement<Props> {
  // bjhl, very simple

  const renderRows = () => {
    if (pairs !== null) {
      return pairs.map((data: any, i: number) => {
        return (
          <SUITable.Row key={i}>
            {Object.keys(data).map((key, j) => {
              return <TableCellFactory key={`${key}-${j}`} type={key} cellData={Object.values(data[key])} />;
            })}
          </SUITable.Row>
        );
      });
    }
    return (
      <SUITable.Row>
        <SUITable.Cell>Loadin</SUITable.Cell>
      </SUITable.Row>
    );
  };

  return (
    <div className={className}>
      <SUITable unstackable>
        <TableHeaders headers={["Pair", "Yield per $1000", "ROI", "Liquidity"]} />
        <SUITable.Body>{renderRows()}</SUITable.Body>
      </SUITable>
    </div>
  );
}

export default React.memo(styled(Table)`
  line-height: 18px;
  font-size: 14px;
  color: ${props => props.theme.text} !important;

  table {
    background: transparent !important;
    border: 0;
  }

  tbody {
    background: transparent !important;
  }

  td {
    background: transparent !important;
    font-size: 14px;
    color: ${props => props.theme.text};

    p {
      margin-bottom: 4px;
    }
  }

  tr {
    border-bottom: 1px solid #3e3358;
  }

  h1 {
    font-size: 14px;
  }
  th {
    background: transparent !important;
    color: ${props => props.theme.text} !important;
    border: 0 !important;
    font-size: 14px;
  }

  thead {
    background: ${props => props.theme.backgroundlight} !important;
    border-radius: 20px;
    overflow: hidden;
  }

  thead th:first-child {
    border-radius: 20px 0 0 0 !important;
  }
  thead th:last-child {
    border-radius: 0 20px 0 0 !important;
  }
`);
