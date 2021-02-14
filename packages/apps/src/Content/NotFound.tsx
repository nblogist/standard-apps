// Copyright 2017-2021 @polkadot/apps authors & contributors
// and @canvas-ui/apps authors & contributors
// SPDX-License-Identifier: Apache-2.0

import React from "react";
import { Redirect } from "react-router";

function NotFound(): React.ReactElement {
  return <Redirect to="/swap" />;
}

export default React.memo(NotFound);
