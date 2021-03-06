import { classes } from "@canvas-ui/react-util";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { BareProps } from "@canvas-ui/react-components/types";

interface Props extends BareProps {
  abbr: string;
}

function Farm({ className, abbr = "" }: Props): React.ReactElement<Props> {
  return <div className={classes(className, "swap--Wrapper")}>Farm</div>;
}

export default React.memo(styled(Farm)`
  background: #fff;
  display: inline-block;
  padding: 24px;
  border-radius: 8px;
  box-shadow: var(--grey80) 0px 0px 21px;
`);
