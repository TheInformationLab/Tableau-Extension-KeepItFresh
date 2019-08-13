import React from "react";
import { Button } from "@tableau/tableau-ui";

function Togglebutton(props) {
  console.log("[ToggleButton.js renders]", props);
  return (
    <div>
      <Button kind={props.onItem ? "primary" : "outline"} onClick={() => props.updateHandler(true)}>
        On
      </Button>
      <Button kind={!props.onItem ? "destructive" : "outline"} onClick={() => props.updateHandler(false)}>
        Off
      </Button>
    </div>
  );
}

export default Togglebutton;
