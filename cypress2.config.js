const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: "https://guest:welcome2qauto@qauto2.forstudy.space",
    // retries: { 
    //   runMode: 3,
    //   openMode: 2,
    // },
  },
  env:{
    AUTH_USERNAME: "guest",
    AUTH_PASSWORD: "welcome2qauto",
    TEST_USER_EMAIL: "qa1.tester.001+testUser@gmail.com",
    TEST_USER_PASSWORD: "0xVTSKre18n4C2Y",
  }
});
