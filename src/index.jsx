import ReactDOM from "react-dom";
import "./index.css";
import React from "react";
// import "./index.scss";
import './pomo.css';
import App from "./App";
import { Provider } from "react-redux";
import store from "./store/store";
import "bootstrap/dist/css/bootstrap.min.css";

const root = ReactDOM.createRoot(
  document.getElementById("root")
);

root.render(
  React.createElement(Provider, { store: store },
    React.createElement(App, null)
  )
);
