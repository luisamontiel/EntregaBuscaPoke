const { defineConfig } = require("cypress");
const createBundler = require("@bahmutov/cypress-esbuild-preprocessor");
const { addCucumberPreprocessorPlugin } = require("@badeball/cypress-cucumber-preprocessor");
const { createEsbuildPlugin } = require("@badeball/cypress-cucumber-preprocessor/esbuild");
const { allureCypress } = require("allure-cypress/reporter");
const cypressOnFix = require("cypress-on-fix");

module.exports = defineConfig({
  defaultBrowser: "chrome",
  fixturesFolder: "fixtures",
  screenshotsFolder: "screenshots",
  videosFolder: "videos",
  screenshotOnRunFailure: true,
  video: true,
  e2e: {
    supportFile: "support/e2e.js",
    specPattern: ["**/*.feature", "**/*.cy.js"],
    async setupNodeEvents(on, config) {
      on = cypressOnFix(on);

      await addCucumberPreprocessorPlugin(on, config);

      on(
        "file:preprocessor",
        createBundler({
          plugins: [createEsbuildPlugin(config)],
        })
      );

      allureCypress(on, config, {
        resultsDir: "allure-results",
      });

      return config;
    },

  },
  env: {
    apiUrl: "https://pokeapi.co/api/v2",
  },
});

