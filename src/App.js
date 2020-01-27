import ReactGA from "react-ga";
import React from "react";
import Main from "./navigation/Main.js";
import { BrowserRouter as Router } from "react-router-dom";

import "./App.css";

ReactGA.initialize("UA-141023410-2");
ReactGA.pageview(window.location.pathname + window.location.search);

function App() {
  return (
    <div className="App">
      <Router>
        <Main />
      </Router>
    </div>
  );
}

export default App;
