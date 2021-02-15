import React, { useRef } from "react";
import styled from "styled-components";
import { BareProps as Props } from "@canvas-ui/react-components/types";
import Tabs from "@canvas-ui/react-components/Tabs";

interface TableTabsProps extends Props {
  menu: Array<string>;
  basePath: string;
}

function TableTabs({
  className = "",
  basePath,
  menu = ["All", "Permenant", "Onsen", "Standard Bar", " Previous"]
}: TableTabsProps): React.ReactElement<Props> {
  const itemsRef = useRef([
    {
      isRoot: true,
      name: "index",
      text: "All" // add translation later on
    },
    {
      isRoot: false,
      name: "permanent",
      text: "Permanent"
    },
    { isRoot: false, name: "onsen", text: "Onsen" },
    { isRoot: false, name: "standard-bar", text: "Standard Bar" }
  ]);

  return (
    <main className={`${className}`}>
      <header className="table-tabs-container">
        <Tabs basePath={basePath} items={itemsRef.current} />
      </header>
    </main>
  );
}

// bjhl, need to change color to its own theme
export default React.memo(styled(TableTabs)`
  width: 100%;
  margin: 0;

  .tabs-container {
    padding: ${props => props.theme.paddings.small} !important;
  }
  .ui--Tab {
    padding: ${props => props.theme.paddings.small} !important;
    font-size: ${props => props.theme.fontSizes.small};
    color: #000;
  }

  .tabLinkActive {
    color: ${props => props.theme.sidebar.item.text} !important;
  }

  .table-tabs-container {
    padding: 0;
    margin: 0;
    border-bottom: 1px solid ${props => props.theme.table.tabs.border};
  }
`);
