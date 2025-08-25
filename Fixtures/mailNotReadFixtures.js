const { test: baseTest } = require('@playwright/test');
const { mailNotRead } = require('../PageObjects/mailNotRead');
const { LoginPage } = require("../PageObjects/LoginPage");
const { PageNavigation } = require('../PageObjects/PageNavigation');
const config = require('../config.js');
const path = require('path');

// Load environment configuration
require('dotenv').config();
const env = process.env.ENVIRONMENT || 'qa'; // Default to qa if not set
const envConfig = config[env] || config.qa; // Fallback to qa if environment is invalid

// Create a fixture that provides initialized page objects
const mailNotReadTest = baseTest.extend({
  mailNotReadPage: async ({ page }, use) => {
    const mailnotreadInstance = new mailNotRead(page);
    console.log("Mail Not Read page object initialized");
    await use(mailnotreadInstance);
  },
  loginPage: async ({ page }, use) => {
    const loginPageInstance = new LoginPage(page);
    console.log("Login page object initialized");
    await use(loginPageInstance);
  },
  pageNav: async ({ page }, use) => {
    const pageNavInstance = new PageNavigation(page);
    console.log("Page navigation object initialized");
    await use(pageNavInstance);
  },  // Add a loggedIn fixture that handles common login only
  loggedIn: async ({ page, loginPage }, use) => {
    // Set the timeout for each test - longer timeout to accommodate screenshot operations
    baseTest.setTimeout(120000);
    
    console.log("Performing login...");
    // Standard login flow only
    await loginPage.navigateTo(envConfig.baseURL);
    await loginPage.login(envConfig.userName, envConfig.password);
    console.log("Login successful");
    
    await use();
  },
  // New fixture that navigates to Mail Not Read page
  // This combines all the common steps for accessing Mail Not Read page
  mailNotReadPageReady: async ({ loggedIn, pageNav, mailNotReadPage }, use, testInfo) => {
    // Set up the test name for organized screenshots
    await mailNotReadPage.setTestInfo(testInfo.title);
    // Initialize the screenshot folder
    await mailNotReadPage.initializeTestScreenshotFolder();
    
    console.log("Navigating to Messages menu...");
    await pageNav.navigateToMessages();
    await mailNotReadPage.waitForPageStable(3000);
    
    console.log("Clicking on Mail Not Read menu item...");
    try {
      // If having trouble finding the menu item, run diagnostics first
      // await mailNotReadPage.findAllMenuItems();
      
      await mailNotReadPage.clickOnReactMailNotRead();
    } catch (error) {
      console.error(`Error clicking Mail Not Read: ${error.message}`);
      
      // Take a screenshot to help diagnose the issue
      await mailNotReadPage.page.screenshot({ path: 'mail-not-read-fixture-error.png' });
      
      // Run a diagnostic to see what menu items are available
      console.log("Running menu diagnostics after failure...");
      await mailNotReadPage.findAllMenuItems();
      
      throw error; // Re-throw the error to fail the test
    }
    
    console.log("Ensuring page is fully loaded...");
    await mailNotReadPage.PageLoaded();
    console.log("Mail Not Read page fully loaded and ready for testing");
    
    await use();
  }
});

module.exports = { mailNotReadTest };
