import React, { useState, useEffect } from "react";
import Parser from "rss-parser";
let parser = new Parser();

class RSSParser extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      stockData: []
    };
  }
  componentDidMount() {
    this.fetchData();
  }
  fetchData = async () => {
    parser.parseURL(
      "https://cors-anywhere.herokuapp.com/" +
        "http://www.marketwatch.com/rss/topstories",
      function(err, feed) {
        if (err) throw err;
        console.log(feed.title);
        feed.items.forEach(function(entry) {
          console.log(entry.title + ":" + entry.link);
        });
      }
    );
  };

  render() {
    return <></>;
  }
}

export default RSSParser;
