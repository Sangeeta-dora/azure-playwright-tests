/**
 * @fileoverview Fixtures for Playwright tests that provide page objects
 * This file sets up fixtures that can be used in test files to access
 * 
 * FEATURES:
 * - Automated Sara chat popup handling for robust test execution
 * - Integrated screenshot management for easier debugging
 * - Support for handling popups when the close button is not present
 * - Debug capabilities for complex popup issues
 * 
 * HOW TO USE:
 * 1. For basic tests, just use the `internalMessage` fixture which has built-in popup handling
 * 2. For navigation to Internal Messages page, use `internalMessagePageReady`
 * 3. Call `internalMessage.handleSaraChat()` after potentially problematic interactions
 * 4. For popups without close buttons, use `internalMessage.handleSaraChatNoButton()`
 * 5. For debug scenarios, use `internalMessage.handleSaraChatDebug()`
 */
const { test: base, expect } = require('@playwright/test');
const { LoginPage } = require('../PageObjects/LoginPage');
const { InquiriesByUser_Activities } = require('../PageObjects/InquiriesByUser_Activities');
const { PageNavigation } = require('../PageObjects/PageNavigation');
const { mailNotRead } = require('../PageObjects/mailNotRead');
const { ScreenshotManager } = require('../utils/screenshotManager');
const { ActivityCommunicateWindow } = require('../PageObjects/ActivityCommunicateWindow');
const { AccountOverview } = require('../PageObjects/AccountOverview');
const { Admin_MasterFiles_ActivityTemplate } = require('../PageObjects/Admin_MasterFiles_ActivityTemplate');
const { AllAccounts } = require('../PageObjects/AllAccounts');
//const { Common } = require('../PageObjects/Common');
const { CustomerInfo } = require('../PageObjects/CustomerInfo');
const { CustomerMessages } = require('../PageObjects/CustomerMessages');
const { ErrorSending } = require('../PageObjects/ErrorSending');
const { ExpectedPaymentsPromiseBroken } = require('../PageObjects/ExpectedPaymentsPromiseBroken');
const { inquireByuserpayments } = require('../PageObjects/inquireByuserpayments');
const { InquiriesByUser_ExpectedPayments } = require('../PageObjects/InquiriesByUser_ExpectedPayments');
const { InquiriesByUser_Pendingpayment } = require('../PageObjects/InquiriesByUser_Pendingpayment');
const { InquiryUserInvoices } = require('../PageObjects/InquiryUserInvoices');
const { InternalMessage } = require('../PageObjects/InternalMessage');
const { MailNotFiled } = require('../PageObjects/MailNotFiled');
const { Messages } = require('../PageObjects/Messages');
const { OpenIssuewithoutOpenActivity } = require('../PageObjects/OpenIssuewithoutOpenActivity');
const { Payments } = require('../PageObjects/Payments');
const { PendingPaymentNotReconciled } = require('../PageObjects/PendingPaymentNotReconciled');
const { FollowupPastDue } = require('../PageObjects/FollowupPastDue');
const { handleSaraChatPopup } = require('../PageObjects/handleSaraChatPopup');
const path = require('path');
const config = require('../config.js');

// Load environment configuration
require('dotenv').config();
const env = process.env.ENVIRONMENT || 'qa'; // Default to qa if not set
const envConfig = config[env] || config.qa; // Fallback to qa if environment is invalid

/**
 * Extended test object with fixtures for all page objects
 * @typedef {Object} TestFixtures
 * @property {LoginPage} loginpage - Login page object
 * @property {PageNavigation} pageNav - Page navigation object
 * @property {mailNotRead} mailnotread - Mail not read page object
 * @property {ActivityCommunicateWindow} activityWindow - Activity communicate window object
 * @property {MailNotFiled} mailNotFiled - Mail not filed page object
 */

// Extend the base test with fixtures
// Define test fixtures for different test scenarios
// Base test for standard page objects
exports.test = base.extend({
    
    /**
     * LoginPage object fixture
     * @param {{page: import('@playwright/test').Page}} param0
     * @param {Function} use
     */
    loginpage: async ({ page }, use) => {
      const loginpage = new LoginPage(page);
      console.log("Login page object initialized");
      await use(loginpage);
    },
    
    /**
     * InquiriesByUser_Activities object fixture
     * @param {{page: import('@playwright/test').Page}} param0
     * @param {Function} use
     */
    inqAct: async ({ page }, use) => {
      const inqAct = new InquiriesByUser_Activities(page);
      await use(inqAct);
    },
    
    /**
     * PageNavigation object fixture
     * @param {{page: import('@playwright/test').Page}} param0
     * @param {Function} use
     */
    pageNav: async ({ page }, use) => {
      const pageNav = new PageNavigation(page);
      await use(pageNav);
    },
      /**
     * mailNotRead object fixture
     * @param {{page: import('@playwright/test').Page}} param0
     * @param {Function} use
     */
    mailnotread: async ({ page }, use) => {
      const mailnotread = new mailNotRead(page);
      await use(mailnotread);
    },
    
    /**
     * FollowupPastDue object fixture
     * @param {{page: import('@playwright/test').Page}} param0
     * @param {Function} use  
     */
    followupPastDuePage: async ({ page }, use) => {
      const followupPastDuePage = new FollowupPastDue(page);
      await use(followupPastDuePage);
    },
    
    /**
     * mailNotReadPage object fixture - for backwards compatibility
     * @param {{page: import('@playwright/test').Page}} param0
     * @param {Function} use
     */
    mailNotReadPage: async ({ mailnotread }, use) => {
      console.log("Using mailNotReadPage fixture (proxy to mailnotread)");
      await use(mailnotread);
    },
    
    /**
     * ActivityCommunicateWindow object fixture
     * @param {{page: import('@playwright/test').Page}} param0
     * @param {Function} use
     */
    activityWindow: async ({ page }, use) => {
      const activityWindow = new ActivityCommunicateWindow(page);
      await use(activityWindow);
    },
    
    /**
     * AccountOverview object fixture
     * @param {{page: import('@playwright/test').Page}} param0
     * @param {Function} use
     */
    accountOverview: async ({ page }, use) => {
      const accountOverview = new AccountOverview(page);
      await use(accountOverview);
    },
    
    /**
     * Admin_MasterFiles_ActivityTemplate object fixture
     * @param {{page: import('@playwright/test').Page}} param0
     * @param {Function} use
     */
    activityTemplate: async ({ page }, use) => {
      const activityTemplate = new Admin_MasterFiles_ActivityTemplate(page);
      await use(activityTemplate);
    },
    
    /**
     * AllAccounts object fixture
     * @param {{page: import('@playwright/test').Page}} param0
     * @param {Function} use
     */
    allAccounts: async ({ page }, use) => {
      const allAccounts = new AllAccounts(page);
      await use(allAccounts);
    },
    
    /**
     * Common object fixture
     * @param {{page: import('@playwright/test').Page}} param0
     * @param {Function} use
     */
    common: async ({ page }, use) => {
      const common = new Common(page);
      await use(common);
    },
    
    /**
     * CustomerInfo object fixture
     * @param {{page: import('@playwright/test').Page}} param0
     * @param {Function} use
     */
    customerInfo: async ({ page }, use) => {
      const customerInfo = new CustomerInfo(page);
      await use(customerInfo);
    },
    
    /**
     * CustomerMessages object fixture
     * @param {{page: import('@playwright/test').Page}} param0
     * @param {Function} use
     */
    customerMessages: async ({ page }, use) => {
      const customerMessages = new CustomerMessages(page);
      await use(customerMessages);
    },
    
    /**
     * ErrorSending object fixture
     * @param {{page: import('@playwright/test').Page}} param0
     * @param {Function} use
     */
    errorSending: async ({ page }, use) => {
      const errorSending = new ErrorSending(page);
      await use(errorSending);
    },
    
    /**
     * ExpectedPaymentsPromiseBroken object fixture
     * @param {{page: import('@playwright/test').Page}} param0
     * @param {Function} use
     */
    expectedPaymentsPromiseBroken: async ({ page }, use) => {
      const expectedPaymentsPromiseBroken = new ExpectedPaymentsPromiseBroken(page);
      await use(expectedPaymentsPromiseBroken);
    },
    
    /**
     * inquireByuserpayments object fixture
     * @param {{page: import('@playwright/test').Page}} param0
     * @param {Function} use
     */
    inquireByuserpayments: async ({ page }, use) => {
      const inquireByuserpayments = new inquireByuserpayments(page);
      await use(inquireByuserpayments);
    },
    
    /**
     * InquiriesByUser_ExpectedPayments object fixture
     * @param {{page: import('@playwright/test').Page}} param0
     * @param {Function} use
     */
    inquiriesByUserExpectedPayments: async ({ page }, use) => {
      const inquiriesByUserExpectedPayments = new InquiriesByUser_ExpectedPayments(page);
      await use(inquiriesByUserExpectedPayments);
    },
    
    /**
     * InquiriesByUser_Pendingpayment object fixture
     * @param {{page: import('@playwright/test').Page}} param0
     * @param {Function} use
     */
    inquiriesByUserPendingpayment: async ({ page }, use) => {
      const inquiriesByUserPendingpayment = new InquiriesByUser_Pendingpayment(page);
      await use(inquiriesByUserPendingpayment);
    },
    
    /**
     * InquiryUserInvoices object fixture
     * @param {{page: import('@playwright/test').Page}} param0
     * @param {Function} use
     */
    inquiryUserInvoices: async ({ page }, use) => {
      const inquiryUserInvoices = new InquiryUserInvoices(page);
      await use(inquiryUserInvoices);
    },
    
    /**
     * InternalMessage object fixture
     * @param {{page: import('@playwright/test').Page}} param0
     * @param {Function} use
     * @param {Object} testInfo
     */
    internalMessage: async ({ page }, use, testInfo) => {
      const internalMessage = new InternalMessage(page);
      
      // Get test name for organized screenshots
      const testName = testInfo ? testInfo.title : 'internal-message-test';
      
      // Initialize screenshot directory automatically
      if (typeof internalMessage.setTestInfo === 'function') {
        await internalMessage.setTestInfo(testName);
        await internalMessage.initializeTestScreenshotFolder();
      }
      
      // Set up automatic Sara chat popup handling
      console.log("Setting up automatic Sara chat popup handling...");
      let cleanupAutoHandler;
      try {
        const { setupSaraChatAutoHandler } = require('../PageObjects/handleSaraChatPopup');
        cleanupAutoHandler = await setupSaraChatAutoHandler(page, {
          debug: false,
          verbose: false,
          takeScreenshot: async (name) => {
            if (typeof internalMessage.takeScreenshot === 'function') {
              await internalMessage.takeScreenshot(`sara-chat-auto-${name}`);
            }
          }
        });
        console.log("Automatic Sara chat popup handler set up successfully");
      } catch (autoSetupErr) {
        console.warn(`Could not set up automatic Sara chat handler: ${autoSetupErr.message}`);
        console.log("Will use manual handling as fallback");
        cleanupAutoHandler = async () => {};
      }
      
      // Extend internalMessage with additional methods
      const enhancedInternalMessage = {
        ...internalMessage,
        
        // Add method to handle Sara chat popups
        handleSaraChat: async () => {
          try {
            console.log("Handling Sara chat popup from test...");
            const { handleSaraChatPopup } = require('../PageObjects/handleSaraChatPopup');
            const result = await handleSaraChatPopup(page, {
              takeScreenshot: async (name) => {
                if (typeof internalMessage.takeScreenshot === 'function') {
                  await internalMessage.takeScreenshot(`sara-chat-${name}`);
                }
              },
              retries: 1
            });
            return result;
          } catch (err) {
            console.warn(`Non-critical error handling Sara chat: ${err.message}`);
            return false;
          }
        },
        
        // Add method for handling Sara chat when no close button is available
        handleSaraChatNoButton: async () => {
          try {
            console.log("Handling Sara chat popup without relying on close buttons...");
            const { handleSaraChatNoButton } = require('../PageObjects/handleSaraChatPopup');
            
            const result = await handleSaraChatNoButton(page, {
              takeScreenshot: async (name) => {
                if (typeof internalMessage.takeScreenshot === 'function') {
                  await internalMessage.takeScreenshot(`sara-nobutton-${name}`);
                }
              }
            });
            return result;
          } catch (err) {
            console.warn(`Non-critical error handling Sara chat without button: ${err.message}`);
            return false;
          }
        },
        
        // Enhanced debug method for troubleshooting
        handleSaraChatDebug: async (debugOptions = {}) => {
          try {
            console.log("Handling Sara chat popup with enhanced debug options...");
            const { handleSaraChatPopup } = require('../PageObjects/handleSaraChatPopup');
            
            // Merge default options with provided debug options
            const options = {
              debug: true,
              verbose: true,
              retries: 3,
              takeScreenshot: async (name) => {
                if (typeof internalMessage.takeScreenshot === 'function') {
                  await internalMessage.takeScreenshot(`sara-debug-${name}`);
                }
              },
              ...debugOptions
            };
            
            // Try to close the popup
            const result = await handleSaraChatPopup(page, options);
            return result;
          } catch (saraChatError) {
            console.warn(`Non-critical Sara chat popup handling error: ${saraChatError.message}`);
            return false;
          }
        }
      };
      
      try {
        // Use the enhanced internalMessage for the test
        await use(enhancedInternalMessage);
      } finally {
        // Clean up auto handler when test is done
        console.log("Test completed, cleaning up Sara chat auto handler...");
        try {
          if (typeof cleanupAutoHandler === 'function') {
            await cleanupAutoHandler();
            console.log("Sara chat auto handler cleaned up successfully");
          }
        } catch (cleanupError) {
          console.warn(`Error cleaning up auto handler: ${cleanupError.message}`);
        }
      }
    },
      /**
     * MailNotFiled object fixture
     * @param {{page: import('@playwright/test').Page}} param0
     * @param {Function} use
     */
    mailNotFiled: async ({ page }, use) => {
      const mailNotFiled = new MailNotFiled(page);
      await use(mailNotFiled);
    },

    pageNav: async ({ page }, use) => {
    const pageNav = new PageNavigation(page);
    await use(pageNav);
  },
    
    /**
     * mailNotFiledPage object fixture - for backwards compatibility
     * @param {{page: import('@playwright/test').Page}} param0
     * @param {Function} use
     */
    mailNotFiledPage: async ({ mailNotFiled }, use) => {
      console.log("Using mailNotFiledPage fixture (proxy to mailNotFiled)");
      await use(mailNotFiled);
    },
    
    /**
     * Messages object fixture
     * @param {{page: import('@playwright/test').Page}} param0
     * @param {Function} use
     */
    messages: async ({ page }, use) => {
      const messages = new Messages(page);
      await use(messages);
    },
    
    /**
     * OpenIssuewithoutOpenActivity object fixture
     * @param {{page: import('@playwright/test').Page}} param0
     * @param {Function} use
     */
    openIssuewithoutOpenActivity: async ({ page }, use) => {
      const openIssuewithoutOpenActivity = new OpenIssuewithoutOpenActivity(page);
      await use(openIssuewithoutOpenActivity);
    },
    
    /**
     * Payments object fixture
     * @param {{page: import('@playwright/test').Page}} param0
     * @param {Function} use
     */
    payments: async ({ page }, use) => {
      const payments = new Payments(page);
      await use(payments);
    },
    
    /**
     * PendingPaymentNotReconciled object fixture
     * @param {{page: import('@playwright/test').Page}} param0
     * @param {Function} use
     */    pendingPaymentNotReconciled: async ({ page }, use) => {
      const pendingPaymentNotReconciled = new PendingPaymentNotReconciled(page);
      await use(pendingPaymentNotReconciled);
    },
    
    /**
     * Common loggedIn fixture that handles login process
     * @param {{page: import('@playwright/test').Page, loginpage: LoginPage}} param0
     * @param {Function} use
     */
    loggedIn: async ({ page, loginpage }, use) => {
      // Set the timeout for each test - longer timeout to accommodate screenshot operations
      base.setTimeout(120000);
      
      console.log("Performing login...");
      // Standard login flow only
      await loginpage.navigateTo(envConfig.baseURL);
      await loginpage.login(envConfig.userName, envConfig.password);
      console.log("Login successful");
      
      await use();
    },
      /**
     * Fixture that navigates to Mail Not Read page
     * @param {{loggedIn: void, pageNav: PageNavigation, mailnotread: mailNotRead}} param0
     * @param {Function} use
     * @param {Object} testInfo
     */
    mailNotReadPageReady: async ({ loggedIn, pageNav, mailnotread }, use, testInfo) => {
      // Set up the test name for organized screenshots
      await mailnotread.setTestInfo(testInfo.title);
      // Initialize the screenshot folder
      await mailnotread.initializeTestScreenshotFolder();
        console.log("Navigating to Messages menu...");
      await pageNav.navigateToMessages();
      await mailnotread.waitForPageStable(3000);
      
      console.log("Clicking on Mail Not Read menu item...");
      try {
        // If having trouble finding the menu item, run diagnostics first
        // await mailnotread.findAllMenuItems();
        
        await mailnotread.clickOnReactMailNotRead();
      } catch (error) {
        console.error(`Error clicking Mail Not Read: ${error.message}`);
          // Take a screenshot to help diagnose the issue
        await mailnotread.page.screenshot({ path: 'mail-not-read-fixture-error.png' });
        
        // Run a diagnostic to see what menu items are available
        console.log("Running menu diagnostics after failure...");
        await mailnotread.findAllMenuItems();
        
        throw error; // Re-throw the error to fail the test
      }
      
      console.log("Ensuring page is fully loaded...");
      await mailnotread.PageLoaded();
      console.log("Mail Not Read page fully loaded and ready for testing");
      
      await use();
    },
      /**
     * Fixture that navigates to Mail Not Filed page
     * @param {{loggedIn: void, pageNav: PageNavigation, mailnotread: mailNotRead, mailNotFiled: MailNotFiled}} param0
     * @param {Function} use
     * @param {Object} testInfo
     */
    mailNotFiledPageReady: async ({ loggedIn, pageNav, mailnotread, mailNotFiled }, use, testInfo) => {
      try {
          // Set up the test name for organized screenshots if available
        if (typeof mailnotread.setTestInfo === 'function') {
          await mailnotread.setTestInfo(testInfo.title);
          await mailnotread.initializeTestScreenshotFolder();
        }
        
        console.log("Handling any Sara Chat popup before navigation...");
        try {
          await handleSaraChatPopup(pageNav.page);
        } catch (saraChatError) {
          console.warn(`Non-critical Sara chat popup handling error: ${saraChatError.message}`);
        }
        
        console.log("Navigating to Messages menu...");
        // Use the method from PageNavigation class for consistency
        await pageNav.navigateToMessages();
        await mailnotread.waitForPageStable(3000);        console.log("Clicking on Mail Not Filed menu item...");
        try {
          // Using the clickonMailNotFiled method in MailNotFiled class with the proper locator
          await mailNotFiled.clickonMailNotFiled();
          
          // Wait for page to stabilize
          await mailNotFiled.waitForPageStable(3000);
          
          console.log("Mail Not Filed page loaded successfully");
          
          // Take a screenshot to confirm successful navigation
          if (typeof mailNotFiled.takeScreenshot === 'function') {
            await mailNotFiled.takeScreenshot('mail-not-filed-loaded');
          }
        } catch (error) {          console.error(`Error navigating to Mail Not Filed: ${error.message}`);
          
          // Take diagnostic screenshot
          if (typeof mailNotFiled.takeScreenshot === 'function') {
            await mailNotFiled.takeScreenshot('mail-not-filed-navigation-error');
          }
          
          throw error;
        }
        
        await use();
      } catch (error) {
        console.error(`Error in mailNotFiledPageReady fixture: ${error.message}`);
        throw error;
      }
    },
    inquiriesByUserfollowupPastDuePageReady: async ({ loggedIn, pageNav, followupPastDuePage }, use, testInfo) => {
      try {
        // Set up the test name for organized screenshots if available
        if (typeof followupPastDuePage.setTestInfo === 'function') {
          await followupPastDuePage.setTestInfo(testInfo.title);
          await followupPastDuePage.initializeTestScreenshotFolder();
        }
        
        console.log("Handling any Sara Chat popup before navigation...");
        try {
          await handleSaraChatPopup(pageNav.page);
        } catch (saraChatError) {
          console.warn(`Non-critical Sara chat popup handling error: ${saraChatError.message}`);
        }
        
        console.log("Navigating to Inquiries menu...");
        await pageNav.navigateToInquiries()
        await followupPastDuePage.waitForPageStable(3000);
        //navigateToByUsers()


        
        console.log("Navigating to By Users menu...");
        await pageNav.navigateToByUsers()
        await followupPastDuePage.waitForPageStable(3000);
        
        console.log("Clicking on Followup Past Due menu item...");
        try {
          // Navigate to Followup Past Due using the simplified approach
          await pageNav.navigateToFollowUp();
          await pageNav.page.waitForTimeout(2000);
          
          // Take a screenshot after navigation
          if (typeof followupPastDuePage.takeScreenshot === 'function') {
            await followupPastDuePage.takeScreenshot('followup-past-due-navigation-complete');
          } else {
            await pageNav.page.screenshot({ path: 'followup-past-due-navigation-complete.png' });
          }
          
          // Verify the page loaded correctly
          await followupPastDuePage.verifyPageLoaded();
          console.log("Followup Past Due page fully loaded and ready for testing");
          
        } catch (error) {
          console.error(`Error navigating to Followup Past Due: ${error.message}`);
          
          // Take a screenshot to help diagnose the issue
          await pageNav.page.screenshot({ path: 'followup-past-due-fixture-error.png' });
          
          throw error; // Re-throw the error to fail the test
        }

        await pageNav.clickonDueToday()
        await pageNav.clickonPastDue()
        
        // Create a fixture object with needed components
        const fixture = {
          // Add a method for handling Sara chat popups that tests can use
          handleSaraChat: async () => {
            try {
              console.log("Handling Sara chat popup from test...");
              return await handleSaraChatPopup(pageNav.page, {
                takeScreenshot: async (name) => {
                  if (typeof followupPastDuePage.takeScreenshot === 'function') {
                    await followupPastDuePage.takeScreenshot(`sara-chat-${name}`);
                  } else {
                    await pageNav.page.screenshot({ path: `sara-chat-${name}-${Date.now()}.png` });
                  }
                }
              });
            } catch (saraChatError) {
              console.warn(`Non-critical Sara chat popup handling error: ${saraChatError.message}`);
              return false; // Return false to indicate no popup was handled
            }
          },
          
          // Add a wrapper around the fixture's takeScreenshot method
          takeScreenshot: async (name) => {
            try {
              if (typeof followupPastDuePage.takeScreenshot === 'function') {
                await followupPastDuePage.takeScreenshot(name);
              } else {
                await pageNav.page.screenshot({ path: `${name}-${Date.now()}.png` });
              }
            } catch (err) {
              console.error(`Error taking screenshot '${name}': ${err.message}`);
            }
          }
        };
        
        await use(fixture);
      } catch (error) {
        console.error(`Error in followupPastDuePageReady fixture: ${error.message}`);
        await pageNav.page.screenshot({ path: 'followup-past-due-fixture-fatal-error.png' });
        throw error;
      }
    },

    /**
     * Fixture that navigates to Inquiries > By Users > Activities page
     * @param {{loggedIn: void, pageNav: PageNavigation, inqAct: InquiriesByUser_Activities}} param0
     * @param {Function} use
     * @param {Object} testInfo
     */
    inquiriesByUserActivitiesPageReady: async ({ loggedIn, pageNav, inqAct }, use, testInfo) => {
      try {
        // Set up the test name for organized screenshots if available
        if (typeof inqAct.setTestInfo === 'function') {
          await inqAct.setTestInfo(testInfo.title);
          await inqAct.initializeTestScreenshotFolder();
        }
        
        console.log("Handling any Sara Chat popup before navigation...");
        try {
          await handleSaraChatPopup(pageNav.page);
        } catch (saraChatError) {
          console.warn(`Non-critical Sara chat popup handling error: ${saraChatError.message}`);
        }
        
        console.log("Navigating to Inquiries menu...");
        await pageNav.navigateToInquiries();
        await inqAct.waitForPageStable ? await inqAct.waitForPageStable(3000) : await pageNav.page.waitForTimeout(3000);
        
        console.log("Navigating to By Users menu...");
        await pageNav.navigateToByUsers();
        await inqAct.waitForPageStable ? await inqAct.waitForPageStable(3000) : await pageNav.page.waitForTimeout(3000);
        
        console.log("Navigating to Activities menu...");
        try {
          await pageNav.navigateToActivities();
          await pageNav.page.waitForTimeout(2000);
          
          // Take a screenshot after navigation
          if (typeof inqAct.takeScreenshot === 'function') {
            await inqAct.takeScreenshot('inquiries-by-user-activities-navigation-complete');
          } else {
            await pageNav.page.screenshot({ path: 'inquiries-by-user-activities-navigation-complete.png' });
          }
          
          // Verify the page loaded correctly by checking if the first row is visible
          await expect(inqAct.firstRow).toBeVisible();
          console.log("Inquiries by User Activities page fully loaded and ready for testing");
          
        } catch (error) {
          console.error(`Error navigating to Inquiries by User Activities: ${error.message}`);
          
          // Take a screenshot to help diagnose the issue
          await pageNav.page.screenshot({ path: 'inquiries-by-user-activities-fixture-error.png' });
          
          throw error; // Re-throw the error to fail the test
        }
        
        // Create a fixture object with needed components
        const fixture = {
          // Add a method for handling Sara chat popups that tests can use
          handleSaraChat: async () => {
            try {
              console.log("Handling Sara chat popup from test...");
              return await handleSaraChatPopup(pageNav.page, {
                takeScreenshot: async (name) => {
                  if (typeof inqAct.takeScreenshot === 'function') {
                    await inqAct.takeScreenshot(`sara-chat-${name}`);
                  } else {
                    await pageNav.page.screenshot({ path: `sara-chat-${name}-${Date.now()}.png` });
                  }
                }
              });
            } catch (saraChatError) {
              console.warn(`Non-critical Sara chat popup handling error: ${saraChatError.message}`);
              return false; // Return false to indicate no popup was handled
            }
          },
          
          // Add a wrapper around the fixture's takeScreenshot method
          takeScreenshot: async (name) => {
            try {
              if (typeof inqAct.takeScreenshot === 'function') {
                await inqAct.takeScreenshot(name);
              } else {
                await pageNav.page.screenshot({ path: `${name}-${Date.now()}.png` });
              }
            } catch (err) {
              console.error(`Error taking screenshot '${name}': ${err.message}`);
            }
          }
        };
        
        await use(fixture);
      } catch (error) {
        console.error(`Error in inquiriesByUserActivitiesPageReady fixture: ${error.message}`);
        await pageNav.page.screenshot({ path: 'inquiries-by-user-activities-fixture-fatal-error.png' });
        throw error;
      }
    },
    
    /**
     * Fixture that navigates to Followup Past Due page
     * @param {{loggedIn: void, pageNav: PageNavigation, followupPastDuePage: FollowupPastDue}} param0
     * @param {Function} use
     * @param {Object} testInfo
     */
    followupPastDuePageReady: async ({ loggedIn, pageNav, followupPastDuePage }, use, testInfo) => {
      try {
        // Set up the test name for organized screenshots if available
        if (typeof followupPastDuePage.setTestInfo === 'function') {
          await followupPastDuePage.setTestInfo(testInfo.title);
          await followupPastDuePage.initializeTestScreenshotFolder();
        }
        
        console.log("Handling any Sara Chat popup before navigation...");
        try {
          await handleSaraChatPopup(pageNav.page);
        } catch (saraChatError) {
          console.warn(`Non-critical Sara chat popup handling error: ${saraChatError.message}`);
        }
        
        console.log("Navigating to Messages menu...");
        await pageNav.navigateToMessages();
        await followupPastDuePage.waitForPageStable(3000);
        
        console.log("Clicking on Followup Past Due menu item...");
        try {
          // Navigate to Followup Past Due using the simplified approach
          await pageNav.navigateToFollowupPastDue();
          await pageNav.page.waitForTimeout(2000);
          
          // Take a screenshot after navigation
          if (typeof followupPastDuePage.takeScreenshot === 'function') {
            await followupPastDuePage.takeScreenshot('followup-past-due-navigation-complete');
          } else {
            await pageNav.page.screenshot({ path: 'followup-past-due-navigation-complete.png' });
          }
          
          // Verify the page loaded correctly
          await followupPastDuePage.verifyPageLoaded();
          console.log("Followup Past Due page fully loaded and ready for testing");
          
        } catch (error) {
          console.error(`Error navigating to Followup Past Due: ${error.message}`);
          
          // Take a screenshot to help diagnose the issue
          await pageNav.page.screenshot({ path: 'followup-past-due-fixture-error.png' });
          
          throw error; // Re-throw the error to fail the test
        }
        
        // Create a fixture object with needed components
        const fixture = {
          // Add a method for handling Sara chat popups that tests can use
          handleSaraChat: async () => {
            try {
              console.log("Handling Sara chat popup from test...");
              return await handleSaraChatPopup(pageNav.page, {
                takeScreenshot: async (name) => {
                  if (typeof followupPastDuePage.takeScreenshot === 'function') {
                    await followupPastDuePage.takeScreenshot(`sara-chat-${name}`);
                  } else {
                    await pageNav.page.screenshot({ path: `sara-chat-${name}-${Date.now()}.png` });
                  }
                }
              });
            } catch (saraChatError) {
              console.warn(`Non-critical Sara chat popup handling error: ${saraChatError.message}`);
              return false; // Return false to indicate no popup was handled
            }
          },
          
          // Add a wrapper around the fixture's takeScreenshot method
          takeScreenshot: async (name) => {
            try {
              if (typeof followupPastDuePage.takeScreenshot === 'function') {
                await followupPastDuePage.takeScreenshot(name);
              } else {
                await pageNav.page.screenshot({ path: `${name}-${Date.now()}.png` });
              }
            } catch (err) {
              console.error(`Error taking screenshot '${name}': ${err.message}`);
            }
          }
        };
        
        await use(fixture);
      } catch (error) {
        console.error(`Error in followupPastDuePageReady fixture: ${error.message}`);
        await pageNav.page.screenshot({ path: 'followup-past-due-fixture-fatal-error.png' });
        throw error;
      }
    },
    /**
     * Admin_MasterFiles_ActivityTemplate fixture with login and navigation
     * @param {{loggedIn: void, page: import('@playwright/test').Page, pageNav: PageNavigation}} param0
     * @param {Function} use
     * @param {Object} testInfo
     */
    adminMasterFilesActivityTemplateReady: async ({ loggedIn, page, pageNav }, use, testInfo) => {
      try {
        console.log("Initializing Admin Master Files Activity Template fixture...");
        
        // Initialize ActivityTemplate page object
        const adminMasterFilesActivityTemplate = new Admin_MasterFiles_ActivityTemplate(page);
        
        // Set up the test name for organized screenshots if the method exists
        if (typeof adminMasterFilesActivityTemplate.setTestInfo === 'function') {
          await adminMasterFilesActivityTemplate.setTestInfo(testInfo.title);
          await adminMasterFilesActivityTemplate.initializeTestScreenshotFolder();
        }
        
        console.log("Handling any Sara Chat popup before navigation...");
        try {
          await handleSaraChatPopup(page);
          console.log("Sara chat popup handling in activity template fixture completed successfully");
        } catch (err) {
          console.warn(`Non-critical error while handling Sara chat popup in activity template: ${err.message}`);
          console.log("Continuing test execution despite Sara chat popup handling error");
        }
        
        // Navigate to Admin Master Files Activity Template
        console.log("Navigating to Admin > Master Files > Activity Template...");
        await pageNav.navigateToAdmin();
        await pageNav.navigateToAdminMasterFiles();
        await pageNav.navigateToActivityTemplate();
        
        // Wait for page to load fully
        await page.waitForTimeout(1000);
        
        // Take a screenshot after navigation
        if (typeof adminMasterFilesActivityTemplate.takeScreenshot === 'function') {
          await adminMasterFilesActivityTemplate.takeScreenshot('activity-template-navigation-complete');
        } else {
          await page.screenshot({ path: `test-results/activity-template-${Date.now()}.png` });
        }
        
        // Create a combined fixture object with all necessary components
        const fixture = {
          page,
          pageNav,
          adminMasterFilesActivityTemplate
        };
        
        console.log("Admin Master Files Activity Template page fully loaded and ready for testing");
        await use(fixture);
      } catch (error) {
        console.error(`Error in Admin Master Files Activity Template fixture: ${error}`);
        // Take a screenshot to help with debugging
        await page.screenshot({ path: `test-results/admin-template-fixture-error-${Date.now()}.png` });
        throw error;
      }
    },
    /**

    /**
     * Fixture that navigates to Internal Message page
     * @param {{loggedIn: void, pageNav: PageNavigation, internalMessage: InternalMessage}} param0
     * @param {Function} use
     * @param {Object} testInfo
     */
    internalMessagePageReady: async ({ loggedIn, pageNav, internalMessage }, use, testInfo) => {
      try {
        console.log(`Setting up internal message test: ${testInfo.title}`);
        
        // Ensure internal message has test info set and screenshot folder initialized
        if (internalMessage && typeof internalMessage.setTestInfo === 'function') {
          await internalMessage.setTestInfo(testInfo.title);
          await internalMessage.initializeTestScreenshotFolder();
          console.log("Test info set and screenshot folder initialized");
        } else {
          console.error("internalMessage object missing required methods!");
        }
        
        // Note: internalMessage fixture now has built-in Sara chat handling
        
        console.log("Navigating to Messages menu...");
        await pageNav.navigateToMessages();
        await pageNav.page.waitForTimeout(1000);
        
        // Handle any Sara chat popup after navigation
        try {
          if (internalMessage && typeof internalMessage.handleSaraChat === 'function') {
            await internalMessage.handleSaraChat();
          } else {
            console.warn("handleSaraChat method not available on internalMessage");
          }
        } catch (chatError) {
          console.warn(`Error handling Sara chat: ${chatError.message}`);
        }
        
        console.log("Clicking on Internal Message menu item...");
        try {
          // Navigate to Internal Message
          await pageNav.page.getByRole('link', { name: 'Internal Message' }).click();
          await pageNav.page.waitForTimeout(2000);
          
          // Uncheck the "Include Unallocated Messages" checkbox if needed
          try {
            if (internalMessage && typeof internalMessage.Internalmessageuncheck === 'function') {
              await internalMessage.Internalmessageuncheck();
              console.log("Successfully unchecked 'Include Unallocated Messages'");
            } else {
              console.warn("Internalmessageuncheck method not available on internalMessage");
              // Try a direct approach using page object
              try {
                const restrictCheckbox = pageNav.page.getByLabel('Restricted to Alert Internal');
                if (await restrictCheckbox.isVisible({ timeout: 2000 }).catch(() => false)) {
                  await restrictCheckbox.click();
                  console.log("Clicked 'Restricted to Alert Internal' checkbox directly");
                }
              } catch (directClickError) {
                console.warn(`Could not click checkbox directly: ${directClickError.message}`);
              }
            }
          } catch (uncheckError) {
            console.warn(`Error unchecking "Include Unallocated Messages": ${uncheckError.message}`);
          }
          
          // Handle any Sara chat popup after clicking on Internal Message link
          try {
            if (internalMessage && typeof internalMessage.handleSaraChat === 'function') {
              await internalMessage.handleSaraChat();
            } else {
              console.warn("handleSaraChat method not available on internalMessage");
            }
          } catch (chatError) {
            console.warn(`Error handling Sara chat after clicking Internal Message link: ${chatError.message}`);
          }
          
          // Take a screenshot of the loaded page
          try {
            if (internalMessage && typeof internalMessage.takeScreenshot === 'function') {
              await internalMessage.takeScreenshot('page-setup-complete');
            } else {
              console.warn('takeScreenshot method not available on internalMessage');
              // Fallback to direct screenshot
              const screenshotPath = `test-screenshots/page-setup-complete-${Date.now()}.png`;
              console.log(`Taking fallback screenshot to ${screenshotPath}`);
              await pageNav.page.screenshot({ path: screenshotPath, fullPage: true });
            }
          } catch (screenshotError) {
            console.warn(`Failed to take setup-complete screenshot: ${screenshotError.message}`);
          }
          
          // Verify the page loaded correctly by checking for first row
          await expect(internalMessage.firstRow).toBeVisible({ timeout: 5000 });
          console.log("Internal Message page fully loaded and ready for testing");
          
        } catch (error) {
          console.error(`Error navigating to Internal Message: ${error.message}`);
          
          // Take a screenshot to help diagnose the issue
          try {
            if (typeof internalMessage.takeScreenshot === 'function') {
              await internalMessage.takeScreenshot('internal-message-fixture-error');
            } else {
              // Fallback direct screenshot
              const fs = require('fs');
              const path = require('path');
              
              const screenshotDir = path.join('test-screenshots', 'errors');
              if (!fs.existsSync(screenshotDir)) {
                fs.mkdirSync(screenshotDir, { recursive: true });
              }
              
              const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
              const screenshotPath = path.join(screenshotDir, `navigation-error-${timestamp}.png`);
              
              if (pageNav && pageNav.page) {
                await pageNav.page.screenshot({ path: screenshotPath, fullPage: true });
                console.log(`Error screenshot saved to: ${screenshotPath}`);
              }
            }
          } catch (screenshotError) {
            console.warn(`Failed to take error screenshot: ${screenshotError.message}`);
          }
          
          // Try the no-button approach as a last resort
          console.log("Attempting emergency Sara chat handling...");
          try {
            if (internalMessage && typeof internalMessage.handleSaraChatNoButton === 'function') {
              await internalMessage.handleSaraChatNoButton();
            } else {
              console.warn("handleSaraChatNoButton method not available on internalMessage");
              // Try a direct approach if the method doesn't exist
              if (pageNav && pageNav.page) {
                // Try to find and close the Sara chat popup directly
                try {
                  const chatButton = pageNav.page.locator('button[aria-label="Close live chat"]');
                  if (await chatButton.isVisible({ timeout: 1000 }).catch(() => false)) {
                    await chatButton.click();
                    console.log("Emergency Sara chat closed directly via button");
                  }
                } catch (e) {
                  console.warn(`Failed emergency direct Sara chat handling: ${e.message}`);
                }
              }
            }
          } catch (handlingError) {
            console.warn(`Error during emergency Sara chat handling: ${handlingError.message}`);
          }
          
          // Try again to verify the page loaded correctly
          try {
            await expect(internalMessage.firstRow).toBeVisible({ timeout: 5000 });
            console.log("Page recovered after emergency Sara chat handling");
          } catch (verifyError) {
            console.error("Failed to recover page after emergency handling");
            
            // Safety check before calling takeScreenshot
            try {
              if (internalMessage && typeof internalMessage.takeScreenshot === 'function') {
                await internalMessage.takeScreenshot('internal-message-fixture-fatal-error');
              } else {
                // Fallback to direct screenshot if method doesn't exist
                const screenshotPath = `test-screenshots/errors/internal-message-fixture-fatal-error-${Date.now()}.png`;
                console.log(`Taking fallback screenshot to ${screenshotPath}`);
                await pageNav.page.screenshot({ path: screenshotPath, fullPage: true });
              }
            } catch (screenshotError) {
              console.error(`Failed to capture error screenshot: ${screenshotError.message}`);
            }
            
            throw error; // Re-throw the original error to fail the test
          }
        }
        
        // The fixture will pass the internalMessage object directly to tests
        // The internalMessage object now includes all the Sara chat handling methods
        await use(internalMessage);
        
      } catch (error) {
        console.error(`Error in internalMessagePageReady fixture: ${error.message}`);
        
        try {
          // Try to take a screenshot if the method is available
          if (internalMessage && typeof internalMessage.takeScreenshot === 'function') {
            await internalMessage.takeScreenshot('internal-message-fixture-fatal-error');
          } else {
            // Fallback to direct screenshot if takeScreenshot is not available
            const fs = require('fs');
            const path = require('path');
            
            // Ensure directory exists
            const screenshotDir = path.join('test-screenshots', 'errors');
            if (!fs.existsSync(screenshotDir)) {
              fs.mkdirSync(screenshotDir, { recursive: true });
            }
            
            // Take screenshot directly
            const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
            const screenshotPath = path.join(screenshotDir, `fatal-error-${timestamp}.png`);
            
            if (pageNav && pageNav.page) {
              await pageNav.page.screenshot({ path: screenshotPath, fullPage: true });
              console.log(`Emergency screenshot saved to: ${screenshotPath}`);
            } else {
              console.error('Could not take emergency screenshot: page object not available');
            }
          }
        } catch (screenshotError) {
          console.error(`Failed to take error screenshot: ${screenshotError.message}`);
        }
        
        throw error;
      }
    },
    
    /**
     * Fixture for login and navigation to Inquiries > By Users > User Invoices page
     * Usage: test.use({ userInvoicesPageReady })
     */
    userInvoicesPageReady: async ({ loggedIn, pageNav }, use, testInfo) => {
      try {
        // Handle Sara Chat popup if present
        try {
          await handleSaraChatPopup(pageNav.page);
        } catch (saraChatError) {
          console.warn(`Sara chat popup handling error: ${saraChatError.message}`);
        }
        // Navigation steps
        await pageNav.navigateToInquiries();
        await pageNav.page.waitForTimeout(2000);
        await pageNav.navigateToByUsers();
        await pageNav.page.waitForTimeout(2000);
        await pageNav.navigateToUserInvoices();
        await pageNav.page.waitForTimeout(2000);
        await use(pageNav.page);

      } catch (error) {
        console.error(`Error in userInvoicesPageReady fixture: ${error.message}`);
        await pageNav.page.screenshot({ path: 'user-invoices-fixture-error.png' });
        throw error;
      }
    },
});
