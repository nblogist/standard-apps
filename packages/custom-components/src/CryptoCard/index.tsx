import { classes } from "@canvas-ui/react-util";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { BareProps } from "@canvas-ui/react-components/types";
import CryptoCard from "./CryptoCard";
import useNomics from "./useNomics";

interface Props extends BareProps {
  abbr: string;
}

function CryptoCardWrapper({ className, abbr = "" }: Props): React.ReactElement<Props> {
  const [data, setData] = useNomics(false, null, abbr);

  return (
    <div className={classes(className, "crypto-card--Wrapper")}>
      <CryptoCard
        {...(data == null
          ? { loading: true }
          : {
              abbr: data.symbol,
              image: data.logo_url,
              value: data.price,
              circulatingSupply: data.circulating_supply,
              marketCap: data.market_cap,
              high: data.high,
              priceChange: data["1d"].price_change
            })}
      />
    </div>
  );
}

export default React.memo(styled(CryptoCardWrapper)``);
