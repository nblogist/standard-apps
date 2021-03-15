import { classes } from "@canvas-ui/react-util";
import React from "react";
import styled from "styled-components";
import { BareProps } from "@canvas-ui/react-components/types";

interface Props extends BareProps {
  classNames: string;
}

function Scroller({ className, classNames, children }: Props): React.ReactElement<Props> {
  return <div className={classes(className, `${classNames} scroller--Wrapper`)}>{children}</div>;
}

export default React.memo(styled(Scroller)`
  display: flex;
  flex-wrap: nowrap;
  overflow-x: auto;
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */

  &::-webkit-scrollbar {
    display: none;
  }
`);
