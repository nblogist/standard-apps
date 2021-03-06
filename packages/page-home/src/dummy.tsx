import React, { useState } from "react";
import styled from "styled-components";
import { BareProps as Props } from "@canvas-ui/react-components/types";

interface ProcessProps extends Props {}

function Process({ className = "" }: ProcessProps): React.ReactElement<ProcessProps> {
  return <div className={`${className} balance-input--Wrapper`}>dummy</div>;
}

export default React.memo(styled(Process)``);
