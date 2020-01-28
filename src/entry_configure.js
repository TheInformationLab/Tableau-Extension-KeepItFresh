import "react-app-polyfill/ie11";
import "react-app-polyfill/stable";
import React from "react";
import ReactDOM from "react-dom";
import "./fonts/PTSans-Regular.ttf";
import "./index.css";
import "./App.css";
import Configure from "./components/configure/Configure";

ReactDOM.render(<Configure />, document.getElementById("root"));
