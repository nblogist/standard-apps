import React, { useState, useEffect } from "react";
import axios from "axios";

const pseudoData: any = [
  {
    farm: {
      image: "",
      name: "",
      pair: "TORN-WETH",
      link: ""
    },
    yield: {
      image: "",
      yieldAmount: "0.228",
      coinType: "TOK",
      unit: "day",
      points: "20"
    },
    ROI: {
      ["1y"]: "125.39%",
      ["1m"]: "10.45%",
      ["1d"]: "0.35%"
    },
    liquidity: {
      val: "$1,096,905",
      tok1: "TORN",
      tok1Amt: "1640",
      tok2: "WETH",
      tok2Amt: "330.9"
    }
  },
  {
    farm: {
      image: "",
      name: "",
      pair: "TORN-WETH",
      link: ""
    },
    yield: {
      image: "",
      yieldAmount: "0.228",
      coinType: "TOK",
      unit: "day",

      points: "20"
    },
    ROI: {
      ["1y"]: "125.39%",
      ["1m"]: "10.45%",
      ["1d"]: "0.35%"
    },
    liquidity: {
      val: "$1,096,905",
      tok1: "TORN",
      tok1Amt: "1640",
      tok2: "WETH",
      tok2Amt: "330.9"
    }
  },
  {
    farm: {
      image: "",
      name: "",
      pair: "TORN-WETH",
      link: ""
    },
    yield: {
      image: "",
      yieldAmount: "0.228",
      coinType: "TOK",
      unit: "day",
      points: "20"
    },
    ROI: {
      ["1y"]: "125.39%",
      ["1m"]: "10.45%",
      ["1d"]: "0.35%"
    },
    liquidity: {
      val: "$1,096,905",
      tok1: "TORN",
      tok1Amt: "1640",
      tok2: "WETH",
      tok2Amt: "330.9"
    }
  },
  {
    farm: {
      image: "",
      name: "",
      pair: "TORN-WETH",
      link: ""
    },
    yield: {
      image: "",
      yieldAmount: "0.228",
      coinType: "TOK",
      unit: "day",
      points: "20"
    },
    ROI: {
      ["1y"]: "125.39%",
      ["1m"]: "10.45%",
      ["1d"]: "0.35%"
    },
    liquidity: {
      val: "$1,096,905",
      tok1: "TORN",
      tok1Amt: "1640 TORN",
      tok2: "WETH",
      tok2Amt: "330.9 WETH"
    }
  },
  {
    farm: {
      image: "",
      name: "",
      pair: "TORN-WETH",
      link: ""
    },
    yield: {
      image: "",
      yieldAmount: "0.228",
      coinType: "TOK",
      unit: "day",
      points: "20"
    },
    ROI: {
      ["1y"]: "125.39%",
      ["1m"]: "10.45%",
      ["1d"]: "0.35%"
    },
    liquidity: {
      val: "$1,096,905",
      tok1: "TORN",
      tok1Amt: "1640",
      tok2: "WETH",
      tok2Amt: "330.9"
    }
  },
  {
    farm: {
      image: "",
      name: "",
      pair: "TORN-WETH",
      link: ""
    },
    yield: {
      image: "",
      yieldAmount: "0.228",
      coinType: "TOK",
      unit: "day",
      points: "20"
    },
    ROI: {
      ["1y"]: "125.39%",
      ["1m"]: "10.45%",
      ["1d"]: "0.35%"
    },
    liquidity: {
      val: "$1,096,905",
      tok1: "TORN",
      tok1Amt: "1640",
      tok2: "WETH",
      tok2Amt: "330.9"
    }
  }
];

function getTableData(batch: boolean = false, abbrs?: any, abbr?: any, charting: boolean = false): Array<any> {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    setData(pseudoData);
  };

  return [data, setData];
}

export default getTableData;
