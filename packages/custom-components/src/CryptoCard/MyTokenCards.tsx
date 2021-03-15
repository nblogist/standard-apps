import { classes } from "@canvas-ui/react-util";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { BareProps } from "@canvas-ui/react-components/types";

import useAccount from '../useAccount';
import MyTokenCard from "./MyTokenCard";

interface Props extends BareProps {
  abbrs: Array<string>;
}

function MyTokenCards({ className, abbrs }: Props): React.ReactElement<Props> {
  const [data, setData] = useState<any>({});
  const [getBalance] = useAccount();
  
  useEffect(() => {
    getBalance().then((res)=> {setData({...data, stnd: {name: 'Standard', abbr:'STND', image: 'https://i.imgur.com/efse8KH.png',amt: res.free.toHuman() }})}).catch(err => {
      console.log('err', err);
    })
  },[])


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
