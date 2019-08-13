import React, { useState, useEffect } from "react";
import { Route } from "react-router-dom";

import Configure from "../components/configure/Configure.js";
import Home from "../components/home/Home.js";

function Main() {
  // on is for the first button
  const [on, setOn] = useState();

  useEffect(() => {
    console.log("[Main.js] mounts");
    setOn(true);
  }, []);

  function updateToggleButtons(bool) {
    setOn(bool);
  }

  const renderHome = () => {
    return <Home on={on} updateHandler={updateToggleButtons} />;
  };

  const renderConfigure = () => {
    return <Configure on={on} updateHandler={updateToggleButtons} />;
  };

  return (
    <section>
      <Route path="/" exact render={renderHome} />
      <Route path="/configure/" exact render={renderConfigure} />
    </section>
  );
}

export default Main;
