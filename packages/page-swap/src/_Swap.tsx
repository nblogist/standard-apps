import React, { useState } from "react";
import BN from "bn.js";
import styled from "styled-components";
import { BareProps as Props } from "@canvas-ui/react-components/types";
import { Card, InputBalance } from "@canvas-ui/react-components";

interface SwapState {
  fromVal: BN | string | undefined;
  toVal: BN | string | undefined;
}

function Swap({ className = "" }: Props): React.ReactElement<Props> {
  const [swap, setSwap] = useState<SwapState>({
    fromVal: undefined,
    toVal: undefined
  });

  const onFromKeydown = (value: BN) => {
    console.log("val", value);
    let toVal = value.sub(new BN("3", 10)).mul(new BN("2", 10));
    // setSwap({ ...swap, fromVal: value, toVal });
  };

  const onToKeydown = (value: BN) => {
    let fromVal = value.div(new BN("2", 10)).add(new BN("3", 10));
    setSwap({ ...swap, fromVal, toVal: value });
  };

  return (
    <div>
      <Card>
        <div>Available {`0`}</div>
        <div>
          <div>Pay with</div>
          <InputBalance onChange={onFromKeydown} defaultValue={swap.fromVal} />
        </div>

        <div>
          <div>Get</div>
          <InputBalance />
        </div>
      </Card>
    </div>
  );
}

export default React.memo(styled(Swap)``);
