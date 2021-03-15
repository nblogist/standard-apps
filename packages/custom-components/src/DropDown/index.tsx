import { classes } from "@canvas-ui/react-util";
import React, { useEffect, useState, useCallback } from "react";
import styled from "styled-components";
import { BareProps } from "@canvas-ui/react-components/types";
import OutsideAlerter from "./OutsideAlerter";
import { Icon } from "@canvas-ui/react-components";

interface dropDownValues {
  key: string;
  value: string;
  text: string;
  image: any;
}

interface Props extends BareProps {
  menu: Array<dropDownValues>;
  def: number;
  onChange?: Function;
}

function Dropdown({ className, menu, def = 0, onChange }: Props): React.ReactElement<Props> {
  const [show, setShow] = useState(false);
  const [selected, setSelected] = useState(menu[def]);

  const renderItems = () => {
    return menu
      .filter(item => {
        if (selected.value === item.value) return false;
        return true;
      })
      .map((item, index) => {
        return (
          <div
            key={item.key}
            onClick={() => {
              setSelected(item);
              setShow(false);
              onChange && onChange(item.value);
            }}
            className={`dd-item dd-item-h`}
          >
            <img className="dd-image" src={item.image.src} />
            <p className="dd-item-text">{item.text}</p>
          </div>
        );
      });
  };

  return (
    <div className={`${className} dd-container`}>
      <OutsideAlerter
        callback={() => {
          show && setShow(false);
        }}
      >
        <div
          className="dd-selected dd-item"
          onClick={() => {
            setShow(!show);
          }}
        >
          <img className="dd-image" src={selected.image.src} />
          <p className="dd-item-text">{selected.text}</p>
          <Icon className="dd-icon" icon={show ? "chevron-up" : "chevron-down"} />
        </div>
        <div className={`dd-list ${show && "dd-list-active"}`}>{renderItems()}</div>
      </OutsideAlerter>
    </div>
  );
}

export default React.memo(styled(Dropdown)`
  position: relative;

  .dd-image {
    width: 20px;
    height: 20px;
    margin-right: 6px;
  }

  .dd-item-text {
    color: ${props => props.theme.text};
    margin: 0;
    margin-right: 6px;
  }

  .dd-selected {
    z-index: -1;
    border: 1px solid ${props => props.theme.highlight};
    border-radius: 12px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .dd-icon {
    color: ${props => props.theme.text};
  }

  .dd-list-active {
    display: block !important;
  }

  .dd-list {
    overflow: hidden;
    margin-top: 16px;
    border-radius: 12px;
    position: absolute;
    display: none;
    z-index: 1;
    border: 1px solid ${props => props.theme.highlight};
    background: ${props => props.theme.backgroundlight};
  }

  .dd-item {
    display: flex;
    justifycontent: center;
    alignitems: center;
    padding: 12px 12px;
    cursor: pointer;
    &:hover {
    }
  }

  .dd-item-h {
    &:hover {
      background: ${props => props.theme.highlight};
    }
  }
  ul {
    display: none;
    border-radius: 8px;
    position: absolute;
    top: 0;
    left: 0;
    list-style-type: none;
  }
  li {
    padding: 8px;
    cursor: pointer;
  }
`);
