// Copyright 2017-2021 @polkadot/apps authors & contributors
// and @canvas-ui/apps authors & contributors
// SPDX-License-Identifier: Apache-2.0

// setup these right at front
import "./initSettings";
import "semantic-ui-css/semantic.min.css";
import "tippy.js/dist/tippy.css"; // optional
import "@canvas-ui/react-components/i18n";

import React, { Suspense } from "react";
import ReactDOM from "react-dom";
import store from "store";

import AppsWrapper from "./AppsWrapper";

const rootId = "root";
const rootElement = document.getElementById(rootId);
// const theme = { theme: settings.uiTheme };

if (!rootElement) {
  throw new Error(`Unable to find element with id '${rootId}'`);
}

// cleanups for old/unused storage items
store.each((_, key): void => {
  if (key.startsWith("hooks:sessionSlashes:")) {
    store.remove(key);
  }
});

ReactDOM.render(
  <Suspense fallback="...">
    <AppsWrapper />
  </Suspense>,
  rootElement
);
