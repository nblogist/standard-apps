import React, { useRef } from "react";
import styled from "styled-components";
import { BareProps as Props } from "@canvas-ui/react-components/types";

interface TabDef {
  name: string;
  key: number;
}

interface ProcessTabsProps extends Props {
  tabs: Array<TabDef>;
  basePath: string;
  currentTab: number;
  onTabSelect: Function;
}

function ProcessTabs({
  className = "",
  basePath,
  tabs = [],
  currentTab,
  onTabSelect
}: ProcessTabsProps): React.ReactElement<Props> {
  const renderTabs = () => {
    return tabs.map((tab, index) => {
      return (
        <li
          onClick={() => {
            onTabSelect(tab.key);
          }}
          className={`progress-tab ${currentTab == tab.key ? "active" : ""}`}
          key={`${tab.name}-${index}`}
        >
          {tab.name}
        </li>
      );
    });
  };

  return (
    <main className={`${className}`}>
      <ul className="progress-tabs-container">{renderTabs()}</ul>
    </main>
  );
}

// bjhl, need to change color to its own theme
export default React.memo(styled(ProcessTabs)`
  width: 100%;
  margin: 0;

  .progress-tabs-container {
    padding: 0;
    margin: 0;
    border-bottom: 0 !important;
    list-style-type: none;
    display: flex;
  }

  .progress-tab {
    border-bottom: 3px solid var(--grey40);
    padding: ${props => props.theme.paddings.xl};
    cursor: pointer;
  }

  .active {
    color: ${props => props.theme.root.color};
    border-bottom: 3px solid ${props => props.theme.root.color};
  }
`);
