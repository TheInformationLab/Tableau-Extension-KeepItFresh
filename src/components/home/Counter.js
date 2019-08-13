import React from "react";

import ReactCountdownClock from "react-countdown-clock";

function Counter(props) {
  React.useEffect(() => {
    console.log("[Counter.js] received props", props);
  }, [props]);

  return (
    <>
      <ReactCountdownClock
        key={props.state.completions}
        paused={props.paused}
        showMilliseconds={props.state.showMilliseconds}
        pausedText={props.state.pausedText}
        seconds={props.state.seconds}
        color={props.state.color}
        alpha={props.state.alpha}
        size={props.state.size}
        bool={props.state.bool}
        onComplete={props.stateHandler}
        onClick={props.clickHandler}
      />
      <p>{props.state.bool}</p>
    </>
  );
}

export default Counter;
