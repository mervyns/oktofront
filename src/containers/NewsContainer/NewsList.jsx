import React from "react";
import Parser from "rss-parser";
import { List } from "antd";
let parser = new Parser();

class NewsList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      newsData: []
    };
  }
  componentDidMount() {
    this.fetchData();
  }
  fetchData = async () => {
    parser.parseURL(
      "https://cors-anywhere.herokuapp.com/" +
        "http://www.marketwatch.com/rss/topstories",
      (err, feed) => {
        if (err) throw err;
        else if (feed.items) {
          this.setState({ newsData: feed.items });
          console.log(this.state.newsData);
        }
      }
    );
  };

  render() {
    return (
      <>
        <h2>Top News Stories</h2>
        <List
          itemLayout="vertical"
          dataSource={this.state.newsData}
          bordered={true}
          renderItem={item => (
            <List.Item key={item.guid}>
              <List.Item.Meta
                title={<a href={item.link}>{item.title}</a>}
                description={`Published On: ${item.pubDate}`}
              />
              {item.contentSnippet}
            </List.Item>
          )}
        />
      </>
    );
  }
}

export default NewsList;
