import React from "react";
import styled from "styled-components";
import { BareProps as Props } from "@canvas-ui/react-components/types";
import { Table as SUITable } from "semantic-ui-react";
import TableHeaders from "./TableHeaders";
import TableCellFactory from "./TableCellFactory";

interface PseudoObject {
  [key: string]: Object;
}
function Table({ className = "", children }: Props): React.ReactElement<Props> {
  // bjhl, very simple
  const pseudoData: Array<PseudoObject> = [
    {
      farm: {
        image: "",
        name: "Onsen",
        pair: "TORN-WETH",
        link: ""
      },
      yield: {
        image: "",
        yieldAmount: "0.228",
        coinTypePeriod: "SP/day",
        points: "20"
      },
      ROI: {
        ["1y"]: "125.39% (1y)",
        ["1m"]: "10.45% (1m)",
        ["1d"]: "0.35% (1d)"
      },
      liquidity: {
        val: "$1,096,905",
        tok1: "1640 TORN",
        tok2: "330.9 WETH"
      }
    },
    {
      farm: {
        image: "",
        name: "Onsen",
        pair: "TORN-WETH",
        link: ""
      },
      yield: {
        image: "",
        yieldAmount: "0.228",
        coinTypePeriod: "SP/day",

        points: "20"
      },
      ROI: {
        ["1y"]: "125.39% (1y)",
        ["1m"]: "10.45% (1m)",
        ["1d"]: "0.35% (1d)"
      },
      liquidity: {
        val: "$1,096,905",
        tok1: "1640 TORN",
        tok2: "330.9 WETH"
      }
    },
    {
      farm: {
        image: "",
        name: "Onsen",
        pair: "TORN-WETH",
        link: ""
      },
      yield: {
        image: "",
        yieldAmount: "0.228",
        coinTypePeriod: "SP/day",
        points: "20"
      },
      ROI: {
        ["1y"]: "125.39% (1y)",
        ["1m"]: "10.45% (1m)",
        ["1d"]: "0.35% (1d)"
      },
      liquidity: {
        val: "$1,096,905",
        tok1: "1640 TORN",
        tok2: "330.9 WETH"
      }
    },
    {
      farm: {
        image: "",
        name: "Onsen",
        pair: "TORN-WETH",
        link: ""
      },
      yield: {
        image: "",
        yieldAmount: "0.228",
        coinTypePeriod: "SP/day",
        points: "20"
      },
      ROI: {
        ["1y"]: "125.39% (1y)",
        ["1m"]: "10.45% (1m)",
        ["1d"]: "0.35% (1d)"
      },
      liquidity: {
        val: "$1,096,905",
        tok1: "1640 TORN",
        tok2: "330.9 WETH"
      }
    },
    {
      farm: {
        image: "",
        name: "Onsen",
        pair: "TORN-WETH",
        link: ""
      },
      yield: {
        image: "",
        yieldAmount: "0.228",
        coinTypePeriod: "SP/day",
        points: "20"
      },
      ROI: {
        ["1y"]: "125.39% (1y)",
        ["1m"]: "10.45% (1m)",
        ["1d"]: "0.35% (1d)"
      },
      liquidity: {
        val: "$1,096,905",
        tok1: "1640 TORN",
        tok2: "330.9 WETH"
      }
    },
    {
      farm: {
        image: "",
        name: "Onsen",
        pair: "TORN-WETH",
        link: ""
      },
      yield: {
        image: "",
        yieldAmount: "0.228",
        coinTypePeriod: "SP/day",
        points: "20"
      },
      ROI: {
        ["1y"]: "125.39% (1y)",
        ["1m"]: "10.45% (1m)",
        ["1d"]: "0.35% (1d)"
      },
      liquidity: {
        val: "$1,096,905",
        tok1: "1640 TORN",
        tok2: "330.9 WETH"
      }
    }
  ];

  const renderRows = () => {
    return pseudoData.map((data, i) => {
      return (
        <SUITable.Row key={i}>
          {Object.keys(data).map((key, j) => {
            return <TableCellFactory key={`${key}-${j}`} type={key} cellData={Object.values(data[key])} />;
          })}
        </SUITable.Row>
      );
    });
  };

  return (
    <div className={className}>
      <SUITable unstackable>
        <TableHeaders headers={["Farm", "Yield per $1000", "ROI", "Liquidity"]} />
        <SUITable.Body>{renderRows()}</SUITable.Body>
      </SUITable>
    </div>
  );
}

export default React.memo(styled(Table)``);
