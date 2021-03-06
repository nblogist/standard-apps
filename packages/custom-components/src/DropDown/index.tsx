import { classes } from "@canvas-ui/react-util";
import React, { useEffect, useState, useCallback } from "react";
import styled from "styled-components";
import { BareProps } from "@canvas-ui/react-components/types";
import { Dropdown as SUIDropdown } from "semantic-ui-react";
import useDropDown from "./useDropDown";

interface dropDownValues {
  key: string;
  value: string;
  text: string;
  image: any;
}

interface Props extends BareProps {
  menu: Array<dropDownValues>;
  def: number;
  onSelectionChange: Function;
}

function Dropdown({ className, menu, def = 0, onSelectionChange }: Props): React.ReactElement<Props> {
  const [show, setShow] = useState(false);

  return <SUIDropdown defaultValue={menu[0].value} selection options={menu} />;
}

export default React.memo(styled(Dropdown)`
  position: relative;
  .dropdown-show-active {
    display: block;
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
