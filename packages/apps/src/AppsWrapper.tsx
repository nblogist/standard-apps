// Copyright 2017-2021 @polkadot/apps authors & contributors
// and @canvas-ui/apps authors & contributors
// SPDX-License-Identifier: Apache-2.0

// setup these right at front
import "./initSettings";
import "semantic-ui-css/semantic.min.css";
import "tippy.js/dist/tippy.css"; // optional
import "@canvas-ui/react-components/i18n";

import { Api } from "@canvas-ui/react-api";
import Queue from "@canvas-ui/react-components/Status/Queue";
import { BlockAuthors, Events } from "@canvas-ui/react-query";
import React, { useState } from "react";
import { HashRouter } from "react-router-dom";
import store from "store";
import { ThemeProvider } from "styled-components";
import { ModalProvider } from "react-modal-hook";
import { UserContextHOC } from "@canvas-ui/custom-components";

import theme from "./theme";

import settings from "@polkadot/ui-settings";

import Apps from "./Apps";

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

export const ThemeContext = React.createContext<any>({});

const AppsWrapper = () => {
  const [darkTheme, setDarkTheme] = useState(true);
  return (
    <ThemeContext.Provider value={{ isDark: darkTheme, setDarkTheme }}>
      <ThemeProvider theme={darkTheme ? theme.darkTheme : theme.lightTheme}>
        <Queue>
          <Api url={settings.apiUrl}>
            <BlockAuthors>
              <Events>
                <HashRouter>
                  <ModalProvider>
                    <UserContextHOC>
                      <Apps />
                    </UserContextHOC>
                  </ModalProvider>
                </HashRouter>
              </Events>
            </BlockAuthors>
          </Api>
        </Queue>
      </ThemeProvider>
    </ThemeContext.Provider>
  );
};

export default AppsWrapper;
