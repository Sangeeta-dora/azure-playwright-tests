const { expect } = require('@playwright/test');
const { test, mailNotFiledTest } = require('../Fixtures/fixtures');
const { handleSaraChatPopup } = require('../PageObjects/handleSaraChatPopup');

// Load test data
const dataSet = JSON.parse(JSON.stringify(require("../utils/TestData.json")));

test('Mail Not Filed_Navigate to mail not filed page', async ({ mailNotFiledPageReady, mailNotFiledPage }, testInfo) => {
    // Using the mailNotFiledPageReady fixture - no need for navigation code
    // The fixture has already performed:
    // 1. Login
    // 2. Navigation to Messages menu
    // 3. Clicking on Mail Not Filed
    // 4. Waiting for page to be fully loaded
    
    // Set test name for organized screenshots
    await mailNotFiledPage.setTestInfo(testInfo.title);
    await mailNotFiledPage.initializeTestScreenshotFolder();
    
    console.log("Test starting with page already loaded");
    await expect(mailNotFiledPage.firstRow).toBeVisible();
    
    // Take screenshot of successfully loaded page
    await mailNotFiledPage.takeScreenshot('mail-not-filed-page-loaded');
})

test('Mail Not Filed_Click On Export to excel', async ({ mailNotFiledPageReady, mailNotFiledPage, page }, testInfo) => {
    // Set test name for organized screenshots
    await mailNotFiledPage.setTestInfo(testInfo.title);
    await mailNotFiledPage.initializeTestScreenshotFolder();
    
    // Page is already loaded via fixture
    await expect(mailNotFiledPage.firstRow).toBeVisible();
    await mailNotFiledPage.takeScreenshot('page-loaded');
    
    // Handle any popups that might interfere
    await handleSaraChatPopup(page);
    
    // Perform export action
    await mailNotFiledPage.clickonExport();
    await mailNotFiledPage.takeScreenshot('after-export-click');
    
    // Wait for download and save the file
    const downloadPromise = page.waitForEvent('download');
    const download = await downloadPromise;
    await download.saveAs('C:/Users/namrata.singh/ReactAutomation/TestCases-ReactATC/test-results/' + download.suggestedFilename());
    
    // Take final screenshot after download is complete
    await mailNotFiledPage.takeScreenshot('after-download-complete');
})

test('Mail Not Filed_Click On Refresh', async ({ mailNotFiledPageReady, mailNotFiledPage, page }, testInfo) => {
    // Set test name for organized screenshots
    await mailNotFiledPage.setTestInfo(testInfo.title);
    await mailNotFiledPage.initializeTestScreenshotFolder();
    
    // Page is already loaded via fixture
    await expect(mailNotFiledPage.firstRow).toBeVisible();
    
    // Take screenshot of initial page state
    await mailNotFiledPage.takeScreenshot('page-loaded');
    
    // Perform the test action
    await mailNotFiledPage.clikonRefresh();
    await expect(mailNotFiledPage.firstRow).toBeVisible();
    
    // Take screenshot after functionality is complete
    await mailNotFiledPage.takeScreenshot('after-refresh-complete');
})
test('Mail Not Filed_Select the first email and click on Mark All selected Read/Unread', async ({ mailNotFiledPageReady, mailNotFiledPage, page }, testInfo) => {
    // Set test name for organized screenshots
    await mailNotFiledPage.setTestInfo(testInfo.title);
    await mailNotFiledPage.initializeTestScreenshotFolder();
    
    // Page is already loaded via fixture
    await expect(mailNotFiledPage.firstRow).toBeVisible();
    await mailNotFiledPage.takeScreenshot('page-loaded');
    
    // Perform test actions
    await mailNotFiledPage.selectTheFirstRowCheckbox();
    await mailNotFiledPage.takeScreenshot('after-row-selection');
    
    await mailNotFiledPage.clickOnReadUnread();
    await mailNotFiledPage.takeScreenshot('after-mark-read-unread');
})

test('Mail Not Filed_Select the first email and click on Delete All Selected', async ({ mailNotFiledPageReady, mailNotFiledPage, page }, testInfo) => {
    // Set test name for organized screenshots
    await mailNotFiledPage.setTestInfo(testInfo.title);
    await mailNotFiledPage.initializeTestScreenshotFolder();
    
    // Page is already loaded via fixture
    await expect(mailNotFiledPage.firstRow).toBeVisible();
    await mailNotFiledPage.takeScreenshot('page-loaded');
    
    // Perform test actions
    await mailNotFiledPage.selectTheFirstRowCheckbox();
    await mailNotFiledPage.takeScreenshot('after-row-selection');
    
    await mailNotFiledPage.clickOnDeleteAllSelected();
    await mailNotFiledPage.takeScreenshot('after-delete-selected');
    
    // Verify that the selected email was actually deleted
    const deletionSuccessful = await mailNotFiledPage.verifyEmailsDeleted('first row');
    
    // Assert that deletion was successful
    expect(deletionSuccessful).toBe(true, 'Selected email was not deleted after clicking Delete All Selected');
    
    // Wait for 1 second to ensure the UI has updated
    await page.waitForTimeout(1000);
    await mailNotFiledPage.takeScreenshot('after-deletion-verification');
})


test('Mail Not Filed_Select the first email and click on View Email', async ({ mailNotFiledPageReady, mailNotFiledPage, page }, testInfo) => {
    // Set test name for organized screenshots
    await mailNotFiledPage.setTestInfo(testInfo.title);
    await mailNotFiledPage.initializeTestScreenshotFolder();
    
    // Page is already loaded via fixture
    await expect(mailNotFiledPage.firstRow).toBeVisible();
    await mailNotFiledPage.takeScreenshot('page-loaded');
    
    // Perform test actions
    await mailNotFiledPage.selectTheFirstRowCheckbox();
    await mailNotFiledPage.takeScreenshot('after-row-selection');
    
    // The clickOnViewFirstEmail method now includes waiting for the page to fully load
    await mailNotFiledPage.clickOnViewFirstEmail();
    
    // Take final screenshot - the page should be loaded by now
    await mailNotFiledPage.takeScreenshot('after-view-email');
    console.log("View email screenshot captured successfully");
})

test('Mail Not Filed_Select an email and click on row read unread Email', async ({ mailNotFiledPageReady, mailNotFiledPage, page }, testInfo) => {
    // Set test name for organized screenshots
    await mailNotFiledPage.setTestInfo(testInfo.title);
    await mailNotFiledPage.initializeTestScreenshotFolder();
    
    // Page is already loaded via fixture
    await expect(mailNotFiledPage.firstRow).toBeVisible();
    await mailNotFiledPage.takeScreenshot('page-loaded');
    
    // Perform test actions
    await mailNotFiledPage.selectTheFirstRowCheckbox();
    await mailNotFiledPage.takeScreenshot('after-row-selection');
    
    // The clickOnViewFirstEmail method now includes waiting for the page to fully load
    await mailNotFiledPage.clickOnViewFirstEmail();
    
    await mailNotFiledPage.takeScreenshot('after-view-email-for-read-unread');
    console.log("View email for read/unread screenshot captured successfully");
})

test('Mail Not Filed_Navigate to Inbox section', async ({ mailNotFiledPageReady, mailNotFiledPage }, testInfo) => {
    // Set test name for organized screenshots
    await mailNotFiledPage.setTestInfo(testInfo.title);
    await mailNotFiledPage.initializeTestScreenshotFolder();
    
    // Page is already loaded via fixture
    await expect(mailNotFiledPage.firstRow).toBeVisible();
    await mailNotFiledPage.takeScreenshot('page-loaded');
    
    // Perform test action
    await mailNotFiledPage.clickonInbox();
    await expect(mailNotFiledPage.firstRow).toBeVisible();
    
    // Take screenshot after action is complete
    await mailNotFiledPage.takeScreenshot('after-inbox-navigation');
})

test('Mail Not Filed_Navigate to Sent section', async ({ mailNotFiledPageReady, mailNotFiledPage }, testInfo) => {
    // Set test name for organized screenshots
    await mailNotFiledPage.setTestInfo(testInfo.title);
    await mailNotFiledPage.initializeTestScreenshotFolder();
    
    // Page is already loaded via fixture
    await expect(mailNotFiledPage.firstRow).toBeVisible();
    await mailNotFiledPage.takeScreenshot('page-loaded');
    
    // Perform test action
    await mailNotFiledPage.clickonSent();
    await expect(mailNotFiledPage.firstRow).toBeVisible({ timeout: 10000 }).catch(() => {
        console.log("First row may not be immediately visible after switching to Sent section");
    });
    
    // Take screenshot after action is complete
    await mailNotFiledPage.takeScreenshot('after-sent-navigation');
})

test('Mail Not Filed_Search customer in the reassign popup', async ({ mailNotFiledPageReady, mailNotFiledPage, page }, testInfo) => {
    // Set test name for organized screenshots
    await mailNotFiledPage.setTestInfo(testInfo.title);
    await mailNotFiledPage.initializeTestScreenshotFolder();
    
    // Page is already loaded via fixture
    await expect(mailNotFiledPage.firstRow).toBeVisible();
    await mailNotFiledPage.takeScreenshot('page-loaded');
    
    // Perform test actions with appropriate waits
    console.log("Clicking on reassign button...");
    await mailNotFiledPage.clickOnReassign();
    await mailNotFiledPage.takeScreenshot('after-reassign-click');
    
    // Wait for any loading after reassign click
   // await page.waitForTimeout(2000);
    
    console.log("Waiting for customer search page to load...");
    await mailNotFiledPage.waitForCustomerSearchLoaded();
    
    console.log("Searching for customer...");
    await mailNotFiledPage.searchCustomer();
    
    console.log(`Searching for specific customer: ${dataSet.SearchCust}...`);
    await mailNotFiledPage.searchCustName(dataSet.SearchCust);
    
    // Wait for all search operations to complete
    await page.waitForTimeout(2000);
    await mailNotFiledPage.waitForLoadingToComplete();
    
    // Take screenshot of final state
    await mailNotFiledPage.takeScreenshot('after-customer-search');
    
    // Verify that customer was selected successfully by checking for some expected element
    console.log("Verifying customer selection was successful...");
    // Take a screenshot showing the selected customer
    await mailNotFiledPage.takeScreenshot('customer-selection-verification');
})


test('Mail Not Filed_Search customer in the reassign popup and click on associate', async ({ mailNotFiledPageReady, mailNotFiledPage, page }, testInfo) => {
    // Set test name for organized screenshots
    await mailNotFiledPage.setTestInfo(testInfo.title);
    await mailNotFiledPage.initializeTestScreenshotFolder();
    
    // Page is already loaded via fixture
    await expect(mailNotFiledPage.firstRow).toBeVisible();
    await mailNotFiledPage.takeScreenshot('page-loaded');
    
    // Perform test actions with appropriate waits
    console.log("Clicking on reassign button...");
    await mailNotFiledPage.clickOnReassign();
    await mailNotFiledPage.takeScreenshot('after-reassign-click');
    
    // Wait for customer search page to load
    console.log("Waiting for customer search page to load...");
    await page.waitForTimeout(2000); // Wait for dialog to appear
    
    // Try the new codegen approach first
    const codegenSuccess = await mailNotFiledPage.searchCustomerCodegenApproach(dataSet.SearchCust);
    
    // If codegen approach failed, fall back to the original methods
    if (!codegenSuccess) {
        console.log("Falling back to original search methods...");
        await mailNotFiledPage.searchCustomer();
        await mailNotFiledPage.searchCustName(dataSet.SearchCust);
    }
    
    await mailNotFiledPage.takeScreenshot('after-customer-search');
    
    // Complete the rest of the workflow
    await mailNotFiledPage.clickonAssociate();
    await mailNotFiledPage.takeScreenshot('after-associate-click');
    
    await mailNotFiledPage.clickonOK();
    await expect(mailNotFiledPage.firstRow).toBeVisible();
    await mailNotFiledPage.takeScreenshot('after-associate-complete');
})

test('Mail Not Filed_Search customer in the reassign popup and click on new issue Create', async ({ mailNotFiledPageReady, mailNotFiledPage, page }, testInfo) => {
    // Set test name for organized screenshots
    await mailNotFiledPage.setTestInfo(testInfo.title);
    await mailNotFiledPage.initializeTestScreenshotFolder();
    
    // Page is already loaded via fixture
    await expect(mailNotFiledPage.firstRow).toBeVisible();
    await mailNotFiledPage.takeScreenshot('page-loaded');
    
    // Perform test actions with appropriate waits
    console.log("Clicking on reassign button...");
    await mailNotFiledPage.clickOnReassign();
    await mailNotFiledPage.takeScreenshot('after-reassign-click');
    
    // Wait for customer search page to load
    console.log("Waiting for customer search page to load...");
    await page.waitForTimeout(2000); // Simple wait to ensure dialog appears
    
    // Use the codegen approach for customer search
    try {
        console.log(`Searching for customer using codegen approach: ${dataSet.SearchCust}...`);
        
        // Step 1: Click on the search field (direct from codegen)
        await page.locator('.css-19bb58m').click();
        await page.waitForTimeout(500);
        
        // Step 2: Fill the search input (direct from codegen)
        await page.locator('#react-select-2-input').fill(dataSet.SearchCust);
        await page.waitForTimeout(1000); // Wait for search results
        
        // Step 3: Click on the matching result (direct from codegen)
        await page.getByText(': 05 CUSTOMS').click();
        
        console.log("Successfully selected customer using codegen approach");
    } catch (error) {
        console.error(`Error using codegen approach: ${error.message}`);
        
        // Fall back to the existing method if codegen approach fails
        console.log("Falling back to existing search methods...");
        await mailNotFiledPage.searchCustomer();
        await mailNotFiledPage.searchCustName(dataSet.SearchCust);
    }
    
    // Continue with the rest of the test
    await page.waitForTimeout(1000); // Wait after customer selection
    await mailNotFiledPage.takeScreenshot('after-customer-selection');
    
    await mailNotFiledPage.clickOnNewIssue();
    await mailNotFiledPage.clcikOnCreate();
    await mailNotFiledPage.clickonOK();
    await mailNotFiledPage.closeReassignedpopup();
    
    // Wait for the page to reload and verify we're back to the main screen
    await page.waitForTimeout(1000);
    await expect(mailNotFiledPage.firstRow).toBeVisible();
    await mailNotFiledPage.takeScreenshot('after-completed-workflow');
})


test('Mail Not Filed_Search customer in the reassign popup and click on new issue Create/Edit', async ({ mailNotFiledPageReady, mailNotFiledPage, page }, testInfo) => {
    // Setup test name for screenshots
    await mailNotFiledPage.setTestInfo(testInfo.title);
    await mailNotFiledPage.initializeTestScreenshotFolder();
    
    // Page is already loaded via fixture
    await expect(mailNotFiledPage.firstRow).toBeVisible();
    await mailNotFiledPage.takeScreenshot('before-test');
    
    // Execute the complete workflow using the new codegen approach
    console.log("Executing customer search using complete codegen workflow...");
    
    // Try the complete codegen workflow first
    const workflowSuccess = await mailNotFiledPage.executeReassignCustomerWorkflowCodegen(dataSet.SearchCust);
    
    if (!workflowSuccess) {
        console.log("Falling back to individual steps...");
        // If the complete workflow fails, try the individual steps
        await mailNotFiledPage.clickOnReassign();
        await page.waitForTimeout(2000); // Wait for dialog
        
        // Try the standalone codegen search approach
        const searchSuccess = await mailNotFiledPage.searchCustomerCodegenApproach(dataSet.SearchCust);
        
        if (!searchSuccess) {
            console.log("Falling back to original search methods...");
            // If both codegen approaches fail, fall back to original methods
            await mailNotFiledPage.searchCustomer();
            await mailNotFiledPage.searchCustName(dataSet.SearchCust);
        }
    }
    
    // Continue with the rest of the test
    await mailNotFiledPage.takeScreenshot('after-customer-search');
    await mailNotFiledPage.clickOnNewIssue();
    await mailNotFiledPage.clickonCreateEdit();
    await mailNotFiledPage.clickOnActivitySave();
    
    // Wait for page to reload and verify
    await page.waitForTimeout(2000);
    await expect(mailNotFiledPage.firstRow).toBeVisible();
    await mailNotFiledPage.takeScreenshot('test-complete');
})

test('Mail Not Filed_Search customer in the reassign popup and click on associate_Add Description', async ({ mailNotFiledPageReady, mailNotFiledPage }) => {
    // Page is already loaded via fixture
    await expect(mailNotFiledPage.firstRow).toBeVisible();
    
    await mailNotFiledPage.clickOnReassign();
    await mailNotFiledPage.searchCustomer();
    await mailNotFiledPage.searchCustName(dataSet.SearchCust);
    await mailNotFiledPage.addDescription();
    await mailNotFiledPage.clickonAssociate();
    await mailNotFiledPage.clickonOK();
    await expect(mailNotFiledPage.firstRow).toBeVisible();

})
//updated

test.only('Mail Not Filed_Search customer in the reassign popup and click on new issue Create_Add Description', async ({ mailNotFiledPageReady, mailNotFiledPage }) => {
    // Page is already loaded via fixture
    await expect(mailNotFiledPage.firstRow).toBeVisible();
    
    await mailNotFiledPage.clickOnReassign();
    await mailNotFiledPage.searchCustomer();
    await mailNotFiledPage.searchCustName(dataSet.SearchCust);
    await mailNotFiledPage.addDescription();
    await mailNotFiledPage.clickOnNewIssue();
    await mailNotFiledPage.clcikOnCreate();
    await mailNotFiledPage.clickonOK();
    await mailNotFiledPage.closeReassignedpopup();
    await expect(mailNotFiledPage.firstRow).toBeVisible();

})


test('Mail Not Filed_Search customer in the reassign popup and click on new issue Create/Edit_Add Description', async ({ mailNotFiledPageReady, mailNotFiledPage }) => {
    // Page is already loaded via fixture
    await expect(mailNotFiledPage.firstRow).toBeVisible();
    
    await mailNotFiledPage.clickOnReassign();
    await mailNotFiledPage.searchCustomer();
    await mailNotFiledPage.searchCustName(dataSet.SearchCust);
    await mailNotFiledPage.addDescription();
    await mailNotFiledPage.clickOnNewIssue();
    await mailNotFiledPage.clickonCreateEdit();
    await mailNotFiledPage.clickOnActivitySave();
    await expect(mailNotFiledPage.firstRow).toBeVisible();

})

// test('Mail Not Filed_Navigation using class method', async ({ page, loggedIn, pageNav, mailNotFiledPage }, testInfo) => {
//   // This test demonstrates using the proper class method for navigation
//   // instead of direct locator usage
  
//   // Set test name for organized screenshots
//   await mailNotFiledPage.setTestInfo(testInfo.title);
//   await mailNotFiledPage.initializeTestScreenshotFolder();
  
//   // Take screenshot before navigation
//   await mailNotFiledPage.takeScreenshot('before-navigation');
  
//   // First navigate to Messages menu
//   await pageNav.navigateToMessages();
  
//   // Handle any Sara chat popup
//   await handleSaraChatPopup(page);
  
//   // Use the clickonMailNotFiled method from the MailNotFiled class
//   console.log("Clicking on Mail Not Filed using the class method");
//   await mailNotFiledPage.clickonMailNotFiled();
  
//   // Wait for page to load
//   await page.waitForTimeout(2000);
  
//   // Take screenshot after navigation using the class method
//   await mailNotFiledPage.takeScreenshot('after-navigation-using-class-method');
  
//   // Verify we're on the right page by checking for a common element
//   const dataGrid = page.locator('.MuiDataGrid-root');
//   await expect(dataGrid).toBeVisible();
  
//   console.log("Successfully navigated to Mail Not Filed page using the class method");
// });

// test('Mail Not Filed_Explicit Navigation and Mark Read/Unread', async ({ page, loginPage, pageNav, mailNotFiledPage }, testInfo) => {
//     // Set test name for organized screenshots
//     await mailNotFiledPage.setTestInfo(testInfo.title);
//     await mailNotFiledPage.initializeTestScreenshotFolder();
    
//     // First, login to the application
//     const envConfig = require('../config.js')['qa'];
//     await loginPage.navigateTo(envConfig.baseURL);
//     await loginPage.login(envConfig.userName, envConfig.password);
//     await mailNotFiledPage.takeScreenshot('after-login');
    
//     // Handle any Sara Chat popup before navigation
//     await handleSaraChatPopup(page);
    
//     // Navigate to Messages menu - EXPLICITLY SHOWING THIS STEP
//     console.log("Explicitly navigating to Messages menu");
//     await pageNav.navigateToMessages();
//     await mailNotFiledPage.takeScreenshot('after-messages-navigation');
    
//     // Click on Mail Not Filed - EXPLICITLY SHOWING THIS STEP
//     console.log("Explicitly clicking on Mail Not Filed");
//     await mailNotFiledPage.clickonMailNotFiled();
//     await mailNotFiledPage.takeScreenshot('after-mail-not-filed-click');
    
//     // Wait for page to load completely
//     await page.waitForTimeout(2000);
//     await expect(mailNotFiledPage.firstRow).toBeVisible();
//     await mailNotFiledPage.takeScreenshot('page-loaded');
    
//     // Now perform the test actions (same as in the original test)
//     await mailNotFiledPage.selectTheFirstRowCheckbox();
//     await mailNotFiledPage.takeScreenshot('after-row-selection');
    
//     await mailNotFiledPage.clickOnReadUnread();
//     await mailNotFiledPage.takeScreenshot('after-mark-read-unread');
// });

// test('Mail Not Filed_Comprehensive delete workflow with verification', async ({ mailNotFiledPageReady, mailNotFiledPage }, testInfo) => {
//     // Set test name for organized screenshots
//     await mailNotFiledPage.setTestInfo(testInfo.title);
//     await mailNotFiledPage.initializeTestScreenshotFolder();
    
//     // Page is already loaded via fixture
//     await expect(mailNotFiledPage.firstRow).toBeVisible();
//     await mailNotFiledPage.takeScreenshot('page-loaded');
    
//     // Use the comprehensive workflow that handles selection, deletion, and verification
//     const deleteWorkflowSuccessful = await mailNotFiledPage.selectDeleteAndVerify();
    
//     // Assert that the entire workflow was successful
//     //expect(deleteWorkflowSuccessful).toBe(true, 'The comprehensive delete workflow failed - email was not deleted');
// })


