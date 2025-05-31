const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: "https://qauto.forstudy.space/",
    retries: { 
      runMode: 3,
      openMode: 2,
    },
  },
});
