const {test, expect} = require('@playwright/test');
const {Admin_MasterFiles_ActivityType} = require('../PageObjects/Admin_MasterFiles_ActivityType');
const {PageNavigation} = require('../PageObjects/PageNavigation');
const {ActivityCommunicateWindow} = require('../PageObjects/ActivityCommunicateWindow')
const {LoginPage} = require('../PageObjects/LoginPage');
const {Admin_MasterFiles_ActivityTemplate} = require('../PageObjects/Admin_MasterFiles_ActivityTemplate');
const {AccountOverview} = require('../PageObjects/AccountOverview');
const {AllAccounts} = require('../PageObjects/AllAccounts');
const dataSet = JSON.parse(JSON.stringify(require("../utils/TestData.json")))  
const log = require('console');
const config = require('../config.js');
const exp = require('constants');
require('dotenv').config();
const env = process.env.ENVIRONMENT;
const envConfig = config[env];

//TC_01 Test for user navigation to Activty Type page
test('@pageloadtests Activity Type_Navigate to Admin_MasterFiles_ActivityType', async ({ page }) => {
    log.info("Test for user navigation to Activty Type page");
    const loginPage = new LoginPage(page);
    const pageNav = new PageNavigation(page);
    const adminMasterFilesActivityType = new Admin_MasterFiles_ActivityType(page);
    await loginPage.navigateTo(envConfig.baseURL)
    await loginPage.login(envConfig.userName, envConfig.password)
    await pageNav.navigateToAdmin()
    await pageNav.navigateToAdminMasterFiles()
    await pageNav.navigateToActivityType()
    var pageTitle = await adminMasterFilesActivityType.returnPageName()

    //To Validate page name
    //expect(await adminMasterFilesActivityType.returnPageName()).toContain("Activity Types")
    expect(await adminMasterFilesActivityType.returnPageName()).toContain("Activity Types")
    await expect(adminMasterFilesActivityType.firstRow).toBeVisible()
    
});

//TC_02 Test for user adding new record in Activity Type and Validate those details  
test('Activity Type_Add New Record and Validate details', async({page}, testInfo) => {
    const loginPage = new LoginPage(page);
    const pageNav = new PageNavigation(page);
    const adminMasterFilesActivityType = new Admin_MasterFiles_ActivityType(page);
    const adminMasterFilesActivityTemplate = new Admin_MasterFiles_ActivityTemplate(page);
    await loginPage.navigateTo(envConfig.baseURL)
    await loginPage.login(envConfig.userName, envConfig.password)
    await pageNav.navigateToAdmin()
    await pageNav.navigateToAdminMasterFiles()
    await pageNav.navigateToActivityType()
    await adminMasterFilesActivityType.clickOnAddNewRecord()
    await expect(adminMasterFilesActivityType.title_AddRecord).toBeVisible()

    //Fill the form details
    var activity_ID = "TestAct_ID_"+Math.floor(Math.random() * 1000)
    await adminMasterFilesActivityType.fillActivityTypeFormDetails("ExpectPay", activity_ID, "Test_desc_1", "4", "Test_note1")
    await adminMasterFilesActivityType.clickOnSubmitActivityTypeForm()
    await adminMasterFilesActivityType.searchActivityType(activity_ID)

    // Zoom out the page
    await page.evaluate(() => {
        document.body.style.zoom = '50%'; // Set the zoom level to 50%
    });
    
    // Take a screenshot before validation
    const newActivitytype_ScreenshotPath = `screenshots/Added_NewActivityTemplate_${Date.now()}.png`;
    await page.screenshot({ path: newActivitytype_ScreenshotPath });
    await testInfo.attach('Screenshot After Creating Activity type successfully', { path: newActivitytype_ScreenshotPath, contentType: 'image/png' });

    //Validate the details of the added Activity Type
    expect(await adminMasterFilesActivityTemplate.returnFirstRowCellValue_texttype("activityID")).toContain(activity_ID, "Activity ID is not matching")
    expect(await adminMasterFilesActivityTemplate.returnFirstRowCellValue_texttype("description")).toContain("Test_desc_1", "Description is not matching")
    expect(await adminMasterFilesActivityTemplate.returnFirstRowCellValue_texttype("displayPriority")).toContain("4", "Priority is not matching")
    expect(await adminMasterFilesActivityType.returnFirstRowCellValue_texttype("decodedProcedureNote")).toContain("Test_note1", "Proc Notes is not matching")
    
    expect(await adminMasterFilesActivityTemplate.returnFirstRowCellValue_checkboxtype("systemActivity")).toBe(false)
    expect(await adminMasterFilesActivityTemplate.returnFirstRowCellValue_checkboxtype("excludeFromDashboard")).toBe(true)
    expect(await adminMasterFilesActivityTemplate.returnFirstRowCellValue_checkboxtype("excludeFromCRM")).toBe(true)
    expect(await adminMasterFilesActivityTemplate.returnFirstRowCellValue_checkboxtype("active")).toBe(true)

     //Delete the added Activity Template and verify its deleted successfully
     await adminMasterFilesActivityTemplate.clickOnDeleteIcon()
     await expect(adminMasterFilesActivityType.firstRow).not.toBeVisible()

});

//TC_03 Test for editing the existing record in Activity Type and Validate those details
test('Activity Type_Edit Existing Record and Validate details', async({page}, testInfo) => {
    const loginPage = new LoginPage(page);
    const pageNav = new PageNavigation(page);
    const adminMasterFilesActivityType = new Admin_MasterFiles_ActivityType(page);
    const adminMasterFilesActivityTemplate = new Admin_MasterFiles_ActivityTemplate(page);
    await loginPage.navigateTo(envConfig.baseURL)
    await loginPage.login(envConfig.userName, envConfig.password)
    await pageNav.navigateToAdmin()
    await pageNav.navigateToAdminMasterFiles()
    await pageNav.navigateToActivityType()
    await adminMasterFilesActivityType.clickOnAddNewRecord()
    await expect(adminMasterFilesActivityType.title_AddRecord).toBeVisible()

    //Fill the form details
    var activity_ID = "TestAct_ID_"+Math.floor(Math.random() * 1000)
    await adminMasterFilesActivityType.fillActivityTypeFormDetails("ExpectPay", activity_ID, "Test_desc_1", "4", "Test_note1")
    await adminMasterFilesActivityType.clickOnSubmitActivityTypeForm()
    await adminMasterFilesActivityType.searchActivityType(activity_ID)

    //Edit the Activity Template details and submit
    await adminMasterFilesActivityTemplate.clickOnEditIcon()
    await expect(adminMasterFilesActivityType.activitytypetitle_EditRecord).toBeVisible()
    await adminMasterFilesActivityType.editActivityTypeFormDetails("Test_Desc_Updated")
    await adminMasterFilesActivityType.clickOnSubmitActivityTypeForm()
    await adminMasterFilesActivityType.searchActivityType(activity_ID)

    // Zoom out the page
    await page.evaluate(() => {
        document.body.style.zoom = '50%'; // Set the zoom level to 50%
    });

    //Validate the details of the edited Activity Template
    expect(await adminMasterFilesActivityTemplate.returnFirstRowCellValue_texttype("description")).toContain("Test_Desc_Updated", "Description is not updated successfully")
    expect(await adminMasterFilesActivityTemplate.returnFirstRowCellValue_checkboxtype("excludeFromCRM")).toBe(false)

    // Take a screenshot after editing details
    const editedSuccessfully_ScreenshotPath = `screenshots/Edited_Successfully${Date.now()}.png`;
    await page.screenshot({ path: editedSuccessfully_ScreenshotPath });
    await testInfo.attach('Screenshot after Editing details successfully', { path: editedSuccessfully_ScreenshotPath, contentType: 'image/png' });

   //Delete the added Activity Type and verify its deleted successfully
   await adminMasterFilesActivityTemplate.clickOnDeleteIcon()
   await expect(adminMasterFilesActivityType.firstRow).not.toBeVisible()
});

//TC_04 Validate that user is not able to create Activity template without Mandatory fields
test('Activity Type_Validate Mandatory fields', async({page}, testInfo) => {
    const loginPage = new LoginPage(page);
    const pageNav = new PageNavigation(page);
    const adminMasterFilesActivityType = new Admin_MasterFiles_ActivityType(page);
    const adminMasterFilesActivityTemplate = new Admin_MasterFiles_ActivityTemplate(page);
    await loginPage.navigateTo(envConfig.baseURL)
    await loginPage.login(envConfig.userName, envConfig.password)
    await pageNav.navigateToAdmin()
    await pageNav.navigateToAdminMasterFiles()
    await pageNav.navigateToActivityType()
    
    //Click on Add New Record and click on submit without adding values in Mandatory fields
    await adminMasterFilesActivityType.clickOnAddNewRecord()
    await expect(adminMasterFilesActivityType.title_AddRecord).toBeVisible()
    await adminMasterFilesActivityType.clickOnSubmitActivityTypeForm()

    //Validate that error is getting displayed for Mandatory fields
    expect(await adminMasterFilesActivityType.returnIsActivityID_MandatoryField()).toBe(true)
    expect(await adminMasterFilesActivityType.returnIsDescription_MandatoryField()).toBe(true)
    expect(await adminMasterFilesActivityType.returnIsDisplayPriority_MandatoryField()).toBe(true)

});

//TC_05 Validate that user is able to create Activity type with only Mandatory fields also
test('Activity Type_Create Activity Type with Mandatory fields', async({page}, testInfo) => {
    const loginPage = new LoginPage(page);
    const pageNav = new PageNavigation(page);
    const adminMasterFilesActivityType = new Admin_MasterFiles_ActivityType(page);
    const adminMasterFilesActivityTemplate = new Admin_MasterFiles_ActivityTemplate(page);
    await loginPage.navigateTo(envConfig.baseURL)
    await loginPage.login(envConfig.userName, envConfig.password)
    await pageNav.navigateToAdmin()
    await pageNav.navigateToAdminMasterFiles()
    await pageNav.navigateToActivityType()
    await adminMasterFilesActivityType.clickOnAddNewRecord()
    await expect(adminMasterFilesActivityType.title_AddRecord).toBeVisible()

    //Fill only Mandatory details
    var activity_ID = "TestAct_ID_"+Math.floor(Math.random() * 1000)
    await adminMasterFilesActivityType.fillActivityTypeFormWithMandatoryFieldsOnly("ExpectPay", activity_ID, "Test_desc_1", "4")
    await adminMasterFilesActivityType.clickOnSubmitActivityTypeForm()
    await adminMasterFilesActivityType.searchActivityType(activity_ID)

    // Zoom out the page
    await page.evaluate(() => {
        document.body.style.zoom = '50%'; // Set the zoom level to 50%
    });

    //Validate the details of the added Activity Type
    expect(await adminMasterFilesActivityTemplate.returnFirstRowCellValue_texttype("activityID")).toContain(activity_ID, "Activity ID is not matching")
    expect(await adminMasterFilesActivityTemplate.returnFirstRowCellValue_texttype("description")).toContain("Test_desc_1", "Description is not matching")
    expect(await adminMasterFilesActivityTemplate.returnFirstRowCellValue_texttype("displayPriority")).toContain("4", "Priority is not matching")

    //Delete the added Activity Type and verify its deleted successfully
    await adminMasterFilesActivityTemplate.clickOnDeleteIcon()
    await expect(adminMasterFilesActivityType.firstRow).not.toBeVisible()
});

//TC_06 Validate that user is able to perform quick search for each column on activity template page
test('Activity Type_Quick Search for each column', async({page}, testInfo) => {
    const loginPage = new LoginPage(page);
    const pageNav = new PageNavigation(page);
    const adminMasterFilesActivityType = new Admin_MasterFiles_ActivityType(page);
    const adminMasterFilesActivityTemplate = new Admin_MasterFiles_ActivityTemplate(page);
    await loginPage.navigateTo(envConfig.baseURL)
    await loginPage.login(envConfig.userName, envConfig.password)
    await pageNav.navigateToAdmin()
    await pageNav.navigateToAdminMasterFiles()
    await pageNav.navigateToActivityType()
    await adminMasterFilesActivityType.clickOnAddNewRecord()
    await expect(adminMasterFilesActivityType.title_AddRecord).toBeVisible()

    //Fill the form details
    var activity_ID = "TestAct_ID_"+Math.floor(Math.random() * 1000)
    await adminMasterFilesActivityType.fillActivityTypeFormDetails("ExpectPay", activity_ID, "Test_desc_2", "5", "Test_note2")
    await adminMasterFilesActivityType.clickOnSubmitActivityTypeForm()

    //Zoom out the page
    await page.evaluate(() => {
        document.body.style.zoom = '50%'; // Set the zoom level to 50%
    });

    //Validate Quick search for each column
    expect(await adminMasterFilesActivityTemplate.validateSearchFunctionalityTextvalue("activityID", activity_ID)).toBe(true)
    expect(await adminMasterFilesActivityTemplate.validateSearchFunctionalityTextvalue("description", "Test_desc_2")).toBe(true)
    expect(await adminMasterFilesActivityTemplate.validateSearchFunctionalityTextvalue("displayPriority", "5")).toBe(true)
    expect(await adminMasterFilesActivityTemplate.validateSearchFunctionalityTextvalue("decodedProcedureNote", "Test_note2")).toBe(true)
    expect(await adminMasterFilesActivityTemplate.validateSelectFunctionalityCheckbox("systemActivity", "false")).toBe(true)
    expect(await adminMasterFilesActivityTemplate.validateSelectFunctionalityCheckbox("excludeFromDashboard", "true")).toBe(true)
    expect(await adminMasterFilesActivityTemplate.validateSelectFunctionalityCheckbox("excludeFromCRM", "true")).toBe(true)
    expect(await adminMasterFilesActivityTemplate.validateSelectFunctionalityCheckbox("active", "true")).toBe(true)

    //Delete the added Activity Type and verify its deleted successfully
    await adminMasterFilesActivityType.searchActivityType(activity_ID)
    await adminMasterFilesActivityTemplate.clickOnDeleteIcon()
    await expect(adminMasterFilesActivityType.firstRow).not.toBeVisible()
})

//TC_07 Validate that user should not be able to delete any System Actvity type 
test('Activity Type_User should not be able to Delete System Activity Type', async({page}, testInfo) => {
    const loginPage = new LoginPage(page);
    const pageNav = new PageNavigation(page);
    const adminMasterFilesActivityType = new Admin_MasterFiles_ActivityType(page);
    await loginPage.navigateTo(envConfig.baseURL)
    await loginPage.login(envConfig.userName, envConfig.password)
    await pageNav.navigateToAdmin()
    await pageNav.navigateToAdminMasterFiles()
    await pageNav.navigateToActivityType()
    var pageTitle = await adminMasterFilesActivityType.returnPageName()

    //To Validate page name
    expect(await adminMasterFilesActivityType.returnPageName()).toContain("Activity Types")
    await expect(adminMasterFilesActivityType.firstRow).toBeVisible()

    //Search for System Activity Type and try to delete
    await adminMasterFilesActivityType.searchActivityType("ExpectPay")
    expect(await adminMasterFilesActivityType.returnIsdeleteBtnDisabled()).toBe(false)
});

//TC_08 Validate that page controls are working as expected
test('Activity Type_Validate Page Controls', async({page}, testInfo) => {
    const loginPage = new LoginPage(page);
    const pageNav = new PageNavigation(page);
    const adminMasterFilesActivityType = new Admin_MasterFiles_ActivityType(page);
    const adminMasterFilesActivityTemplate = new Admin_MasterFiles_ActivityTemplate(page);
    await loginPage.navigateTo(envConfig.baseURL)
    await loginPage.login(envConfig.userName, envConfig.password)
    await pageNav.navigateToAdmin()
    await pageNav.navigateToAdminMasterFiles()
    await pageNav.navigateToActivityType()
    var pageTitle = await adminMasterFilesActivityType.returnPageName()

    //To Validate page name
    expect(await adminMasterFilesActivityType.returnPageName()).toContain("Activity Types")
    await expect(adminMasterFilesActivityType.firstRow).toBeVisible()

    //Zoom out the page
    await page.evaluate(() => {
        document.body.style.zoom = '50%'; // Set the zoom level to 50%
    });
    
    //Validate that Page Controls are working as expected
    expect(await adminMasterFilesActivityType.validateRecordsPerPage()).toBe(true, "Records are not getting displayed properly")
    expect(await adminMasterFilesActivityType.validatePageNavigation()).toBe(true, "PageNavigation is not working as expected")

});

//TC_09 Validate that newly created Activity type is getting displayed in activity dropdown in while creating new activity/communication
test('Activity Type_Newly created Activity type should be displayed in Activity dropdown', async({page}, testInfo) => {
    const loginPage = new LoginPage(page);
    const pageNav = new PageNavigation(page);
    const adminMasterFilesActivityType = new Admin_MasterFiles_ActivityType(page);
    const adminMasterFilesActivityTemplate = new Admin_MasterFiles_ActivityTemplate(page);
    const activityWindow = new ActivityCommunicateWindow(page)
    const accountOverview = new AccountOverview(page);
    const allaccounts = new AllAccounts(page);
    await loginPage.navigateTo(envConfig.baseURL)
    await loginPage.login(envConfig.userName, envConfig.password)
    await pageNav.navigateToAdmin()
    await pageNav.navigateToAdminMasterFiles()
    await pageNav.navigateToActivityType()
    await adminMasterFilesActivityType.clickOnAddNewRecord()
    await expect(adminMasterFilesActivityType.title_AddRecord).toBeVisible()

    //Fill the form details
    var activity_ID = "TestAct_ID_"+Math.floor(Math.random() * 1000)
    await adminMasterFilesActivityType.fillActivityTypeFormDetails("ExpectPay", activity_ID, "Test_desc_1", "4", "Test_note1")
    await adminMasterFilesActivityType.clickOnSubmitActivityTypeForm()
    await adminMasterFilesActivityType.searchActivityType(activity_ID)

    //Navigate to Account Overview page and validate that newly created Activity type is getting displayed in Activity dropdown
    await pageNav.navigateToAccounts()
    await pageNav.navigateToAllAccounts()
    await allaccounts.searchAndClick(dataSet.CustomerName)
    await allaccounts.clickonAccountDetailsOption()

    await accountOverview.clickonNewActivity()
    var new_activity = await accountOverview.returnNewActivity()
    console.log("New Activity is: " + new_activity)
    expect(new_activity, 'New Activity did not open').toContain("New Activity for " + dataSet.CustomerName);

    expect(await accountOverview.validateActivityType(activity_ID)).toContain(activity_ID, "Newly created Activity type is not getting displayed in Activity dropdown")
    
    //Navigate back to Activity Type page and delete the newly created Activity Type
    await pageNav.navigateToAdmin()
    await pageNav.navigateToAdminMasterFiles()
    await pageNav.navigateToActivityType()
    await expect(adminMasterFilesActivityType.firstRow).toBeVisible()
    
    await adminMasterFilesActivityType.searchActivityType(activity_ID)
    //Delete the added Activity Type and verify its deleted successfully
    await adminMasterFilesActivityTemplate.clickOnDeleteIcon()
    await expect(adminMasterFilesActivityType.firstRow).not.toBeVisible()
});
