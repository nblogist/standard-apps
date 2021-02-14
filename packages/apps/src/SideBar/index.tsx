// Copyright 2017-2021 @polkadot/apps authors & contributors
// and @canvas-ui/apps authors & contributors
// SPDX-License-Identifier: Apache-2.0

import createRoutes from "@canvas-ui/apps-routing";
import { Routes } from "@canvas-ui/apps-routing/types";
import { media, Menu } from "@canvas-ui/react-components";
import React, { useMemo } from "react";
import { Responsive } from "semantic-ui-react";
import styled from "styled-components";

import { useTranslation } from "../translate";
import Item from "./Item";
import Settings from "./Settings";

interface Props {
  className?: string;
  collapse: () => void;
  handleResize: () => void;
  isCollapsed: boolean;
  isMenuOpen: boolean;
  toggleMenu: () => void;
}

function SideBar({ className = "", handleResize, isCollapsed }: Props): React.ReactElement<Props> {
  const { t } = useTranslation();

  const routing = useMemo<Routes>(() => createRoutes(t), [t]);
  return (
    <Responsive
      className={`apps--SideBar-Wrapper ${className} ${isCollapsed ? "collapsed" : "expanded"}`}
      onUpdate={handleResize}
    >
      <div className={`apps--SideBar ${isCollapsed ? "horizontal" : ""}`}>
        <div className="apps--Sidebar-logo-Wrapper">
          <a className="apps--Sidebar-logo-text">{"Stable Coin"}</a>
        </div>
        <Menu secondary vertical={!isCollapsed}>
          <div className={isCollapsed ? "apps--SideBar-collapse" : `apps--SideBar-Scroll`}>
            {routing.map(
              (route, index): React.ReactNode => {
                return route ? (
                  <Item isCollapsed={isCollapsed} key={route.name} onClick={handleResize} route={route} />
                ) : (
                  <Menu.Divider hidden key={index} />
                );
              }
            )}
            <div className="item" style={{ padding: 0, display: isCollapsed ? "block" : "none" }}>
              <a className="apps--SideBar-Item-NavLink apps--Sidebar-more">
                <span>More</span>
              </a>
            </div>
          </div>
        </Menu>
        {isCollapsed ? "" : <Settings />}
      </div>
    </Responsive>
  );
}

const sideBorderWidth = "0.65rem";

export default React.memo(styled(SideBar)`
  display: flex;
  min-width: 14.25rem;
  position: relative;
  z-index: 300;
  box-shadow: var(--grey80) 0px 20px 20px 0px;

  .apps--Sidebar-logo-Wrapper {
    display: flex;
    justify-content: flex-start;
    width: 100%;
    padding: 0 ${props => props.theme.paddings.xxxl};
    padding-top: ${props => props.theme.paddings.super};
    padding-bottom: ${props => props.theme.paddings.xl};
    font-size: ${props => props.theme.fontSizes.xxxxl};
    font-family: Bebas Neue;
  }

  .apps--Sidebar-logo-text {
    color: ${props => props.theme.root.text} !important;
  }

  .apps--Sidebar-more {
    user-select: none !important;
  }

  .horizontal {
    flex-flow: row !important;
  }

  .apps--SideBar-collapse {
    .apps--SideBar-Item {
      flex: 1 1 0 !important;
    }
  }

  .apps--SideBar {
    align-items: center;
    background: #fff;
    color: #000;
    box-sizing: border-box;
    display: flex;
    flex-flow: column;
    height: auto;
    position: relative;
    transition: left 0.3s linear;
    width: 100%;

    .apps--SideBar-border {
      border-top: ${sideBorderWidth} solid transparent;
      position: absolute;
      left: 0;
      right: 0;
      top: 0;
    }

    .ui.vertical.menu {
      display: flex;
      // height: 100vh;
      margin: 0;
      top: 0;
      width: 100%;
      position: sticky;
      flex-grow: 1;
    }

    .apps--SideBar-Scroll {
      align-items: center;
      display: flex;
      flex-direction: column;
      // height: 100vh;
      overflow-y: auto;
      width: 100%;
      scrollbar-width: none;

      &::-webkit-scrollbar {
        display: none;
        width: 0px;
      }
    }

    .apps--SideBar-Item {
      align-self: flex-end;
      font-size: 1rem;
      padding: 0 !important;
      position: relative;
      width: 100%;
      display: flex !important;

      // &:not(:last-child) {
      //   margin-bottom: 0.75rem;
      // }

      .ui--Badge {
        margin: 0;
        position: absolute;
        right: 0.5rem;
        top: 0.55rem;
        z-index: 1;
      }

      .svg-inline--fa {
        margin-right: 0;
      }
    }

    .apps--SideBar-collapse {
      bottom: 0;
      left: 0;
      padding: 0.75rem 0 0.75rem 0.65rem;
      position: sticky;
      right: 0;
      text-align: left;
      width: 100%;

      .ui.circular.button {
        background: white !important;
        color: #3f3f3f !important;
        box-shadow: 0 0 0 1px #eee inset !important;
        margin: 0;
        transition: transform 0.15s;
      }
    }

    .apps--SideBar-toggle {
      height: 100%;
      position: absolute;
      right: 0px;
      top: 0px;
      transition: all 0.2s;
      width: 6px;

      &:hover {
        background: rgba(255, 255, 255, 0.15);
        cursor: pointer;
      }
    }
  }

  .toggleImg {
    cursor: pointer;
    height: 2.75rem;
    left: 0.9rem;
    opacity: 0;
    position: absolute;
    top: 0px;
    transition: opacity 0.2s ease-in, top 0.2s ease-in;
    width: 2.75rem;

    &.delayed {
      transition-delay: 0.4s;
    }

    &.open {
      opacity: 1;
      top: 0.9rem;
    }

    ${media.DESKTOP`
      opacity: 0 !important;
      top: -2.9rem !important;
    `}
  }
`);
