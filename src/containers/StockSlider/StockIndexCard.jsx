import React from "react";
import { Card, Skeleton } from "antd";

const { Item } = Card;

const StockIndexCard = props => {
  console.log(props);
  const { stock } = props;
  return (
    <>
      {/* {this.props.loading && <Skeleton />} */}
      <Card loading={props.loading}>
        {stock && (
          <>
            <p>{stock["01. symbol"]}</p>
            <p>{stock["05. price"]}</p>
          </>
        )}
      </Card>
    </>
  );
};

export default StockIndexCard;
