// Copyright 2017-2021 @polkadot/apps authors & contributors
// and @canvas-ui/apps authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { Route } from "@canvas-ui/apps-routing/types";
import { Badge, Icon, Menu, Tooltip } from "@canvas-ui/react-components";
import React from "react";
import { NavLink } from "react-router-dom";

const DUMMY_COUNTER = (): null => null;

interface Props {
  isCollapsed: boolean;
  onClick: () => void;
  route: Route;
}

const TOOLTIP_OFFSET = { right: -4 };

type iconsMapping = {
  [key: string]: string | Object;
};
const icons: iconsMapping = {
  ["home"]: "home",
  ["swap"]: "retweet",
  ["farm"]: "gem",
  ["collateralize"]: { prefix: "fas", iconName: "university" },
  ["vault"]: "gem"
};

function Item({ isCollapsed, onClick, route }: Props): React.ReactElement<Props> | null {
  if (route.isIgnored) {
    return null;
  }

  const count = (route.useCounter || DUMMY_COUNTER)();

  const { name, text } = route;

  const body = (
    <>
      <Icon icon={icons[name] || "chevron-right"} />
      <span className="text">{text}</span>
      {!!count && <Badge info={count} isInline type="counter" />}
      <Tooltip offset={TOOLTIP_OFFSET} place="right" text={text} trigger={`nav-${name}`} />
    </>
  );

  return (
    <Menu.Item className="apps--SideBar-Item">
      <NavLink
        activeClassName="apps--SideBar-Item-NavLink-active ui--highlight--border"
        className="apps--SideBar-Item-NavLink"
        data-for={`nav-${name}`}
        data-tip
        data-tip-disable={!isCollapsed}
        onClick={onClick}
        to={`/${name}`}
      >
        {body}
      </NavLink>
    </Menu.Item>
  );
}

export default React.memo(Item);
