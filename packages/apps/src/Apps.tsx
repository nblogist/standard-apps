// Copyright 2017-2021 @polkadot/apps authors & contributors
// and @canvas-ui/apps authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { getSystemChainColor } from "@canvas-ui/apps-config/ui";
import { defaultColor } from "@canvas-ui/apps-config/ui/general";
import { ScrollToTop, Modal } from "@canvas-ui/react-components";
import GlobalStyle from "@canvas-ui/react-components/styles";
import { BareProps as Props } from "@canvas-ui/react-components/types";
import { useApi } from "@canvas-ui/react-hooks";
import React, { useCallback, useMemo, useState } from "react";
import store from "store";
import styled from "styled-components";
import { ToastContainer } from "react-toastify";

import { SIDEBAR_MENU_THRESHOLD, SideBarTransition } from "./constants";
import Content from "./Content";
import SideBar from "./SideBar";
import WarmUp from "./WarmUp";
import GlobalStyle2 from "./globalStyle";

import "react-toastify/dist/ReactToastify.css";

interface SidebarState {
  isCollapsed: boolean;
  isMenu: boolean;
  isMenuOpen: boolean;
  transition: SideBarTransition;
}

export const PORTAL_ID = "portals";

function saveSidebar(sidebar: SidebarState): SidebarState {
  return store.set("sidebar", sidebar) as SidebarState;
}

function Apps({ className = "" }: Props): React.ReactElement<Props> {
  const { systemChain, systemName } = useApi();
  const [sidebar, setSidebar] = useState<SidebarState>({
    // bjhl, inital collapse based on window.innerwidth
    isCollapsed: window.innerWidth < SIDEBAR_MENU_THRESHOLD ? true : false,
    isMenuOpen: false,
    transition: SideBarTransition.COLLAPSED,
    ...store.get("sidebar", {}),
    isMenu: window.innerWidth < SIDEBAR_MENU_THRESHOLD
  });
  const uiHighlight = useMemo((): string | undefined => getSystemChainColor(systemChain, systemName), [
    systemChain,
    systemName
  ]);

  const _collapse = useCallback(
    (): void => setSidebar((sidebar: SidebarState) => saveSidebar({ ...sidebar, isCollapsed: !sidebar.isCollapsed })),
    []
  );

  const _toggleMenu = useCallback(
    (): void =>
      setSidebar((sidebar: SidebarState) => saveSidebar({ ...sidebar, isCollapsed: false, isMenuOpen: true })),
    []
  );
  const _handleResize = useCallback((): void => {
    const transition =
      window.innerWidth < SIDEBAR_MENU_THRESHOLD ? SideBarTransition.COLLAPSED : SideBarTransition.EXPANDED;

    setSidebar((sidebar: SidebarState) =>
      saveSidebar({
        ...sidebar,
        // bjhl, isCollapsed now tracks whether viewport is on the bottom or not
        isCollapsed: transition === SideBarTransition.COLLAPSED,
        isMenu: transition === SideBarTransition.COLLAPSED,
        isMenuOpen: false,
        transition
      })
    );
  }, []);

  const { isCollapsed, isMenuOpen } = sidebar;

  // bjhl, isCollapsed -> isCollapsed from false
  return (
    <>
      <ScrollToTop />
      <GlobalStyle uiHighlight={defaultColor || uiHighlight} />
      <GlobalStyle2 />
      <div
        className={`apps--Wrapper ${isCollapsed ? "collapsed" : "expanded"} ${
          isMenuOpen ? "menu-open" : ""
        } theme--default ${className}`}
      >
        <div className={`apps--Menu-bg ${isMenuOpen ? "open" : "closed"}`} onClick={_handleResize} />
        <SideBar
          collapse={_collapse}
          handleResize={_handleResize}
          isCollapsed={isCollapsed}
          isMenuOpen={isMenuOpen}
          toggleMenu={_toggleMenu}
        />
        <Content />
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          draggable
        />
        <div id={PORTAL_ID} />
      </div>
      <WarmUp />
    </>
  );
}

export default React.memo(styled(Apps)`
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  background: ${props => props.theme.background};

  &.theme--default {
    a.apps--SideBar-Item-NavLink {
      font-size: 16px;
      color: ${props => props.theme.textlight};
      padding: 16px;
      white-space: nowrap;
      flex: 1;
      width: 100%;
      margin: 12px 24px;
      border-radius: 12px;

      .svg-inline--fa {
        font-size: 18px;
        margin-right: 16px;
        color: ${props => props.theme.textlight};
      }

      &:hover {
        background: ${props => props.theme.backgroundlight};

        .svg-inline--fa {
        }
      }
    }

    a.apps--SideBar-Item-NavLink-active {
      color: ${props => props.theme.textsd};
      font-size: 16px;
      background: ${props => props.theme.highlight};

      .svg-inline--fa {
        color: ${props => props.theme.textsd};
      }

      &:hover {
      }
    }
  }

  &.collapsed .apps--SideBar-Wrapper {
    position: fixed;
    width: 100%;
    max-height: 5rem;
    bottom: 0;
  }

  &.collapsed .apps--SideBar {
    text-align: center;

    .divider {
      display: none;
    }

    a.apps--SideBar-Item-NavLink {
      width: 100%;
    }

    .apps--Sidebar-logo-Wrapper {
      display: none;
    }

    .apps--SideBar-Item {
      display: flex;
      justify-content: center;
      align-items: center;
      margin-bottom: 0;
    }

    .apps--SideBar-logo {
      .apps--SideBar-logo-inner {
        margin: auto;
        padding: 0;
        width: 3rem;

        img {
          margin: 0 0.4rem;
        }

        > div.info {
          display: none;
        }
      }
    }

    .apps--SideBar-collapse {
      position: fixed;
      display: flex;
    }

    .apps--SideBar-collapse .ui.basic.secondary.button {
      left: 0.66rem;
    }
  }

  &.expanded .apps--SideBar {
    text-align: left;

    .apps--SideBar-Scroll {
      // padding: 1.5rem 1rem;
    }
  }

  &.fixed {
    .apps--SideBar-Wrapper {
      position: absolute;
      width: 0px;

      .apps--SideBar {
        padding-left: 0;
      }
    }
  }

  &.menu-open {
    .apps--SideBar-Wrapper {
      width: 12rem;
    }
  }

  .apps--Menu-bg {
    background: transparent;
    height: 100%;
    left: 0;
    position: absolute;
    top: 0;
    transition: opacity 0.2s;
    width: 100%;
    z-index: 299;

    &.closed {
      opacity: 0;
      width: 0;
    }

    &.open {
      opacity: 1;
    }
  }
`);
