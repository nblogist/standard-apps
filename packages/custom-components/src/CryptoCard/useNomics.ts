import React, { useState, useEffect, useRef } from "react";
import axios from "axios";

function useNomics(batch: boolean = false, abbrs?: any, abbr?: any): Array<any> {
  const [data, setData] = useState(null);
  const fetchRef: any = useRef();

  useEffect(() => {
    fetchRef.current = setInterval(() => {
      getData();
    }, 5000);

    return () => {
      clearInterval(fetchRef.current);
    };
  }, [data]);

  const getData = () => {
    axios
      .get(
        `https://api.nomics.com/v1/currencies/ticker?key=87ebd361772525bd300d154124e24d55&ids=${
          batch ? abbrs.join(",") : abbr
        }&intervdal=1d,30d&convert=USD&per-page=100&page=1`
      )
      .then((res: any) => {
        // console.log(res);
        if (!batch) setData(res.data[0]);
        else setData(res.data);
      })
      .catch(err => {
        // console.log(err);
      });
  };

  return [data, setData];
}

export default useNomics;
