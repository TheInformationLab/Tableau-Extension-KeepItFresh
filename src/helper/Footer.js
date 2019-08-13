import React from "react";
import { Button } from "@tableau/tableau-ui";
import classes from "./Footer.module.css";

function Footer({ applySettingsHandler, resetSettingsHandler, disableButton }) {
  return (
    <div>
      <Button disabled={disableButton} className={classes.footerButton} onClick={resetSettingsHandler}>
        Reset
      </Button>
      <Button className={classes.footerButton} kind="primary" onClick={applySettingsHandler}>
        Apply
      </Button>
    </div>
  );
}

export default Footer;
