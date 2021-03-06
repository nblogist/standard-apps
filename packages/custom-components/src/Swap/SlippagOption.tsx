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
          <br />
          <CustomSlippage onValueChange={onValueSelect} max={100} />
        </>
      )}
    </div>
  );
}

export default React.memo(styled(SlippageOption)`
  .slippage-btns {
    gap: 6px;
    display: flex;
  }

  .slippage-btn {
    background: #fff;
    border: 1px solid ${props => props.theme.theme1.colors.light3};
    border-radius: 4px;
    padding: 6px;
    outline: 0;
    cursor: pointer;
  }

  .slippage-btn-active {
    background: ${props => props.theme.theme1.colors.warning2};
    border: 1px solid transparent;
    color: #fff;
  }

  input {
    padding: 8px;
    border: 0;
    border-bottom: 1px solid ${props => props.theme.theme1.colors.light3};
    color: ${props => props.theme.theme1.colors.text};
    outline: 0;
    font-size: 14px;
  }
`);
