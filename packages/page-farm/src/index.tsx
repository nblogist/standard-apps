// Copyright 2017-2021 @canvas-ui/app-deploy authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { AppProps as Props } from "@canvas-ui/apps/types";
import useCodes from "@canvas-ui/apps/useCodes";
import { WithLoader } from "@canvas-ui/react-components";
import React, { useMemo } from "react";
import { Route, Switch } from "react-router";
import styled from "styled-components";
import { ComponentProps } from "./types";
import TableTabs from "./TableTabs";
import Table from "./Table";

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
        <TableTabs basePath={basePath} />
        <Switch>
          <Route path={`${basePath}/standard-bar`}>
            standard-bar
            <Table />
          </Route>
          <Route path={`${basePath}/permanent`}>
            permanent
            <Table />
          </Route>
          <Route path={`${basePath}/onsen`}>
            onsen
            <Table />
          </Route>
          <Route exact>
            index
            <Table />
          </Route>
        </Switch>
      </WithLoader>
    </main>
  );
}

export default React.memo(styled(FarmApp)`
  background: ${props => props.theme.farm.bg};
  border-radius: ${props => props.theme.generals.xs};
  box-shadow: var(--grey80) 0px 0px 21px;
  margin: ${props => props.theme.margins.ssuper};
`);
