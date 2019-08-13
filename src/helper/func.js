// Declare this so our linter knows that tableau is a global object
/* global tableau */

const initTableau = () =>
  // create a new promise for loading the sheets and the subsequent data sources
  new Promise((resolve, reject) => {
    console.log("[func.js] Initialise Tableau");
    var dataSourceFetchPromises = [];
    var dashboardDataSources = {};
    const getdashboard = tableau.extensions.dashboardContent.dashboard;

    var meta = getdashboard.worksheets.map(worksheet => {
      dataSourceFetchPromises.push(worksheet.getDataSourcesAsync());
      return dataSourceFetchPromises;
    });

    console.log(`[func.js] Found ${meta.length} sheets`);

    Promise.all(dataSourceFetchPromises).then(fetchResults => {
      fetchResults.forEach(dataSourcesForWorksheet => {
        dataSourcesForWorksheet.forEach(dataSource => {
          if (!dashboardDataSources[dataSource.id]) {
            dashboardDataSources[dataSource.id] = dataSource;
          }
        });
      });
      console.log(`[func.js] Meta initialised`);
      resolve(dashboardDataSources);
    });
  });

// set the timer clock to the value specified in the config window
// if counter is in minutes return interval multiplied by 60
const intervalTime = (val1, val2) => {
  if (val1 === "Minutes") {
    return val2 * 60;
  } else {
    return val2;
  }
};

export { initTableau, intervalTime };
