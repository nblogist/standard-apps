// Copyright 2017-2021 @canvas-ui/app-deploy authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { AppProps as Props } from "@canvas-ui/apps/types";
import useCodes from "@canvas-ui/apps/useCodes";
import { WithLoader } from "@canvas-ui/react-components";
import React, { useMemo, useState } from "react";
import styled from "styled-components";
import { Route, Switch } from "react-router";
import { ComponentProps } from "./types";
import Process from "./Process";
import CollateralizeTabs from "./CollateralizeTabs";
import Loans from "./Loans";

const INITIAL_MODAL_STATE = {
  isOpen: false,
  content: <div>asdfasdfasdfasf</div>
};

function CollateralizeApp({ basePath, navigateTo, className = "" }: Props): React.ReactElement<Props> {
  const { allCodes, hasCodes, isLoading, updated } = useCodes();
  const [modalState, setModalState] = useState(INITIAL_MODAL_STATE);

  const _onClose = () => {
    setModalState({ ...modalState, isOpen: false });
  };

  const setModalContent = (content: JSX.Element) => {
    setModalState({ ...modalState, content });
  };

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
        <CollateralizeTabs basePath={basePath} />
        <Switch>
          <Route path={`${basePath}/new`}>
            <Process basePath={basePath} />
          </Route>
          <Route exact>
            <Loans />
          </Route>
        </Switch>
      </WithLoader>
    </main>
  );
}

export default React.memo(styled(CollateralizeApp)`
  max-width: none;
  flex: 1 1 0;
  background: ${props => props.theme.farm.bg};
  margin: ${props => props.theme.margins.ssuper};
`);
