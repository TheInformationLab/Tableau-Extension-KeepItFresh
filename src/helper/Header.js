import React from "react";

import classes from "./Header.module.css";
import logo from "./logo.svg";

function Header({ cancelHandler }) {
  return (
    <div id="topHeader">
      <div className={classes.logoBanner}>
        <img style={{ height: 20 }} src={logo} alt="The Information Lab" />
      </div>
      <p className={classes.cancel} onClick={cancelHandler}>
        <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24">
          <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
          <path d="M0 0h24v24H0z" fill="none" />
        </svg>
      </p>
    </div>
  );
}

// removed the overflow hidden here

export default Header;
