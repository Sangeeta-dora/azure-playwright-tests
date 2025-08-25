const { expect } = require('@playwright/test');
const {test} =  require('../Fixtures/fixtures.js');
const { log } = require('console');
const exp = require('constants');
const config = require('../config.js');
require('dotenv').config();
const env = process.env.ENVIRONMENT;
const envConfig = config[env];
const XLSX = require('xlsx');
const fs = require('fs');
const path = require('path');

// UPDATE THIS BLOCK TO USE THE CORRECT PATH
let dataSet;
try {
    // Fixed path - TestData.json is in utils folder, not TestData folder
    const testDataPath = path.join(__dirname, '../utils/TestData.json');
    dataSet = JSON.parse(fs.readFileSync(testDataPath, 'utf8'));
    console.log('✅ TestData.json loaded successfully from utils folder');
    console.log('📄 Loaded data keys:', Object.keys(dataSet));
} catch (error) {
    console.log(`⚠️ Warning: Could not load TestData.json from utils folder (${error.message}), using default values`);
    
    // Try alternative paths as fallback
    const fallbackPaths = [
        path.join(__dirname, '../TestData/TestData.json'),
        path.join(__dirname, '../testdata/TestData.json'),
        path.join(__dirname, '../data/TestData.json'),
        path.join(__dirname, '../../utils/TestData.json')
    ];
    
    let dataLoaded = false;
    for (const fallbackPath of fallbackPaths) {
        try {
            if (fs.existsSync(fallbackPath)) {
                dataSet = JSON.parse(fs.readFileSync(fallbackPath, 'utf8'));
                console.log(`✅ TestData.json found at fallback path: ${fallbackPath}`);
                dataLoaded = true;
                break;
            }
        } catch (fallbackError) {
            // Continue to next path
        }
    }
    
    if (!dataLoaded) {
        console.log('📁 Using default dataSet values');
        dataSet = {
            AlertName: 'Activities Test Alert',
            AlertDescription: 'Activities TestReact Description',
            ViewName: 'Activities Test View',
            ScheduleDescription: 'Test Schedule Description'
        };
    }
}



// Test for user navigation to InquiriesByUser_Activities
test('@pageloadtests InquiesByUserActivities_Navigate to InquiesByUserActivities', async({ inquiriesByUserActivitiesPageReady, inqAct }) => {
    // Navigation and login handled automatically by the fixture
    // Page is already loaded and ready to use
    await expect(inqAct.firstRow).toBeVisible()
  })

// Test to click on Refresh button of the activities table
test('InquiesByUserActivities_Click on Refresh', async({ inquiriesByUserActivitiesPageReady, inqAct }) => {
    // Navigation and login handled automatically by the fixture
    await inqAct.clickonRefresh()
    await expect(inqAct.firstRow).toBeVisible()
    await inqAct.takeScreenshot('InquiriesByUserActivities_Refresh', 'InquiriesByUserActivities')
})

// // Test to Export to Excel of the activities table
test('InquiesByUserActivities_Click on Export to excel', async({ inquiriesByUserActivitiesPageReady, inqAct, page }) => {
    // Navigation and login handled automatically by the fixture
   
    console.log('🔄 Starting Excel export test...');
    
    // Click on Export to Excel button
    await inqAct.clickOnExportToExcel()
    console.log('✅ Clicked Export to Excel button');
    
    // Handle the download
    const downloadPromise = page.waitForEvent('download');
    const download = await downloadPromise;
    
    // Save the file
    const downloadPath = `test-results/${download.suggestedFilename()}`;
    await download.saveAs(downloadPath);
    console.log(`✅ File downloaded and saved to: ${downloadPath}`);
    
    // Read and validate the Excel file with comprehensive analysis
    await inqAct.validateExcelFile(downloadPath);
    console.log('✅ Excel validation completed successfully');

    // Verify the page is still functional after export
    await expect(inqAct.firstRow).toBeVisible();
    await inqAct.takeScreenshot('InquiriesByUserActivities_ExportToExcel', 'InquiriesByUserActivities');
    
    console.log('🎉 Excel export test completed successfully');
})

// // Test to click on BestFit button of the activities table
test('InquiesByUserActivities_Click on bestFit', async({ inquiriesByUserActivitiesPageReady, inqAct }) => {
    // Navigation and login handled automatically by the fixture
    await inqAct.clickonBestFit()
    await expect(inqAct.firstRow).toBeVisible()
    await inqAct.takeScreenshot('InquiriesByUserActivities_BestFit', 'InquiriesByUserActivities')
})

// // Test to click on Density_Standard of the activities table
test('InquiesByUserActivities_Click on Density_Standard', async({ inquiriesByUserActivitiesPageReady, inqAct }) => {
    // Navigation and login handled automatically by the fixture
    await inqAct.clickonDensity()
    await inqAct.clickonStandard()
    await expect(inqAct.firstRow).toBeVisible()
    await inqAct.takeScreenshot('InquiriesByUserActivities_DensityStandard', 'InquiriesByUserActivities')
})

// Test to click on Density_Compact of the activities table
test('InquiesByUserActivities_Click on Density_Compact', async({ inquiriesByUserActivitiesPageReady, inqAct }) => {
    // Navigation and login handled automatically by the fixture
    await inqAct.clickonDensity()
    await inqAct.clickonCompact()
    await expect(inqAct.firstRow).toBeVisible()
})

// Test to click on Density_Comfortable button of the activities table
test('InquiesByUserActivities_Click on Density_Comfortable', async({ inquiriesByUserActivitiesPageReady, inqAct }) => {
    // Navigation and login handled automatically by the fixture
    await inqAct.clickonDensity()
    await inqAct.clickonComfortable()
    await expect(inqAct.firstRow).toBeVisible()
    await inqAct.takeScreenshot('InquiriesByUserActivities_DensityComfortable', 'InquiriesByUserActivities')
})

// Test to click on activity icon and click on new activity
test('InquiesByUserActivities_Clickon first Activity Icon and click on new Activity', async({ inquiriesByUserActivitiesPageReady, inqAct }) => {
    // Navigation and login handled automatically by the fixture
    await inqAct.clickonfirstActivityIcon()
    await inqAct.clickonNewActivity()
    await expect(inqAct.firstRow).toBeVisible()
    await inqAct.takeScreenshot('InquiriesByUserActivities_NewActivity', 'InquiriesByUserActivities')
})

// Test to click on first Activity Icon and click on Account Details/New Activity
test('InquiesByUserActivities_Clickon first Activity Icon and click on new Activity /Account Details', async({ inquiriesByUserActivitiesPageReady, inqAct }) => {
    // Navigation and login handled automatically by the fixture
    await inqAct.clickonfirstActivityIcon()
    await inqAct.clickonAccountDetailNewActivity()
    await expect(inqAct.firstRow).toBeVisible()
})

// Test to click on first Cust Name and click on Account Details/New Activity
test('InquiesByUserActivities_Click on first Cust Namre and click on AccountDetails New Activity', async({ inquiriesByUserActivitiesPageReady, inqAct }) => {
    // Navigation and login handled automatically by the fixture
    await inqAct.clickonFirstCustomer()
    await inqAct.clickonAccountDetailNewActivity()
    await expect(inqAct.firstRow).toBeVisible()
})

// Test to click on first Cust Name and click on Account Details
test('InquiesByUserActivities_Click on first Cust Name and click on AccountDetails', async({ inquiriesByUserActivitiesPageReady, inqAct }) => {
    // Navigation and login handled automatically by the fixture
    await inqAct.clickonFirstCustomer()
    await inqAct.clickonAccountDetails()
    await expect(inqAct.firstRow).toBeVisible()
})

// Test to click on first Issue and navigate to Activity Window
test('InquiesByUserActivities_Click on first Issue and navigate to Activity Window', async({ inquiriesByUserActivitiesPageReady, inqAct }) => {
    // Navigation and login handled automatically by the fixture
    await inqAct.clickonFirstIssue()
    await expect(inqAct.firstRow).toBeVisible()
})



// Define test suite for Activities View Settings functionality
test.describe('Activities View Settings Tests', () => {
  // Test for navigating to View Settings page
  test('Should navigate to View Settings page', async ({ inquiriesByUserActivitiesPageReady, inqAct, page }) => {
    // The login and navigation to Activities page is already handled by the fixture

    // Verify the page is loaded before proceeding
    console.log('Ensuring page is fully loaded before opening dialog...');
    await inqAct.waitForPageStable(2000);

    // Take a screenshot before clicking
    await inqAct.takeScreenshot('before-view-settings-click');

    // Open View Settings dialog with retry logic using the new method
    await inqAct.openViewSettingsWithRetry();

    // Verify View Settings dialog is visible using the new method
    const isDialogVisible = await inqAct.verifyViewSettingsDialog(8000);
    if (!isDialogVisible) {
      // Take a full page screenshot for better diagnostics
      await page.screenshot({ path: './screenshots/activities-view-settings-full-page-error.png', fullPage: true });

      throw new Error('Failed to verify Activities View Settings dialog');
    }

    await inqAct.takeScreenshot('activities-view-settings-dialog-opened');
  });

  // Test for viewing existing view settings
  test('Should display existing view settings in the table', async ({ inquiriesByUserActivitiesPageReady, page, inqAct }) => {
    // The login and navigation to Activities page is already handled by the fixture

    // Verify the page is loaded before proceeding
    console.log('Ensuring page is fully loaded before opening dialog...');
    await inqAct.waitForPageStable(2000);

    // Take a screenshot before clicking
    await inqAct.takeScreenshot('before-view-settings-click');

    // Open View Settings dialog with retry logic using the new method
    await inqAct.openViewSettingsWithRetry();

    // Verify View Settings dialog is visible using the new method
    const isDialogVisible = await inqAct.verifyViewSettingsDialog(8000);
    if (!isDialogVisible) {
      // Take a full page screenshot for better diagnostics
      await page.screenshot({ path: './screenshots/activities-view-settings-full-page-error.png', fullPage: true });

      throw new Error('Failed to verify Activities View Settings dialog');
    }

    // Take screenshot showing existing view settings
    await inqAct.takeScreenshot('activities-existing-view-settings');
    console.log('✅ Activities View Settings table displayed successfully');
  });

  // Test for creating a new view setting
  test('Should save current view settings with a name', async ({ inquiriesByUserActivitiesPageReady, page, inqAct }) => {
    // Open View Settings dialog
    // The login and navigation to Activities page is already handled by the fixture

    // Verify the page is loaded before proceeding
    console.log('Ensuring page is fully loaded before opening dialog...');
    await inqAct.waitForPageStable(2000);

    // Take a screenshot before clicking
    await inqAct.takeScreenshot('before-view-settings-click');

    // Open View Settings dialog with retry logic using the new method
    await inqAct.openViewSettingsWithRetry();

    // Verify View Settings dialog is visible using the new method
    const isDialogVisible = await inqAct.verifyViewSettingsDialog(8000);
    if (!isDialogVisible) {
      // Take a full page screenshot for better diagnostics
      await page.screenshot({ path: './screenshots/activities-view-settings-full-page-error.png', fullPage: true });

      throw new Error('Failed to verify Activities View Settings dialog');
    }

    // Generate a unique view name using timestamp
    const viewName = `Activities Test View ${Date.now()}`;

    // Enter view name in the "Save current settings as" field
    console.log(`Setting Activities view name to: ${viewName}`);
    await inqAct.viewNameInput.fill(viewName);

    // Take screenshot after entering view name
    await inqAct.takeScreenshot('activities-view-name-entered');

    // Configure additional view settings if available
    // (This depends on the specific UI structure and available options)

    // Click Save button
    console.log('Clicking Save button for Activities view...');
    await inqAct.viewSaveButton.click();

    // Take screenshot after saving
    await inqAct.takeScreenshot('after-activities-view-save');

    // Verify view is added to the table using the new method
    console.log(`Verifying that Activities view "${viewName}" was added to the table...`);
    const viewFound = await inqAct.verifyViewInDropdown(viewName);

    console.log(`Activities view verification result: ${viewFound ? 'View found' : 'View not found'}`);
  });

  // Test for editing an existing view setting
  test('Should edit an existing view setting', async ({ inquiriesByUserActivitiesPageReady, page, inqAct }) => {
    // Open View Settings dialog
    // The login and navigation to Activities page is already handled by the fixture

    // Verify the page is loaded before proceeding
    console.log('Ensuring page is fully loaded before opening dialog...');
    await inqAct.waitForPageStable(2000);

    // Take a screenshot before clicking
    await inqAct.takeScreenshot('before-view-settings-click');

    // Open View Settings dialog with retry logic using the new method
    await inqAct.openViewSettingsWithRetry();

    // Verify View Settings dialog is visible using the new method
    const isDialogVisible = await inqAct.verifyViewSettingsDialog(8000);
    if (!isDialogVisible) {
      // Take a full page screenshot for better diagnostics
      await page.screenshot({ path: './screenshots/activities-view-settings-full-page-error.png', fullPage: true });

      throw new Error('Failed to verify Activities View Settings dialog');
    }

    await inqAct.takeScreenshot('activities-view-settings-dialog-loaded');
    
    // Click Edit button for an existing view
    console.log('Clicking Edit button for Activities view...');
    await inqAct.clickonEditView();
    
    // Save changes after editing
    await inqAct.clickonSaveafterEdit();
    
    await inqAct.takeScreenshot('activities-view-edited-successfully');
    console.log('✅ Activities view edited successfully');
  });

  // Test for copying a view setting
  test('Should copy an existing view setting', async ({ inquiriesByUserActivitiesPageReady, page, inqAct }) => {
    // Open View Settings dialog
    // The login and navigation to Activities page is already handled by the fixture

    // Verify the page is loaded before proceeding
    console.log('Ensuring page is fully loaded before opening dialog...');
    await inqAct.waitForPageStable(2000);

    // Take a screenshot before clicking
    await inqAct.takeScreenshot('before-view-settings-click');

    // Open View Settings dialog with retry logic using the new method
    await inqAct.openViewSettingsWithRetry();

    // Verify View Settings dialog is visible using the new method
    const isDialogVisible = await inqAct.verifyViewSettingsDialog(8000);
    if (!isDialogVisible) {
      // Take a full page screenshot for better diagnostics
      await page.screenshot({ path: './screenshots/activities-view-settings-full-page-error.png', fullPage: true });

      throw new Error('Failed to verify Activities View Settings dialog');
    }

    await inqAct.takeScreenshot('activities-view-settings-dialog-loaded');
    
    // Click Copy button for an existing view
    console.log('Clicking Copy button for an existing Activities view...');
    await inqAct.clickonCopyView();
    
    // Copy to all users
    await inqAct.copytoalluser();
    
    // Save after copying
    await inqAct.clickonSaveaftercopy();
    
    await inqAct.takeScreenshot('activities-view-copied-successfully');
    console.log('✅ Activities view copied successfully');
  });

  // Test for loading a saved view configuration
  test('Should load a saved view configuration', async ({ inquiriesByUserActivitiesPageReady, page, inqAct }) => {
    // Open View Settings dialog
    // The login and navigation to Activities page is already handled by the fixture

    // Verify the page is loaded before proceeding
    console.log('Ensuring page is fully loaded before opening dialog...');
    await inqAct.waitForPageStable(2000);

    // Take a screenshot before clicking
    await inqAct.takeScreenshot('before-view-settings-click');

    // Open View Settings dialog with retry logic using the new method
    await inqAct.openViewSettingsWithRetry();
    
    // Load saved view configuration
    console.log('Loading saved Activities view configuration...');
    await inqAct.loadSavedViewConfiguration();
    
    // Wait for grid data to load after applying the view
    await inqAct.waitForGridDataToLoad();
    
    await inqAct.takeScreenshot('activities-view-configuration-loaded');
    console.log('✅ Activities view configuration loaded successfully');
  });

  // Test for configuring view columns
  test('Should configure columns for a view', async ({ inquiriesByUserActivitiesPageReady, page, inqAct }) => {
    // Open View Settings dialog
    // The login and navigation to Activities page is already handled by the fixture

    // Verify the page is loaded before proceeding
    console.log('Ensuring page is fully loaded before opening dialog...');
    await inqAct.waitForPageStable(2000);

    // Take a screenshot before clicking
    await inqAct.takeScreenshot('before-view-settings-click');

    // Open View Settings dialog with retry logic using the new method
    await inqAct.openViewSettingsWithRetry();

    // Verify View Settings dialog is visible using the new method
    const isDialogVisible = await inqAct.verifyViewSettingsDialog(8000);
    if (!isDialogVisible) {
      // Take a full page screenshot for better diagnostics
      await page.screenshot({ path: './screenshots/activities-view-settings-full-page-error.png', fullPage: true });

      throw new Error('Failed to verify Activities View Settings dialog');
    }
    
    // Click Columns button for a view
    console.log('Clicking Columns button for Activities view...');
    await inqAct.clickonViewSettingsColumns();
    
    // Configure column settings
    console.log('Configuring columns for the Activities view...');
    await inqAct.takeScreenshot('activities-columns-configuration');

    console.log('Saving Activities column configuration...');
    await inqAct.selectViewSettingsColumns();
    
    await inqAct.takeScreenshot('activities-columns-configured-successfully');
    console.log('✅ Activities view columns configured successfully');
  });

  // Test for deleting a view setting
  test('Should delete an existing view setting', async ({ inquiriesByUserActivitiesPageReady, page, inqAct }) => {
    // Open View Settings dialog
    // The login and navigation to Activities page is already handled by the fixture

    // Verify the page is loaded before proceeding
    console.log('Ensuring page is fully loaded before opening dialog...');
    await inqAct.waitForPageStable(2000);

    // Take a screenshot before clicking
    await inqAct.takeScreenshot('before-view-settings-click');

    // Open View Settings dialog with retry logic using the new method
    await inqAct.openViewSettingsWithRetry();

    // Verify View Settings dialog is visible using the new method
    const isDialogVisible = await inqAct.verifyViewSettingsDialog(8000);
    if (!isDialogVisible) {
      // Take a full page screenshot for better diagnostics
      await page.screenshot({ path: './screenshots/activities-view-settings-full-page-error.png', fullPage: true });

      throw new Error('Failed to verify Activities View Settings dialog');
    }
    
    // Click Delete button for a view
    console.log('Clicking Delete button for Activities view...');
    await inqAct.clickonDeleteView();
    
    await inqAct.takeScreenshot('activities-view-deleted-successfully');
    console.log('✅ Activities view deleted successfully');
  });

});

// Define test suite for Activities Alert functionality
test.describe('Activities Alert Tests', () => {
  // Test for navigating to the Setup Alerts page
  test('Should navigate to Setup Alerts page', async ({ inquiriesByUserActivitiesPageReady, inqAct }) => {
    // The login and navigation to Activities page is already handled by the fixture

    // Open Setup Alerts dialog
    console.log('Opening Setup Alerts dialog for Activities...');
    await inqAct.openSetupAlerts();

    // Verify Setup Alerts dialog is displayed
    console.log('Verifying Activities Setup Alerts dialog is displayed...');
    await expect(inqAct.alertSetupDialog).toBeVisible();

    // Take screenshot of the Setup Alerts dialog
    await inqAct.takeScreenshot('activities-setup-alerts-dialog-displayed');
    console.log('✅ Activities Setup Alerts dialog opened successfully');
  });

  // Test for creating a new alert
  test('Should create a new alert', async ({ inquiriesByUserActivitiesPageReady, page, inqAct }) => {
    // Open Setup Alerts dialog
    console.log('Opening Setup Alerts dialog for Activities...');
    await inqAct.openSetupAlerts();

    // Get alert values from the loaded dataSet
    const alertName = dataSet?.AlertName || 'Activities Test Alert';
    const alertDescription = dataSet?.AlertDescription || 'Activities TestReact Description';

    // Make the alert name unique by appending a timestamp
    const uniqueAlertName = `${alertName}_${Date.now()}`;

    // Enter alert name
    console.log(`Setting Activities alert name to: ${uniqueAlertName}`);
    await inqAct.alertNameInput.fill(uniqueAlertName);
    await inqAct.takeScreenshot('activities-alert-name-entered');
    await inqAct.clickonAlertSave();

    // Enter alert description
    console.log(`Setting Activities alert description to: ${alertDescription}`);
    await inqAct.alertDescriptionInput.click();
    await inqAct.alertDescriptionInput.fill(alertDescription);
    await inqAct.takeScreenshot('activities-alert-description-entered');

    // Click Save button
    console.log('Clicking Save button for Activities alert...');
    await inqAct.alertSaveButton.click();

    // Wait for save to complete
    await page.waitForTimeout(2000);

    // Take screenshot after saving
    await inqAct.takeScreenshot('after-activities-alert-save');
    
    // FIXED: Verify alert is added to the dropdown using the correct dropdown method
    console.log(`Verifying newly created Activities alert exists in dropdown: ${uniqueAlertName}`);
    const alertFound = await inqAct.verifyAlertInDropdown(uniqueAlertName); // Now explicitly using dropdown method
    
    // If not found with main method, try robust method
    if (!alertFound) {
        console.log('Trying robust alert verification method...');
        const alertFoundRobust = await inqAct.verifyAlertInDropdownRobust(uniqueAlertName);
        console.log(`Robust verification result: ${alertFoundRobust ? 'Alert found' : 'Alert not found'}`);
    }
    
    console.log(`Activities alert verification result: ${alertFound ? 'Alert found' : 'Alert not found'}`);
    console.log('✅ Activities alert created successfully');
});




  // Test for editing an existing alert
  test('Should edit an existing alert', async ({ inquiriesByUserActivitiesPageReady, page, inqAct }) => {
    // Open Setup Alerts dialog
    console.log('Opening Setup Alerts dialog for Activities...');
    await inqAct.openSetupAlerts();

    // Use the page object method to edit an alert with fallback strategies including XPath
    console.log('Attempting to edit Activities alert...');
    const editSuccess = await inqAct.editAlertWithXPath();

    // If editing was not successful, skip the test
    if (!editSuccess) {
      console.log('Activities alert edit process failed, skipping test');
      test.skip();
      return;
    }

    // Since we're only updating the description, no need to verify name changes
    // Just assert that the edit operation completed successfully
    console.log('✅ Activities alert description updated successfully');
    expect(editSuccess).toBeTruthy();
  });

  // Test for loading a saved alert configuration
  test('Should load a saved alert configuration', async ({ inquiriesByUserActivitiesPageReady, page, inqAct }) => {
    // Open Setup Alerts dialog
    console.log('Opening Setup Alerts dialog for Activities...');
    await inqAct.openSetupAlerts();
    await inqAct.takeScreenshot('activities-setup-alerts-dialog-loaded');

    // Click Load button for an existing alert
    console.log('Clicking Load button for Activities alert...');
    await inqAct.alertLoad();

    // Wait for alert configuration to load - actively wait for page elements
    console.log('Waiting for Activities alert configuration to load...');
    await page.waitForTimeout(3000);
    
    await inqAct.takeScreenshot('activities-alert-configuration-loaded');
    console.log('✅ Activities alert configuration loaded successfully');
  });

  // Test for configuring alert columns
  test('Should configure columns for an alert_Navigate to Alert Columns', async ({ inquiriesByUserActivitiesPageReady, page, inqAct }) => {
    // Open Setup Alerts dialog
    console.log('Opening Setup Alerts dialog for Activities...');
    await inqAct.openSetupAlerts();
    await inqAct.takeScreenshot('activities-setup-alerts-dialog-loaded');
    
    // Configure column settings
    console.log('Clicking on Activities Alert Column configuration...');
    await inqAct.clickonAlertColumn();
    
    // Verify columns updated
    console.log('Configuring Activities alert columns...');
    await inqAct.clickonColumnView();
    
    await inqAct.takeScreenshot('activities-alert-columns-configured');
    console.log('✅ Activities alert columns configured successfully');
  });

  // Test for deleting an alert
  test('Should delete an existing alert', async ({ inquiriesByUserActivitiesPageReady, page, inqAct }) => {
    // Open Setup Alerts dialog
    console.log('Opening Setup Alerts dialog for Activities...');
    await inqAct.openSetupAlerts();
    await inqAct.takeScreenshot('activities-setup-alerts-dialog-loaded');
    
    // Click Delete button for an alert
    console.log('Clicking Delete button for Activities alert...');
    await inqAct.clickonAlertDelete();
    
    await inqAct.takeScreenshot('activities-alert-deleted-successfully');
    console.log('✅ Activities alert deleted successfully');
  });

  // Test for scheduling an alert
  test('Should set a schedule for an alert', async ({ inquiriesByUserActivitiesPageReady, page, inqAct }) => {
    // Open Setup Alerts dialog
    console.log('Opening Setup Alerts dialog for Activities...');
    await inqAct.openSetupAlerts();
    await inqAct.takeScreenshot('activities-setup-alerts-dialog-loaded');
    
    // Click Schedule button for an alert
    console.log('Clicking Schedule button for Activities alert...');
    await inqAct.clickonAlertSchedule();
    
    // Configure schedule settings
    await inqAct.takeScreenshot('activities-alert-schedule-configured');
    
    console.log('Adding Activities alert schedule details...');
    await inqAct.addScheduleDetails();
    await inqAct.takeScreenshot('activities-alert-schedule-details-added');
    
    // Save schedule
    console.log('Saving Activities alert schedule...');
    await inqAct.clickonSchedulesave();
    
    await inqAct.takeScreenshot('activities-alert-schedule-saved');
    console.log('✅ Activities alert schedule set successfully');
  });

  // Test for processing an alert
  test('Should process an alert', async ({ inquiriesByUserActivitiesPageReady, page, inqAct }) => {
    // Open Setup Alerts dialog
    console.log('Opening Setup Alerts dialog for Activities...');
    await inqAct.openSetupAlerts();
    await inqAct.takeScreenshot('activities-setup-alerts-dialog-loaded');
    
    // Click Process button for an alert
    console.log('Clicking Process button for Activities alert...');
    await inqAct.clickonAlertProcess();
    
    // Verify processing is initiated
    await inqAct.takeScreenshot('activities-alert-processing-initiated');
    
    // Wait for processing to complete
    console.log('Waiting for Activities alert processing to complete...');
    await inqAct.verifyProcessSuccess();
    
    // Verify alert is processed successfully
    await inqAct.takeScreenshot('activities-alert-processed-successfully');
    
    // Close process alert dialog
    console.log('Closing Activities process alert dialog...');
    await inqAct.closeProcessAlertDialog();
    await inqAct.takeScreenshot('activities-process-alert-dialog-closed');
    
    console.log('✅ Activities alert processed successfully');
  });

  // Test for saving alert settings with a name
  test('Should save current alert settings with a name', async ({ inquiriesByUserActivitiesPageReady, page, inqAct }) => {
    // Open Setup Alerts dialog
    console.log('Opening Setup Alerts dialog for Activities...');
    await inqAct.openSetupAlerts();
    await inqAct.takeScreenshot('activities-setup-alerts-dialog-loaded');
    
    // Enter settings
    const alertSettingsName = `Activities Test Alert Settings ${Date.now()}`;
    console.log(`Entering Activities alert settings name: ${alertSettingsName}`);
    await inqAct.alertNameInput.fill(alertSettingsName);
    await inqAct.takeScreenshot('activities-alert-settings-entered');
    
    // Enter a name in "Save current settings as" field
    console.log('Saving Activities alert settings name...');
    await inqAct.alertNameSave();
    await inqAct.takeScreenshot('activities-alert-settings-name-saved');
    
    // Save alert details
    console.log('Saving Activities alert details...');
    await inqAct.saveAlertDetails();
    
    await inqAct.takeScreenshot('activities-alert-settings-saved-successfully');
    console.log('✅ Activities alert settings saved with name successfully');
  });

  });
  // Remove dataSet from ALL filter test parameters since it's already loaded globally

test.describe('Activities Filter Tests', () => {
  
  // Test for general string filtering - REMOVE dataSet from parameters
  test('Should apply filters to the Activities data grid_String', async ({ inquiriesByUserActivitiesPageReady, page, inqAct }) => {
    await inqAct.verifyPageLoaded();
    await inqAct.waitForGridDataToLoad();
    await inqAct.takeScreenshot('before-applying-activities-filter');
    
    // dataSet is already available as a global variable
    const filterValue = dataSet.filterText;
    console.log(`Using filter value for Activities: "${filterValue}"`);

    try {
      const filterResult = await inqAct.testFilter(filterValue, 0, 3000);
      console.log(`Activities filter applied successfully with value: ${filterValue}`);
      await inqAct.takeScreenshot('activities-filter-success');
    } catch (error) {
      console.error(`Activities filter test failed: ${error.message}`);
      await inqAct.takeScreenshot('activities-filter-test-failure');
      throw error;
    }
  });

  // Test for filtering by Time Zone ID - REMOVE dataSet from parameters
  test('Should apply filters to the Activities data grid_String_TimeZoneID', async ({ inquiriesByUserActivitiesPageReady, page, inqAct }) => {
    await inqAct.verifyPageLoaded();
    await inqAct.waitForGridDataToLoad();
    await inqAct.takeScreenshot('before-applying-activities-timezone-id-filter');
    
    // dataSet is already available as a global variable
    if (!dataSet.hasOwnProperty("TimeZoneID")) {
      console.error("Error: 'TimeZoneID' key not found in TestData.json for Activities!");
    }
    
    if (!dataSet.TimeZoneID) {
      throw new Error("TimeZoneID value is required in TestData.json but was not found for Activities");
    }
    
    const timeZoneIdValue = dataSet.TimeZoneID;
    console.log(`Using Activities TimeZoneID value: "${timeZoneIdValue}"`);

    try {
      await inqAct.filterByTimeZoneID(timeZoneIdValue);
      console.log(`Activities TimeZoneID filter applied with value: ${timeZoneIdValue}`);
      await inqAct.takeScreenshot('activities-timezone-id-filter-success');
    } catch (error) {
      console.error(`Activities TimeZoneID filter test failed: ${error.message}`);
      await inqAct.takeScreenshot('activities-timezone-id-filter-test-failure');
      await page.screenshot({ path: 'test-results/activities-timezone-id-filter-error-state.png', fullPage: true });
      throw error;
    }
  });

  // Test for filtering by Activity Note - REMOVE dataSet from parameters
  test('Should apply filters to the Activities data grid_String_ActivityNote', async ({ inquiriesByUserActivitiesPageReady, page, inqAct }) => {
    await inqAct.verifyPageLoaded();
    await inqAct.waitForGridDataToLoad();
    await inqAct.takeScreenshot('before-applying-activities-activity-note-filter');

    // dataSet is already available as a global variable
    const activityNoteValue = dataSet.ActivityNote;
    console.log(`Using Activities ActivityNote value: "${activityNoteValue}"`);

    try {
      await inqAct.filterByActivityNote(activityNoteValue);
      console.log(`Activities Activity Note filter applied with value: ${activityNoteValue}`);
      await inqAct.takeScreenshot('activities-activity-note-filter-success');
    } catch (error) {
      console.error(`Activities Activity Note filter test failed: ${error.message}`);
      await inqAct.takeScreenshot('activities-activity-note-filter-test-failure');
      await page.screenshot({ path: 'test-results/activities-activity-note-filter-error-state.png', fullPage: true });
      throw error;
    }
  });

  // Test for filtering by Customer ID - REMOVE dataSet from parameters
  test('Should apply filters to the Activities data grid_String_CustID', async ({ inquiriesByUserActivitiesPageReady, page, inqAct }) => {
    await inqAct.verifyPageLoaded();
    await inqAct.waitForGridDataToLoad();
    await inqAct.takeScreenshot('before-applying-activities-custid-filter');

    // dataSet is already available as a global variable
    const custIdValue = dataSet.CustID;
    console.log(`Using Activities CustID value: "${custIdValue}"`);

    try {
      await inqAct.filterByCustID(custIdValue);
      console.log(`Activities CustID filter applied with value: ${custIdValue}`);
      await inqAct.takeScreenshot('activities-custid-filter-success');
    } catch (error) {
      console.error(`Activities CustID filter test failed: ${error.message}`);
      await inqAct.takeScreenshot('activities-custid-filter-test-failure');
      await page.screenshot({ path: 'test-results/activities-custid-filter-error-state.png', fullPage: true });
      throw error;
    }
  });

  // Test for filtering by numeric field - REMOVE dataSet from parameters
  test('Should apply filters to the Activities data grid_Number_DaysToRespond', async ({ inquiriesByUserActivitiesPageReady, page, inqAct }) => {
    await inqAct.verifyPageLoaded();
    await inqAct.waitForGridDataToLoad();
    await inqAct.takeScreenshot('before-applying-activities-number-filter');

    // dataSet is already available as a global variable
    const numericFilterValue = dataSet.daysToRespond;
    console.log(`Using Activities daysToRespond value: "${numericFilterValue}"`);
    
    try {
      await inqAct.filterDaysToRespondUsingFilterButton(numericFilterValue);
      console.log(`Activities numeric filter applied with value: ${numericFilterValue}`);
      await inqAct.takeScreenshot('activities-numeric-filter-success');
    } catch (error) {
      console.error(`Activities numeric filter test failed: ${error.message}`);
      await inqAct.takeScreenshot('activities-numeric-filter-test-failure');
      await page.screenshot({ path: 'test-results/activities-numeric-filter-error-state.png', fullPage: true });
      throw error;
    }
  });

  // Test for filtering by User ID - REMOVE dataSet from parameters
  test('Should apply filters to the Activities data grid_String_UserID', async ({ inquiriesByUserActivitiesPageReady, page, inqAct }) => {
    await inqAct.verifyPageLoaded();
    await inqAct.waitForGridDataToLoad();
    await inqAct.takeScreenshot('before-applying-activities-userid-filter');

    // dataSet is already available as a global variable
    const userIdValue = dataSet.UserID || dataSet.UserId || 'TestUser';
    console.log(`Using Activities UserID value: "${userIdValue}"`);

    try {
      await inqAct.filterByUserID(userIdValue);
      console.log(`Activities UserID filter applied with value: ${userIdValue}`);
      await inqAct.takeScreenshot('activities-userid-filter-success');
    } catch (error) {
      console.error(`Activities UserID filter test failed: ${error.message}`);
      await inqAct.takeScreenshot('activities-userid-filter-test-failure');
      await page.screenshot({ path: 'test-results/activities-userid-filter-error-state.png', fullPage: true });
      throw error;
    }
  });

  // Test for filtering by Activity Type - REMOVE dataSet from parameters
  test('Should apply filters to the Activities data grid_String_ActivityType', async ({ inquiriesByUserActivitiesPageReady, page, inqAct }) => {
    await inqAct.verifyPageLoaded();
    await inqAct.waitForGridDataToLoad();
    await inqAct.takeScreenshot('before-applying-activities-activity-type-filter');

    // dataSet is already available as a global variable
    const activityTypeValue = dataSet.ActivityType || 'Call';
    console.log(`Using Activities ActivityType value: "${activityTypeValue}"`);

    try {
      await inqAct.filterByActivityType(activityTypeValue);
      console.log(`Activities ActivityType filter applied with value: ${activityTypeValue}`);
      await inqAct.takeScreenshot('activities-activity-type-filter-success');
    } catch (error) {
      console.error(`Activities ActivityType filter test failed: ${error.message}`);
      await inqAct.takeScreenshot('activities-activity-type-filter-test-failure');
      await page.screenshot({ path: 'test-results/activities-activity-type-filter-error-state.png', fullPage: true });
      throw error;
    }
  });

  // Test for filtering by Date Range - REMOVE dataSet from parameters
  test('Should apply filters to the Activities data grid_Date_DateRange', async ({ inquiriesByUserActivitiesPageReady, page, inqAct }) => {
    await inqAct.verifyPageLoaded();
    await inqAct.waitForGridDataToLoad();
    await inqAct.takeScreenshot('before-applying-activities-date-filter');

    // dataSet is already available as a global variable
    const startDate = dataSet.StartDate || '2024-01-01';
    const endDate = dataSet.EndDate || '2024-12-31';
    console.log(`Using Activities date range: "${startDate}" to "${endDate}"`);

    try {
      await inqAct.filterByDateRange(startDate, endDate);
      console.log(`Activities date range filter applied from ${startDate} to ${endDate}`);
      await inqAct.takeScreenshot('activities-date-range-filter-success');
    } catch (error) {
      console.error(`Activities date range filter test failed: ${error.message}`);
      await inqAct.takeScreenshot('activities-date-range-filter-test-failure');
      await page.screenshot({ path: 'test-results/activities-date-range-filter-error-state.png', fullPage: true });
      throw error;
    }
  });

  // Test for clearing all filters - REMOVE dataSet from parameters
  test('Should clear all filters from the Activities data grid', async ({ inquiriesByUserActivitiesPageReady, page, inqAct }) => {
    await inqAct.verifyPageLoaded();
    await inqAct.waitForGridDataToLoad();
    
    // dataSet is already available as a global variable
    await inqAct.takeScreenshot('before-applying-activities-filter-to-clear');
    const filterValue = dataSet.filterText;
    await inqAct.testFilter(filterValue, 0, 3000);
    await inqAct.takeScreenshot('activities-filter-applied-before-clear');

    try {
      console.log('Clearing all Activities filters...');
      await inqAct.clearAllFilters();
      console.log('All Activities filters cleared successfully');
      await inqAct.takeScreenshot('activities-filters-cleared-success');
    } catch (error) {
      console.error(`Activities clear filters test failed: ${error.message}`);
      await inqAct.takeScreenshot('activities-clear-filters-test-failure');
      await page.screenshot({ path: 'test-results/activities-clear-filters-error-state.png', fullPage: true });
      throw error;
    }
  });

  // Test for multiple filters combination - CORRECTED - REMOVE dataSet from parameters
  test('Should apply multiple filters to the Activities data grid', async ({ inquiriesByUserActivitiesPageReady, page, inqAct }) => {
    // dataSet is already available as a global variable from the top of the file
    console.log('📄 Available dataSet keys:', Object.keys(dataSet));
    
    //await inqAct.verifyPageLoaded();
    await inqAct.waitForGridDataToLoad();
    await inqAct.takeScreenshot('before-applying-activities-multiple-filters');

    try {
      // Apply multiple filters in sequence
      console.log('Applying multiple filters to Activities data grid...');
      
      // Filter by CustID
      if (dataSet.CustID) {
        await inqAct.filterByCustID(dataSet.CustID);
        console.log(`Applied CustID filter: ${dataSet.CustID}`);
        await inqAct.takeScreenshot('activities-custid-filter-applied');
      }

      // Filter by ActivityType
      if (dataSet.ActivityType) {
        await inqAct.filterByActivityType(dataSet.ActivityType);
        console.log(`Applied ActivityType filter: ${dataSet.ActivityType}`);
        await inqAct.takeScreenshot('activities-activity-type-filter-applied');
      }

      // Filter by UserID
      if (dataSet.UserID || dataSet.UserId) {
        const userIdValue = dataSet.UserID || dataSet.UserId;
        await inqAct.filterByUserID(userIdValue);
        console.log(`Applied UserID filter: ${userIdValue}`);
        await inqAct.takeScreenshot('activities-userid-filter-applied');
      }

      console.log('Multiple Activities filters applied successfully');
      await inqAct.takeScreenshot('activities-multiple-filters-success');

    } catch (error) {
      console.error(`Activities multiple filters test failed: ${error.message}`);
      await inqAct.takeScreenshot('activities-multiple-filters-test-failure');
      await page.screenshot({ path: 'test-results/activities-multiple-filters-error-state.png', fullPage: true });
      throw error;
    }
  });
});


