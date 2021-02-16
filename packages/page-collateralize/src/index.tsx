// Copyright 2017-2021 @canvas-ui/app-deploy authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { AppProps as Props } from "@canvas-ui/apps/types";
import useCodes from "@canvas-ui/apps/useCodes";
import { WithLoader } from "@canvas-ui/react-components";
import React, { useMemo } from "react";
import styled from "styled-components";
import { ComponentProps } from "./types";
import Stake from "./Stake";

function CollateralizeApp({ basePath, navigateTo, className = "" }: Props): React.ReactElement<Props> {
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
    <main className={`collateralize--App ${className}`}>
      <WithLoader isLoading={isLoading}>
        <Stake />
      </WithLoader>
    </main>
  );
}

export default React.memo(styled(CollateralizeApp)`
  background: ${props => props.theme.farm.bg};
  margin: ${props => props.theme.margins.ssuper};
`);
