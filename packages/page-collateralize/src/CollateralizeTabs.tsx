import React, { useRef } from "react";
import styled from "styled-components";
import { BareProps as Props } from "@canvas-ui/react-components/types";
import Tabs from "@canvas-ui/react-components/Tabs";

interface CollateralizeTabsProps extends Props {
  basePath: string;
}

function CollateralizeTabs({ className = "", basePath }: CollateralizeTabsProps): React.ReactElement<Props> {
  const itemsRef = useRef([
    {
      isRoot: true,
      name: "",
      text: "Home" // add translation later on
    },
    {
      isRoot: false,
      name: "new",
      text: "New"
    }
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
export default React.memo(styled(CollateralizeTabs)`
  width: 100%;
  margin: 0;

  .tabs-container {
    padding: 0 ${props => props.theme.paddings.xxl} !important;
  }
  .ui--Tab {
    font-size: ${props => props.theme.fontSizes.base} !important;
    padding: ${props => props.theme.paddings.xxxxl} ${props => props.theme.paddings.small} !important;
    font-size: ${props => props.theme.fontSizes.small};
    color: #000;
  }

  .tabLinkActive {
    color: ${props => props.theme.sidebar.item.text} !important;
    border-bottom: 3px solid ${props => props.theme.table.tab.border};
  }

  .table-tabs-container {
    padding: 0;
    margin: 0;
    border-bottom: 0 !important;
  }
`);
