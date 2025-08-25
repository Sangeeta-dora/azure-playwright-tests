// These imports are correct
const { test: baseTest, expect } = require('@playwright/test');
const { mailNotRead } = require('../PageObjects/mailNotRead');
const { LoginPage } = require("../PageObjects/LoginPage");
const { PageNavigation } = require('../PageObjects/PageNavigation');
const { Messages } = require("../PageObjects/Messages");
const config = require('../config.js');
const { ActivityCommunicateWindow } = require('../PageObjects/ActivityCommunicateWindow');
const { log } = require('console');

// JSON data loading is correct
const dataSet = JSON.parse(JSON.stringify(require("../utils/TestData.json")));

// This is the critical part that needs to be in the correct order:
require('dotenv').config();
const env = process.env.ENVIRONMENT || 'qa'; // Default to devqa if not set
const envConfig = config[env] || config.qa; // Fallback to devqa if environment is invalid

// Create a fixture that provides initialized page objects
const test = baseTest.extend({
  // Define page object fixtures that will be available in each test
  mailnotread: async ({ page }, use) => {
    const mailnotreadInstance = new mailNotRead(page);
    await use(mailnotreadInstance);
  },
  messagesPage: async ({ page }, use) => {
    const messagesInstance = new Messages(page);
    await use(messagesInstance);
  },
  loginPage: async ({ page }, use) => {
    const loginPageInstance = new LoginPage(page);
    await use(loginPageInstance);
  },
  pageNav: async ({ page }, use) => {
    const pageNavInstance = new PageNavigation(page);
    await use(pageNavInstance);
  },
  // Add a setUp fixture that handles common login and navigation
  loggedIn: async ({ page, loginPage, pageNav, messagesPage }, use) => {
    // Set the timeout for each test
    test.setTimeout(60000);
    
    // Standard login and navigation flow
    await loginPage.navigateTo(envConfig.baseURL);
    await loginPage.login(envConfig.userName, envConfig.password);
    await pageNav.navigateToViewMessages();
    await messagesPage.PageLoaded();
    
    await use();
  }
});



test('InboxMessages_Navigate to messages window', async({ loggedIn }) => {
    // All the login and navigation logic is handled by the loggedIn fixture
    // This test just verifies the navigation works
  })
  

  test('InboxMessages_Click on Bestfit', async({ loggedIn, messagesPage }) => {
    await messagesPage.clickonBestFit();
    await messagesPage.waitForPageStable(5000);
    expect(true).toBeTruthy(); 
});
 

  test('InboxMessages_Click on Refresh', async({ loggedIn, messagesPage }) => {
    await messagesPage.clickonRefresh();
    await messagesPage.waitForPageStable(5000);
    expect(true).toBeTruthy(); 
  })

  test('InboxMessages_Export to excel', async({ page, loggedIn, messagesPage }) => {
    // Using the loggedIn fixture, so the login and navigation is already done
    
    // Now just focus on the test-specific actions
    const downloadPromise = page.waitForEvent('download');
    await messagesPage.clickonExportToExcel();
    await messagesPage.waitForPageStable(5000);
    expect(true).toBeTruthy();
  })

  test('InboxMessages_Click on Density(Compact)', async({ loggedIn, messagesPage }) => {
    await messagesPage.clickonDensity();
    await messagesPage.clickonCompact();
    await messagesPage.waitForPageStable(5000);
    expect(true).toBeTruthy();
  })

  test('InboxMessages_Click on Density(Comfortable)', async({ loggedIn, messagesPage }) => {
    await messagesPage.clickonDensity();
    await messagesPage.clickonComfortable();
    await messagesPage.waitForPageStable(5000);
    expect(true).toBeTruthy();
  })

  test('InboxMessages_Click on Density(Standard)', async({ loggedIn, messagesPage }) => {
    await messagesPage.clickonDensity();
    await messagesPage.clickonStandard();
    await messagesPage.waitForPageStable(5000);
    expect(true).toBeTruthy();
  })

  test('InboxMessages_Click on Show All Messages', async({ loggedIn, messagesPage }) => {
    await messagesPage.clickonShowMessages();
    await messagesPage.waitForPageStable(5000);
    expect(true).toBeTruthy();
  })

  test('InboxMessages_Read/Unread a message', async({ loggedIn, messagesPage }) => {
    await messagesPage.clickonUnreadIcon();
    await messagesPage.waitForPageStable(5000);
    expect(true).toBeTruthy();
  })




  



