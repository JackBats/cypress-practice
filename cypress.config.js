const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: "http://example.cypress.io",
    retries: { 
      runMode: 3,
      openMode: 2,
    },
  },
});
