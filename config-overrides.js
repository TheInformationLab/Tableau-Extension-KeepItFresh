const multipleEntry = require("react-app-rewire-multiple-entry")([
  {
    entry: "src/entry_home.js",
    template: "public/index.html",
    outPath: "/index.html"
  },
  {
    entry: "src/entry_configure.js",
    template: "public/configure.html",
    outPath: "/configure.html"
  }
]);

module.exports = {
  webpack: function(config, env) {
    multipleEntry.addMultiEntry(config);
    return config;
  }
};
