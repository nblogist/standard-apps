import React, { useState, useEffect } from "react";

interface dropDownValues {
  key: string;
  value: string;
}

function useDropDown(def: number = 0, menu: Array<dropDownValues>, onSelectionChange: Function): Array<any> {
  const [_selected, setSelected] = useState<any>(menu[def]);

  useEffect(() => {
    onSelectionChange && onSelectionChange(_selected);
  }, [_selected]);

  const changeSelectionByIndex = (index: number) => {
    setSelected(menu[index]);
  };

  const changeSelectionByKey = (key: string) => {
    setSelected(menu[menu.findIndex(item => item.key === key)]);
  };

  return [_selected, changeSelectionByIndex, changeSelectionByKey];
}

export default useDropDown;
