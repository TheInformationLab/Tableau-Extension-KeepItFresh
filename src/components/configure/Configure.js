import React, { useState, useEffect } from "react";
import { Spinner } from "@tableau/tableau-ui";
import Header from "../../helper/Header";
import Togglebutton from "./Toggle/Togglebutton";
import StepperInput from "./Stepper/StepperInput";
import Footer from "../../helper/Footer";
import Colourpicker from "./ColourPicker/Colourpicker";

import { Datasources } from "../configure/Datasources";
// helper functions
import { initTableau } from "../../helper/func";

// Declare this so our linter knows that tableau is a global object
/* global tableau */

function Configure(props) {
  const [datasource, setDatasource] = useState();
  const [stepperValue, setStepperValue] = useState(30);
  const [intervalValue, setIntervalValue] = useState();
  const [disableButton, setDisableButton] = useState(false);
  const [pickerVisible, setPickerVisable] = useState(false);
  const [togglePicker, setTogglePicker] = useState(false);
  const [background, setBackground] = useState("#000");

  useEffect(() => {
    console.log("[Configure.js] Initialise Config Screen", props);

    tableau.extensions.initializeDialogAsync().then(openPayload => {
      // check if settings still persist
      let selectedUpdateToggle = tableau.extensions.settings.get("updateToggle");
      let selectedDataSources = tableau.extensions.settings.get("dataSourceList");
      let selectedStepperValue = tableau.extensions.settings.get("timeRefresh");
      let selectedIntervalValue = tableau.extensions.settings.get("intervalValue");
      let selectedTimerColour = tableau.extensions.settings.get("timerColour");
      let selectedColourPicker = tableau.extensions.settings.get("updateColourPicker");

      if (selectedUpdateToggle && selectedUpdateToggle !== null) {
        console.log("[Configure.js] Got toggle data from wb", selectedUpdateToggle);
        props.updateHandler(JSON.parse(selectedUpdateToggle));
      } else {
        props.updateHandler(false);
      }

      if (selectedStepperValue && selectedStepperValue !== null) {
        console.log("[Configure.js] Got stepper data from wb: ", selectedStepperValue);
        setStepperValue(JSON.parse(selectedStepperValue));
      } else {
        setStepperValue(30);
      }

      if (selectedIntervalValue && selectedIntervalValue !== null) {
        console.log("[Configure.js] Got timeInterval data from wb: ", selectedIntervalValue);
        setIntervalValue(JSON.parse(selectedIntervalValue));
      } else {
        setIntervalValue("Seconds");
      }

      if (selectedTimerColour && selectedTimerColour !== null) {
        console.log("[Configure.js] Got background colour from wb: ", selectedTimerColour);
        setBackground(JSON.parse(selectedTimerColour));
      } else {
        setBackground("#000");
      }

      if (selectedColourPicker && selectedColourPicker !== null) {
        console.log("[Configure.js] Got colour picker info from wb: ", selectedColourPicker);
        setTogglePicker(JSON.parse(selectedColourPicker));
      } else {
        setTogglePicker(false);
      }

      initTableau().then(meta => {
        const newArr = Object.keys(meta).map(key => {
          return { data: meta[key], checked: false };
        });
        if (selectedDataSources && selectedDataSources != null) {
          setDatasource(JSON.parse(selectedDataSources));
        } else {
          setDatasource(newArr);
        }
      });
    });
    return function cleanup() {
      console.log("[Configure.js] Unmounting the component!");
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function toggle(id) {
    let checkChange = !datasource[id].checked;
    let changeDatasourceCheck = { data: datasource[id].data, checked: checkChange };
    const updatedDatasource = [...datasource];
    updatedDatasource[id] = changeDatasourceCheck;
    setDatasource(updatedDatasource);
  }

  function changeValueFunc(value) {
    setStepperValue(value);
  }

  function changeIntervalValueFunc(value) {
    setIntervalValue(value);
  }

  // Summary Component if datasources checked
  function ListCheckedDataSources() {
    let checkDataSourcesList = datasource.filter(dsource => {
      return dsource.checked;
    });
    console.log(checkDataSourcesList.length);
    let countDataSources = checkDataSourcesList.length > 0 ? checkDataSourcesList.length : 0;
    if (countDataSources === 0 && !props.on) {
      return <p>You are not refreshing any datasource</p>;
    } else if (!props.on) {
      return <p>You are not refreshing any datasource</p>;
    } else if (countDataSources > 0 && props.on) {
      return (
        <p>
          You are refreshing{" "}
          {countDataSources === 1 ? <span>1 datasource</span> : <span>{countDataSources} datasources</span>}, every{" "}
          {stepperValue} {intervalValue}
        </p>
      );
    } else {
      return <p>You are not refreshing any datasource</p>;
    }
  }

  function updateToggleButtons(bool) {
    props.updateHandler(bool);
    tableau.extensions.settings.set("updateToggle", bool);
    tableau.extensions.settings.saveAsync().then(() => {
      console.log("[Configure.js] Saved settings!");
    });
  }

  function updatePicker() {
    console.log(`[Configure.js] changing the picker state`, pickerVisible);
    setPickerVisable(prevState => !prevState);
  }

  function setPickerColour(colour) {
    setBackground(colour.hex);
    console.log(`[Configure.js] colour set to`, background);
  }

  function showHidePicker() {
    setTogglePicker(prevState => !prevState);
    console.log(`[Config.js] changing colour picker state`);
  }

  function applySettings() {
    console.log("[Configure.js] Applying Settings");
    // map over the datasources and add to workbook saved settings
    const dataSourceList = datasource.map(dssource => {
      return { data: { name: dssource.data.name }, checked: dssource.checked };
    });

    let newList = dataSourceList.filter(dsource => {
      return dsource.checked;
    });

    let refreshOnOff = newList.length === 0 ? JSON.stringify(false) : JSON.stringify(props.on);

    tableau.extensions.settings.set("dataSourceList", JSON.stringify(dataSourceList));
    tableau.extensions.settings.set("timeRefresh", JSON.stringify(stepperValue));
    tableau.extensions.settings.set("intervalValue", JSON.stringify(intervalValue));
    tableau.extensions.settings.set("updateToggle", refreshOnOff);
    tableau.extensions.settings.set("timerColour", JSON.stringify(background));
    tableau.extensions.settings.set("updateColourPicker", JSON.stringify(togglePicker));

    tableau.extensions.settings.saveAsync().then(() => {
      console.log("[Configure.js] Saved settings!");
    });
  }

  function resetSettings() {
    setDisableButton(true);
    console.log("[Configure.js] reset Settings called");
    tableau.extensions.settings.erase("dataSourceList");
    //resetting the toggle
    tableau.extensions.settings.erase("updateToggle");
    props.updateHandler(false);
    setStepperValue(30);
    setIntervalValue("seconds");
    setBackground("#000");
    setTogglePicker(false);
    initTableau().then(meta => {
      const newArr = Object.keys(meta).map(key => {
        return { data: meta[key], checked: false };
      });
      setDatasource(newArr);
    });
    tableau.extensions.settings.saveAsync().then(() => {
      console.log("[Configure.js] Settings! erased");
      setDisableButton(false);
    });
  }

  function closeWindow() {
    console.log("[Configure.js] closing the config window...");
    applySettings();
    tableau.extensions.ui.closeDialog();
  }

  return (
    <div>
      <Header cancelHandler={closeWindow} />
      {!datasource ? (
        <div className="spinner" aria-busy>
          <Spinner />
        </div>
      ) : (
        <div className="main">
          <h4>Select {datasource.length === 1 ? <span>Datasource</span> : <span>Datasources</span>} to refresh</h4>
          <Datasources datasources={datasource} toggleHandler={toggle} />
          <h4>Select Refresh Time</h4>
          <StepperInput
            stepperValue={stepperValue}
            stepperHandler={changeValueFunc}
            intervalValue={intervalValue}
            intervalHandler={changeIntervalValueFunc}
          />
          <h4>Refresh Toggle</h4>
          <Togglebutton onItem={props.on} updateHandler={updateToggleButtons} />
          <h4>Display Countdown</h4>
          <Togglebutton onItem={togglePicker} updateHandler={showHidePicker} />
          {togglePicker && (
            <Colourpicker
              updateHandler={updatePicker}
              pickerVisible={pickerVisible}
              background={background}
              handleChangeComplete={setPickerColour}
            />
          )}
          <h4>Summary:</h4>
          <ListCheckedDataSources />
        </div>
      )}
      <div className="footer">
        <Footer
          applySettingsHandler={applySettings}
          resetSettingsHandler={resetSettings}
          disableButton={disableButton}
        />
      </div>
    </div>
  );
}

export default Configure;
