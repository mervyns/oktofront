import React from "react";
import { Col, Row, Skeleton } from "antd";
import StockIndexCard from "./StockIndexCard";
import axios from "axios";

class IndicesContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      stockData: []
    };
  }
  componentDidMount() {
    this.loadStockPrices();
  }

  loadStockPrices = () => {
    this.setState({ loading: true }, async () => {
      try {
        const data1 = await axios.get(
          `${process.env.REACT_APP_ALPHAVANTAGE_URL}query?function=GLOBAL_QUOTE&symbol=DJIA&apikey=${process.env.REACT_APP_ALPHAVANTAGE_API_KEY}`
        );
        const data2 = await axios.get(
          `${process.env.REACT_APP_ALPHAVANTAGE_URL}query?function=GLOBAL_QUOTE&symbol=GSPC&apikey=${process.env.REACT_APP_ALPHAVANTAGE_API_KEY}`
        );
        const data3 = await axios.get(
          `${process.env.REACT_APP_ALPHAVANTAGE_URL}query?function=GLOBAL_QUOTE&symbol=STI&apikey=${process.env.REACT_APP_ALPHAVANTAGE_API_KEY}`
        );
        this.setState({
          stockData: [
            data1.data["Global Quote"],
            data2.data["Global Quote"],
            data3.data["Global Quote"]
          ]
        });
        console.log(this.state);
      } catch (e) {
      } finally {
        this.setState({ loading: false });
      }
    });
  };

  render() {
    return (
      <>
        <Row>
          {this.state.loading ? (
            <>
              <Col span={8}>
                <Skeleton loading={this.state.loading} active />
              </Col>
              <Col span={8}>
                <Skeleton loading={this.state.loading} active />
              </Col>
              <Col span={8}>
                <Skeleton loading={this.state.loading} active />
              </Col>
            </>
          ) : (
            this.state.stockData.map((item, index) => {
              console.log("ITEM", item);
              return (
                <Col span={8} key={index}>
                  <StockIndexCard
                    stock={item}
                    loading={this.state.loading}
                    key={index}
                  />
                </Col>
              );
            })
          )}
        </Row>
      </>
    );
  }
}

export default IndicesContainer;
