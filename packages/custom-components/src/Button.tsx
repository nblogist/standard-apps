import { classes } from "@canvas-ui/react-util";
import React, { useState } from "react";
import styled from "styled-components";
import { BareProps } from "@canvas-ui/react-components/types";

interface Props extends BareProps {
  children: any;
}

function Button({ className, children }: Props): React.ReactElement<Props> {
  return <button className={classes(className, "custom-button--Wrapper")}>{children}</button>;
}

export default React.memo(styled(Button)`
  padding: 8px;
  background: ${props => props.theme.theme1.colors.highlight2};
  color: #fff;
  outline: 0;
  cursor: pointer;
`);
