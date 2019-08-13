import React from "react";
import Main from "./navigation/Main.js";
import { BrowserRouter as Router } from "react-router-dom";

import "./App.css";

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
