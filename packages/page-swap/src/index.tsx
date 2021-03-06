// Copyright 2017-2021 @canvas-ui/app-deploy authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { AppProps as Props } from "@canvas-ui/apps/types";
import useCodes from "@canvas-ui/apps/useCodes";
import { WithLoader } from "@canvas-ui/react-components";
import React, { useMemo } from "react";
import { ComponentProps } from "./types";
import styled from "styled-components";
import { Swap } from "@canvas-ui/custom-components";

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
        <h1 className="home-section-header">Swap</h1>
        <br />
        <Swap />
      </WithLoader>
    </main>
  );
}

export default React.memo(styled(SwapApp)`
  max-width: none;
  flex: 1 1 0;
  padding-left: 32px;
  padding-top: 32px;

  h1 {
    color: ${props => props.theme.theme1.colors.text};
  }
`);
