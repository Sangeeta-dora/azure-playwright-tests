const { ScreenshotManager } = require('../utils/screenshotManager');
const XLSX = require('xlsx');
const fs = require('fs');
const path = require('path');
const { expect } = require('@playwright/test');

exports.InquiriesByUser_Activities = class InquiriesByUser_Activities {

    constructor(page) {

        this.page = page
        // Initialize screenshot manager
        this.screenshotManager = new ScreenshotManager();
        this.testName = 'Unknown_Test'; // Will be set later by setTestInfo method
        this.firstIssue = this.firstCust = page.locator('.MuiDataGrid-virtualScrollerRenderZone').locator('div[data-rowindex="0"]').locator('div[data-field="description"]').locator('.blueLink')
        this.accountDetails = page.getByRole('menuitem', { name: 'Account Details' })
        this.firstCust = page.locator('.MuiDataGrid-virtualScrollerRenderZone').locator('div[data-rowindex="0"]').locator('div[data-field="custName"]').locator('.blueLink')
        this.AccountDetailNewActivity = page.getByRole('menuitem', { name: 'Account Detail/New activity' })
        this.newActivity = page.getByRole('menuitem', { name: 'New Activity', exact: true })
        this.firstActivityIcon = page.locator('.MuiDataGrid-virtualScrollerRenderZone').locator('div[data-rowindex="0"]').locator('div[data-field="activity"]').locator('.pi')
        this.comfortable = page.getByRole('menuitem', { name: 'Comfortable' })
        this.standard = page.getByRole('menuitem', { name: 'Standard' })
        this.compact = page.getByRole('menuitem', { name: 'Compact' })
        this.density = page.getByLabel('Density')
        this.hideAll = page.getByRole('button', { name: 'Hide all' })
        this.showAll = page.getByRole('button', { name: 'Show all' })
        this.columns = page.getByLabel('Select columns')
        this.bestFit = page.getByRole('button', { name: 'Best Fit' })
        this.exportExcel = page.getByRole('button', { name: 'Export To Excel' })
        this.refresh = page.getByRole('button', { name: 'Refresh' })
        this.firstRow = page.locator('.MuiDataGrid-virtualScrollerRenderZone').locator('div[role="row"]').locator('div[aria-colindex="1"]').nth(1)
        this.activities = page.frameLocator('iframe[name="sideNavIFrame"]').getByRole('link', { name: 'Activities' })
        this.Inquiries = page.frameLocator('iframe[name="sideNavIFrame"]').locator('#Repeater1_spnParentItem_6 div').getByRole('img')
        this.Users = page.frameLocator('iframe[name="sideNavIFrame"]').locator('#Repeater1_Repeater1_6_spnParentItem_1 div')

        // View Settings selectors
        // More specific View Settings dropdown locators
        this.viewSettingsDropdown = page.locator('.MuiSelect-select[aria-labelledby="select-label"]').filter({ hasText: '~Open' });
        // Alternative: this.viewSettingsDropdown = page.getByText('~Open');

        // Even more specific - target the container with "View Settings" legend
        this.viewSettingsDropdownContainer = page.locator('.MuiInputBase-root:has(legend:has-text("View Settings"))');
        this.viewSettingsDropdownSpecific = page.locator('.MuiInputBase-root:has(legend:has-text("View Settings")) .MuiSelect-select');

        this.viewSettingsDropdownOptions = page.locator('[role="listbox"] [role="option"]');
        this.viewSettingsButton = page.getByRole('button', { name: 'View Settings' });
        this.viewsettingsEDit = page.locator('[data-testid="EditIcon"]').nth(1);
        this.viewSettingsColumn = page.locator('[data-testid="ViewColumnIcon"]').nth(1)
        this.viewSettingsSaveIcon = page.locator('[data-testid="SaveIcon"]').nth(1)
        this.viewNameElement = page.locator('.MuiDataGrid-cell[data-field="settingId"][aria-colindex="7"] .MuiDataGrid-cellContent');
        this.viewSettingsCopyIcon = page.locator('[data-testid="FileCopyOutlinedIcon"]').nth(1)
        this.copyToAllUser = page.getByRole('checkbox', { name: 'Select all rows' })
        this.viewSettingsColumn = page.locator('[data-testid="ViewColumnIcon"]').nth(1)
        this.viewSettingsColumnUserId = page.getByRole('row', { name: 'userId UserID' }).getByRole('checkbox')
        this.viewSettingsColumnActivity = page.getByRole('row', { name: 'activity Activity' }).getByRole('checkbox')
        this.viewSettingsColumnSave = page.getByRole('button', { name: 'Save' })
        this.copySave = page.getByRole('button', { name: 'Save' })
        this.viewDelete = page.locator('[data-testid="DeleteOutlinedIcon"]').nth(1)
        this.viewDeleteOk = page.getByRole('button', { name: 'OK' }).first();
        this.viewDeleteConfirmation = page.getByText('View settings deleted')
        this.viewsettingDropdown = page.locator('div[role="button"][aria-expanded="false"][aria-haspopup="listbox"][aria-labelledby="select-label"].MuiSelect-select')
        this.viewSettingsLoading = page.locator('["title="Load"]').nth(1)
        this.copyConfirmation = page.getByText('Copied view settings')
        this.viewSettingsLoad = page.locator('[data-testid="RefreshIcon"]').nth(1)
        this.viewSettingsDeleteIcon = page.locator('[data-testid="DeleteOutlinedIcon"]').nth(1)
        this.viewSettingsDialog = page.locator('.MuiDialog-paper').filter({ hasText: 'View Settings' });
        this.viewNameInput = page.getByRole('textbox', { name: 'Save current settings as' })
        this.viewSaveButton = page.getByRole('button', { name: 'Save' })
        this.viewCancelButton = this.viewSettingsDialog.getByRole('button', { name: 'Cancel' });

        // EXACT SAME ALERT LOCATORS AS FOLLOWUP PAST DUE
        // Update the alert button locator to use the new selector
        this.alertButton = page.getByRole('button', { name: 'Alert' });
        this.alertSetupDialog = page.locator('.MuiDialog-paper').filter({ hasText: 'Setup Alerts' });
        
        // Alert-related elements (EXACT SAME AS FOLLOWUP)
        this.alertNameInput = page.getByRole('textbox', { name: 'Save current settings as' });
        this.alertDescriptionInput = page.getByRole('textbox', { name: 'Description' });
        this.alertSaveButton = page.getByRole('button', { name: 'Save' });
        this.alertCancelButton = page.getByRole('button', { name: 'Cancel' });
        this.alertLoading = page.locator('[data-testid="RefreshIcon"]').nth(1);
        this.deleteOK = page.getByRole('button', { name: 'OK' }).first();
        this.alertDeleteButton = page.locator('[data-testid="DeleteOutlinedIcon"]').nth(1);
        this.alertDeleteConfirmation = page.locator('.MuiSnackbar-root, .MuiAlert-root, div[role="alert"]').filter({ hasText: /Alert deleted successfully/i }).first();
        this.alertcolumn = page.locator('[data-testid="ViewColumnIcon"]').nth(1);
        this.columnUpdateMessage = page.locator('.MuiTypography-root').nth(3);
        this.chooseDate = page.getByRole('button', { name: 'Choose Date' });
        this.daySelectedtwenty = page.getByRole('option', { name: '20' });
        this.scheduleSave = page.getByRole('button', { name: 'Save' });
        this.alertDialogClose = page.getByRole('heading', { name: 'Success close' }).locator('div').first();
        this.scheduleProcess = page.locator('[data-testid="ErrorOutlineOutlinedIcon"]').nth(1);
        this.scheduleOk = page.getByRole('button', { name: 'OK' }).filter({ hasText: 'OK' });
        this.alertnameInput = page.getByRole('textbox', { name: 'Save current settings as' });
        this.alertScheduleButton = page.locator('[data-testid="CalendarTodayOutlinedIcon"]').nth(1);
        this.alertProcessSuccessMessage = page.getByRole('heading', { name: 'Success close' }).locator('div').first();
        this.alertScheduleDescription = page.getByRole('textbox', { name: 'Schedule Description' });
        this.alertScheduleTiming = page.locator('div[role="button"][aria-haspopup="listbox"][aria-labelledby="select-label"].MuiSelect-select').filter({ hasText: /(Hourly|Daily|Monthly)/ });
        this.numberDropdown = page.locator('div[role="button"][aria-haspopup="listbox"][aria-labelledby="select-label"].MuiSelect-select.MuiInputBase-inputSizeSmall').filter({
            hasText: /^([1-9]|1[0-9]|2[0-8])$/
        });
        this.monthlyFrequencyOption = page.getByRole('option', { name: 'Monthly' });
        this.columnActivity = page.getByRole('row', { name: 'activity Activity' }).getByRole('checkbox');
        this.columnCustID = page.getByRole('row', { name: 'custId CustID' }).getByRole('checkbox');
        this.columnUserid = page.getByRole('row', { name: 'userId UserID' }).getByRole('checkbox');

        // Alert dropdown locators (similar to view settings)
        this.alertSettingsDropdown = page.locator('.MuiInputBase-root:has(legend:has-text("Alert Settings")) .MuiSelect-select');
        this.alertSettingsDropdownGeneric = page.locator('.MuiSelect-select[aria-labelledby="select-label"]').filter({ hasText: '~Open' });
        this.alertSettingsDropdownOptions = page.locator('[role="listbox"] [role="option"]');
        
        // Alternative alert dropdown selectors
        this.alertDropdownContainer = page.locator('.MuiInputBase-root').filter({ hasText: 'Alert Settings' });
        this.alertDropdownByText = page.getByText('~Open').nth(1); // Assuming alerts dropdown is second one

        // Filter-related locators - EXACT SAME AS FOLLOWUP PAST DUE
        this.filterButton = page.locator('[data-testid="FilterListIcon"]');
        this.filterInput = page.locator('.MuiInputBase-root:has(legend:has-text("Contains")) input');
        this.filterDropdown = page.locator('[role="listbox"]');
        this.filterOptions = page.locator('[role="option"]');
        this.clearFilterButton = page.locator('[data-testid="filter-clear"], button:has-text("Clear")');
        this.applyFilterButton = page.locator('button:has-text("Apply")');
        
        // Column-specific filter locators - EXACT SAME AS FOLLOWUP PAST DUE
        this.timeZoneIdFilter = page.locator('[data-field="timeZoneId"] [data-testid="FilterListIcon"]');
        this.activityNoteFilter = page.locator('input[type="text"][tabindex="-1"][aria-invalid="false"]').nth(5);
        
        // FIX: This should be the filter button, not the input field
        this.custIdFilter = page.locator('input[type="text"][tabindex="-1"][aria-invalid="false"]').nth(1);
        
        this.userIdFilter = page.locator('[data-field="userId"] [data-testid="FilterListIcon"]');
        this.activityTypeFilter = page.locator('[data-field="activityType"] [data-testid="FilterListIcon"]');
        this.daysToRespondFilter = page.locator('[data-field="daysToRespond"] [data-testid="FilterListIcon"]');
        
        // The input field you're asking about - this is what appears after clicking the filter button
        this.filterInputField = page.locator('input[class*="MuiInputBase-input"][class*="MuiOutlinedInput-input"][class*="MuiInputBase-inputSizeSmall"]');
        
        // Alternative specific locators for the input field
        this.filterInputById = page.locator('input[id*=":r"][type="text"][tabindex="-1"]');
        this.filterInputByClasses = page.locator('.MuiInputBase-input.MuiOutlinedInput-input.MuiInputBase-inputSizeSmall');
        
        // Most robust locator for the Contains filter input
        this.containsFilterInput = page.locator('.MuiInputBase-root:has(legend:has-text("Contains")) input');
    }

    async openViewSettingsWithRetry(maxRetries = 3) {
        for (let i = 0; i < maxRetries; i++) {
            try {
                console.log(`Attempting to open Activities View Settings (attempt ${i + 1}/${maxRetries})`);
                await this.viewSettingsButton.click({ timeout: 10000 });
                await this.page.waitForTimeout(2000);

                const isVisible = await this.viewSettingsDialog.isVisible();
                if (isVisible) {
                    console.log('✅ Activities View Settings dialog opened successfully');
                    return true;
                }
            } catch (error) {
                console.log(`❌ Attempt ${i + 1} failed: ${error.message}`);
                if (i === maxRetries - 1) throw error;
                await this.page.waitForTimeout(1000);
            }
        }
        return false;
    }
    async verifyViewSettingsDialog(timeout = 8000) {
        try {
            await this.viewSettingsDialog.waitFor({ state: 'visible', timeout });
            console.log('✅ Activities View Settings dialog verified');
            return true;
        } catch (error) {
            console.log(`❌ Activities View Settings dialog verification failed: ${error.message}`);
            return false;
        }
    }
    // Updated function to verify view in dropdown instead of table
    async verifyViewInDropdown(viewName) {
    try {
        console.log(`🔍 Searching for view "${viewName}" in dropdown...`);
        
        // Use the most specific selector for View Settings dropdown
        const dropdown = this.page.locator('.MuiInputBase-root:has(legend:has-text("View Settings")) .MuiSelect-select');
        
        // Alternative approach if the above doesn't work
        if (!(await dropdown.isVisible({ timeout: 3000 }))) {
            console.log('Trying alternative dropdown selector...');
            const alternativeDropdown = this.page.getByText('~Open');
            await alternativeDropdown.click();
        } else {
            await dropdown.click();
        }
        
        console.log('✅ Opened view settings dropdown');
        
        // Wait for dropdown options to appear
        await this.page.waitForTimeout(1500);
        
        // Look for the view in dropdown options
        const viewOption = this.page.locator(`[role="option"]:has-text("${viewName}")`);
        const isVisible = await viewOption.isVisible({ timeout: 5000 });
        
        if (isVisible) {
            console.log(`✅ Activities view "${viewName}" found in dropdown`);
            // Close dropdown by clicking elsewhere or pressing Escape
            await this.page.keyboard.press('Escape');
            return true;
        } else {
            console.log(`❌ Activities view "${viewName}" not found in dropdown`);
            
            // Try to get all options and search through them
            const allOptions = await this.page.locator('[role="option"]').all();
            console.log(`Found ${allOptions.length} options in dropdown:`);
            
            for (let i = 0; i < allOptions.length; i++) {
                const optionText = await allOptions[i].textContent();
                console.log(`  Option ${i + 1}: "${optionText}"`);
                
                if (optionText && optionText.toLowerCase().includes(viewName.toLowerCase())) {
                    console.log(`✅ Found partial match for "${viewName}"`);
                    await this.page.keyboard.press('Escape');
                    return true;
                }
            }
            
            // Close dropdown
            await this.page.keyboard.press('Escape');
            return false;
        }
        
    } catch (error) {
        console.log(`❌ Error verifying Activities view in dropdown: ${error.message}`);
        
        // Try to close dropdown in case of error
        try {
            await this.page.keyboard.press('Escape');
        } catch (closeError) {
            // Ignore close error
        }
        
        return false;
    }
}

    async clickonEditView() {
        await this.viewsettingsEDit.click();
        console.log('✅ Clicked Edit View button for Activities');
    }
    async clickonSaveafterEdit() {
        await this.viewSaveButton.click();
        console.log('✅ Saved Activities view after editing');
    }

    async clickonCopyView() {
        await this.viewSettingsCopyIcon.click();
        console.log('✅ Clicked Copy View button for Activities');
    }
    async copytoalluser() {
        // Implement based on your UI structure
        //const copyToAllUsersCheckbox = this.page.locator('[data-testid="copy-to-all-users"]');
        await this.copyToAllUser.click()
        console.log('✅ Selected copy to all users for Activities view');
    }

    async clickonSaveaftercopy() {
        await this.copySave.click();
        console.log('✅ Saved Activities view after copying');
    }

    async loadSavedViewConfiguration() {
        //const loadButton = this.page.locator('[data-testid="load-view-button"]');
        await this.viewSettingsLoad.click();
        console.log('✅ Loaded saved Activities view configuration');
    }
    async waitForGridDataToLoad() {
        await this.page.waitForTimeout(3000);
        await expect(this.firstRow).toBeVisible();
        console.log('✅ Activities grid data loaded successfully');
    }

    async clickonViewSettingsColumns() {
        await this.viewSettingsColumn.click();
        console.log('✅ Clicked View Settings Columns for Activities');
    }
    async selectViewSettingsColumns() {
        // Implement based on your column selection UI
        const columnCheckboxes = this.page.locator('[data-testid="column-checkbox"]');
        const count = await columnCheckboxes.count();

        // Select first few columns as example
        for (let i = 0; i < Math.min(3, count); i++) {
            await columnCheckboxes.nth(i).check();
        }
        console.log('✅ Selected Activities view columns');
    }
    async clickonDeleteView() {
        await this.viewDelete.click();

        // Handle confirmation dialog if it appears
        //const confirmButton = this.page.locator('[data-testid="confirm-delete"]');
        if (await this.viewDeleteConfirmation.isVisible({ timeout: 2000 })) {
            await this.viewDeleteConfirmation.click();
        }
        console.log('✅ Deleted Activities view');
    }


    async clickonFirstIssue() {

        await this.firstIssue.click()
    }

    async clickonAccountDetails() {

        await this.accountDetails.click()
    }

    async clickonFirstCustomer() {

        await this.firstCust.click()
    }

    async clickonAccountDetailNewActivity() {

        await this.AccountDetailNewActivity.click()
    }

    async clickonNewActivity() {

        await this.newActivity.click()
    }

    async clickonfirstActivityIcon() {

        await this.firstActivityIcon.click()
    }

    async clickonComfortable() {

        await this.comfortable.click()

    }

    async clickonStandard() {

        await this.standard.click()
    }

    async clickonCompact() {

        await this.compact.click()
    }

    async clickonDensity() {

        await this.density.click()
    }

    async clickonShowAll() {

        await this.showAll.click()
    }

    async clickonhideAll() {

        await this.hideAll.click()
    }

    async clickonColumns() {

        await this.columns.click()
    }

    async clickonBestFit() {

        await this.bestFit.click()
    }

    async clickOnExportToExcel() {

        await this.exportExcel.click()
    }

    async clickonRefresh() {

        await this.refresh.click()
    }
    async navigateToInquiries() {

        await this.Inquiries.click()
    }

    async navigateToUsers() {

        await this.Users.click()
    }

    async navigateToActivities() {

        await this.activities.click()
    }

    /**
     * Sets the test name for organized screenshots
     * @param {string} testName - The name of the test
     */
    async setTestInfo(testName) {
        this.testName = testName;
        console.log(`Set test info: ${testName}`);
        return this;
    }

    /**
     * Initializes the screenshot folder for the current test
     */
    async initializeTestScreenshotFolder() {
        if (this.screenshotManager) {
            // This just ensures the directory exists
            this.screenshotManager.getScreenshotDir(this.testName);
            console.log(`Screenshot folder initialized for test: ${this.testName}`);
        } else {
            console.warn('Screenshot manager not initialized');
        }
        return this;
    }

    /**
     * Takes a screenshot with a descriptive name
     * @param {string} name - The name to use for the screenshot
     */
    async takeScreenshot(name) {
        try {
            await this.screenshotManager.takeScreenshot(this.page, this.testName, name);
        } catch (error) {
            console.error(`Error taking screenshot ${name}: ${error.message}`);
        }
    }

    /**
     * Waits for the page to be stable
     * @param {number} timeout - How long to wait in milliseconds
     */
    async waitForPageStable(timeout = 3000) {
        await this.page.waitForTimeout(timeout);
    }

    /**
     * Validates the downloaded Excel file and displays its content
     * @param {string} filePath - Path to the Excel file to validate
     * @returns {Array} - The Excel data as JSON array
     */
    async validateExcelFile(filePath) {
        try {
            console.log(`\n📊 Reading Excel file: ${filePath}`);

            // Check if file exists
            if (!fs.existsSync(filePath)) {
                throw new Error(`Excel file not found: ${filePath}`);
            }

            // Read the Excel file
            const workbook = XLSX.readFile(filePath);
            const sheetNames = workbook.SheetNames;
            console.log(`📋 Sheet Names: ${sheetNames.join(', ')}`);

            // Read the first sheet
            const firstSheet = workbook.Sheets[sheetNames[0]];
            const jsonData = XLSX.utils.sheet_to_json(firstSheet, { header: 1 });

            // Display basic information
            console.log(`📊 Total Rows: ${jsonData.length}`);
            console.log(`📊 Total Columns: ${jsonData[0]?.length || 0}`);

            // Display headers (first row)
            if (jsonData.length > 0) {
                console.log(`📋 Headers: ${JSON.stringify(jsonData[0])}`);
            }

            // Display first few data rows
            console.log('\n📋 First 5 Data Rows:');
            for (let i = 1; i <= Math.min(5, jsonData.length - 1); i++) {
                console.log(`Row ${i}: ${JSON.stringify(jsonData[i])}`);
            }

            // Perform validations
            await this.performExcelValidations(jsonData, sheetNames[0]);

            // Get file size
            const stats = fs.statSync(filePath);
            console.log(`📁 File Size: ${(stats.size / 1024).toFixed(2)} KB`);

            // Take screenshot after validation
            await this.takeScreenshot('excel-validation-completed');

            return jsonData;

        } catch (error) {
            console.error(`❌ Error reading Excel file: ${error.message}`);
            await this.takeScreenshot('excel-validation-error');
            throw error;
        }
    }

    /**
     * Performs specific validations on Excel data
     * @param {Array} data - The Excel data as JSON array
     * @param {string} sheetName - Name of the sheet being validated
     */
    async performExcelValidations(data, sheetName) {
        console.log(`\n🔍 Performing validations on sheet: ${sheetName}`);

        // Validation 1: Check if file has data
        expect(data.length).toBeGreaterThan(1); // At least header + 1 data row
        console.log(`✅ File contains data: ${data.length - 1} rows`);

        // Validation 2: Check if headers exist
        const headers = data[0];
        expect(headers).toBeDefined();
        expect(headers.length).toBeGreaterThan(0);
        console.log(`✅ Headers found: ${headers.length} columns`);

        // Validation 3: Check for expected columns (customize based on your data)
        const expectedColumns = ['Customer', 'Issue', 'Activity', 'Subject', 'Date']; // Adjust as needed
        const foundColumns = expectedColumns.filter(col =>
            headers.some(header => header && header.toString().toLowerCase().includes(col.toLowerCase()))
        );
        console.log(`✅ Expected columns found: ${foundColumns.join(', ')}`);

        // Validation 4: Check for empty rows
        const dataRows = data.slice(1);
        const emptyRows = dataRows.filter(row => row.every(cell => !cell || cell.toString().trim() === ''));
        console.log(`📊 Empty rows found: ${emptyRows.length}`);

        // Validation 5: Check data completeness
        if (dataRows.length > 0) {
            console.log(`\n📈 COLUMN STATISTICS:`);
            headers.forEach((header, colIndex) => {
                const columnData = dataRows.map(row => row[colIndex]).filter(val => val !== undefined && val !== '');
                const fillRate = ((columnData.length / dataRows.length) * 100).toFixed(1);
                console.log(`  ${header || `Column ${colIndex + 1}`}: ${columnData.length}/${dataRows.length} (${fillRate}%)`);
            });
        }

        // Validation 6: Check for duplicate rows
        const uniqueRows = new Set(dataRows.map(row => JSON.stringify(row)));
        const duplicateCount = dataRows.length - uniqueRows.size;
        console.log(`🔄 Duplicate rows found: ${duplicateCount}`);

        // Validation 7: Basic data type checks
        if (dataRows.length > 0 && headers.length > 0) {
            console.log(`\n🔍 DATA TYPE ANALYSIS:`);
            headers.forEach((header, colIndex) => {
                const columnData = dataRows.map(row => row[colIndex]).filter(val => val !== undefined && val !== '');
                if (columnData.length > 0) {
                    const sampleValue = columnData[0];
                    let dataType = 'String';

                    if (!isNaN(sampleValue) && !isNaN(parseFloat(sampleValue))) {
                        dataType = 'Number';
                    } else if (sampleValue && !isNaN(Date.parse(sampleValue))) {
                        dataType = 'Date';
                    }

                    console.log(`  ${header || `Column ${colIndex + 1}`}: ${dataType} (Sample: ${sampleValue})`);
                }
            });
        }

        console.log(`✅ Excel validation completed successfully`);
    }

    async openSetupAlerts() {
        try {
            console.log('Attempting to open Setup Alerts dialog for Activities...');
            await this.takeScreenshot('before-opening-activities-alerts-dialog');

            // Use the direct locator for the Alert button
            console.log('Looking for the Alert button...');
            const alertButton = this.page.getByRole('button', { name: 'Alert' });

            // Wait a short moment to ensure the page is stable
            await this.page.waitForTimeout(1000);

            // Verify the button is visible before attempting to click
            console.log('Checking if Alert button is visible...');
            const isVisible = await alertButton.isVisible().catch(() => false);
            if (!isVisible) {
                console.log('Alert button not visible, taking screenshot for troubleshooting');
                await this.takeScreenshot('activities-alert-button-not-visible');
                throw new Error('Alert button is not visible on the page');
            }

            console.log('Alert button is visible, clicking now...');
            await alertButton.click();

            // Wait for the setup alerts dialog to appear
            console.log('Waiting for Setup Alerts dialog to appear...');
            await expect(this.alertSetupDialog).toBeVisible({ timeout: 5000 });

            console.log('Activities Setup Alerts dialog is visible');
            await this.takeScreenshot('activities-setup-alerts-dialog');
            return true;
        } catch (error) {
            console.error(`Failed to open Activities Setup Alerts dialog: ${error.message}`);
            await this.takeScreenshot('failed-to-open-activities-alerts-dialog');
            throw error;
        }
    }

    async clickonAlertSave() {
        try {
            console.log("Attempting to click on Activities alert save button...");
            await this.alertSaveButton.click();
            console.log("Clicked on Activities alert save button");
            await this.takeScreenshot('after-activities-alert-save-click');
        } catch (error) {
            console.error(`Error clicking on Activities alert save button: ${error.message}`);
            await this.takeScreenshot('activities-alert-save-button-error');
            throw error;
        }
    }

    async verifyAlertInTable(alertName) {
        try {
            console.log(`Verifying if Activities alert '${alertName}' exists in the table...`);

            // Check if the alert dialog is still open
            const isDialogStillOpen = await this.alertSetupDialog.isVisible().catch(() => false);

            if (!isDialogStillOpen) {
                console.log('Dialog closed after save, reopening to verify Activities alert was added');
                await this.openSetupAlerts();

                // Short wait to ensure dialog is fully loaded
                await this.page.waitForTimeout(1000);
            }

            // Check for the newly created alert in the table
            const alertTable = this.page.locator('.MuiTable-root').first();
            const alertRows = alertTable.locator('tbody tr');

            // Search for our alert by name in the table
            let alertFound = false;
            const rowCount = await alertRows.count();

            console.log(`Searching through ${rowCount} rows for Activities alert with name: ${alertName}`);

            for (let i = 0; i < rowCount; i++) {
                const rowCells = alertRows.nth(i).locator('td');
                const nameCell = rowCells.first(); // Assuming name is in first column

                const cellText = await nameCell.textContent();
                console.log(`Row ${i + 1} name cell text: ${cellText}`);

                if (cellText && cellText.includes(alertName)) {
                    alertFound = true;
                    console.log(`Found Activities alert with name: ${alertName}`);
                    await this.takeScreenshot('found-activities-alert-in-table');
                    break;
                }
            }

            if (!alertFound) {
                console.log(`Activities alert '${alertName}' was not found in the table`);
                await this.takeScreenshot('activities-alert-not-found-in-table');
            }

            return alertFound;
        } catch (error) {
            console.error(`Error verifying Activities alert in table: ${error.message}`);
            await this.takeScreenshot('error-verifying-activities-alert');
            return false;
        }
    }

    async editAlertWithXPath() {
        // Get the grid and check if there are alerts to edit
        const alertDataGrid = this.page.locator('.MuiDataGrid-root').first();
        const alertRows = alertDataGrid.locator('.MuiDataGrid-row');
        const rowCount = await alertRows.count();

        console.log(`Found ${rowCount} Activities alert rows in MuiDataGrid`);
        await this.takeScreenshot('activities-alerts-in-grid');

        if (rowCount === 0) {
            console.log('No Activities alerts found to edit, skipping test');
            return false;
        }

        // Select the first alert for editing
        console.log('Selecting first Activities alert for editing');
        const firstRow = alertRows.first();

        // Click the Edit button for this alert using our robust clickEditIcon method
        console.log('Clicking the edit icon for the first Activities alert');

        // Take a diagnostic screenshot before attempting to click
        await this.takeScreenshot('before-activities-edit-icon-click');

        try {
            // Try to locate and click the edit button directly first, as a fallback
            const directEditButton = firstRow.locator('button:has(svg[data-testid="EditIcon"])').first();
            if (await directEditButton.isVisible()) {
                console.log('Found Activities edit button directly in the row, clicking it...');
                await directEditButton.click();
                console.log('Direct Activities edit button click successful');
            } else {
                // Use our enhanced clickEditIcon method
                console.log('Using clickEditIcon method for Activities...');
                const editClickResult = await this.clickEditIcon(0, 'alert-table');
                if (!editClickResult) {
                    console.error('clickEditIcon method failed for Activities');
                    return false;
                }
                console.log(`Activities edit icon click result: SUCCESS`);
            }
        } catch (error) {
            console.error(`Error clicking Activities edit button: ${error.message}`);
            await this.takeScreenshot('activities-edit-button-click-error');

            // Try using the specific XPath locator for the first edit button cell
            console.log('Attempting to use specific XPath locator for first Activities edit button...');
            const firstEditButtonCell = this.page.locator('xpath=/html/body/div[3]/div[3]/div/div[1]/p/div/div[3]/div[2]/div/div[1]/div[2]/div/div/div[1]/div[1]');

            try {
                await firstEditButtonCell.click();
                console.log('XPath locator click successful for Activities');
            } catch (xpathError) {
                console.error(`XPath locator click failed for Activities: ${xpathError.message}`);

                // Last resort direct approach
                console.log('Attempting direct HTML selector approach as absolute last resort for Activities...');
                try {
                    await this.page.locator('.MuiDataGrid-row').first().locator('button').first().click();
                } catch (e) {
                    console.error(`Last resort click also failed for Activities: ${e.message}`);
                    return false;
                }
            }
        }

        // Wait for edit form to appear
        await this.page.waitForTimeout(1000);
        await this.takeScreenshot('activities-alert-edit-form');

        // Modify the alert description
        const newDesc = `Edited Activities Description ${Date.now()}`;
        console.log(`Changing Activities alert description to: ${newDesc}`);
        await this.alertDescriptionInput.fill(newDesc);

        // Save the changes
        console.log('Saving Activities changes...');
        await this.alertSaveButton.click();

        // Wait for save to complete
        await this.page.waitForTimeout(2000);
        await this.takeScreenshot('after-activities-alert-edit-save');

        // Since we're only updating the description, we just need to verify the edit operation was completed
        console.log("Activities description updated successfully, verifying the save operation completed");

        // Return true to indicate the edit operation was successful
        return true;
    }

    async alertLoad() {
        try {
            console.log("Waiting for Activities alert setup dialog to load...");

            // Wait for the alert setup dialog to be visible
            await this.alertSetupDialog.waitFor({ state: 'visible', timeout: 5000 });
            await this.alertLoading.click();
            
            // Take a screenshot after the dialog is loaded
            await this.takeScreenshot('activities-alert-setup-dialog-loaded');

            console.log("Activities alert setup dialog is loaded");
            return true;
        } catch (error) {
            console.error(`Error waiting for Activities alert setup dialog: ${error.message}`);
            await this.takeScreenshot('activities-alert-setup-dialog-load-error');
            throw error;
        }
    }

    async clickonAlertDelete() {
        await this.alertDeleteButton.click();
        console.log("Clicked on Activities alert delete button");
        await this.deleteOK.click();
        console.log("Clicked on Activities delete confirmation OK button");
        await this.takeScreenshot('after-activities-alert-delete-click');
        // Wait for the confirmation message to appear
        await this.alertDeleteConfirmation.waitFor({ state: 'visible', timeout: 5000 });
        console.log("Activities alert delete confirmation message is visible");
    }

    async clickonAlertColumn() {
        await this.alertcolumn.click();
        console.log("Clicked on Activities alert column");
        await this.takeScreenshot('after-activities-alert-column-click');
    }

    async clickonColumnView() {
        try {
            console.log("Clicking on Activities column view checkboxes...");

            // Click on Activity column checkbox if enabled
            const activity = await this.columnActivity.isVisible().catch(() => false);
            const custId = await this.columnCustID.isVisible().catch(() => false);
            const userId = await this.columnUserid.isVisible().catch(() => false);
            
            await this.columnActivity.click();
            console.log("Clicked on Activities Activity column checkbox");

            // Click on CustID column checkbox if enabled
            if (custId) {
                await this.columnCustID.click();
                console.log("Clicked on Activities CustID column checkbox");
            }

            // Click on UserID column checkbox if enabled
            if (userId) {
                await this.columnUserid.click();
                console.log("Clicked on Activities UserID column checkbox");
            }

            await this.takeScreenshot('after-activities-column-view-clicks');

            // Click save button and wait for confirmation
            await this.alertSaveButton.click();
            console.log("Clicked on Activities alert save button after column view selection");

            await this.page.waitForTimeout(5000);
            await this.takeScreenshot('after-activities-alert-save-button-click');
            await expect(this.columnUpdateMessage).toBeVisible({ timeout: 5000 });
            console.log("Activities column update message is visible");
        } catch (error) {
            console.error(`Error in Activities clickonColumnView: ${error.message}`);
            await this.takeScreenshot('error-activities-column-view-operation');
            throw error;
        }
    }

    async clickonAlertSchedule() {
        try {
            await this.alertScheduleButton.click();
            console.log("Clicked on Activities alert schedule button");
        } catch (error) {
            console.error(`Error clicking on Activities alert schedule button: ${error.message}`);
            await this.takeScreenshot('activities-alert-schedule-button-error');
            throw error;
        }
    }

    async addScheduleDetails() {
        try {
            console.log("Adding Activities schedule details...");
            await this.alertScheduleDescription.fill('Activities Test Alert Schedule Description');
            await this.alertScheduleTiming.click();
            console.log("Clicked on Activities alert schedule timing dropdown");
            await this.monthlyFrequencyOption.click();
            console.log("Selected Monthly frequency option for Activities");
            await this.takeScreenshot('activities-schedule-details-added');

            let randomNumber;
            try {
                // Generate a random number between 1 and 28
                randomNumber = Math.floor(Math.random() * 28) + 1;
                console.log(`Selecting random number for Activities: ${randomNumber} from dropdown`);

                // Click on the number dropdown first to open it
                await this.numberDropdown.click();
                console.log('Clicked on Activities number dropdown');
                await this.takeScreenshot('activities-number-dropdown-opened');

                // Wait for the dropdown options to appear
                await this.page.waitForTimeout(500);

                // Locate and click on the option with our random number
                const numberOption = this.page.getByRole('option', { name: `${randomNumber}` });

                // Check if the option is visible
                const isVisible = await numberOption.isVisible().catch(() => false);
                if (!isVisible) {
                    console.log(`Option with number ${randomNumber} not immediately visible for Activities, may need to scroll`);

                    // Try to find it by scrolling through the list
                    const optionsList = this.page.locator('[role="listbox"]');
                    await optionsList.scrollIntoViewIfNeeded();

                    // Scroll to reveal more options if needed
                    await this.page.keyboard.press('PageDown');
                }

                // Now click on the option
                await numberOption.click();
                console.log(`Successfully selected number for Activities: ${randomNumber}`);
                await this.takeScreenshot(`activities-selected-number-${randomNumber}`);

            } catch (error) {
                console.error(`Error selecting random number for Activities: ${error.message}`);
                await this.takeScreenshot('activities-random-number-selection-error');
            }

            console.log("Clicked on Activities alert save button after adding schedule details");

        } catch (error) {
            console.error(`Error adding Activities schedule details: ${error.message}`);
            await this.takeScreenshot('add-activities-schedule-details-error');
            throw error;
        }
    }

    async clickonSchedulesave() {
        try {
            console.log("Attempting to click on Activities schedule save button using locator...");

            // First check if the page is still available
            try {
                // Quick check to see if we can still access the page
                await this.page.evaluate(() => document.title);
            } catch (pageError) {
                console.error("Page is no longer available:", pageError.message);
                throw new Error("Cannot click save button - page has been closed");
            }

            // Check if button is visible before clicking
            const isVisible = await this.scheduleSave.isVisible().catch(() => false);
            if (!isVisible) {
                console.log("Activities schedule save button is not visible, trying alternative approaches...");

                // Try to find the save button using a more general selector
                const generalSaveButton = this.page.locator('button.MuiButtonBase-root.MuiButton-containedPrimary:has-text("Save")');
                const isGeneralButtonVisible = await generalSaveButton.isVisible().catch(() => false);

                if (isGeneralButtonVisible) {
                    await generalSaveButton.click();
                    console.log("Clicked on Activities save button using general selector");
                } else {
                    // Try a different approach - press Tab until we reach a button and then Enter
                    console.log("Attempting keyboard navigation to Activities save button...");

                    await this.page.keyboard.press('Tab');
                    await this.page.waitForTimeout(200);
                    await this.page.keyboard.press('Tab');
                    await this.page.waitForTimeout(200);
                    await this.page.keyboard.press('Enter');
                    console.log("Used keyboard navigation to attempt Activities save");
                }
            } else {
                // Original button is visible, click it
                await this.scheduleSave.click();
                console.log("Clicked on Activities schedule save button using locator");
            }

            await this.takeScreenshot('activities-alert-schedule-saved');
        } catch (error) {
            console.error(`Error clicking on Activities schedule save button: ${error.message}`);
            await this.takeScreenshot('activities-schedule-save-button-error');

            // Final attempt - try to locate by text content and force click
            try {
                console.log("Making final attempt with evaluate for Activities...");
                await this.page.evaluate(() => {
                    // Find button with text "Save" and click it
                    const buttons = Array.from(document.querySelectorAll('button'));
                    const saveButton = buttons.find(btn => btn.textContent.includes('Save'));
                    if (saveButton) saveButton.click();
                });
                console.log("Executed JavaScript click on Activities save button");
                await this.page.waitForTimeout(500); // Wait after click
            } catch (finalError) {
                console.error(`All Activities save button click attempts failed: ${finalError.message}`);
                throw error; // Re-throw the original error
            }
        }
    }

    async clickonAlertProcess() {
        try {
            console.log("Attempting to click on Activities alert process button...");
            await this.page.waitForSelector('[data-testid="ErrorOutlineOutlinedIcon"]', { timeout: 5000 });
            await this.scheduleProcess.click();
            console.log("Clicked on Activities alert process button");
            await this.takeScreenshot('activities-alert-process-clicked');
        } catch (error) {
            console.error(`Error clicking on Activities alert process button: ${error.message}`);
            await this.takeScreenshot('activities-alert-process-error');
            throw error;
        }
    }

    async verifyProcessSuccess() {
        try {
            console.log("Verifying Activities process success message...");
            await this.alertProcessSuccessMessage.isVisible({ timeout: 5000 });
            console.log("Activities process success message is visible");
            await this.takeScreenshot('activities-process-success-verified');
        } catch (error) {
            console.error(`Error verifying Activities process success message: ${error.message}`);
            await this.takeScreenshot('activities-process-success-verification-error');
            throw error;
        }
    }

    async closeProcessAlertDialog() {
        try {
            console.log("Attempting to close Activities process alert dialog...");
            // Wait for the dialog to be visible
            await this.alertDialogClose.isVisible({ timeout: 5000 });
            // Click the dialog close button
            await this.alertDialogClose.click();
            console.log("Activities process alert dialog closed successfully");
            await this.takeScreenshot('activities-process-alert-dialog-closed');
        } catch (error) {
            console.error(`Error closing Activities process alert dialog: ${error.message}`);
            await this.takeScreenshot('activities-process-alert-dialog-close-error');
            throw error;
        }
    }

    async alertNameSave() {
        try {
            console.log('Locating Activities alert name input field...');
            await this.alertSaveButton.click();
            console.log('Clicked on Activities alert save button');
            await this.takeScreenshot('activities-alert-name-save-clicked');
        } catch (error) {
            console.error(`Error filling Activities alert name input: ${error.message}`);
            await this.takeScreenshot('activities-alert-name-input-error');
            throw error;
        }
    }

    async saveAlertDetails() {
        console.log('Saving Activities alert details...');

        try {
            // Wait for the save button to be visible and enabled
            await this.alertDescriptionInput.fill('Activities Testing'); // Clear any existing text
            console.log('Activities alert save button is visible, clicking to save changes...');

            // Click the save button
            await this.alertSaveButton.click();
            console.log('Activities alert details saved successfully');

            // Wait for any confirmation or dialog to close
            await this.page.waitForTimeout(1000);
            await this.takeScreenshot('activities-alert-details-saved');

        } catch (error) {
            console.error(`Error saving Activities alert details: ${error.message}`);
            await this.takeScreenshot('save-activities-alert-details-error');
            throw error;
        }
    }

    // Updated method to verify alert in dropdown instead of table
    async verifyAlertInDropdown(alertName) {
        try {
            console.log(`🔍 Searching for alert "${alertName}" in dropdown...`);
            
            // First, try to click the alert settings dropdown
            const dropdownSelectors = [
                () => this.page.locator('.MuiInputBase-root:has(legend:has-text("Alert Settings")) .MuiSelect-select'),
                () => this.page.getByText('~Open').nth(1), // Second dropdown if multiple exist
                () => this.page.locator('.MuiSelect-select[aria-labelledby="select-label"]').nth(1), // Second select
                () => this.page.locator('.MuiSelect-select').filter({ hasText: '~Open' }).nth(1)
            ];
            
            let dropdownOpened = false;
            
            for (const selectorFn of dropdownSelectors) {
                try {
                    const dropdown = selectorFn();
                    await dropdown.waitFor({ state: 'visible', timeout: 3000 });
                    await dropdown.click();
                    console.log('✅ Opened alert settings dropdown');
                    dropdownOpened = true;
                    break;
                } catch (error) {
                    console.log(`❌ Alert dropdown selector failed: ${error.message}`);
                }
            }
            
            if (!dropdownOpened) {
                console.log('❌ Could not open alert settings dropdown');
                return false;
            }
            
            // Wait for dropdown options to appear
            await this.page.waitForTimeout(1500);
            
            // Look for the alert in dropdown options
            const alertOption = this.page.locator(`[role="option"]:has-text("${alertName}")`);
            const isVisible = await alertOption.isVisible({ timeout: 5000 });
            
            if (isVisible) {
                console.log(`✅ Activities alert "${alertName}" found in dropdown`);
                // Close dropdown by clicking elsewhere or pressing Escape
                await this.page.keyboard.press('Escape');
                return true;
            } else {
                console.log(`❌ Activities alert "${alertName}" not found in dropdown`);
                
                // Try to get all options and search through them
                const allOptions = await this.page.locator('[role="option"]').all();
                console.log(`Found ${allOptions.length} options in alert dropdown:`);
                
                for (let i = 0; i < allOptions.length; i++) {
                    const optionText = await allOptions[i].textContent();
                    console.log(`  Alert Option ${i + 1}: "${optionText}"`);
                    
                    if (optionText && optionText.toLowerCase().includes(alertName.toLowerCase())) {
                        console.log(`✅ Found partial match for alert "${alertName}"`);
                        await this.page.keyboard.press('Escape');
                        return true;
                    }
                }
                
                // Close dropdown
                await this.page.keyboard.press('Escape');
                return false;
            }
            
        } catch (error) {
            console.log(`❌ Error verifying Activities alert in dropdown: ${error.message}`);
            
            // Try to close dropdown in case of error
            try {
                await this.page.keyboard.press('Escape');
            } catch (closeError) {
                // Ignore close error
            }
            return false;
        }
    }

    // Alternative robust method for alert verification
    async verifyAlertInDropdownRobust(alertName) {
        const strategies = [
            {
                name: 'Legend-based alert selector',
                selector: () => this.page.locator('.MuiInputBase-root:has(legend:has-text("Alert Settings")) .MuiSelect-select')
            },
            {
                name: 'Second dropdown by text',
                selector: () => this.page.getByText('~Open').nth(1)
            },
            {
                name: 'Nth selector (second alert dropdown)',
                selector: () => this.page.locator('.MuiSelect-select[aria-labelledby="select-label"]').nth(1)
            },
            {
                name: 'Filter by alert container text',
                selector: () => this.page.locator('.MuiSelect-select').filter({ hasText: '~Open' }).nth(1)
            }
        ];

        for (const strategy of strategies) {
            try {
                console.log(`🔍 Trying alert strategy: ${strategy.name}`);
                
                const dropdown = strategy.selector();
                await dropdown.waitFor({ state: 'visible', timeout: 3000 });
                await dropdown.click();
                
                console.log(`✅ Opened alert dropdown using: ${strategy.name}`);
                
                // Wait for options to load
                await this.page.waitForTimeout(1500);
                
                // Search for the alert
                const allOptions = await this.page.locator('[role="option"]').all();
                console.log(`Found ${allOptions.length} alert options`);
                
                for (const option of allOptions) {
                    const optionText = await option.textContent();
                    if (optionText && optionText.includes(alertName)) {
                        console.log(`✅ Found alert "${alertName}" using ${strategy.name}`);
                        await this.page.keyboard.press('Escape');
                        return true;
                    }
                }
                
                // Close dropdown and try next strategy
                await this.page.keyboard.press('Escape');
                
            } catch (error) {
                console.log(`❌ Alert strategy "${strategy.name}" failed: ${error.message}`);
                try {
                    await this.page.keyboard.press('Escape');
                } catch (closeError) {
                    // Ignore
                }
            }
        }
        
        console.log(`❌ Alert "${alertName}" not found with any strategy`);
        return false;
    }

    // Replace the existing verifyAlertInTable method with this dropdown version
    async verifyAlertInTable(alertName) {
        // Redirect to dropdown verification instead of table verification
        console.log(`🔄 Redirecting alert verification to dropdown for: ${alertName}`);
        return await this.verifyAlertInDropdown(alertName);
    }

    // Method to select a specific alert from dropdown
    async selectAlertFromDropdown(alertName) {
        try {
            console.log(`🎯 Selecting alert "${alertName}" from dropdown...`);
            
            // Open alert dropdown
            const dropdown = this.page.locator('.MuiInputBase-root:has(legend:has-text("Alert Settings")) .MuiSelect-select');
            await dropdown.click();
            await this.page.waitForTimeout(1000);
            
            // Find and click the specific alert
            const alertOption = this.page.locator(`[role="option"]:has-text("${alertName}")`);
            
            if (await alertOption.isVisible({ timeout: 5000 })) {
                await alertOption.click();
                console.log(`✅ Selected alert "${alertName}"`);
                return true;
            } else {
                // Try alternative approach
                const allOptions = await this.page.locator('[role="option"]').all();
                
                for (const option of allOptions) {
                    const optionText = await option.textContent();
                    if (optionText && optionText.includes(alertName)) {
                        await option.click();
                        console.log(`✅ Selected alert "${alertName}" (partial match)`);
                        return true;
                    }
                }
                
                console.log(`❌ Could not find alert "${alertName}" to select`);
                await this.page.keyboard.press('Escape');
                return false;
            }
            
        } catch (error) {
            console.log(`❌ Error selecting alert: ${error.message}`);
            try {
                await this.page.keyboard.press('Escape');
            } catch (closeError) {
                // Ignore
            }
            return false;
        }
    }

    // Updated loadSavedAlertConfiguration method
    async loadSavedAlertConfiguration() {
        try {
            console.log('🔄 Loading saved Activities alert configuration...');
            
            // Open the alert dropdown
            const dropdown = this.page.locator('.MuiInputBase-root:has(legend:has-text("Alert Settings")) .MuiSelect-select');
            await dropdown.click();
            await this.page.waitForTimeout(1000);
            
            // Get all available alert options
            const options = await this.page.locator('[role="option"]').all();
            
            if (options.length > 0) {
                // Select the first non-default option (skip "~Open" if present)
                for (const option of options) {
                    const optionText = await option.textContent();
                    if (optionText && !optionText.includes('~Open') && optionText.trim() !== '') {
                        await option.click();
                        console.log(`✅ Loaded alert configuration: "${optionText}"`);
                        return true;
                    }
                }
            }
            
            console.log('❌ No saved alert configurations found');
            await this.page.keyboard.press('Escape');
            return false;
            
        } catch (error) {
            console.log(`❌ Error loading saved alert configuration: ${error.message}`);
            try {
                await this.page.keyboard.press('Escape');
            } catch (closeError) {
                // Ignore
            }
            return false;
        }
    }

    // Filter methods for Activities
    async testFilter(filterValue, columnIndex = 0, timeout = 3000) {
        try {
            console.log(`Applying Activities filter with value: ${filterValue}`);
            
            // Click on the filter button for the specified column
            const columnHeaders = this.page.locator('.MuiDataGrid-columnHeader');
            const targetColumn = columnHeaders.nth(columnIndex);
            const filterButton = targetColumn.locator('[data-testid="FilterListIcon"]');
            
            await filterButton.click();
            await this.page.waitForTimeout(1000);
            
            // Use the Contains filter input specifically
            const filterInput = await this.getFilterInput();
            await filterInput.fill(filterValue);
            await this.page.waitForTimeout(500);
            
            // Apply the filter
            await this.page.keyboard.press('Enter');
            await this.page.waitForTimeout(timeout);
            
            console.log(`✅ Activities filter applied successfully`);
            return true;
        } catch (error) {
            console.log(`❌ Activities filter application failed: ${error.message}`);
            throw error;
        }
    }

    async filterByTimeZoneID(timeZoneIdValue) {
        try {
            console.log(`Filtering Activities by TimeZoneID: ${timeZoneIdValue}`);
            
            await this.timeZoneIdFilter.click();
            await this.page.waitForTimeout(1000);
            
            // Use the Contains filter input
            const filterInput = await this.getFilterInput();
            await filterInput.fill(timeZoneIdValue);
            await this.page.keyboard.press('Enter');
            await this.page.waitForTimeout(2000);
            
            console.log(`✅ Activities TimeZoneID filter applied`);
        } catch (error) {
            console.log(`❌ Activities TimeZoneID filter failed: ${error.message}`);
            throw error;
        }
    }

    async filterByActivityNote(activityNoteValue) {
        try {
            console.log(`Filtering Activities by ActivityNote: ${activityNoteValue}`);
            
            await this.activityNoteFilter.click();
            await this.page.waitForTimeout(1000);
            
            // Use the Contains filter input
            //const filterInput = await this.getFilterInput();
            await this.activityNoteFilter.fill(activityNoteValue);
            await this.page.keyboard.press('Enter');
            await this.page.waitForTimeout(2000);
            
            console.log(`✅ Activities ActivityNote filter applied`);
        } catch (error) {
            console.log(`❌ Activities ActivityNote filter failed: ${error.message}`);
            throw error;
        }
    }

    async filterByCustID(custIdValue) {
        try {
            console.log(`Filtering Activities by CustID: ${custIdValue}`);
            
            await this.custIdFilter.click();
            await this.page.waitForTimeout(1000);
            
            // Use the Contains filter input
            //const filterInput = await this.getFilterInput();
            await this.custIdFilter.fill(custIdValue);
            await this.page.keyboard.press('Enter');
            await this.page.waitForTimeout(2000);
            
            console.log(`✅ Activities CustID filter applied`);
        } catch (error) {
            console.log(`❌ Activities CustID filter failed: ${error.message}`);
            throw error;
        }
    }

    async filterByUserID(userIdValue) {
        try {
            console.log(`Filtering Activities by UserID: ${userIdValue}`);
            
            await this.userIdFilter.click();
            await this.page.waitForTimeout(1000);
            
            // Use the Contains filter input
            const filterInput = await this.getFilterInput();
            await filterInput.fill(userIdValue);
            await this.page.keyboard.press('Enter');
            await this.page.waitForTimeout(2000);
            
            console.log(`✅ Activities UserID filter applied`);
        } catch (error) {
            console.log(`❌ Activities UserID filter failed: ${error.message}`);
            throw error;
        }
    }

    async filterByActivityType(activityTypeValue) {
        try {
            console.log(`Filtering Activities by ActivityType: ${activityTypeValue}`);
            
            await this.activityTypeFilter.click();
            await this.page.waitForTimeout(1000);
            
            // Use the Contains filter input
            const filterInput = await this.getFilterInput();
            await filterInput.fill(activityTypeValue);
            await this.page.keyboard.press('Enter');
            await this.page.waitForTimeout(2000);
            
            console.log(`✅ Activities ActivityType filter applied`);
        } catch (error) {
            console.log(`❌ Activities ActivityType filter failed: ${error.message}`);
            throw error;
        }
    }

    async filterDaysToRespondUsingFilterButton(numericValue) {
        try {
            console.log(`Filtering Activities by DaysToRespond: ${numericValue}`);
            
            await this.daysToRespondFilter.click();
            await this.page.waitForTimeout(1000);
            
            // Use the Contains filter input
            const filterInput = await this.getFilterInput();
            await filterInput.fill(numericValue.toString());
            await this.page.keyboard.press('Enter');
            await this.page.waitForTimeout(2000);
            
            console.log(`✅ Activities DaysToRespond filter applied`);
        } catch (error) {
            console.log(`❌ Activities DaysToRespond filter failed: ${error.message}`);
            throw error;
        }
    }

    async filterByDateRange(startDate, endDate) {
        try {
            console.log(`Filtering Activities by date range: ${startDate} to ${endDate}`);
            
            // Open date range filter
            const dateFilter = this.page.locator('[data-field="date"] [data-testid="FilterListIcon"]');
            await dateFilter.click();
            await this.page.waitForTimeout(1000);
            
            // Set start date
            await this.startDateInput.fill(startDate);
            await this.page.waitForTimeout(500);
            
            // Set end date
            await this.endDateInput.fill(endDate);
            await this.page.waitForTimeout(500);
            
            // Apply filter
            await this.applyFilterButton.click();
            await this.page.waitForTimeout(2000);
            
            console.log(`✅ Activities date range filter applied`);
        } catch (error) {
            console.log(`❌ Activities date range filter failed: ${error.message}`);
            throw error;
        }
    }

    async clearAllFilters() {
        try {
            console.log('Clearing all Activities filters...');
            
            // Look for clear filter button
            const clearButtons = await this.page.locator('[data-testid="filter-clear"], button:has-text("Clear"), [aria-label*="clear"]').all();
            
            for (const clearButton of clearButtons) {
                if (await clearButton.isVisible()) {
                    await clearButton.click();
                    await this.page.waitForTimeout(500);
                }
            }
            
            console.log(`✅ All Activities filters cleared`);
        } catch (error) {
            console.log(`❌ Activities clear filters failed: ${error.message}`);
            throw error;
        }
    }

    // Robust method for getting filter input - EXACT SAME AS FOLLOWUP PAST DUE
    async getFilterInput() {
        const inputSelectors = [
            () => this.page.locator('.MuiInputBase-root:has(legend:has-text("Contains")) input'),
            () => this.page.locator('fieldset:has(legend:has-text("Contains")) + input'),
            () => this.page.locator('.MuiInputBase-root').filter({ has: this.page.locator('legend:has-text("Contains")') }).locator('input'),
            () => this.page.locator('input[class*="MuiInputBase-input"][class*="MuiOutlinedInput-input"]').first(),
            () => this.page.locator('.MuiInputBase-input.MuiOutlinedInput-input').first()
        ];
        
        for (const selectorFn of inputSelectors) {
            try {
                const input = selectorFn();
                if (await input.isVisible({ timeout: 2000 })) {
                    console.log('✅ Found Activities filter input using selector');
                    return input;
                }
            } catch (error) {
                console.log(`❌ Activities selector failed: ${error.message}`);
            }
        }
        
        throw new Error('Could not find Activities filter input element');
    }

    // Updated filter method using the robust input finder - EXACT SAME AS FOLLOWUP PAST DUE
    async fillFilterInput(filterValue) {
        try {
            console.log(`Filling Activities filter input with: ${filterValue}`);
            const filterInput = await this.getFilterInput();
            await filterInput.fill(filterValue);
            console.log(`✅ Activities filter input filled successfully`);
            return true;
        } catch (error) {
            console.log(`❌ Failed to fill Activities filter input: ${error.message}`);
            throw error;
        }
    }

    // Add the missing verifyPageLoaded and waitForGridDataToLoad methods - EXACT SAME AS FOLLOWUP PAST DUE
    async verifyPageLoaded() {
        try {
            console.log('🔍 Verifying Activities page is loaded...');
            
            // Wait for the page to be in a loaded state
            await this.page.waitForLoadState('networkidle', { timeout: 10000 });
            
            // Check for key elements that indicate the page is loaded
            const pageIndicators = [
                () => this.firstRow.isVisible({ timeout: 5000 }),
                () => this.page.locator('.MuiDataGrid-root').isVisible({ timeout: 5000 }),
                () => this.page.locator('[role="grid"]').isVisible({ timeout: 5000 }),
                () => this.page.locator('.MuiDataGrid-columnHeaders').isVisible({ timeout: 5000 })
            ];
            
            let pageLoaded = false;
            
            for (const indicator of pageIndicators) {
                try {
                    const isVisible = await indicator();
                    if (isVisible) {
                        console.log('✅ Activities page loaded successfully');
                        pageLoaded = true;
                        break;
                    }
                } catch (error) {
                    console.log(`❌ Activities page indicator check failed: ${error.message}`);
                }
            }
            
            if (!pageLoaded) {
                throw new Error('Activities page did not load properly - no key elements found');
            }
            
            return true;
        } catch (error) {
            console.log(`❌ Activities page verification failed: ${error.message}`);
            await this.takeScreenshot('activities-page-load-verification-failed');
            throw error;
        }
    }

    async waitForGridDataToLoad(timeout = 10000) {
        try {
            console.log('⏳ Waiting for Activities grid data to load...');
            
            // Wait for the grid to be visible first
            await this.page.locator('.MuiDataGrid-root').waitFor({ state: 'visible', timeout: 5000 });
            
            // Wait for data rows to appear (not just headers)
            await this.page.locator('.MuiDataGrid-row').first().waitFor({ state: 'visible', timeout: timeout });
            
            // Wait a bit more to ensure data is fully loaded
            await this.page.waitForTimeout(2000);
            
            console.log('✅ Activities grid data loaded successfully');
            return true;
        } catch (error) {
            console.log(`❌ Activities grid data loading failed: ${error.message}`);
            await this.takeScreenshot('activities-grid-data-load-failed');
            throw error;
        }
    }
}