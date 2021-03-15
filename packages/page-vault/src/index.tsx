// Copyright 2017-2021 @canvas-ui/app-deploy authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { AppProps as Props } from "@canvas-ui/apps/types";
import useCodes from "@canvas-ui/apps/useCodes";
import { WithLoader } from "@canvas-ui/react-components";
import React, { useMemo } from "react";
import { Route, Switch } from "react-router";
import styled from "styled-components";
import { ComponentProps } from "./types";
import { MyTokenCards, Farm, TransferHOC} from "@canvas-ui/custom-components";

function VaultApp({ basePath, navigateTo, className = "" }: Props): React.ReactElement<Props> {
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
    <main className={`vault--App ${className}`}>
      <WithLoader isLoading={isLoading}>
        <Switch>
          <Route exact>
            <h1 className="home-section-header">My Tokens</h1>
            <TransferHOC>
              <MyTokenCards abbrs={["DOT", "BTC", "ETH", "DAO", "USDT"]} />
            </TransferHOC>
            <h1 className="home-section-header">Top Liquidity Pairs</h1>
            <Farm />
          </Route>
        </Switch>
      </WithLoader>
    </main>
  );
}

// bjhl, refactor table to its own module
export default React.memo(styled(VaultApp)`
  max-width: none;
  flex: 1 1 0;
  padding-left: 32px;
  padding-top: 32px;

  .home-section-header {
    color: ${props => props.theme.text};
    font-weight: 600;
    font-size: 28px;
    line-height: 35px;
    letter-spacing: 0.01em;
    margin-bottom: 32px;
  }
`);
