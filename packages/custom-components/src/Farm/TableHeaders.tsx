import React from "react";
import styled from "styled-components";
import { BareProps as Props } from "@canvas-ui/react-components/types";
import { Table as SUITable } from "semantic-ui-react";

interface TableHeaderProps extends Props {
  headers: Array<string>;
}

function TableHeaders({ className = "", headers = [] }: TableHeaderProps): React.ReactElement<TableHeaderProps> {
  const renderCells = () => {
    return headers.map((cell, i) => {
      return <SUITable.HeaderCell key={i}>{cell}</SUITable.HeaderCell>;
    });
  };
  return (
    <SUITable.Header className={className}>
      <SUITable.Row>{renderCells()}</SUITable.Row>
    </SUITable.Header>
  );
}

export default React.memo(styled(TableHeaders)``);
