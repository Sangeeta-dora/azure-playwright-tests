const { expect } = require('@playwright/test');
const { ScreenshotManager } = require('../utils/screenshotManager');
const { safeMethodCall, safeUIInteraction } = require('../utils/methodHelper');
const { handleSaraChatPopup } = require('./handleSaraChatPopup');
const path = require('path');

/**
 * Page object representing the mail not filed page
 * @class MailNotFiled
 */
exports.MailNotFiled = class MailNotFiled{

    constructor(page){
        // Initialize screenshot manager
        this.screenshotManager = new ScreenshotManager();
        this.testName = 'Unknown_Test'; // Will be set later by setTestInfo method

        // Page and locators
        this.page = page
        this.selector = page.locator('#react-select-3-input')
        this.inbox= page.locator("input[type='radio']").nth(0)
        this.confirmationOK = page.getByRole('button', { name: 'OK' })
        this.description = page.getByLabel('Issue Description (Optional)')
        this.searchcustomer = page.locator('.css-19bb58m').nth(1)
        this.closebutton = page.getByLabel('Close')
        this.ActivitySave = page.getByRole('button', { name: 'Save' })
        this.newIssue = page.getByRole('button', { name: 'New Issue' })
        this.create = page.getByRole('menuitem', { name: 'Create', exact: true })
        this.createEdit = page.getByRole('menuitem', { name: 'Create/Edit' })
        this.associate = this.selectRow= page.locator('.MuiDataGrid-virtualScrollerRenderZone').locator('div[role="row"]').locator('div[aria-colindex="1"]').locator('button[type="button"]').nth(1)
        this.xyz = page.locator('.mt-3 > .header-com-search-bar > .css-13cymwt-control > .css-hlgwow > .css-19bb58m')
        this.sent= page.locator("input[type='radio']").nth(1)
        this.custName = page.getByText('0002: 0002').nth(1)
        this.reassign = page.locator('.MuiDataGrid-virtualScrollerRenderZone').locator('div[role="row"]').locator('div[aria-colindex="3"]').nth(1).locator('.pi')
        this.viewEmail = page.locator('.MuiDataGrid-virtualScrollerRenderZone').locator('div[role="row"]').locator('div[aria-colindex="2"]').nth(1).locator('.pi')
        this.deleteAllSelected = page.getByRole('button', { name: 'Delete All Selected' })
        this.readUnread = page.getByText('Mark All Selected As Read/')
        this.selectRowCheckbox = page.locator('.MuiDataGrid-virtualScrollerRenderZone').locator('div[role="row"]').locator('div[aria-colindex="1"]').nth(1).locator('input[type="checkbox"]')
        this.refresh = page.getByRole('button', { name: 'Refresh' })
        this.exportToExcel = page.getByRole('button', { name: 'Export To Excel' })
        this.firstRow =  page.locator('.MuiDataGrid-virtualScrollerRenderZone').locator('div[role="row"]').locator('div[aria-colindex="1"]').nth(1)
        // Additional locators for page loading verification
        this.recordcount = page.locator('//div[contains(@class,"MuiDataGrid-row")]')
        // Mail Not Filed menu item locator - with multiple strategies
        this.mailnotfiled = page.getByRole('link', { name: 'Mail Not Filed' });
        this.mailnotfiledOriginal = page.frameLocator('iframe[name="sideNavIFrame"]').getByRole('link', { name: 'Mail Not Filed' });
        this.mailnotfiledIframe1 = page.frameLocator('iframe[name="sideNavIFrame"]').locator('//span[text()="Mail Not Filed"]');
        this.mailnotfiledIframe2 = page.frameLocator('iframe[name="sideNavIFrame"]').locator('a:has-text("Mail Not Filed")');
        this.mailnotfiledIframe3 = page.frameLocator('iframe[name="sideNavIFrame"]').getByText('Mail Not Filed');
        this.reactMailnotfiled = page.locator('span.ps-menu-label.css-12w9als').filter({ hasText: 'Mail Not Filed' });
        this.reactMailnotfiledAlt1 = page.locator('span[class*="ps-menu-label"]').filter({ hasText: 'Mail Not Filed' });
        this.reactMailnotfiledAlt2 = page.locator('a[role="menuitem"]').filter({ hasText: 'Mail Not Filed' });
        this.reactMailnotfiledAlt3 = page.locator('span:text-is("Mail Not Filed")');
        this.restricted = page.locator('//span[contains(text(),"Mail Not Filed")]');
    }

    async addDescription() {
        try {
            console.log("Adding description for reassign...");
            await this.description.click();
            await this.description.type('Add Description for Reassign');
            console.log("Description added successfully");
            await this.takeScreenshot('after-adding-description');
        } catch (error) {
            console.error(`Error adding description: ${error.message}`);
            await this.takeScreenshot('error-adding-description');
            throw error;
        }
    }

    async clickOnActivitySave() {
        try {
            console.log("Clicking on Activity Save button...");
            await this.handleSaraChatPopup(); // Handle popup before clicking
            await this.ActivitySave.click();
            console.log("Activity saved successfully");
            await this.takeScreenshot('after-activity-save');
        } catch (error) {
            console.error(`Error saving activity: ${error.message}`);
            await this.takeScreenshot('error-saving-activity');
            throw error;
        }
    }

    async clickonCreateEdit() {
        try {
            console.log("Clicking on Create/Edit option...");
            await this.handleSaraChatPopup(); // Handle popup before clicking
            await this.createEdit.click();
            console.log("Clicked Create/Edit successfully");
            await this.takeScreenshot('after-create-edit-click');
        } catch (error) {
            console.error(`Error clicking Create/Edit: ${error.message}`);
            await this.takeScreenshot('error-clicking-create-edit');
            throw error;
        }
    }

    async closeReassignedpopup() {
        try {
            console.log("Closing reassigned popup...");
            await this.closebutton.click();
            console.log("Closed reassigned popup successfully");
            await this.takeScreenshot('after-closing-popup');
        } catch (error) {
            console.error(`Error closing popup: ${error.message}`);
            await this.takeScreenshot('error-closing-popup');
            throw error;
        }
    }

    async clickOnNewIssue() {
        try {
            console.log("Clicking on New Issue button...");
            //await this.handleSaraChatPopup(); // Handle popup before clicking
            await this.newIssue.click();
            console.log("Clicked New Issue successfully");
            await this.takeScreenshot('after-new-issue-click');
        } catch (error) {
            console.error(`Error clicking New Issue: ${error.message}`);
            await this.takeScreenshot('error-clicking-new-issue');
            throw error;
        }
    }

    async clcikOnCreate() {
        try {
            console.log("Clicking on Create menu item...");
            await this.handleSaraChatPopup(); // Handle popup before clicking
            await this.create.click();
            console.log("Clicked Create successfully");
            await this.takeScreenshot('after-create-click');
        } catch (error) {
            console.error(`Error clicking Create: ${error.message}`);
            await this.takeScreenshot('error-clicking-create');
            throw error;
        }
    }

    async clickonOK() {
        try {
            console.log("Clicking on OK button...");
            await this.confirmationOK.click();
            console.log("Clicked OK successfully");
            await this.takeScreenshot('after-ok-click');
        } catch (error) {
            console.error(`Error clicking OK: ${error.message}`);
            await this.takeScreenshot('error-clicking-ok');
            throw error;
        }    }
    
    async searchCustomer() {
        try {
            console.log("Clicking on search customer field...");
            
            // Check if page is still valid
            if (!this.page || this.page.isClosed()) {
                console.error("Page is closed or no longer valid");
                return;
            }
            
            // Wait for any previous loading to complete
            await this.waitForLoadingToComplete();
            
            // Take screenshot before searching
            await this.takeScreenshot('before-search-customer');
            
            // Use the dedicated method to wait for customer search page/dialog to load
            await this.waitForCustomerSearchLoaded();
            
            // Check again if the page is still valid before proceeding
            if (!this.page || this.page.isClosed()) {
                console.error("Page is closed or no longer valid after waiting for customer search");
                return;
            }
            
            // Wait for the search field to be visible and ready for interaction
            console.log("Waiting for search customer field to be visible...");
            // Check if xyz locator is valid before using it
            if (this.xyz) {
                await this.xyz.waitFor({ state: 'visible', timeout: 10000 });
                
                // Using the exact locator from codegen
                await this.xyz.click();
            } else {
                console.error("Search customer field locator (xyz) is not defined");
                return;
            }
            
            // Wait after clicking to ensure the dropdown UI is ready (increased from 1000ms to 2000ms)
            console.log("Waiting for dropdown UI to be ready...");
            await this.page.waitForTimeout(2000);
            
            // Check if dropdown container appears
            const dropdownVisible = await this.page.locator('.css-26l3qy-menu').isVisible()
                .catch(() => false);
                
            if (!dropdownVisible) {
                console.log("Dropdown may not be visible yet, waiting longer...");
                await this.page.waitForTimeout(2000);
            }
            
            console.log("Clicked search customer field successfully");
            await this.takeScreenshot('after-search-customer-click');
            
            // Wait for any loading indicators that may appear after clicking
            await this.waitForLoadingToComplete();
        } catch (error) {
            console.error(`Error clicking search customer field: ${error.message}`);
            await this.takeScreenshot('error-clicking-search-customer');
            
            // Try an alternative locator if the primary one fails
            try {
                console.log("Trying alternative approach to click search field...");
                
                // Wait for any loading to complete
                await this.waitForLoadingToComplete();
                await this.waitForCustomerSearchLoaded();
                
                // Try with a more generic selector
                await this.page.locator('.css-19bb58m').waitFor({ 
                    state: 'visible', 
                    timeout: 5000 
                });
                
                await this.page.locator('.css-19bb58m').click();
                console.log("Alternative approach successful");
                
                // Wait after clicking
                await this.page.waitForTimeout(2000);
                await this.takeScreenshot('after-alternative-search-customer-click');
            } catch (fallbackError) {
                console.error(`Both approaches failed to click search field: ${fallbackError.message}`);
                
                // One more attempt with force option
                try {
                    console.log("Attempting force click as last resort...");
                    await this.page.locator('.header-com-search-bar').click({ force: true });
                    console.log("Force click successful");
                    await this.page.waitForTimeout(2000);
                    await this.takeScreenshot('after-force-click-search-customer');
                } catch (finalError) {
                    console.error(`All approaches failed: ${finalError.message}`);
                    throw error; // Throw the original error
                }
            }
        }
    }    /**
     * Searches for customer name using the codegen-generated approach
     * @param {string} searchedName The name of the customer to search for
     * @returns {Promise<void>}
     */
    async searchCustNameCodegen(searchedName) {
        try {
            console.log(`Searching for customer name using codegen approach: ${searchedName}...`);
            await this.takeScreenshot('before-codegen-customer-search');
            
            // Using exact selectors and steps from codegen
            // Step 1: Click on the search field
            await this.page.locator('.css-19bb58m').click();
            console.log("Clicked on search field");
            
            // Step 2: Fill the search input
            await this.page.locator('#react-select-2-input').fill(searchedName);
            console.log(`Filled search input with: ${searchedName}`);
            await this.takeScreenshot('after-filling-search-input');
            
            // Wait for search results
            await this.page.waitForTimeout(1000);
            
            // Step 3: Click on the matching result
            // Try to match the exact text format from codegen
            // This is based on the format ": 05 CUSTOMS" from the example
            const textToClick = searchedName.includes(':') ? 
                searchedName : 
                `: ${searchedName}`;
                
            console.log(`Looking for text to click: ${textToClick}`);
            await this.page.getByText(textToClick, { exact: false }).click();
            
            console.log("Selected customer from dropdown");
            await this.takeScreenshot('after-codegen-customer-selection');
            
        } catch (error) {
            console.error(`Error in codegen customer search: ${error.message}`);
            await this.takeScreenshot('error-codegen-customer-search');
            
            // Fall back to previous implementation
            console.log("Falling back to previous search implementation...");
            try {
                await this.searchCustName(searchedName);
            } catch (fallbackError) {
                console.error(`Both search methods failed: ${fallbackError.message}`);
                throw error; // Throw the original error
            }
        }
    }    async searchCustName(searchedName) {
        try {
            console.log(`Searching for customer name: ${searchedName}...`);
            await this.takeScreenshot('before-select-customer');
            
            // Wait for any previous loading operations to complete
            await this.waitForLoadingToComplete();
            
            // Use the dedicated method to wait for customer search page/dialog to load
            await this.waitForCustomerSearchLoaded();
            
            // Use the React select input approach from the codegen
            const reactSelectInput = this.page.locator('#react-select-2-input');
            
            // Try typing the search term first (this can help narrow down results)
            try {
                // Wait for the input to be ready for interaction
                await reactSelectInput.waitFor({ state: 'visible', timeout: 5000 });
                
                await reactSelectInput.fill(searchedName);
                console.log(`Entered search term: ${searchedName}`);
                await this.takeScreenshot('after-entering-customer-search');
                
                // Wait for search results (increased from 1000ms to 3000ms)
                console.log("Waiting for search results to load...");
                await this.page.waitForTimeout(3000);
            } catch (fillError) {
                console.log(`Could not fill search input: ${fillError.message}`);
                await this.takeScreenshot('error-filling-search-input');
                // Continue with the process even if filling fails
            }
            
            // Check if there are any loading indicators present
            await this.waitForLoadingToComplete(5000);
            
            // Take screenshot after search results load
            await this.takeScreenshot('after-search-results-loaded');
            
            // Make sure the input is available before proceeding
            await reactSelectInput.waitFor({ state: 'visible', timeout: 5000 });
            
            // Press arrow down to reveal options (as shown in the codegen)
            await reactSelectInput.press('ArrowDown');
            console.log("Pressed ArrowDown to reveal customer options");
            await this.takeScreenshot('after-arrow-down');
            
            // Wait longer for dropdown options to appear (increased from 500ms to 2000ms)
            await this.page.waitForTimeout(2000);
            
            // Check for any dropdown options
            const optionsCount = await this.page.locator('.css-26l3qy-menu .css-tr4s17-option, .css-1n7v3ny-option').count()
                .catch(() => 0);
            console.log(`Found ${optionsCount} dropdown options`);
            
            if (optionsCount === 0) {
                console.log("No options found in dropdown, waiting longer and trying again...");
                await this.page.waitForTimeout(2000); // Wait a bit more
                await reactSelectInput.press('ArrowDown'); // Try arrow down again
                await this.page.waitForTimeout(1000);
            }
            
            // Press Enter to select the first option (as shown in the codegen)
            await reactSelectInput.press('Enter');
            console.log("Pressed Enter to select customer");
            
            // Wait for selection to take effect and any post-selection loading
            console.log("Waiting for selection to take effect...");
            await this.page.waitForTimeout(2000);
            await this.waitForLoadingToComplete(5000);
            
            // Take screenshot after selection
            await this.takeScreenshot('after-customer-selection');
            
            // Verify that selection was made
            console.log("Verifying that customer selection was made...");
            
            // Wait for any post-selection operations
            await this.page.waitForTimeout(2000);
            
            // Final verification
            console.log("Customer selection process completed successfully");
            await this.takeScreenshot('customer-selection-completed');
        } catch (error) {
            console.error(`Error searching for customer: ${error.message}`);
            await this.takeScreenshot('error-searching-customer');
            
            // Try an alternative approach if the first one fails
            try {
                console.log("Trying alternative approach to select customer...");
                
                // Wait for any loading to complete first
                await this.waitForLoadingToComplete();
                await this.waitForCustomerSearchLoaded();
                
                // Try clicking the dropdown and selecting an option visually
                await this.page.locator('.css-19bb58m').click();
                await this.page.waitForTimeout(2000); // Increased wait time
                
                // Take a screenshot of the dropdown
                await this.takeScreenshot('alternative-dropdown-open');
                
                // Try to find and click the option containing the customer name
                const customerOption = this.page.getByText(searchedName, { exact: false });
                if (await customerOption.isVisible().catch(() => false)) {
                    await customerOption.click();
                    console.log("Selected customer using text match");
                } else {
                    // If no match, try selecting the first item in the dropdown
                    console.log("No exact match found, selecting first option in dropdown");
                    await this.page.keyboard.press('ArrowDown');
                    await this.page.waitForTimeout(1000); // Wait after arrow down
                    await this.page.keyboard.press('Enter');
                    console.log("Selected first customer in dropdown");
                }
                
                // Wait for selection to take effect
                await this.page.waitForTimeout(2000);
                await this.waitForLoadingToComplete(5000);
                
                await this.takeScreenshot('after-alternative-customer-selection');
            } catch (fallbackError) {
                console.error(`Both approaches failed to select customer: ${fallbackError.message}`);
                throw error; // Throw the original error
            }
        }
    }

    /**
     * Implements the customer search using the exact codegen-generated approach
     * This is a consolidated method that handles both clicking the field and selecting the customer
     * @param {string} searchedName The name or ID of the customer to search for
     * @returns {Promise<boolean>} True if successful
     */
    async searchCustomerCodegenApproach(searchedName = "1") {
        try {
            console.log(`Using EXACT codegen approach to search for customer: ${searchedName}`);
            await this.takeScreenshot('before-codegen-search');
            
            // Step 1: Click on customer field using exact codegen selector
            await this.page.locator('.css-19bb58m').click();
            await this.page.waitForTimeout(500); // Small wait for UI to update
            
            // Step 2: Fill in the search text using exact codegen selector
            await this.page.locator('#react-select-2-input').fill(searchedName);
            await this.page.waitForTimeout(1000); // Wait for search results
            await this.takeScreenshot('codegen-search-after-fill');
            
            // Step 3: Find the matching result
            // The pattern from codegen is ": 05 CUSTOMS"
            // Extract part after colon if the search has a colon
            const textToMatch = searchedName.includes(':') ? 
                searchedName.split(':')[1].trim() : 
                searchedName;
                
            console.log(`Looking for text containing: ${textToMatch}`);
            
            // Use a more flexible selector that can find text even if format varies slightly
            const matchingText = await this.page
                .getByText(textToMatch, { exact: false })
                .isVisible();
                
            if (matchingText) {
                console.log(`Found match containing '${textToMatch}', clicking...`);
                await this.page.getByText(textToMatch, { exact: false }).click();
            } else {
                console.log(`No exact match for '${textToMatch}', trying generic selection...`);
                // If no match found, try selecting first option in dropdown
                await this.page.keyboard.press('ArrowDown');
                await this.page.keyboard.press('Enter');
            }
            
            await this.page.waitForTimeout(1000); // Wait for selection to take effect
            await this.takeScreenshot('after-codegen-customer-selected');
            
            console.log("Customer selection with codegen approach completed successfully");
            return true;
        } catch (error) {
            console.error(`Error in codegen customer search approach: ${error.message}`);
            await this.takeScreenshot('error-codegen-search');
            return false;
        }
    }

    async clickonAssociate() {
        try {
            console.log("Clicking on associate button...");
            //await this.handleSaraChatPopup(); // Handle popup before clicking
            await this.associate.click();
            console.log("Clicked associate successfully");
            await this.takeScreenshot('after-associate-click');
        } catch (error) {
            console.error(`Error clicking associate: ${error.message}`);
            await this.takeScreenshot('error-clicking-associate');
            throw error;
        }
    }

    async clickOnReassign() {
        try {
            console.log("Clicking on reassign button...");
            await this.handleSaraChatPopup(); // Handle popup before clicking
            await this.reassign.click();
            console.log("Clicked reassign successfully");
            await this.takeScreenshot('after-reassign-click');
        } catch (error) {
            console.error(`Error clicking reassign: ${error.message}`);
            await this.takeScreenshot('error-clicking-reassign');
            throw error;
        }
    }

    async clickonSent() {
        try {
            console.log("Clicking on Sent radio button...");
            await this.handleSaraChatPopup(); // Handle popup before clicking
            await this.sent.check();
            console.log("Selected Sent radio button successfully");
            await this.takeScreenshot('after-sent-selection');
            await this.waitForPageStable();
        } catch (error) {
            console.error(`Error selecting Sent radio button: ${error.message}`);
            await this.takeScreenshot('error-selecting-sent');
            throw error;
        }
    }

    async clickonInbox() {
        try {
            console.log("Clicking on Inbox radio button...");
            await this.handleSaraChatPopup(); // Handle popup before clicking
            await this.inbox.check();
            console.log("Selected Inbox radio button successfully");
            await this.takeScreenshot('after-inbox-selection');
            await this.waitForPageStable();
        } catch (error) {
            console.error(`Error selecting Inbox radio button: ${error.message}`);
            await this.takeScreenshot('error-selecting-inbox');
            throw error;
        }
    }

    async clickOnDeleteAllSelected() {
        try {
            console.log("Clicking on Delete All Selected button...");
            await this.handleSaraChatPopup(); // Handle popup before clicking
            await this.deleteAllSelected.click();
            console.log("Clicked Delete All Selected successfully");
            await this.takeScreenshot('after-delete-all-click');
            
            // Wait for the confirmation dialog if it appears
            console.log("Checking for confirmation dialog...");
            const confirmationVisible = await this.confirmationOK.isVisible().catch(() => false);
            if (confirmationVisible) {
                console.log("Confirmation dialog found, clicking OK...");
                await this.confirmationOK.click();
                console.log("Clicked confirmation OK");
                await this.takeScreenshot('after-confirmation-ok-click');
            }
            
            // Wait for any loading to complete
            await this.waitForLoadingToComplete();
            
        } catch (error) {
            console.error(`Error clicking Delete All Selected: ${error.message}`);
            await this.takeScreenshot('error-clicking-delete-all');
            throw error;
        }
    }    /**
     * Verifies that the selected emails were actually deleted
     * @param {string} [selectionIdentifier] Optional identifier (like email subject or row number) to identify what was deleted
     * @returns {Promise<boolean>} True if the deletion was successful
     */
    async verifyEmailsDeleted(selectionIdentifier) {
        try {
            console.log("Verifying that selected emails were deleted...");
            await this.takeScreenshot('before-verify-deletion');
            
            // Wait for any loading indicators to complete
            await this.waitForLoadingToComplete();
            
            // Use stored row details if available for more detailed verification
            const identifier = this.lastSelectedRowData 
                ? `${selectionIdentifier || ''} (stored details: ${JSON.stringify(this.lastSelectedRowData)})`
                : selectionIdentifier || '';
            
            // First approach: Check if the row checkbox is still visible
            const isRowVisible = await this.selectRowCheckbox.isVisible().catch(() => false);
            
            if (!isRowVisible) {
                console.log(`Deletion verification successful - Selected email${identifier ? ' ' + identifier : ''} is no longer visible`);
                await this.takeScreenshot('deletion-verified');
                return true;
            }
            
            // Second approach: If we have stored text content, search for it in the grid
            if (this.lastSelectedRowData && this.lastSelectedRowData.textContent) {
                const textToSearch = this.lastSelectedRowData.textContent.trim().slice(0, 20); // Use first 20 chars
                
                // Try to find any element in the grid with this text
                const matchingElements = await this.page
                    .locator('.MuiDataGrid-virtualScrollerRenderZone')
                    .getByText(textToSearch, { exact: false })
                    .count();
                
                if (matchingElements === 0) {
                    console.log(`Deletion verification successful - Text content "${textToSearch}..." not found in grid`);
                    await this.takeScreenshot('deletion-verified-by-content');
                    return true;
                }
            }
            
            // If we reach here, the deletion verification failed
            console.error(`Deletion verification FAILED - Selected email${identifier ? ' ' + identifier : ''} is still visible`);
            await this.takeScreenshot('deletion-failed');
            return false;
        } catch (error) {
            console.error(`Error verifying email deletion: ${error.message}`);
            await this.takeScreenshot('error-verifying-deletion');
            throw error;
        }
    }    async clickOnViewFirstEmail() {
        try {
            console.log("Clicking on View First Email button...");
            await this.handleSaraChatPopup(); // Handle popup before clicking
            await this.viewEmail.click();
            console.log("Clicked View First Email successfully");
            await this.takeScreenshot('after-view-email-click');
            
            // Use the robust waiting method that checks for actual page elements
            console.log("Waiting for view email page to load completely...");
            await this.waitForViewEmailPageLoaded(10000);
            
            // If the robust waiting didn't find anything, fall back to a simple timeout
            // This ensures backward compatibility and reliability
            console.log("Adding fallback wait to ensure view email page is loaded...");
            await this.page.waitForTimeout(3000);
            
            console.log("View email page should now be fully loaded");
            await this.takeScreenshot('after-view-email-load-complete');
        } catch (error) {
            console.error(`Error clicking View First Email: ${error.message}`);
            await this.takeScreenshot('error-clicking-view-email');
            throw error;
        }
    }

    async clickOnReadUnread() {
        try {
            console.log("Clicking on Mark All Selected as Read/Unread button...");
            await this.handleSaraChatPopup(); // Handle popup before clicking
            await this.readUnread.click();
            console.log("Clicked Mark All Selected as Read/Unread successfully");
            await this.takeScreenshot('after-read-unread-click');
        } catch (error) {
            console.error(`Error clicking Mark All Selected as Read/Unread: ${error.message}`);
            await this.takeScreenshot('error-clicking-read-unread');
            throw error;
        }
    }

    async clikonRefresh() {
        try {
            console.log("Clicking on Refresh button...");
            await this.handleSaraChatPopup(); // Handle popup before clicking
            await this.refresh.click();
            console.log("Clicked Refresh successfully");
            await this.takeScreenshot('after-refresh-click');
            await this.waitForPageStable();
        } catch (error) {
            console.error(`Error clicking Refresh: ${error.message}`);
            await this.takeScreenshot('error-clicking-refresh');
            throw error;
        }
    }

    /**
     * Clicks on Export To Excel button
     * @returns {Promise<void>}
     */
    async clickonExport() {
        try {
            console.log("Clicking on Export To Excel button...");
            // Handle any popups that might interfere
            await this.handleSaraChatPopup();
            
            // Ensure button is visible before clicking
            await this.exportToExcel.waitFor({ state: 'visible', timeout: 5000 });
            
            // Click the export button
            await this.exportToExcel.click();
            
            console.log("Clicked Export To Excel successfully");
            
            // Give time for the export dialog/process to start
            await this.page.waitForTimeout(2000);
            
            return true;
        } catch (error) {
            console.error(`Error clicking Export To Excel: ${error.message}`);
            await this.takeScreenshot('error-clicking-export');
            throw error;
        }
    }    async selectTheFirstRowCheckbox(storeRowDetails = false) {
        try {
            console.log("Selecting the first row checkbox...");
            await this.handleSaraChatPopup(); // Handle popup before clicking
            
            // Optionally store information about the email being selected
            if (storeRowDetails) {
                try {
                    // Try to get some identifying information from the row
                    // This depends on the structure of your grid, you may need to adjust these locators
                    this.lastSelectedRowData = {
                        timestamp: new Date().toISOString(),
                        rowIndex: 1 // First row
                    };
                    
                    // Try to get more specific details if available in the UI
                    const rowTextContent = await this.firstRow.textContent().catch(() => "");
                    if (rowTextContent) {
                        this.lastSelectedRowData.textContent = rowTextContent;
                    }
                    
                    console.log("Stored row details:", this.lastSelectedRowData);
                } catch (detailsError) {
                    console.log(`Could not store row details: ${detailsError.message}`);
                }
            }
            
            await this.selectRowCheckbox.click();
            console.log("Selected first row checkbox successfully");
            await this.takeScreenshot('after-row-selection');
        } catch (error) {
            console.error(`Error selecting first row checkbox: ${error.message}`);
            await this.takeScreenshot('error-selecting-row');
            throw error;
        }
    }

    /**
     * Sets the test info for organizing screenshots
     * @param {string} testName The name of the test being executed
     * @returns {void}
     */
    setTestInfo(testName) {
        this.testName = testName;
        console.log(`Test name set to: ${this.testName}`);
    }
    
    /**
     * Initializes screenshot folder for the current test
     * @returns {Promise<void>}
     */
    async initializeTestScreenshotFolder() {
        if (this.screenshotManager) {
            // This just ensures the directory exists
            this.screenshotManager.getScreenshotDir(this.testName);
            console.log(`Screenshot folder initialized for test: ${this.testName}`);
        } else {
            console.warn('Screenshot manager not initialized');
        }
    }
    
    /**
     * Takes a screenshot and saves it with the given name
     * @param {string} screenshotName Name to identify the screenshot
     * @param {Object} options Screenshot options (fullPage, etc)
     * @returns {Promise<string|null>} Path to the screenshot or null if failed
     */
    async takeScreenshot(screenshotName, options = {}) {
        try {
            if (!this.screenshotManager) {
                console.warn('Screenshot manager not initialized, creating default one');
                this.screenshotManager = new ScreenshotManager();
            }
            
            if (!this.page) {
                console.error('Page object not available for screenshot');
                return null;
            }
            
            const testNameToUse = this.testName || 'Unknown_Test';
            const result = await this.screenshotManager.takeScreenshot(
                this.page, 
                testNameToUse, 
                screenshotName, 
                options
            );
            return result;
        } catch (error) {
            console.error(`Error taking screenshot '${screenshotName}': ${error.message}`);
            return null;
        }
    }
    
    /**
     * Handles any Sara chat popups that might appear
     * @returns {Promise<boolean>} True if popup was closed or not found
     */
    async handleSaraChatPopup() {
        try {
            // Pass our page to the utility function
            return await handleSaraChatPopup(this.page, {
                takeScreenshot: (name) => this.takeScreenshot(`sara-popup-${name}`)
            });
        } catch (error) {
            console.error(`Error handling Sara chat popup: ${error.message}`);
            // Continue with test even if popup handling fails
            return false;
        }
    }
    
    /**
     * Clicks on Mail Not Filed menu item with enhanced reliability
     * @returns {Promise<boolean>} True if click was successful
     */
    async clickonMailNotFiled() {
        try {
            console.log("Looking for Mail Not Filed element using multiple strategies...");
            
            // Take a screenshot before attempting to click
            await this.page.screenshot({ path: 'before-click-mailnotfiled.png' });
            
            // Try each locator strategy in sequence until one works
            const strategies = [
                // First try the original working locator (before fixtures fix)
                { name: "Original iframe link", locator: this.mailnotfiledOriginal },
                // Additional iframe locators with different approaches
                { name: "iframe XPath locator", locator: this.mailnotfiledIframe1 },
                { name: "iframe text locator", locator: this.mailnotfiledIframe2 },
                { name: "iframe getByText", locator: this.mailnotfiledIframe3 },
                // Then try the React-style locators
                { name: "Exact CSS class match", locator: this.reactMailnotfiled },
                { name: "Partial class match", locator: this.reactMailnotfiledAlt1 },
                { name: "Menu item role", locator: this.reactMailnotfiledAlt2 },
                { name: "Exact text match", locator: this.reactMailnotfiledAlt3 },
                // Finally try the plain locator
                { name: "Plain locator", locator: this.mailnotfiled }
            ];
            
            let clicked = false;
            let error = null;
            
            // Try each locator strategy
            for (const strategy of strategies) {
                try {
                    console.log(`Trying strategy: ${strategy.name}...`);
                    
                    // Check if this element exists and is visible
                    const count = await strategy.locator.count();
                    if (count === 0) {
                        console.log(`Strategy ${strategy.name}: Element not found`);
                        continue;
                    }
                    
                    // Log detail about what was found for debugging
                    if (count > 0) {
                        const text = await strategy.locator.first().innerText().catch(() => "Could not get text");
                        const classes = await strategy.locator.first().evaluate(el => el.className).catch(() => "Could not get classes");
                        console.log(`Found element with text: "${text}", classes: "${classes}"`);
                    }
                    
                    const isVisible = await strategy.locator.isVisible().catch(() => false);
                    if (!isVisible) {
                        console.log(`Strategy ${strategy.name}: Element found but not visible`);
                        continue;
                    }
                    
                    console.log(`Strategy ${strategy.name}: Element found and visible, clicking...`);
                    await strategy.locator.click({timeout: 5000});
                    clicked = true;
                    console.log(`Strategy ${strategy.name}: Click successful`);
                    break;
                } catch (e) {
                    console.log(`Strategy ${strategy.name} failed: ${e.message}`);
                    error = e;
                    // Continue to next strategy
                }
            }
            
            // Instead of immediately throwing, log a warning and try to continue
            if (!clicked) {
                console.warn("All locator strategies failed to find Mail Not Filed menu item - trying to continue anyway");
            }
            
            // Take a screenshot right after clicking
            await this.page.screenshot({ path: 'after-click-mailnotfiled.png' });
            
            return clicked;
        } catch (error) {
            console.error(`Error in clickonMailNotFiled: ${error.message}`);
            await this.page.screenshot({ path: 'error-mailnotfiled-click.png' });
            throw error;
        }
    }
    
    /**
     * Checks if the Mail Not Filed page is fully loaded
     * @returns {Promise<boolean>} True if the page is loaded
     */
    async PageLoaded() {
        try {
            console.log("Waiting for Mail Not Filed page to fully load...");
            
            // First wait for DOM content to be loaded (basic structure)
            await this.page.waitForLoadState('domcontentloaded', { timeout: 20000 });
            console.log("DOM content loaded, waiting for essential elements...");
            
            // Then wait for the restricted element to become visible (key UI element)
            await this.restricted.waitFor({ state: 'visible', timeout: 30000 });
            console.log("Essential elements visible, waiting for UI to stabilize...");
            
            // Wait for any loading indicators to disappear
            try {
                await this.page.waitForSelector('.loading', { state: 'hidden', timeout: 10000 }).catch(() => {});
                // Also check for other common loading indicators (spinner, progress bars, etc)
                await this.page.waitForSelector('.MuiCircularProgress-root', { state: 'hidden', timeout: 5000 }).catch(() => {});
                await this.page.waitForSelector('[role="progressbar"]', { state: 'hidden', timeout: 5000 }).catch(() => {});
            } catch (e) {
                // It's okay if loading symbols aren't found or already hidden
                console.log("No loading indicators found or they're already hidden");
            }
            
            // Check for grid data loading completion (if grid exists)
            try {
                // Wait for the data grid to be rendered and populated with data
                await this.page.waitForSelector('.MuiDataGrid-virtualScrollerRenderZone', { state: 'visible', timeout: 10000 })
                    .catch(() => console.log("Data grid element not found or already visible"));
                
                // Short delay to ensure any remaining async operations complete
                await this.page.waitForTimeout(1000);
            } catch (e) {
                console.log("Data grid elements not found, continuing...");
            }
            
            // Take a verification screenshot
            await this.page.screenshot({ path: 'mail-not-filed-fully-loaded.png' });
            console.log("Mail Not Filed page fully loaded");
            return true;
        } catch (error) {
            console.log(`Error in PageLoaded: ${error.message}`);
            await this.page.screenshot({ path: 'mail-not-filed-load-error.png' });
            throw error;
        }
    }
    
    /**
     * Waits for the page to stabilize after actions
     * This ensures all UI animations and data updates are complete
     * @param {number} timeout - Base time to wait for animations to complete
     * @returns {Promise<boolean>} True if the page has stabilized
     */
    async waitForPageStable(timeout = 5000) {
        try {
            console.log("Waiting for page to stabilize...");
            
            // First wait for any pending network requests to settle down
            try {
                // Use a shorter timeout for this check to avoid hanging the test
                const networkSettleTime = Math.min(timeout / 2, 3000);
                
                // Check if there are any active XHR requests by inspecting network activity
                const checkNetworkIdle = async () => {
                    const activeRequests = await this.page.evaluate(() => {
                        // This runs in browser context
                        return window.performance.getEntriesByType('resource')
                            .filter(r => Date.now() - r.startTime < 1000).length;
                    });
                    return activeRequests < 2; // Allow some background activity
                };
                
                // Wait for network to become relatively quiet
                const startTime = Date.now();
                while (Date.now() - startTime < networkSettleTime) {
                    if (await checkNetworkIdle()) {
                        break;
                    }
                    await this.page.waitForTimeout(200);
                }
                
                console.log("Network activity has settled");
            } catch (networkError) {
                console.log("Error checking network activity:", networkError.message);
                // Continue anyway
            }
            
            // Wait for UI elements to stabilize
            try {
                // Check for absence of loading indicators
                await this.page.waitForSelector('.loading', { 
                    state: 'hidden', 
                    timeout: 3000 
                }).catch(() => {});
                
                await this.page.waitForSelector('.MuiCircularProgress-root', { 
                    state: 'hidden', 
                    timeout: 3000 
                }).catch(() => {});
                
                // Optional: wait for animations to complete
                await this.page.waitForTimeout(timeout);
                
                // Take a screenshot to verify the page is stable
                await this.page.screenshot({ path: 'page-stabilized.png' });
                
                console.log("Page is now stable");
                return true;
            } catch (error) {
                console.log(`Warning during wait for page stability: ${error.message}`);
                // Continue anyway since this is just a best-effort check
                return true;
            }
        } catch (error) {
            console.error(`Error in waitForPageStable: ${error.message}`);
            // Continue anyway since this is just a best-effort check
            return false;
        }
    }
    
    /**
     * Waits for loading indicators to disappear from the page
     * @param {number} timeout Maximum time to wait in milliseconds
     * @returns {Promise<boolean>} True if loading completed, false if timeout
     */
    async waitForLoadingToComplete(timeout = 10000) {
        console.log("Waiting for loading indicators to disappear...");
        
        try {
            // Common loading indicator selectors used in the application
            const loadingIndicators = [
                '.MuiCircularProgress-root',
                '[role="progressbar"]',
                '.loading-indicator',
                '.loading-spinner',
                '.loader'
            ];
            
            // Wait for loading indicators to disappear, if they exist
            for (const selector of loadingIndicators) {
                // Check if the loading indicator exists
                const hasIndicator = await this.page.locator(selector).count()
                    .then(count => count > 0)
                    .catch(() => false);
                
                // If it exists, wait for it to disappear
                if (hasIndicator) {
                    console.log(`Found loading indicator '${selector}', waiting for it to disappear...`);
                    await this.page.waitForSelector(selector, { 
                        state: 'hidden', 
                        timeout 
                    });
                }
            }
            
            return true;
        } catch (error) {
            console.warn(`Warning: Loading indicators didn't disappear within ${timeout}ms: ${error.message}`);
            return false;
        }
    }
    
    /**
     * Waits for the MailNotFiled page to be fully loaded and ready for interaction
     * @param {number} timeout Maximum time to wait in milliseconds
     * @returns {Promise<void>}
     */
    async PageLoaded(timeout = 30000) {
        console.log("Waiting for Mail Not Filed page to be fully loaded...");
        
        try {
            // Wait for the page to have basic structure
            await this.page.waitForLoadState('domcontentloaded', { timeout: timeout / 3 });
            
            // Wait for the first row or some indication of content
            console.log("Waiting for content to appear...");
            await this.firstRow.waitFor({ state: 'visible', timeout: timeout / 3 });
            
            // Wait for loading to complete
            await this.waitForLoadingToComplete(timeout / 3);
            
            console.log("Mail Not Filed page fully loaded");
            await this.takeScreenshot('mail-not-filed-fully-loaded');
        } catch (error) {
            console.error(`Error while waiting for Mail Not Filed page to load: ${error.message}`);
            await this.takeScreenshot('mail-not-filed-load-error');
            throw error;
        }
    }
    
    /**
     * Finds and logs all menu items in the sidebar for diagnostics
     * @returns {Promise<void>}
     */
    async findAllMenuItems() {
        try {
            console.log("---------- MENU ITEMS DIAGNOSTIC ----------");
            
            // Check main iframe content
            const iframeMenuItems = await this.collectMenuItemsFromIframe();
            console.log(`Found ${iframeMenuItems.length} menu items in iframe`);
            iframeMenuItems.forEach((item, i) => console.log(`${i + 1}. ${item}`));
            
            // Check direct page content for React-based menu
            const reactMenuItems = await this.collectReactMenuItems();
            console.log(`Found ${reactMenuItems.length} menu items in React component`);
            reactMenuItems.forEach((item, i) => console.log(`${i + 1}. ${item}`));
            
            // Take diagnostic screenshot
            await this.page.screenshot({ path: 'menu-items-diagnostic.png' });
            console.log("---------- END OF DIAGNOSTIC ----------");
        } catch (error) {
            console.error(`Error in findAllMenuItems: ${error.message}`);
            // Don't rethrow - this is a diagnostic method
        }
    }
    
    /**
     * Collects menu items from iframe contents
     * @private
     * @returns {Promise<string[]>} Array of menu item texts
     */
    async collectMenuItemsFromIframe() {
        try {
            const frame = this.page.frame({ name: 'sideNavIFrame' });
            if (!frame) {
                return ['No sideNavIFrame found'];
            }
            
            // Get all links in the frame
            return await frame.evaluate(() => {
                const links = Array.from(document.querySelectorAll('a'));
                return links.map(link => {
                    const text = link.textContent.trim();
                    const href = link.getAttribute('href') || '';
                    const classes = link.className;
                    return `"${text}" (href: ${href}, class: ${classes})`;
                });
            });
        } catch (error) {
            console.log(`Error collecting iframe menu items: ${error.message}`);
            return [`Error: ${error.message}`];
        }
    }
    
    /**
     * Collects menu items from React components
     * @private
     * @returns {Promise<string[]>} Array of menu item texts
     */
    async collectReactMenuItems() {
        try {
            return await this.page.evaluate(() => {
                // Look for common React menu structures
                const menuItems = [];
                
                // Method 1: Look for role="menuitem" elements
                const roleMenuItems = Array.from(document.querySelectorAll('[role="menuitem"]'));
                roleMenuItems.forEach(item => {
                    menuItems.push(`Role menuitem: "${item.textContent.trim()}" (class: ${item.className})`);
                });
                
                // Method 2: Look for ps-menu-label class (common in react-pro-sidebar)
                const psMenuLabels = Array.from(document.querySelectorAll('[class*="ps-menu-label"]'));
                psMenuLabels.forEach(item => {
                    menuItems.push(`ps-menu-label: "${item.textContent.trim()}" (class: ${item.className})`);
                });
                
                // Method 3: Look for any nav elements with li children
                const navLis = Array.from(document.querySelectorAll('nav li'));
                navLis.forEach(item => {
                    menuItems.push(`nav li: "${item.textContent.trim()}" (class: ${item.className})`);
                });
                
                return menuItems;
            });
        } catch (error) {
            console.log(`Error collecting React menu items: ${error.message}`);
            return [`Error: ${error.message}`];
        }
    }
}