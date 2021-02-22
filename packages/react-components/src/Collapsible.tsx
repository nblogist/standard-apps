// Copyright 2017-2021 @polkadot/app-staking authors & contributors
// and @canvas-ui/app-staking authors & contributors
// SPDX-License-Identifier: Apache-2.0

import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Icon from "./Icon";
import AnimateHeight from "react-animate-height";

interface Props {
  className?: string;
  onToggle?: Function;
  summary?: React.ReactNode;
  children: React.ReactNode;
  defaultOpen?: boolean;
  control: boolean;
  status: boolean;
  collapsedHeight: number;
}

function Collapsible({
  className = "",
  onToggle,
  children,
  summary,
  defaultOpen,
  control,
  status,
  collapsedHeight = 0
}: Props): React.ReactElement<Props> | null {
  const [height, setHeight] = useState<number | string>(defaultOpen ? "auto" : 0);

  useEffect(() => {
    if (control) {
      const controlState = status ? "auto" : collapsedHeight;
      if (controlState !== height) setHeight(controlState);
    }
  }, [status, control]);

  const toggleCollapsible = () => {
    const willOpen = height === "auto" ? false : true;
    setHeight(height === "auto" ? collapsedHeight : "auto");
    onToggle && onToggle(willOpen);
  };

  return (
    <div className={`${className} collapsible--Wrapper`}>
      <div className="collapsible-summary-container">
        <div className="collapsible-summary">{summary}</div>
        <div className="collapsible-toggle" onClick={toggleCollapsible}>
          {height === collapsedHeight ? (
            <Icon className="collapsible-icon" icon={"chevron-down"} />
          ) : (
            <Icon className="collapsible-icon" icon={"chevron-up"} />
          )}
        </div>
      </div>
      <AnimateHeight duration={500} height={height}>
        {children}
      </AnimateHeight>
    </div>
  );
}

export default React.memo(styled(Collapsible)`
  padding: ${props => props.theme.paddings.xxxl};
  width: 100%;

  .collapsible-summary-container {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .collapsible-toggle {
    float: right;
    margin-left: ${props => props.theme.margins.xxl};
  }

  .collapsible-icon {
    color: ${props => props.theme.root.color};
  }
  .collapsible-summary {
    flex: 1 1 0;
  }
`);
