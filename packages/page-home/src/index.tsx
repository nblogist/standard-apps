// Copyright 2017-2021 @canvas-ui/app-deploy authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { AppProps as Props } from "@canvas-ui/apps/types";
import useCodes from "@canvas-ui/apps/useCodes";
import { WithLoader } from "@canvas-ui/react-components";
import React, { useMemo, useState } from "react";
import styled from "styled-components";
import { Route, Switch } from "react-router";
import { CryptoCards, Swap, Farm } from "@canvas-ui/custom-components";

function HomeApp({ basePath, navigateTo, className = "" }: Props): React.ReactElement<Props> {
  const { allCodes, hasCodes, isLoading, updated } = useCodes();

  return (
    <main className={`collateralize--App ${className}`}>
      <WithLoader isLoading={isLoading}>
        <Switch>
          <Route exact>
            {/* <div className="crypto-cards-container">
              <CryptoCard abbr="DOT" />
            </div> */}
            <div>
              <div className="blurry" />
              <div className="blurr2" />
              <h1 className="home-section-header">Available as Collaterals</h1>
              <CryptoCards abbrs={["DOT", "BTC", "ETH", "DAO", "USDT"]} />
              <br />
              <div className="home-section">
                <div>
                  <h1 className="home-section-header">Swap</h1>
                  <Swap />
                </div>
                <div>
                  <h1 className="home-section-header">Top Liquidty Pairs</h1>
                  <Farm />
                </div>
              </div>
            </div>
          </Route>
        </Switch>
      </WithLoader>
    </main>
  );
}

export default React.memo(styled(HomeApp)`
  max-width: none;
  flex: 1 1 0;
  padding-left: 32px;
  padding-top: 32px;

  .blurry {
    position: absolute;
    width: 308.46px;
    height: 326.36px;
    left: 743.29px;
    top: 126.04px;

    background: conic-gradient(
      from 161.21deg at 34.58% 54.69%,
      #6143bc -72.28deg,
      #ff009c 2.21deg,
      #6143bc 287.72deg,
      #ff009c 362.21deg
    );
    filter: blur(180px);
    transform: rotate(-29.96deg);
  }

  .blurry2 {
    position: absolute;
    width: 266.1px;
    height: 564.89px;
    left: 667px;
    // top: 361.04px;

    background: linear-gradient(347.31deg, rgba(255, 0, 156, 0.8) -22.31%, rgba(67, 159, 188, 0.8) 92.99%);
    filter: blur(180px);
    transform: rotate(-75deg);
  }

  .home-section-header {
    color: ${props => props.theme.text};
    font-weight: 600;
    font-size: 28px;
    line-height: 35px;
    letter-spacing: 0.01em;
    margin-bottom: 32px;
  }

  .home-section {
    display: flex;
    gap: 30px;
    flex-wrap: nowrap;
  }
`);
