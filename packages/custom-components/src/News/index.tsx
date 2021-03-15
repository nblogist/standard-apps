import { classes } from "@canvas-ui/react-util";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { BareProps } from "@canvas-ui/react-components/types";
import getTableData from "./getNews";

interface Props extends BareProps {
  abbr: string;
}

function News({ className, abbr = "" }: Props): React.ReactElement<Props> {
  const [data, setData] = getTableData();

  return (
    <div className={classes(className, "news--Wrapper")}>
      {data !== null ? (
        <div>
          <img src={data.src} />
          <div>
            NEWS
            <span>{data.date.toISOString().slice(0, 10)}</span>
          </div>
          <h1>{data.title}</h1>
          <p>{data.content}</p>
          <a href={data.link}>Read More ></a>
        </div>
      ) : (
        <div>loading</div>
      )}
    </div>
  );
}

export default React.memo(styled(News)`
  background: transparent;
  display: inline-block;
  min-width: 300px;
  width: 33.33%;
  box-sizing: border-box;
  padding-right: 32px;

  img {
    width: 100%;
    height: 100%;
    border-radius: 20px;
    margin-bottom: 12px;
  }

  span {
    margin-left: 8px;
  }

  h1 {
    color: ${props => props.theme.text};
    font-size: 16px;
    line-height: 24px;
    margin: 24px 0;
  }

  p {
    color: ${props => props.theme.textlight};
    font-size: 14px;
    line-height: 20px;
  }
`);
