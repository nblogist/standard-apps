import { classes } from "@canvas-ui/react-util";
import React, { useState } from "react";
import styled from "styled-components";
import { BareProps } from "@canvas-ui/react-components/types";
import NumberFormat from "react-number-format";

export interface Values {
  value: string;
  floatValue: number | undefined;
}

interface Props extends BareProps {
  values: Values;
  onValueChange?: Function;
  max?: number;
}

export const INITIAL_STATE: Values = { value: "", floatValue: undefined };

function CustomSlippage({ className, onValueChange, max = 100 }: Props): React.ReactElement<Props> {
  const [values, setValue] = useState(INITIAL_STATE);
  return (
    <div className={classes(className, "custom-slippage--Wrapper")}>
      <NumberFormat
        suffix={"%"}
        allowEmptyFormatting={true}
        decimalScale={2}
        decimalSeparator="."
        value={values.value}
        onValueChange={values => {
          if (values.floatValue !== undefined && values.floatValue < 0) {
            onValueChange && onValueChange(0);
            setValue({ value: "0", floatValue: 0 });
          } else if (values.floatValue !== undefined && values.floatValue > max) {
            onValueChange && onValueChange(max);
            setValue({ value: max.toString(), floatValue: max });
          } else {
            onValueChange && onValueChange(values.floatValue);
          }
        }}
      />
    </div>
  );
}

export default React.memo(styled(CustomSlippage)``);
