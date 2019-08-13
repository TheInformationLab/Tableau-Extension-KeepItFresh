import React from "react";
import { Checkbox } from "@tableau/tableau-ui";

import classes from "./Datasource.module.css";

function Datasource(props) {
  return (
    <>
      <Checkbox
        className={classes.datasourceCheckbox}
        checked={props.datasource.checked}
        onChange={props.toggleHandler}
      >
        {props.datasource.data.name}
      </Checkbox>
      <br />
    </>
  );
}

export default React.memo(Datasource);
