import React, { useState, useEffect } from "react";
import axios from "axios";

const NEWS_DATA: any = {
  title: "TITLE",
  content:
    "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum",
  author: "AUTHOR",
  date: new Date(),
  link: "https://google.com",
  src: "https://i.imgur.com/XIWg1LN.png"
};

// bjhl, replace with general axios getter hook later on
function getNews(batch: boolean = false, abbrs?: any, abbr?: any, charting: boolean = false): Array<any> {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    setData(NEWS_DATA);
  };

  return [data, setData];
}

export default getNews;
