import React, { useEffect, useState } from "react";
import { intervalTime } from "../../helper/func";

import Counter from "./Counter";

// Declare this so our linter knows that tableau is a global object
/* global tableau */

function Home(props) {
  // create some state
  const [counter, setCounter] = useState({
    completions: 1,
    seconds: 10,
    showMilliseconds: false,
    pausedText: "▐▐ ",
    color: "#000",
    alpha: 0.9,
    size: 70,
  });
  const [paused, setPaused] = useState(true);

  useEffect(() => {
    console.log("[Home.js] Props Changed", props);
  }, [props]);

  //Initialise Extension
  useEffect(() => {
    tableau.extensions.initializeAsync({ configure: configure }).then(() => {
      console.log("[Home.js] Opening...");
      console.log(
        `[Home.js] checked data source list:`,
        checkedDataSourcesList()
      );

      //checking if toggle is on or off
      let selectedUpdateToggle =
        tableau.extensions.settings.get("updateToggle");
      //this is list of data sources
      let selectedDataSources =
        tableau.extensions.settings.get("dataSourceList");
      //this is the actually value
      let selectedStepperValue = tableau.extensions.settings.get("timeRefresh");
      // minutes or seconds
      let selectedIntervalValue =
        tableau.extensions.settings.get("intervalValue");
      // find the colour from the workbook settings
      let selectedTimerColour = tableau.extensions.settings.get("timerColour");

      if (selectedUpdateToggle && selectedUpdateToggle !== null) {
        props.updateHandler(JSON.parse(selectedUpdateToggle));
        if (selectedDataSources && selectedDataSources !== null) {
          console.log(
            `[Home.js] ${
              JSON.parse(selectedDataSources).length
            } datasources found`
          );
          console.log(
            `[Home.js] Every ${JSON.parse(selectedStepperValue)} ${JSON.parse(
              selectedIntervalValue
            )} going to refresh`
          );
          console.log(
            `[Home.js] Received Colour ${JSON.parse(selectedTimerColour)}`
          );
          let minsOrSecs = JSON.parse(selectedIntervalValue)
            ? JSON.parse(selectedIntervalValue)
            : "Seconds";
          setPaused(JSON.parse(selectedUpdateToggle) ? false : true);
          setCounter((currentState) => ({
            ...currentState,
            seconds: intervalTime(minsOrSecs, JSON.parse(selectedStepperValue)),
            color: JSON.parse(selectedTimerColour),
          }));
        } else {
          console.log("[Home.js] no data sources saved!");
          props.updateHandler(false);
          setPaused(true);
        }
      }
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props]);

  function configure() {
    let payload = "";
    const popupUrl = `${window.location.origin}/configure`;
    tableau.extensions.ui
      .displayDialogAsync(popupUrl, payload, { height: 540, width: 400 })
      .then((closePayload) => {
        console.log("Config window closed");
        refreshSettings();
      })
      .catch((error) => {
        switch (error.errorCode) {
          case tableau.ErrorCodes.DialogClosedByUser:
            console.log("[Home.js] Dialog was closed by user");
            refreshSettings();
            console.log("[Home.js] Config window closed", props);
            break;
          default:
            console.error("[Home.js]", error.message);
        }
      });
  }

  // when the refreshtimer has finished, execute this function
  // it increments the number of completions, to make sure the component rerenders
  const newState = () => {
    setPaused((paused) => !paused);
    const getdashboard = tableau.extensions.dashboardContent.dashboard;
    let dataSourceFetchPromises = [];
    let dashboardDataSources = {};

    // eslint-disable-next-line
    getdashboard.worksheets.map((worksheet) => {
      dataSourceFetchPromises.push(worksheet.getDataSourcesAsync());
    });

    Promise.all(dataSourceFetchPromises).then((fetchResults) => {
      fetchResults.forEach((dataSourcesForWorksheet) => {
        dataSourcesForWorksheet.forEach((dataSource) => {
          if (!dashboardDataSources[dataSource.id]) {
            dashboardDataSources[dataSource.id] = dataSource;
          }
        });
      });
      // eslint-disable-next-line
      checkedDataSourcesList().map((item) => {
        for (let dataSourceId in dashboardDataSources) {
          let name = item.data.name;
          const dataSource = dashboardDataSources[dataSourceId];
          if (dataSource.name === name) {
            // eslint-disable-next-line
            dataSource.refreshAsync().then(() => {
              console.log("[Home.js] Refreshed ", dataSource);
            });
          }
        }
      });
      setTimeout(() => {
        setPaused((paused) => !paused);
      }, 5000);
    });

    console.log("[Home.js] countdown finished!");
    // set the newstate with the new completions number
    setCounter((currentState) => ({
      ...currentState,
      completions: currentState.completions + 1,
    }));
  };

  function checkedDataSourcesList() {
    let selectedDataSources = tableau.extensions.settings.get("dataSourceList");
    if (selectedDataSources) {
      let list = JSON.parse(selectedDataSources);
      let newList = list.filter((dsource) => {
        return dsource.checked;
      });
      return newList;
    }
  }

  //function that is being called when config changes and window is closed
  function refreshSettings() {
    console.log("[Home.js] refreshing settings", props);
    let selectedStepperValue = tableau.extensions.settings.get("timeRefresh");
    let selectedUpdateToggle = tableau.extensions.settings.get("updateToggle");
    let selectedIntervalValue =
      tableau.extensions.settings.get("intervalValue");
    let selectedTimerColour = tableau.extensions.settings.get("timerColour");

    // this sets the pause setting on the timer component
    if (selectedUpdateToggle) {
      props.updateHandler(JSON.parse(selectedUpdateToggle));
      setPaused(JSON.parse(selectedUpdateToggle) ? false : true);
    }
    if (selectedUpdateToggle && selectedIntervalValue && selectedStepperValue) {
      setCounter((currentState) => ({
        ...currentState,
        seconds: intervalTime(
          JSON.parse(selectedIntervalValue),
          JSON.parse(selectedStepperValue)
        ),
        color: JSON.parse(selectedTimerColour),
      }));
    }
  }

  function handleOnClick() {
    //checking if toggle is on or off
    let selectedUpdateToggle = tableau.extensions.settings.get("updateToggle");
    //this is list of data sources
    let selectedDataSources = tableau.extensions.settings.get("dataSourceList");
    if (selectedUpdateToggle && selectedDataSources) {
      setPaused((paused) => !paused);
    }
  }

  return (
    <>
      <Counter
        state={counter}
        stateHandler={newState}
        paused={paused}
        clickHandler={handleOnClick}
      />
    </>
  );
}

export default Home;
