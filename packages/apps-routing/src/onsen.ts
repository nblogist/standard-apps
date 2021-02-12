// Copyright 2017-2021 @polkadot/apps-routing authors & contributors
// and @canvas-ui/apps-routing authors & contributors
// SPDX-License-Identifier: Apache-2.0

import Component from "@canvas-ui/app-onsen";

import { Route } from "./types";

export default function create(t: <T = string>(key: string, text: string, options: { ns: string }) => T): Route {
  return {
    Component,
    display: {
      needsAccounts: true,
      needsApi: []
    },
    name: "onsen",
    text: t<string>("nav.onsen", "Onsen", { ns: "apps-routing" })
  };
}
