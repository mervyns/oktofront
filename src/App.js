import React from "react";
import { Layout } from "antd";
import "./App.css";
import MenuBar from "./components/MenuBar";
import ContentContainer from "./containers/ContentContainer";

const { Header, Content, Footer } = Layout;
function App() {
  return (
    <>
      <Header>
        <MenuBar />
      </Header>
      <div style={{ padding: "26px", margin: "10px" }}>
        <ContentContainer />
      </div>
      <Footer></Footer>
    </>
  );
}

export default App;
