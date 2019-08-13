import React from "react";
import { CompactPicker } from "react-color";

function Colourpicker({ updateHandler, pickerVisible, handleChangeComplete, background }) {
  // if background is selected as white then add little border around
  const backgroundUpdate = background === "#ffffff" ? "1px solid black" : "0px solid black";
  // inline style so can modify the background variable
  const spanStyle = {
    height: "35px",
    width: "35px",
    backgroundColor: background,
    borderRadius: "50%",
    display: "inline-block",
    marginTop: "10px",
    border: backgroundUpdate
  };
  return (
    <div>
      <span style={spanStyle} onClick={updateHandler} />
      {pickerVisible && (
        <div style={{ position: "absolute" }}>
          <CompactPicker color={background} onChangeComplete={handleChangeComplete} />
        </div>
      )}
    </div>
  );
}

export default Colourpicker;
