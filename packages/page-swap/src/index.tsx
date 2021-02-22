// Copyright 2017-2021 @canvas-ui/app-deploy authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { AppProps as Props } from "@canvas-ui/apps/types";
import useCodes from "@canvas-ui/apps/useCodes";
import { WithLoader } from "@canvas-ui/react-components";
import React, { useMemo } from "react";
import { ComponentProps } from "./types";
import Swap from "./Swap";
import styled from "styled-components";

function SwapApp({ basePath, navigateTo, className }: Props): React.ReactElement<Props> {
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
    <main className={`swap--App ${className}`}>
      <WithLoader isLoading={isLoading}>
        <Swap />{" "}
        {/*<Switch>
          <Route path={`${basePath}/new/:id?/:index?`}>
            <New {...componentProps} />
          </Route>
          <Route path={`${basePath}/success/:address`}>
            <Success {...componentProps} />
          </Route>
          <Route exact>
            <Codes {...componentProps} />
          </Route>
        </Switch>*/}
      </WithLoader>
    </main>
  );
}

export default React.memo(styled(SwapApp)`
  background: ${props => props.theme.farm.bg};
  margin: ${props => props.theme.margins.ssuper};
`);
