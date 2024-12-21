const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on,_ /*config*/) {
      // implement node event listeners here
    },
  },
});