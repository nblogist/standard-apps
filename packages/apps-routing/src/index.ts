// Copyright 2017-2021 @polkadot/apps-routing authors & contributors
// and @canvas-ui/apps-routing authors & contributors
// SPDX-License-Identifier: Apache-2.0

// import deploy from './deploy';
// import execute from './execute';
// import settings from './settings';
import { Routes } from "./types";
// import upload from './upload';
import swap from "./swap";
import farm from "./farm";
import onsen from "./onsen";

export default function create(t: <T = string>(key: string, text: string, options: { ns: string }) => T): Routes {
  return [
    // upload(t),
    // deploy(t),
    // execute(t),
    // settings(t),
    swap(t),
    farm(t),
    onsen(t)
  ];
}
