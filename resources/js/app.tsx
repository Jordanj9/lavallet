import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import Routes from "./components/Routes";
import { store } from "./redux/store";
import "./authAxios";

const Root = () => {
  return (
    <Provider store={store}>
      <Routes />
    </Provider>
  );
};

if (document.getElementById("root")) {
  ReactDOM.render(<Root />, document.getElementById("root"));
}
