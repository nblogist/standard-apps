import { classes } from "@canvas-ui/react-util";
import React, { useCallback, useState } from "react";
import styled from "styled-components";
import { BareProps } from "@canvas-ui/react-components/types";
import CustomSlippage from "./CustomSlippage";

interface Props extends BareProps {
  onValueSelect?: Function;
  max?: number;
}

function SlippageOption({ className, onValueSelect, max = 100 }: Props): React.ReactElement<Props> {
  const [openCustom, setOpenCustom] = useState(false);
  const [selected, setSelected] = useState(0);

  const onClick1 = useCallback(() => {
    setSelected(0);
    onValueSelect && onValueSelect(0.1);
    setOpenCustom(false);
  }, []);

  const onClick2 = useCallback(() => {
    setSelected(1);
    onValueSelect && onValueSelect(0.5);
    setOpenCustom(false);
  }, []);

  const onClick3 = useCallback(() => {
    setSelected(2);
    onValueSelect && onValueSelect(1.0);
    setOpenCustom(false);
  }, []);

  const onClick4 = useCallback(() => {
    setSelected(3);
    setOpenCustom(true);
  }, []);

  return (
    <div className={classes(className, "slippage--Wrapper")}>
      <div className="slippage-btns">
        <button className={`slippage-btn${selected == 0 ? " slippage-btn-active" : ""}`} onClick={onClick1}>
          0.1%
        </button>
        <button className={`slippage-btn${selected == 1 ? " slippage-btn-active" : ""}`} onClick={onClick2}>
          0.5%
        </button>
        <button className={`slippage-btn${selected == 2 ? " slippage-btn-active" : ""}`} onClick={onClick3}>
          1.0%
        </button>
        <button className={`slippage-btn${selected == 3 ? " slippage-btn-active" : ""}`} onClick={onClick4}>
          custom
        </button>
      </div>
      {openCustom && (
        <>
          <CustomSlippage onValueChange={onValueSelect} max={100} />
        </>
      )}
    </div>
  );
}

export default React.memo(styled(SlippageOption)`
  .slippage-btns {
    background: ${props => props.theme.backgroundlight};
    display: inline-flex;
    border-radius: 8px;
    overflow: hidden;
    padding: 4px;
    margin-bottom: 12px;
  }

  .slippage-btn {
    background: transparent;
    border: 0;
    padding: 12px;
    outline: 0;
    cursor: pointer;
    color: ${props => props.theme.textlight};
    border-radius: 8px;
  }

  .slippage-btn-active {
    background: ${props => props.theme.highlight};
    color: ${props => props.theme.textswapotions};
  }

  input {
    padding: 16px;
    color: ${props => props.theme.text};
    border: 0;
    outline: 0;
    font-size: 14px;
    border-radius: 12px;
    background: ${props => props.theme.backgroundlight};
  }
`);
