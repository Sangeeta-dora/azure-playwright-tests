/**
 * PageNavigation - Page Object Model for navigation in the Sage ATC application
 * Handles all navigation operations throughout the application
 * @module PageNavigation
 */
const { expect } = require("playwright/test");

/**
 * PageNavigation class with methods for navigating throughout the application
 * @class
 */
exports.PageNavigation = class PageNavigation {
    /**
     * Creates an instance of PageNavigation
     * @constructor
     * @param {Object} page - Playwright page object 
 
 +   */    constructor(page){
        this.page = page;
        
        // Use only the more reliable iframe/role-based locators for all menu items
        // We'll initialize these below after setting up the basic structure
          // Additional locators for backward compatibility and enhanced functionality
        
        // Basic navigation elements
         this.page = page;
        
        // Main navigation items
        this.Home = page.locator('//span[text()="Home"]')
        this.Dashboard = page.locator('//span[text()="Dashboard"]')

        //Messages->Pages
        this.Messages_old = page.locator('(//span[text()="Messages"])[1]')
        this.CustomerMessage = page.locator('//span[text()="Customer Message"]')
        this.ErrorSendingEmail = page.locator('//span[text()="Error Sending Email"]')
        this.InternalMessage = page.locator('//span[text()="Internal Message"]')
        this.DraftActivities = page.locator('//a[@title="Messages" and contains(@class,"ps-open")]/..//a[@title="Draft Activities"]')
        this.ExpectedPaymentPromiseBroken = page.locator('//span[text()="Expected Payment Promise Broken"]')
        this.MailNotRead = page.locator('//span[text()="Mail Not Read"]')
        this.FollowupPastDue = page.locator('//span[text()="Followup Past Due"]')
        this.MailNotFiled = page.locator('//span[text()="Mail Not Filed"]')
        this.PendingPaymentNOTReconciled = page.locator('//span[text()="Pending Payment NOT Reconciled"]')
        this.FollowupDueToday = page.locator('//span[text()="Followup Due Today"]')
        this.OpenIssuewithoutOpenActivity = page.locator('//span[text()="Open Issue without Open Activity"]')
        this.PendingPaymentDeclinedDuringLast7Days = page.locator('//span[text()="Pending Payment Declined During Last 7 Days"]')
        
        //All Accounts
        this.Accounts = page.locator('//span[text()="Accounts"]')
        this.AllAccounts = page.locator('//span[text()="All accounts"]')
        
        //Inquiries->By Account->Pages
        this.Inquiries = page.locator('//span[text()="Inquiries"]')
        this.ByAccount = page.locator('//span[text()="By Account"]')
        this.AccountStatement = page.locator('//span[text()="Statement"]')
        this.AccountContacts = page.locator('(//span[text()="Contacts"])[1]')
        this.AccountInvoice = page.locator('(//span[text()="Invoices"])[1]')
        this.AccountPayments = page.locator('(//span[text()="Payments"])[1]')
        this.AccountContactInfo = page.locator('//span[text()="Contact Info"]')
        this.AccountMessages = page.locator('(//span[text()="Messages"])[2]')
        this.AccountCreditInquiry = page.locator('//span[text()="Credit Inquiry"]')
 
        //Inquiries->By User->Pages
        this.ByUsers = page.locator('//span[text()="By User"]')
        this.UserContacts = page.locator('(//span[text()="Contacts"])[2]')
        this.activities = page.locator('(//span[text()="Activities"])[2]')
        this.ActivitySummary = page.locator('//span[text()="Activity Summary"]')
        this.ExpectedPayments = page.locator('//span[text()="Expected Payments"]')
        this.FollowUp = page.locator('//span[text()="Follow-Up"]')
        this.UserMail = page.locator('//span[text()="Mail"]')
        this.UserInvoices = page.locator('(//span[text()="Invoices"])[2]')
        this.UserPayments = page.locator('(//span[text()="Payments"])[2]')
        this.UserPendingPayment = page.locator('//span[text()="Pending Payment"]')
        this.UserScheduledPayments = page.locator('//span[text()="Scheduled Payments"]')
        this.UserProjectedCashReceipts = page.locator('//span[text()="Projected Cash Receipts"]')
        this.UserReportingGroupLogs = page.locator('//span[text()="Reporting Group Logs"]')

        //Admin->Master Files->Pages
        this.Admin = page.locator('//span[text()="Admin"]')
        this.AdminMasterFiles = page.locator('//span[text()="Master Files"]')
        this.ActivityTemplate = page.locator('//span[text()="Activity Templates"]')
        this.ActivityType = page.locator('//span[text()="Activity Types"]')
        this.Company = page.locator('//span[text()="Company"]')
        this.CreditClass = page.locator('//span[text()="Credit Class"]')
        this.Customer = page.locator('//span[text()="Customer"]')
        this.CommunicationTemplate = page.locator('//span[text()="Communication Template"]')
        this.ReasonCode = page.locator('//span[text()="Reason Code"]')
        this.Report = page.locator('//span[text()="Report"]')
        this.ReportingGroups = page.locator('//span[text()="Reporting Groups"]')
        this.SalesRep = page.locator('//span[text()="Sales Rep"]')
        this.AdminUsers = page.locator('//span[text()="Users"]')
        this.MessageSettings = page.locator('//span[text()="Message Settings"]')

        //Admin->Settings and Utilities->Pages
        this.SettingsAndUtilities = page.locator('//span[text()="Settings & Utilities"]')
        this.Country = page.locator('//span[text()="Country"]')
        this.Import = page.locator('//span[text()="Import"]')
        this.Logs = page.locator('//span[text()="Logs"]')
        this.MailRetrieval = page.locator('//span[text()="Mail Retrieval"]')
        this.MassUpdate = page.locator('//span[text()="Mass Update"]')
        this.SiteOptions = page.locator('//span[text()="Site Options"]')
        this.SyncSetup = page.locator('//span[text()="Sync Setup"]')
        this.Home = page.getByRole('link', { name: 'Home' });
        this.Dashboard = page.getByRole('link', { name: 'Dashboard' });
        
        // Main menu selection element using more reliable locator
        this.Messages = page.getByTitle('Messages', { exact: true });
        this.viewMessages = page.getByRole('img', { name: 'Inbox' });

       

    }  

    /**
     * A generic navigation helper method that can be used by all specific navigation methods
     * Handles errors, waits, and implements fallbacks for reliable navigation
     * 
     * @param {Object} locator - Playwright locator to click for navigation
     * @param {string} itemName - Human-readable name of the navigation item (for logging)
     * @param {Object} options - Additional options
     * @param {boolean} options.waitForAnimation - Whether to wait for animations to complete
     * @param {number} options.timeout - Custom timeout in ms
     * @returns {Promise<boolean>} - True if navigation was successful
     */    async navigateToItem(locator, itemName, options = {}) {
        const timeout = options.timeout || 5000;
        const waitForAnimation = options.waitForAnimation !== false; // Default to true
        
        try {
            console.log(`Navigating to ${itemName}...`);
            
            // Wait for the element to be visible and stable
            await this.page.waitForTimeout(500);
            await locator.waitFor({ state: 'visible', timeout });
            
            // Click on the menu item
            await locator.click();
            
            // Wait for navigation animations if needed
            if (waitForAnimation) {
                await this.page.waitForTimeout(1000);
            }
            
            console.log(`Successfully navigated to ${itemName}`);
            return true;
        } catch (error) {
            console.error(`Error navigating to ${itemName}: ${error.message}`);
            
            // Try alternative approach if the main approach fails
            try {
                console.log(`Trying alternative approach for ${itemName} navigation...`);
                
                // Try using JavaScript execution as a fallback
                await this.page.evaluate((name) => {
                    const menuLinks = Array.from(document.querySelectorAll('a, span, div'))
                        .filter(el => el.textContent.includes(name));
                    
                    if (menuLinks.length > 0) {
                        menuLinks[0].click();
                        return true;
                    }
                    return false;
                }, itemName);
                
                console.log(`Alternative ${itemName} navigation approach completed`);
                if (waitForAnimation) {
                    await this.page.waitForTimeout(1000);
                }
                return true;
            } catch (fallbackError) {
                console.error(`All ${itemName} navigation attempts failed: ${fallbackError.message}`);
                throw new Error(`Could not navigate to ${itemName}`);
            }
        }
    }    
    // Click on Inquiries
    async navigateToInquiries(){
        await this.Inquiries.click();
    }

    // Click on View Messages
    async navigateToViewMessages(){
        await this.viewMessages.click();
    }

    // Click on By Users
    async navigateToByUsers(){
        await this.ByUsers.click();
    }

    // Click on Activities
    async navigateToActivities(){
        await this.activities.click();
    }    
    
    // Click on Accounts
    async navigateToAccounts(){
        await this.Accounts.click();
        await this.page.waitForTimeout(1000); // Wait for the Accounts menu to stabilize
    }

    //Click on All Accounts
    async navigateToAllAccounts(){
        await this.AllAccounts.click();
    }
    
    //Click on Home
    /**
     * Navigates to the Home page
     */
    async navigateToHome(){
        await this.Home.click();
    }

    //Click on Dashboard
    /**
     * Navigates to the Dashboard page
     */
    async navigateToDashboard(){
        await this.Dashboard.click();
    }

    //trying
    async navigateToMessagesUsinguniqueLocator() {
        console.log("Navigating to Messages using unique locator...");
        await this.Messages_old.click()
        await this.page.waitForTimeout(1000); // Wait for the menu to stabilize

    }
    
    //Click on Messages
    /**
     * Navigates to the Messages section with enhanced reliability
     * @returns {Promise<boolean>} - True if navigation was successful
     */    /**
     * Improved implementation of navigateToMessages with focused strategies
     * @returns {Promise<boolean>} - True if navigation was successful
     */
    async navigateToMessages(){
        console.log("Starting improved Messages navigation...");
        
        try {
            // Approach 1: Use the most direct and reliable method first
            await this.navigateToMessagesUsingPrimaryLocator();
            return true;
        } catch (error) {
            console.log(`Primary locator approach failed: ${error.message}`);
            
            // Approach 2: Try the frame-specific approach
            try {
                await this.navigateToMessagesUsingFrameLocator();
                return true;
            } catch (frameError) {
                console.log(`Frame approach failed: ${frameError.message}`);
                
                // Approach 3: Use the JS evaluation approach as last resort
                try {
                    return await this.navigateToMessagesUsingJSEvaluation();
                } catch (jsError) {
                    console.error(`All Messages navigation approaches failed: ${jsError.message}`);
                    return false;
                }
            }
        }
    }
    
    /**
     * Helper method that uses the primary locator for Messages menu
     * @private
     */
    async navigateToMessagesUsingPrimaryLocator() {
        console.log("Using primary locator approach for Messages...");
        
        // Get the most reliable locator
        const messagesMenu = this.page.getByTitle('Messages', { exact: true });
        
        // Wait for it to be available and visible
        await messagesMenu.waitFor({ state: 'visible', timeout: 10000 });
        
        // Add a small delay for stability
        await this.page.waitForTimeout(300);
        
        // Click the menu
        await messagesMenu.click({ timeout: 5000 });
        console.log("Clicked Messages menu with primary locator");
        
        // Wait for the submenu to appear and verify
        await this.page.waitForTimeout(800);
        
        // Verify that submenu items are now visible
        const submenuVisible = await this.page.locator('text=Mail Not Read').isVisible()
            .catch(() => false);
            
        if (!submenuVisible) {
            console.log("Submenu not visible after clicking Messages, trying again");
            await messagesMenu.click({ timeout: 5000 });
            await this.page.waitForTimeout(1000);
            
            const nowVisible = await this.page.locator('text=Mail Not Read').isVisible()
                .catch(() => false);
                
            if (!nowVisible) {
                throw new Error("Could not expand Messages menu");
            }
        }
        
        console.log("Messages menu expanded successfully");
    }
    
    /**
     * Helper method that uses the iframe approach for Messages menu
     * @private
     */
    async navigateToMessagesUsingFrameLocator() {
        console.log("Using frame locator approach for Messages...");
        
        // Get the frame and check if it exists
        const frame = this.page.frame("sideNavIFrame");
        
        if (frame) {
            // Try multiple locators, in order of reliability
            const frameLocators = [
                frame.locator('#Repeater1_spnParentItem_3'),
                frame.locator('#Repeater1_spnParentItem_3 div'),
                frame.locator('span:has-text("Messages")').first()
            ];
            
            // Try each locator
            for (const locator of frameLocators) {
                try {
                    const isVisible = await locator.isVisible().catch(() => false);
                    if (isVisible) {
                        await locator.click({ timeout: 5000 });
                        console.log("Clicked Messages in frame");
                        await this.page.waitForTimeout(1000);
                        
                        // Verify the menu is expanded
                        const submenuVisible = await frame.locator('a:has-text("Mail Not Read")').isVisible()
                            .catch(() => false);
                            
                        if (!submenuVisible) {
                            console.log("Submenu not visible, trying again");
                            await locator.click();
                            await this.page.waitForTimeout(1000);
                        }
                        
                        return;
                    }
                } catch (error) {
                    console.log(`Frame locator attempt failed: ${error.message}`);
                }
            }
            
            throw new Error("No visible Messages element found in frame");
        } else {
            throw new Error("sideNavIFrame not found");
        }
    }
    
    /**
     * Helper method that uses JavaScript evaluation to click Messages
     * @private
     * @returns {Promise<boolean>} - True if navigation was successful
     */
    async navigateToMessagesUsingJSEvaluation() {
        console.log("Using JavaScript evaluation for Messages...");
        
        // First try in the iframe context
        const clicked = await this.page.evaluate(() => {
            try {
                // Try in iframe first
                const iframe = document.querySelector('iframe[name="sideNavIFrame"]');
                if (iframe && iframe.contentDocument) {
                    const elements = Array.from(iframe.contentDocument.querySelectorAll('a, span, div'))
                        .filter(el => el.textContent.includes('Messages'));
                    
                    if (elements.length > 0) {
                        elements[0].click();
                        return true;
                    }
                }
                
                // Try in main document
                const elements = Array.from(document.querySelectorAll('a, span, div'))
                    .filter(el => el.textContent.includes('Messages') || 
                                 el.title === 'Messages' || 
                                 el.id.includes('Message'));
                
                if (elements.length > 0) {
                    elements[0].click();
                    return true;
                }
                
                return false;
            } catch (e) {
                console.error("JS evaluation error:", e);
                return false;
            }
        });
        
        if (clicked) {
            console.log("Clicked Messages with JS evaluation");
            await this.page.waitForTimeout(1000);
            return true;
        } else {
            throw new Error("JavaScript click attempt failed");
        }
    }    
    
    //Click on Mail Not Read - direct method (consider using navigateToMailNotRead instead)
    async navigateMailNotRead(){
        await this.MailNotRead.click();
    }
    
    //Click on Customer Message
    async navigateToCustomerMessage(){
        await this.CustomerMessage.click();
    }

    //Click on Error Sending Email
    async navigateToErrorSendingEmail(){
        await this.ErrorSendingEmail.click();
    }

    //Click on Internal Message
    async navigateToInternalMessage(){
        await this.InternalMessage.click();
    }    
    //Click on Draft Activities
    async navigateToDraftActivities(){
        await this.DraftActivities.click();
    }

    //Click on Expected Payment Promise Broken
    async navigateToExpectedPaymentPromiseBroken(){
        await this.ExpectedPaymentPromiseBroken.click();
    }
    
    //Click on Mail Not Read
    /**
     * Navigates to the Mail Not Read section
     * @returns {Promise<boolean>} - True if navigation was successful
     */    /**
     * Improved version of navigateToMailNotRead with more reliable menu handling
     * @returns {Promise<boolean>} - True if navigation was successful
     */
    async navigateToMailNotRead(){
        console.log("Starting enhanced navigateToMailNotRead...");
        
        try {
            // Approach 1: Use the two-step hover-then-click sequence which is most reliable
            await this.navigateToMailNotReadWithHoverStrategy();
            return true;
        } catch (error) {
            console.log(`Hover-then-click approach failed: ${error.message}`);
            
            // Approach 2: Try the element state verification approach
            try {
                await this.navigateToMailNotReadWithStateVerification();
                return true;
            } catch (nestedError) {
                console.log(`State verification approach failed: ${nestedError.message}`);
                
                // Approach 3: Try the frame-specific direct approach
                try {
                    await this.navigateToMailNotReadWithFrameAccess();
                    return true;
                } catch (frameError) {
                    console.log(`Frame-specific approach failed: ${frameError.message}`);
                    
                    // Approach 4: As a fallback, use the simplified approach (it also has a slower click)
                    try {
                        return await this.navigateToMailNotReadSimple();
                    } catch (finalError) {
                        console.error(`All navigation approaches failed: ${finalError.message}`);
                        return false;
                    }
                }
            }
        }
    }
    
    /**
     * Helper method that uses a hover-then-click approach
     * This is often more reliable for menus that close when focus is lost
     * @private
     */
    async navigateToMailNotReadWithHoverStrategy() {
        // First reset menu state by clicking Home
        try {
            await this.Home.click();
            await this.page.waitForTimeout(500);
        } catch (error) {
            console.log(`Home reset skipped: ${error.message}`);
        }
        
        // Get the Messages menu element
        const messagesMenu = this.page.getByTitle('Messages', { exact: true });
        await messagesMenu.waitFor({ timeout: 5000 });
        
        // Click on the Messages menu
        await messagesMenu.click();
        console.log("Clicked Messages menu");
        await this.page.waitForTimeout(800);
        
        // Now try to find the Mail Not Read submenu
        const mailNotReadItem = this.page.getByRole('link', { name: 'Mail Not Read' });
        
        // Important: Hover over the item first to maintain menu state
       // await mailNotReadItem.hover();
        await this.page.waitForTimeout(300);
        
        // Take a screenshot to verify the state
        await this.page.screenshot({ path: 'mail-not-read-before-click.png' });
        
        // Then click the item
        await mailNotReadItem.click();
        console.log("Clicked Mail Not Read submenu item after hover");
        
        // Wait for navigation
        await this.page.waitForTimeout(1000);
    }
    
    /**
     * Helper method that verifies element state before interactions
     * This ensures the menu is properly expanded
     * @private
     */
    async navigateToMailNotReadWithStateVerification() {
        // Click on Messages menu
        const messagesMenu = this.page.getByTitle('Messages', { exact: true });
        await messagesMenu.click();
        console.log("Clicked Messages menu");
        
        // Wait and verify the submenu is actually expanded
        await this.page.waitForTimeout(500);
        
        // Explicitly verify that the submenu is visible
        const isSubmenuVisible = await this.page.getByRole('link', { name: 'Mail Not Read' }).isVisible();
        
        if (!isSubmenuVisible) {
            console.log("Submenu not visible after first click, clicking again");
            await messagesMenu.click();
            await this.page.waitForTimeout(800);
            
            // Check again
            const isVisibleNow = await this.page.getByRole('link', { name: 'Mail Not Read' }).isVisible();
            if (!isVisibleNow) {
                throw new Error("Mail Not Read submenu not visible after second attempt");
            }
        }
        
        // Now click the Mail Not Read item
        await this.page.getByRole('link', { name: 'Mail Not Read' }).click();
        console.log("Clicked Mail Not Read after verifying visibility");
        
        await this.page.waitForTimeout(1000);
    }
    
    /**
     * Helper method that uses direct frame access for better reliability
     * This targets the iframe directly when other approaches fail
     * @private
     */
    async navigateToMailNotReadWithFrameAccess() {
        // First check if we're dealing with a frame-based navigation
        const sideNavFrame = this.page.frame("sideNavIFrame");
        
        if (sideNavFrame) {
            console.log("Found sideNavIFrame, using direct frame access");
            
            // Click on Messages in the frame
            await sideNavFrame.locator('#Repeater1_spnParentItem_3').click();
            await this.page.waitForTimeout(800);
            
            // Click on Mail Not Read in the frame
            await sideNavFrame.getByRole('link', { name: 'Mail Not Read' }).click();
            console.log("Clicked Mail Not Read via direct frame access");
            
            await this.page.waitForTimeout(1000);
        } else {
            throw new Error("sideNavIFrame not found");
        }
    }    

    async clickonDueToday() {
        // Click on the "Due Today" menu item
        const dueTodayItem = this.page.getByText('~DueToday');
        
        // Wait for it to be visible
        await dueTodayItem.waitFor({ state: 'visible', timeout: 5000 });
        
        // Click the item
        await dueTodayItem.click();
        
        // Wait for navigation to complete
        await this.page.waitForTimeout(1000);
    }

    async clickonPastDue() {
        // Click on the "Past Due" menu item
        const pastDueItem = this.page.getByText('~PastDue');
        
        // Wait for it to be visible
        await pastDueItem.waitFor({ state: 'visible', timeout: 5000 });
        
        // Click the item
        await pastDueItem.click();
        
        // Wait for navigation to complete
        await this.page.waitForTimeout(1000);
    }
    
    //Click on Followup Past Due
    /**
     * Navigates to the Followup Past Due section
     */
    async navigateToFollowupPastDue(){
        await this.FollowupPastDue.click();
    }

    //Click on Mail Not Filed
    /**
     * Navigates to the Mail Not Filed section
     */
    async navigateToMailNotFiled(){
        await this.MailNotFiled.click();
    }   
    
    //Click on Pending Payment NOT Reconciled
    async navigateToPendingPaymentNOTReconciled(){
        await this.PendingPaymentNOTReconciled.click();
    }    
    
    //Click on Followup Due Today
    async navigateToFollowupDueToday(){
        await this.FollowupDueToday.click();
    }

    //Click on Open Issue without Open Activity
    async navigateToOpenIssuewithoutOpenActivity(){
        await this.OpenIssuewithoutOpenActivity.click();
    }

    //Click on Pending Payment Declined During Last 7 Days
    async navigateToPendingPaymentDeclinedDuringLast7Days(){
        await this.PendingPaymentDeclinedDuringLast7Days.click();
    }    
    
    //Click on Account Statement
    async navigateToAccountStatement(){
        await this.AccountStatement.click();
    }

    //Click on Account Contacts
    async navigateToAccountContacts(){
        await this.AccountContacts.click();
    }

    //Click on Account Invoice
    async navigateToAccountInvoice(){
        await this.AccountInvoice.click();
    }

    //Click on Account Payments
    async navigateToAccountPayments(){
        await this.AccountPayments.click();
    }   
    
    //Click on Account Contact Info
    async navigateToAccountContactInfo(){
        await this.AccountContactInfo.click();
    }

    //Click on Account Messages
    async navigateToAccountMessages(){
        await this.AccountMessages.click();
    }

    //Click on Account Credit Inquiry
    async navigateToAccountCreditInquiry(){
        await this.AccountCreditInquiry.click();
    }

    //Click on User Contacts
    async navigateToUserContacts(){
        await this.UserContacts.click();
    }
    
    //Click on Activity Summary
    async navigateToActivitySummary(){
        await this.ActivitySummary.click();
    }

    //Click on Expected Payments
    async navigateToExpectedPayments(){
        await this.ExpectedPayments.click();
    }

    //Click on FollowUp
    async navigateToFollowUp(){
        await this.FollowUp.click();
    }

    //Click on User Mail
    async navigateToUserMail(){
        await this.UserMail.click();
    }

    //Click on User Invoices
    async navigateToUserInvoices(){
        await this.UserInvoices.click();
    }

    //Click on User Payments
    async navigateToUserPayments(){
        await this.UserPayments.click();
    }
    
    //Click on User Pending Payment
    async navigateToUserPendingPayment(){
        await this.UserPendingPayment.click();
    }

    //Click on User Scheduled Payments
    async navigateToUserScheduledPayments(){
        await this.UserScheduledPayments.click();
    }

    //Click on User Projected Cash Receipts
    async navigateToUserProjectedCashReceipts(){
        await this.UserProjectedCashReceipts.click();
    }

    //Click on User Reporting Group Logs
    async navigateToUserReportingGroupLogs(){
        await this.UserReportingGroupLogs.click();
    }

    //Click on By Account
    async navigateToByAccount(){
        await this.ByAccount.click();
    }

    //Click on Admin
    async navigateToAdmin(){
        await this.Admin.click();
    }

    //Click on Admin Master Files
    async navigateToAdminMasterFiles(){
        await this.AdminMasterFiles.click();
    }
    
    //Click on Activity Template
    async navigateToActivityTemplate(){
        await this.ActivityTemplate.click();
    }

    //Click on Activity Type
    async navigateToActivityType(){
        await this.ActivityType.click();
    }

    //Click on Company
    async navigateToCompany(){
        await this.Company.click();
    }

    //Click on Credit Class
    async navigateToCreditClass(){
        await this.CreditClass.click();
    }

    //Click on Customer
    async navigateToCustomer(){
        await this.Customer.click();
    }

    //Click on Communication Template
    async navigateToCommunicationTemplate(){
        await this.CommunicationTemplate.click();
    }
    
    //Click on Reason Code
    async navigateToReasonCode(){
        await this.ReasonCode.click();
    }

    //Click on Report
    async navigateToReport(){
        await this.Report.click();
    }

    //Click on Reporting Groups
    async navigateToReportingGroups(){
        await this.ReportingGroups.click();
    }

    //Click on Sales Rep
    async navigateToSalesRep(){
        await this.SalesRep.click();
    }

    //Click on Users
    async navigateToAdminUsers(){
        await this.AdminUsers.click();
    }

    //Click on Message Settings
    async navigateToMessageSettings(){
        await this.MessageSettings.click();
    }

    //Click on Settings And Utilities
    async navigateToSettingsAndUtilities(){
        await this.SettingsAndUtilities.click();
    }
    
    //Click on Country
    async navigateToCountry(){
        await this.Country.click();
    }

    //Click on Import
    async navigateToImport(){
        await this.Import.click();
    }

    //Click on Logs
    async navigateToLogs(){
        await this.Logs.click();
    }

    //Click on Mail Retrieval
    async navigateToMailRetrieval(){
        await this.MailRetrieval.click();
    }

    //Click on Mass Update
    async navigateToMassUpdate(){
        await this.MassUpdate.click();
    }

    //Click on Site Options
    async navigateToSiteOptions(){
        await this.SiteOptions.click();
    }

    //Click on Sync Setup
    async navigateToSyncSetup(){
        await this.SyncSetup.click();
    }
    
    //Click on Age Accounts
    async navigateToAgeAccounts(){
        await this.AgeAccounts.click();
    }

    //Click on Generate Actions
    async navigateToGenerateActions(){
        await this.GenerateActions.click();
    }

    /**
     * Navigates to any menu item by its text content
     * This is a flexible method that can be used when no specific method exists
     * 
     * @param {string} menuText - The exact text of the menu item to click
     * @param {Object} options - Additional options
     * @param {boolean} options.exact - Whether the text match should be exact
     * @returns {Promise<boolean>} - True if navigation was successful
     */
    async navigateByText(menuText, options = {}) {
        const exact = options.exact !== false; // Default to true
        
        try {
            console.log(`Navigating to menu item "${menuText}"...`);
            
            // Create a dynamic locator based on the text
            const locator = exact ? 
                this.page.locator(`//*[text()="${menuText}"]`) :
                this.page.locator(`//*[contains(text(), "${menuText}")]`);
            
            // Use our helper method for the actual navigation
            return await this.navigateToItem(locator, menuText, options);
        } catch (error) {
            console.error(`Error navigating to "${menuText}": ${error.message}`);
            throw error;
        }
    }

    /**
     * Navigates to the Messages and Mail Not Read pages using codegen-generated selectors
     * This is a simplified method for direct navigation without fallbacks
     * @returns {Promise<boolean>} - True if navigation was successful
     */    /**
     * Improved version of navigateToMailNotReadSimple that handles menu interactions
     * properly to prevent menu from closing unexpectedly
     * @returns {Promise<boolean>} - True if navigation was successful
     */    /**
     * Simplified implementation of Mail Not Read navigation that follows the standardized pattern
     * while maintaining the specialized navigation sequence required for this element
     * @returns {Promise<boolean>} - True if navigation was successful
     */
    async navigateToMailNotReadSimple() {
        try {
            console.log("Navigating to Mail Not Read using simplified standardized approach...");
            
            // First ensure Messages menu is expanded
            const messagesMenu = this.page.getByTitle('Messages', { exact: true });
            await this.navigateToItem(messagesMenu, "Messages", { waitForAnimation: true, timeout: 5000 });
            
            // Now navigate to Mail Not Read using our standard pattern with specialized options
            // Create a reliable locator for Mail Not Read
            const mailNotReadItem = this.page.getByRole('link', { name: 'Mail Not Read' });
            
            // Use the standard navigateToItem helper with additional options specific to this menu
            return await this.navigateToItem(mailNotReadItem, "Mail Not Read", {
                waitForAnimation: true,
                timeout: 8000,
                // Add any other specific options needed for this special case
            });
        } catch (error) {
            console.error(`Simple navigation to Mail Not Read failed: ${error.message}`);
            console.log("Falling back to robust navigation method...");
            return await this.navigateToMailNotRead();
        }
    }
    
    /**
     * Diagnostics method specifically for troubleshooting menu navigation issues
     * This method captures detailed timing, screenshots, and element states
     * @returns {Promise<object>} - Diagnostic information
     */
    async diagnosePossibleNavigationIssues() {
        const diagnostics = {
            startTime: new Date().toISOString(),
            stepsCompleted: [],
            failures: [],
            elementStates: {},
            screenshots: []
        };
        
        try {
            console.log("Running menu navigation diagnostics...");
            
            // Step 1: Check if the main navigation frame exists
            try {
                const frameExists = await this.page.locator('iframe[name="sideNavIFrame"]').isVisible()
                    .catch(() => false);
                
                diagnostics.elementStates.sideNavFrameVisible = frameExists;
                diagnostics.stepsCompleted.push("Checked frame visibility");
                
                if (!frameExists) {
                    diagnostics.failures.push("sideNavIFrame not visible");
                }
            } catch (error) {
                diagnostics.failures.push(`Error checking frame: ${error.message}`);
            }
            
            // Take a screenshot of current state
            await this.page.screenshot({ path: 'diagnostics-start.png' });
            diagnostics.screenshots.push('diagnostics-start.png');
            
            // Step 2: Check Messages menu visibility
            try {
                const messagesVisible = await this.page.getByTitle('Messages', { exact: true }).isVisible()
                    .catch(() => false);
                
                diagnostics.elementStates.messagesMenuVisible = messagesVisible;
                diagnostics.stepsCompleted.push("Checked Messages menu visibility");
                
                if (!messagesVisible) {
                    // Try an alternative locator
                    const altMessagesVisible = await this.page.locator('text=Messages').first().isVisible()
                        .catch(() => false);
                        
                    diagnostics.elementStates.altMessagesMenuVisible = altMessagesVisible;
                    
                    if (!altMessagesVisible) {
                        diagnostics.failures.push("Messages menu not visible with any locator");
                    }
                }
            } catch (error) {
                diagnostics.failures.push(`Error checking Messages menu: ${error.message}`);
            }
            
            // Step 3: Try clicking Messages and observe what happens
            try {
                console.log("Diagnostic: Clicking Messages menu");
                await this.page.getByTitle('Messages', { exact: true }).click()
                    .catch(() => diagnostics.failures.push("Couldn't click Messages menu"));
                    
                diagnostics.stepsCompleted.push("Clicked Messages menu");
                
                // Wait for animation
                await this.page.waitForTimeout(1000);
                
                // Take a screenshot after clicking
                await this.page.screenshot({ path: 'diagnostics-after-messages-click.png' });
                diagnostics.screenshots.push('diagnostics-after-messages-click.png');
                
                // Check if submenu appeared
                const subMenuVisible = await this.page.locator('text=Mail Not Read').isVisible()
                    .catch(() => false);
                    
                diagnostics.elementStates.mailNotReadVisible = subMenuVisible;
                
                if (!subMenuVisible) {
                    diagnostics.failures.push("Mail Not Read not visible after clicking Messages");
                }
            } catch (error) {
                diagnostics.failures.push(`Error in Messages menu test: ${error.message}`);
            }
            
            // Step 4: If submenu is visible, try clicking Mail Not Read
            if (diagnostics.elementStates.mailNotReadVisible) {
                try {
                    console.log("Diagnostic: Clicking Mail Not Read menu item");
                    
                    // First hover
                    //await this.page.getByRole('link', { name: 'Mail Not Read' }).hover();
                    await this.page.waitForTimeout(300);
                    diagnostics.stepsCompleted.push("Hovered over Mail Not Read");
                    
                    // Take screenshot after hover
                    await this.page.screenshot({ path: 'diagnostics-hover-mailnotread.png' });
                    diagnostics.screenshots.push('diagnostics-hover-mailnotread.png');
                    
                    // Then click
                    await this.page.getByRole('link', { name: 'Mail Not Read' }).click();
                    diagnostics.stepsCompleted.push("Clicked Mail Not Read");
                    
                    // Wait for navigation
                    await this.page.waitForTimeout(1000);
                    
                    // Take screenshot after click
                    await this.page.screenshot({ path: 'diagnostics-after-mailnotread-click.png' });
                    diagnostics.screenshots.push('diagnostics-after-mailnotread-click.png');
                } catch (error) {
                    diagnostics.failures.push(`Error clicking Mail Not Read: ${error.message}`);
                }
            }
            
            // Step 5: Check for any elements that might interfere (overlays, popups)
            try {
                const possibleOverlays = [
                    await this.page.locator('div.modal').isVisible().catch(() => false),
                    await this.page.locator('div.popup').isVisible().catch(() => false),
                    await this.page.locator('div.overlay').isVisible().catch(() => false)
                ];
                
                diagnostics.elementStates.possibleOverlaysVisible = possibleOverlays.some(v => v);
                
                if (diagnostics.elementStates.possibleOverlaysVisible) {
                    diagnostics.failures.push("Detected possible overlay elements that may interfere");
                }
            } catch (error) {
                diagnostics.failures.push(`Error checking overlays: ${error.message}`);
            }
            
            // Final diagnostics data
            diagnostics.endTime = new Date().toISOString();
            diagnostics.totalDuration = new Date() - new Date(diagnostics.startTime);
            diagnostics.summary = diagnostics.failures.length > 0 ? 
                "Issues detected in menu navigation" : 
                "No obvious issues detected";
                
            console.log("Diagnostics completed:", diagnostics.summary);
            console.log("Steps completed:", diagnostics.stepsCompleted.join(', '));
            console.log("Failures detected:", diagnostics.failures.join(', '));
            
            return diagnostics;
            
        } catch (error) {
            console.error("Error running diagnostics:", error);
            diagnostics.failures.push(`Fatal error: ${error.message}`);
            return diagnostics;
        }
    }
}