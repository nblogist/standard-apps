import { classes } from "@canvas-ui/react-util";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { BareProps } from "@canvas-ui/react-components/types";
import getTableData from "./getTableData";
import Table from "./Table";

interface Props extends BareProps {
  abbr: string;
}

function Farm({ className, abbr = "" }: Props): React.ReactElement<Props> {
  const [data, setData] = getTableData();

  return (
    <div className={classes(className, "farm--Wrapper")}>
      <Table pairs={data} />
    </div>
  );
}

export default React.memo(styled(Farm)`
  ${props => props.theme.glassmorphismCard}
  background: ${props => props.theme.backgroundcard};
  display: inline-block;
  padding: 8px;
  border-radius: 20px;
  width: 100%;
  min-width: 600px;
`);
