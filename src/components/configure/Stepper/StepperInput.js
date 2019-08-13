import React from "react";
import { Stepper, DropdownSelect } from "@tableau/tableau-ui";

const items = [{ value: "Seconds" }, { value: "Minutes" }];

const makeOption = (item, index) => (
  <option disabled={item.disabled || item.separator} key={index} value={item.value}>
    {item.value}
  </option>
);

function StepperInput(props) {
  const initialState = { value: props.intervalValue };

  return (
    <div>
      <Stepper
        min={0}
        max={1000}
        step={1}
        pageSteps={1}
        value={props.stepperValue}
        onValueChange={value => {
          props.stepperHandler(value);
          console.log(value);
        }}
      />
      <DropdownSelect
        {...initialState}
        kind="outline"
        onChange={e => {
          console.log(initialState);
          props.intervalHandler(e.target.value);
        }}
      >
        {items.map(makeOption)}
      </DropdownSelect>
    </div>
  );
}

export default StepperInput;
