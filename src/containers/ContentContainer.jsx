import React from "react";
import { useSelector } from "react-redux";
import { Col, Row } from "antd";
import SignUpForm from "../components/SignUpForm";
import IndicesContainer from "../containers/StockSlider/IndicesContainer";
import NewsList from "../containers/NewsContainer/NewsList";

const ContentContainer = props => {
  const userState = useSelector(state => state.user, []);

  return (
    <div>
      <h1>Test</h1>
      <SignUpForm showUserModal={userState.showUserModal} />
      {userState.showUserModal.toString()}
      <Row>
        <Col span={18}>
          <IndicesContainer />
        </Col>
      </Row>
      <NewsList />
    </div>
  );
};

export default ContentContainer;
