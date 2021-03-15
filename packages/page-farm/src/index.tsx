// Copyright 2017-2021 @canvas-ui/app-deploy authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { AppProps as Props } from "@canvas-ui/apps/types";
import useCodes from "@canvas-ui/apps/useCodes";
import { WithLoader } from "@canvas-ui/react-components";
import React, { useMemo } from "react";
import { Route, Switch } from "react-router";
import styled from "styled-components";
import { ComponentProps } from "./types";
import { Farm } from "@canvas-ui/custom-components";

function FarmApp({ basePath, navigateTo, className = "" }: Props): React.ReactElement<Props> {
  const { allCodes, hasCodes, isLoading, updated } = useCodes();

  const componentProps = useMemo(
    (): ComponentProps => ({
      allCodes,
      basePath,
      hasCodes,
      isLoading,
      navigateTo,
      updated
    }),
    [allCodes, basePath, hasCodes, isLoading, navigateTo, updated]
  );

  return (
    <main className={`farm--App ${className}`}>
      <WithLoader isLoading={isLoading}>
        <Switch>
          <Route exact>
            <Farm />
          </Route>
        </Switch>
      </WithLoader>
    </main>
  );
}

// bjhl, refactor table to its own module
export default React.memo(styled(FarmApp)`
  max-width: none;
  flex: 1 1 0;
  padding-left: 32px;
  padding-top: 32px;
`);
