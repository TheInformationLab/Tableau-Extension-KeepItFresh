import "react-app-polyfill/ie11";
import "react-app-polyfill/stable";
import React from "react";
import ReactDOM from "react-dom";
import "./fonts/PTSans-Regular.ttf";
import "./index.css";
import "./App.css";
import Home from "./components/home/Home";

ReactDOM.render(<Home />, document.getElementById("root"));
