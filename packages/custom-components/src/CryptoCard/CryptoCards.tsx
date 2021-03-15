import { classes } from "@canvas-ui/react-util";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { BareProps } from "@canvas-ui/react-components/types";
import useNomics from "./useNomics";
import CryptoCard from "./CryptoCard";

interface Props extends BareProps {
  abbrs: Array<string>;
}

function CryptoCards({ className, abbrs }: Props): React.ReactElement<Props> {
  const [data, setData] = useNomics(true, abbrs, null);
  const [data2, setData2] = useNomics(true, abbrs, null, true);

  const renderCards = () => {
    return abbrs.map((abbr, index) => {
      return (
        <CryptoCard
          key={abbr}
          {...(data === null
            ? { loading: true }
            : {
                name: data[index].name,
                abbr: data[index].symbol,
                image: data[index].logo_url,
                value: data[index].price,
                circulatingSupply: data[index].circulating_supply,
                marketCap: data[index].market_cap,
                high: data[index].high,
                priceChange: data[index]["1d"].price_change,
                prices: data2 !== null && data2[index].prices
              })}
        />
      );
    });
  };

  return <div className={classes(className, "crypto-cards--Wrapper")}>{renderCards()}</div>;
}

export default React.memo(styled(CryptoCards)`
  display: flex;
  flex-wrap: nowrap;
  overflow-x: auto;
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */

  &::-webkit-scrollbar {
    display: none;
  }

  .crypto-card--Wrapper {
    margin-right: 32px;
  }
`);
