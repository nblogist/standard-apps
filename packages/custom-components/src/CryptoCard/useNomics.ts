import React, { useState, useEffect, useRef } from "react";
import axios from "axios";

function useNomics(batch: boolean = false, abbrs?: any, abbr?: any, charting: boolean = false): Array<any> {
  const [data, setData] = useState(null);
  const fetchRef: any = useRef();

  useEffect(() => {
    if (!charting) {
      fetchRef.current = setInterval(() => {
        getData();
      }, 5000);

      return () => {
        clearInterval(fetchRef.current);
      };
    } else {
      const timeout = setTimeout(() => {
        fetchRef.current = setInterval(() => {
          getData();
        }, 5000);
      }, 2500);

      return () => {
        clearTimeout(timeout);
        clearInterval(fetchRef.current);
      };
    }
  }, []);

  const getYesterday = (): string => {
    let d = new Date();
    d.setDate(d.getDate() - 1);
    return d.toISOString();
  };

  const getData = () => {
    axios
      .get(
        !charting
          ? `https://api.nomics.com/v1/currencies/ticker?key=87ebd361772525bd300d154124e24d55&ids=${
              batch ? abbrs.join(",") : abbr
            }&intervdal=1d,30d&convert=USD&per-page=100&page=1&sort=rank`
          : `https://api.nomics.com/v1/currencies/sparkline?key=87ebd361772525bd300d154124e24d55&ids=${
              batch ? abbrs.join(",") : abbr
            }&start=${getYesterday()}`
      )
      .then((res: any) => {
        if (!batch) setData(res.data[0]);
        else {
          let _data = res.data;
          _data.sort((a: any, b: any) => (a.currency <= b.currency ? -1 : 1));
          setData(_data);
        }
      })
      .catch(err => {
        // console.log(err);
      });
  };

  return [data, setData];
}

export default useNomics;
