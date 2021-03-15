import { classes } from "@canvas-ui/react-util";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { BareProps } from "@canvas-ui/react-components/types";
import { useApi } from "@canvas-ui/react-hooks";
import { useCurrentUser } from "@canvas-ui/custom-components";

import useAccount from "../useAccount";
import MyTokenCard from "./MyTokenCard";
import { api } from "@canvas-ui/react-api";

interface Props extends BareProps {
  abbrs: Array<string>;
}

function MyTokenCards({ className, abbrs }: Props): React.ReactElement<Props> {
  const [data, setData] = useState<any>({});
  const api = useApi().api;
  const currentUserAccount = useCurrentUser();

  useEffect(() => {
    if (currentUserAccount.currentAddress !== "") {
      api.query.balances
        .account(currentUserAccount.currentAddress)
        .then(res => {
          console.log(res.free.toNumber(), res.free.toHuman(), res.free.toString());
          setData({
            ...data,
            stnd: { name: "Standard", abbr: "STND", image: "https://i.imgur.com/efse8KH.png", amt: res.free.toNumber() }
          });
          console.log(res);
        })
        .catch(err => console.log(err));
    }
  }, [currentUserAccount.currentAddress]);

  const renderCards = () => {
    return Object.keys(data).map((abbr, index) => {
      return (
        <MyTokenCard
          key={index}
          {...(data === null
            ? { loading: true }
            : {
                name: data[abbr].name,
                abbr: data[abbr].abbr,
                image: data[abbr].image,
                amt: data[abbr].amt
              })}
        />
      );
    });
  };

  return <div className={classes(className, "crypto-cards--Wrapper")}>{renderCards()}</div>;
}

export default React.memo(styled(MyTokenCards)`
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
