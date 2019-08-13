import React from "react";

import Datasource from "./Datasource";

export const Datasources = React.memo(({ datasources, toggleHandler }) => {
  console.log("[Datasources.js] renders");

  function DataSourceList() {
    const listItems = datasources.map((item, i) => (
      <Datasource
        key={i}
        datasource={item}
        toggleHandler={() => {
          toggleHandler(i);
        }}
      />
    ));
    return listItems;
  }

  return <div>{datasources.length < 1 ? <p>No datasources..</p> : <DataSourceList />}</div>;
});

// export default Datasources;
