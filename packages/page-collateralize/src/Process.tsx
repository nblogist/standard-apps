import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { BareProps as Props } from "@canvas-ui/react-components/types";
import { Table as SUITable, Checkbox as SUICB, Button as SUIB, Icon } from "semantic-ui-react";

import { Expander, Collapsible } from "@canvas-ui/react-components";
import ProcessTabs from "./CollateralizeTabs";
import BalanceInput from "./BalanceInput";

interface ProcessProps extends Props {}

enum TABSINDEX {
  SELECT = 0,
  VAULT = 1,
  GENERATE = 2,
  CONFIRM = 3
}

interface ProcessState {
  currentTab: number;
  selectedCollateral: number | undefined;
  collapsibleOpen: boolean;
  collateralValues: Object;
  mpiValues: Object;
}

const INITIAL_STATE: ProcessState = {
  currentTab: TABSINDEX.SELECT,
  selectedCollateral: undefined,
  collapsibleOpen: true,
  collateralValues: { value: "0", floatValue: 0 },
  mpiValues: { value: "0", floatValue: 0 }
};

const TABS = [
  { name: "Select Collateral", key: TABSINDEX.SELECT },
  { name: "Confirm", key: TABSINDEX.CONFIRM }
];

// balacne will have to be separated later on in real api
const DUMMY_DATA = [
  {
    collateral: "ETH-A",
    stabilityFee: "0.00%",
    liquidityRatio: "150.00%",
    liquidityFee: "13.00%",
    balance: "5.498ETH-A"
  },
  {
    collateral: "BAT-A",
    stabilityFee: "0.00%",
    liquidityRatio: "150.00%",
    liquidityFee: "13.00%",
    balance: "13.233BAT-A"
  },
  {
    collateral: "USDC-A",
    stabilityFee: "0.00%",
    liquidityRatio: "150.00%",
    liquidityFee: "13.00%",
    balance: "2.333USDC-A"
  },
  {
    collateral: "USDC-B",
    stabilityFee: "0.00%",
    liquidityRatio: "150.00%",
    liquidityFee: "13.00%",
    balance: "2.498USDC-B"
  },
  {
    collateral: "WBTC-A",
    stabilityFee: "0.00%",
    liquidityRatio: "150.00%",
    liquidityFee: "13.00%",
    balance: "10.398WBT-A"
  }
];

function Process({ className = "" }: ProcessProps): React.ReactElement<ProcessProps> {
  const [processState, setProcessState] = useState(INITIAL_STATE);

  const onTabSelect = (tab: number) => {
    setProcessState({ ...processState, currentTab: tab });
  };

  const onCollateralSelect = (index: number) => {
    setProcessState({ ...processState, selectedCollateral: index, collapsibleOpen: false });
  };

  const onCollateralValuesChange = (values: Object) => {
    setProcessState({ ...processState, collateralValues: values });
  };

  const onMpiValuesChange = (values: Object) => {
    setProcessState({ ...processState, mpiValues: values });
  };

  useEffect(() => {}, [processState.selectedCollateral]);

  const renderSelection = () => {
    const { selectedCollateral, collapsibleOpen } = processState;
    if (selectedCollateral !== undefined && !collapsibleOpen) {
      const data = DUMMY_DATA[selectedCollateral];
      return (
        <div>
          <p className="collateral-summary-message ">Selected Collateral</p>
          <SUITable compact unstackable className="collateral-selection">
            <SUITable.Header>
              <SUITable.Row>
                <SUITable.HeaderCell>Collateral</SUITable.HeaderCell>
                {/*<SUITable.HeaderCell>Stability Fee</SUITable.HeaderCell>*/}
                <SUITable.HeaderCell>Liquidity Ratio</SUITable.HeaderCell>
                <SUITable.HeaderCell>Liquidity Fee</SUITable.HeaderCell>
                <SUITable.HeaderCell>Balance</SUITable.HeaderCell>
              </SUITable.Row>
            </SUITable.Header>
            <SUITable.Body>
              <SUITable.Row>
                <SUITable.Cell>{data.collateral}</SUITable.Cell>
                {/*<SUITable.Cell>{data.stabilityFee}</SUITable.Cell>*/}
                <SUITable.Cell>{data.liquidityRatio}</SUITable.Cell>
                <SUITable.Cell>{data.liquidityFee}</SUITable.Cell>
                <SUITable.Cell>{data.balance}</SUITable.Cell>
              </SUITable.Row>
            </SUITable.Body>
          </SUITable>
        </div>
      );
    } else {
      return <p className="collateral-selection collateral-summary-message">Please Select Your Collataral</p>;
    }
  };

  const renderRows = () => {
    return DUMMY_DATA.map((data, index) => {
      return (
        <SUITable.Row key={data.collateral}>
          <SUITable.Cell>
            <SUICB
              radio
              value={data.collateral}
              name="selectCollateralCheckboxGroup"
              checked={processState.selectedCollateral === index}
              onChange={() => {
                onCollateralSelect(index);
              }}
            ></SUICB>
          </SUITable.Cell>
          <SUITable.Cell>{data.collateral}</SUITable.Cell>
          {/*<SUITable.Cell>{data.stabilityFee}</SUITable.Cell>*/}
          <SUITable.Cell>{data.liquidityRatio}</SUITable.Cell>
          <SUITable.Cell>{data.liquidityFee}</SUITable.Cell>
          <SUITable.Cell>{data.balance}</SUITable.Cell>
        </SUITable.Row>
      );
    });
  };

  return (
    <div className={`${className}`}>
      {/* <ProcessTabs currentTab={processState.currentTab} tabs={TABS} onTabSelect={onTabSelect} /> */}
      <div>
        <div className="collateral-selection-container">
          <Collapsible
            control
            defaultOpen
            status={processState.collapsibleOpen}
            summary={renderSelection()}
            onToggle={(willOpen: boolean) => {
              setProcessState({ ...processState, collapsibleOpen: willOpen });
            }}
          >
            <div>
              <SUITable compact unstackable>
                <SUITable.Header>
                  <SUITable.Row>
                    <SUITable.HeaderCell> </SUITable.HeaderCell>
                    <SUITable.HeaderCell>Collateral</SUITable.HeaderCell>
                    {/*<SUITable.HeaderCell>Stability Fee</SUITable.HeaderCell>*/}
                    <SUITable.HeaderCell>Liquidity Ratio</SUITable.HeaderCell>
                    <SUITable.HeaderCell>Liquidity Fee</SUITable.HeaderCell>
                    <SUITable.HeaderCell>Balance</SUITable.HeaderCell>
                  </SUITable.Row>
                </SUITable.Header>

                <SUITable.Body>{renderRows()}</SUITable.Body>
              </SUITable>
            </div>
          </Collapsible>
        </div>

        {processState.selectedCollateral !== undefined ? (
          <div>
            <div className="collateral-lock-item">
              <h1 className="collateral-lock-header">
                How Much {DUMMY_DATA[processState.selectedCollateral].collateral} would you like to lock into your
                position?
              </h1>
              <div className="collateral-lock-balance-container">
                <BalanceInput
                  className="collateral-lock-balance"
                  values={processState.collateralValues}
                  onValueChange={onCollateralValuesChange}
                />
                <div className=" collateral-lock-coin-abbr">
                  {DUMMY_DATA[processState.selectedCollateral].collateral}
                </div>
              </div>
              <p className="collateral-lock-balance">
                Your Balance: {DUMMY_DATA[processState.selectedCollateral].balance}
              </p>
            </div>
            <div className="collateral-lock-item">
              <h1 className="collateral-lock-header">How Much MPI would you like to lock into your position?</h1>
              <div className="collateral-lock-balance-container">
                <BalanceInput
                  className="collateral-lock-balance"
                  values={processState.mpiValues}
                  onValueChange={onMpiValuesChange}
                />
                <div className="collateral-lock-coin-abbr">MPI</div>
              </div>
              <p className="collateral-lock-balance">Max Available to Generate:{"DUMMY VAL"}</p>
            </div>
            <div className="collateral-lock-aif-container ">
              <div className="collateral-lock-aif">
                <h1 className="collateral-lock-aif-header">Stability Fee</h1>
                <p className="collateral-lock-aif-val">{DUMMY_DATA[processState.selectedCollateral].stabilityFee}</p>
              </div>
              <div>
                <h1 className="collateral-lock-aif-header">Liquidation Penalty</h1>
                <p className="collateral-lock-aif-val">5.00%</p>
              </div>
            </div>
          </div>
        ) : (
          ""
        )}

        {processState.selectedCollateral !== undefined ? (
          <div>
            <button className="collateral-proceed">Proceed</button>
          </div>
        ) : (
          ""
        )}

        <div className="collateral-help-container">
          <div className="collateral-help-item">
            <h1 className="collateral-help-header">Stability Fee</h1>
            <p className="collateral-help-explanation">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
              dolore magna aliqua. Adipiscing diam donec adipiscing tristique risus nec feugiat in fermentum.
            </p>
          </div>
          <div className="collateral-help-item">
            <h1 className="collateral-help-header">Liquidity Ratio</h1>
            <p className="collateral-help-explanation">
              Maecenas ultricies mi eget mauris. Auctor elit sed vulputate mi sit amet mauris. Non pulvinar neque
              laoreet suspendisse interdum. Sit amet consectetur adipiscing elit ut.
            </p>
          </div>
          <div className="collateral-help-item">
            <h1 className="collateral-help-header">Liquidity Fee</h1>
            <p className="collateral-help-explanation">
              Mattis aliquam faucibus purus in massa tempor nec feugiat. Sit amet tellus cras adipiscing enim.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default React.memo(styled(Process)`
  padding: ${props => props.theme.paddings.xxl};

  .collateral-proceed {
    margin: ${props => props.theme.margins.ssuper} 0;
    padding: ${props => props.theme.paddings.xl};
    font-size: ${props => props.theme.fontSizes.base};
    border-radius: ${props => props.theme.generals.xxxxs};
    background: ${props => props.theme.root.color1};
    border: 1px solid ${props => props.theme.root.color};
    color: ${props => props.theme.root.color}
  }

  .collateral-summary-message {
    font-size: ${props => props.theme.fontSizes.base};
    color: ${props => props.theme.colors.black};
  }

  .collapsible--Wrapper {
    padding-left: 0;
    padding-right: 0;
  }

  .collateral-lock-aif-container {
    display: flex;
    // margin-bottom: ${props => props.theme.margins.ssuper};
  }

  .collateral-lock-aif {
    margin-right: ${props => props.theme.margins.xxxl};
  }

  .collateral-lock-aif-header {
    // font-weight: 500;
    color: ${props => props.theme.colors.black};
    font-size: ${props => props.theme.fontSizes.base};
  }
  .collateral-lock-aif-val {
    color: ${props => props.theme.colors.grey};
  }

  .collateral-lock-balance-container {
    overflow: hidden;
    display: flex;
    width: 80%;
    border: 1px solid ${props => props.theme.colors.grey};
    border-radius: ${props => props.theme.generals.xxxxs};
    margin: ${props => props.theme.margins.xl} 0;
  }
  .collateral-lock-coin-abbr {
    display: flex;
    padding: ${props => props.theme.paddings.base};
    justify-content: center;
    align-items: center;
    color: ${props => props.theme.colors.grey};
  }

  .collateral-lock-balance {
    flex: 1 1 0;
    input {
      outline: none;
      width: 100%;
      border: 0;
      color: ${props => props.theme.colors.black};
      padding: ${props => props.theme.paddings.xl};
    }
  }
  .collateral-lock-item {
    margin-bottom: ${props => props.theme.margins.ssuper};
  }

  .collateral-lock-header {
    color: ${props => props.theme.colors.black};
    font-size: ${props => props.theme.fontSizes.xxl};
  }

  .collateral-lock-balance {
    color: ${props => props.theme.colors.grey};
  }

  .collateral-help-container {
    display: flex;
    flex-wrap: wrap;
    margin: ${props => props.theme.margins.xxl} 0;
  }

  .collateral-help-header {
    color: ${props => props.theme.colors.black};
    font-size: ${props => props.theme.fontSizes.base};
    margin-bottom: ${props => props.theme.margins.base};
  }

  .collateral-help-explanation {
    color: ${props => props.theme.colors.grey};
  }

  .collateral-selection-container {
    display: flex;
  }
  .collateral-help-item {
    flex: 1 1 33.33%;
  }

  .collateral-selection {
    margin-bottom: ${props => props.theme.margins.xxl} !important;
  }
`);
