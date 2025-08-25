const {test, expect} = require('@playwright/test');
const {Admin_MasterFiles_ActivityTemplate} = require('../PageObjects/Admin_MasterFiles_ActivityTemplate')
const {PageNavigation} = require('../PageObjects/PageNavigation')
const {LoginPage} = require('../PageObjects/LoginPage');
const dataSet = JSON.parse(JSON.stringify(require("../utils/TestData.json")))  
const log = require('console'); 
const config = require('../config.js');
const exp = require('constants');
require('dotenv').config();
const env = process.env.ENVIRONMENT;
const envConfig = config[env];

//TC_01 Test for user navigation to Admin_MasterFiles_ActivityTemplate   
test('@pageloadtests Activity Template_Navigate to Admin_MasterFiles_ActivityTemplate', async({page}) => {
    const loginPage = new LoginPage(page)
    const pageNav = new PageNavigation(page)
    const adminMasterFilesActivityTemplate = new Admin_MasterFiles_ActivityTemplate(page)
    await loginPage.navigateTo(envConfig.baseURL)
    await loginPage.login(envConfig.userName, envConfig.password)
    await pageNav.navigateToAdmin()
    await pageNav.navigateToAdminMasterFiles()
    await pageNav.navigateToActivityTemplate()
    
    //To Validate page name
    expect(await adminMasterFilesActivityTemplate.returnPageName()).toContain("Activity Template")
    await expect(adminMasterFilesActivityTemplate.firstRow).toBeVisible()
})

//TC_02 Test for user adding new record in Activity Template and Validate those details  
test('Activity Template_Add New Record and Validate details', async({page}, testInfo) => {
    const loginPage = new LoginPage(page)
    const pageNav = new PageNavigation(page)
    const adminMasterFilesActivityTemplate = new Admin_MasterFiles_ActivityTemplate(page)
    await loginPage.navigateTo(envConfig.baseURL);
    await loginPage.login(envConfig.userName, envConfig.password);
    await pageNav.navigateToAdmin()
    await pageNav.navigateToAdminMasterFiles()
    await pageNav.navigateToActivityTemplate()
    await adminMasterFilesActivityTemplate.clickOnAddNewRecord()
    await expect(adminMasterFilesActivityTemplate.templatetitle_AddRecord).toBeVisible()
    
    //Fill the Activity Template details and submit
    var activitytemp_name= dataSet.Activity_Temp+"_"+Math.floor(Math.random() * 1000)
    await adminMasterFilesActivityTemplate.fillActivityTemplateDetails(activitytemp_name, "Test Issue Description", "1", "Test Communication Notes", "Collections Letter - EN", "First Reminder", "Missing PO", "2", "PDF")
    await adminMasterFilesActivityTemplate.clickOnSubmitActivityTemplate()
    await adminMasterFilesActivityTemplate.searchActivityTemplate(activitytemp_name)

    // Zoom out the page
    await page.evaluate(() => {
        document.body.style.zoom = '50%'; // Set the zoom level to 50%
    });
    
    // Take a screenshot before validation
    const newActivitytemp_ScreenshotPath = `screenshots/Added_NewActivityTemplate_${Date.now()}.png`;
    await page.screenshot({ path: newActivitytemp_ScreenshotPath });
    await testInfo.attach('Screenshot After Creating Activity templated successfully', { path: newActivitytemp_ScreenshotPath, contentType: 'image/png' });

    //Validate the details of the added Activity Template
    expect(await adminMasterFilesActivityTemplate.returnFirstRowCellValue_texttype("ruleViolationID")).toContain(activitytemp_name, "Template Name is not matching")
    expect(await adminMasterFilesActivityTemplate.returnFirstRowCellValue_texttype("priority")).toContain("1", "Priority is not matching")
    expect(await adminMasterFilesActivityTemplate.returnFirstRowCellValue_texttype("description")).toContain("Test Issue Description", "Description is not matching")
    expect(await adminMasterFilesActivityTemplate.returnFirstRowCellValue_texttype("longDescription")).toContain("Test Communication Notes", "Communication Notes is not matching")
    expect(await adminMasterFilesActivityTemplate.returnFirstRowCellValue_texttype("reportName")).toContain("Collections Letter - EN", "Report Name is not matching")
    expect(await adminMasterFilesActivityTemplate.returnFirstRowCellValue_texttype("emailTemplateID")).toContain("First Reminder", "Email Template is not matching")
    expect(await adminMasterFilesActivityTemplate.returnFirstRowCellValue_texttype("disputeCode")).toContain("Missing PO", "Dispute Code is not matching")
    expect(await adminMasterFilesActivityTemplate.returnFirstRowCellValue_texttype("limitOfAttachments")).toContain("2", "Limit of Attachments is not matching")
    expect(await adminMasterFilesActivityTemplate.returnFirstRowCellValue_texttype("reportDefaultOutputText")).toContain("PDF", "Report Default Output is not matching")
    expect(await adminMasterFilesActivityTemplate.returnFirstRowCellValue_checkboxtype("attachInvoices")).toBe(true)
    expect(await adminMasterFilesActivityTemplate.returnFirstRowCellValue_checkboxtype("attachInvoiceExternal")).toBe(true)
    expect(await adminMasterFilesActivityTemplate.returnFirstRowCellValue_checkboxtype("isCustContact")).toBe(true)
    expect(await adminMasterFilesActivityTemplate.returnFirstRowCellValue_checkboxtype("invoiceContactTagging")).toBe(true)
    expect(await adminMasterFilesActivityTemplate.returnFirstRowCellValue_checkboxtype("invoiceContact2Tagging")).toBe(true)

    //Delete the added Activity Template and verify its deleted successfully
    await adminMasterFilesActivityTemplate.clickOnDeleteIcon()
    await expect(adminMasterFilesActivityTemplate.firstRow).not.toBeVisible()
})

//TC_03 Test for user editing the details of Activity Template
test('Activity Template_Edit details', async({page}, testInfo) => {
    const loginPage = new LoginPage(page)
    const pageNav = new PageNavigation(page)
    const adminMasterFilesActivityTemplate = new Admin_MasterFiles_ActivityTemplate(page)
    await loginPage.navigateTo(envConfig.baseURL);
    await loginPage.login(envConfig.userName, envConfig.password)
    await pageNav.navigateToAdmin()
    await pageNav.navigateToAdminMasterFiles()
    await pageNav.navigateToActivityTemplate()
    await adminMasterFilesActivityTemplate.clickOnAddNewRecord()
    await expect(adminMasterFilesActivityTemplate.templatetitle_AddRecord).toBeVisible()

    //Fill the Activity Template details and submit
    var activitytemp_name1= dataSet.Activity_Temp+"_"+Math.floor(Math.random() * 1000)
    await adminMasterFilesActivityTemplate.fillActivityTemplateDetails(activitytemp_name1, "Test Issue Description", "1", "Test Communication Notes", "Collections Letter - EN", "First Reminder", "Missing PO", "2", "PDF")
    await adminMasterFilesActivityTemplate.clickOnSubmitActivityTemplate()
    await adminMasterFilesActivityTemplate.searchActivityTemplate(activitytemp_name1)

    //Edit the Activity Template details and submit
    await adminMasterFilesActivityTemplate.clickOnEditIcon()
    await expect(adminMasterFilesActivityTemplate.templatetitle_EditRecord).toBeVisible()
    await adminMasterFilesActivityTemplate.editFields("Updated Test Issue Description")
    await adminMasterFilesActivityTemplate.clickOnSubmitActivityTemplate()
    await adminMasterFilesActivityTemplate.searchActivityTemplate(activitytemp_name1)

    // Zoom out the page
    await page.evaluate(() => {
        document.body.style.zoom = '50%'; // Set the zoom level to 50%
    });

    //Validate the details of the edited Activity Template
    expect(await adminMasterFilesActivityTemplate.returnFirstRowCellValue_texttype("description")).toContain("Updated Test Issue Description", "Description is not matching")
    expect(await adminMasterFilesActivityTemplate.returnFirstRowCellValue_checkboxtype("attachInvoiceExternal")).toBe(false)

     // Take a screenshot after editing details
     const editedSuccessfully_ScreenshotPath = `screenshots/Edited_Successfully${Date.now()}.png`;
     await page.screenshot({ path: editedSuccessfully_ScreenshotPath });
     await testInfo.attach('Screenshot after Editing details successfully', { path: editedSuccessfully_ScreenshotPath, contentType: 'image/png' });

    //Delete the added Activity Template and verify its deleted successfully
    await adminMasterFilesActivityTemplate.clickOnDeleteIcon()
    await expect(adminMasterFilesActivityTemplate.firstRow).not.toBeVisible()
  
})

//TC_04 Validate that user is not able to create Activity template without Mandatory fields
test('Activity Template_Validate Mandatory fields', async({page}) => {
    const loginPage = new LoginPage(page)
    const pageNav = new PageNavigation(page)
    const adminMasterFilesActivityTemplate = new Admin_MasterFiles_ActivityTemplate(page)
    await loginPage.navigateTo(envConfig.baseURL);
    await loginPage.login(envConfig.userName, envConfig.password);
    await pageNav.navigateToAdmin()
    await pageNav.navigateToAdminMasterFiles()
    await pageNav.navigateToActivityTemplate()
    
    //Click on Add New Record and click on submit without adding values in Mandatory fields
    await adminMasterFilesActivityTemplate.clickOnAddNewRecord()
    await expect(adminMasterFilesActivityTemplate.templatetitle_AddRecord).toBeVisible()
    await adminMasterFilesActivityTemplate.clickOnSubmitActivityTemplate()

    //Validate that error is getting displayed for Mandatory fields
    expect(await adminMasterFilesActivityTemplate.returnIsActivityTemp_MandatoryField()).toBe(true)
    expect(await adminMasterFilesActivityTemplate.returnIsPriority_MandatoryField()).toBe(true)
    expect(await adminMasterFilesActivityTemplate.returnIsDescription_MandatoryField()).toBe(true)
   
})

//TC_05 Validate that user is able to create Activity template with only Mandatory fields also
test('Activity Template_Create Activity template with Only Mandatory fields', async({page}, testInfo) => {
    const loginPage = new LoginPage(page)
    const pageNav = new PageNavigation(page)
    const adminMasterFilesActivityTemplate = new Admin_MasterFiles_ActivityTemplate(page)
    await loginPage.navigateTo(envConfig.baseURL);
    await loginPage.login(envConfig.userName, envConfig.password);
    await pageNav.navigateToAdmin()
    await pageNav.navigateToAdminMasterFiles()
    await pageNav.navigateToActivityTemplate()
    await adminMasterFilesActivityTemplate.clickOnAddNewRecord()
    await expect(adminMasterFilesActivityTemplate.templatetitle_AddRecord).toBeVisible()
    var activitytemp_name2= dataSet.Activity_Temp+"_"+Math.floor(Math.random() * 1000)

    //Fill only Mandatory fields and submit
    await adminMasterFilesActivityTemplate.fillOnlyMandatoryFields(activitytemp_name2, "1", "Test Issue Description")
    await adminMasterFilesActivityTemplate.clickOnSubmitActivityTemplate()
    await adminMasterFilesActivityTemplate.searchActivityTemplate(activitytemp_name2)
    
    //Validate the details of the added Activity Template
    expect(await adminMasterFilesActivityTemplate.returnFirstRowCellValue_texttype("ruleViolationID")).toContain(activitytemp_name2, "Template Name is not matching")
    expect(await adminMasterFilesActivityTemplate.returnFirstRowCellValue_texttype("priority")).toContain("1", "Priority is not matching")
    expect(await adminMasterFilesActivityTemplate.returnFirstRowCellValue_texttype("description")).toContain("Test Issue Description", "Description is not matching")
    
    //Delete the added Activity Template and verify its deleted successfully
    await adminMasterFilesActivityTemplate.clickOnDeleteIcon()
    await expect(adminMasterFilesActivityTemplate.firstRow).not.toBeVisible()
})

//TC_06 Validate that Maintain Reports Field is working as expected
test('Activity Template_Validate Maintain Reports Field', async({page}) => {
    const loginPage = new LoginPage(page)
    const pageNav = new PageNavigation(page)
    const adminMasterFilesActivityTemplate = new Admin_MasterFiles_ActivityTemplate(page)
    await loginPage.navigateTo(envConfig.baseURL);
    await loginPage.login(envConfig.userName, envConfig.password);
    await pageNav.navigateToAdmin()
    await pageNav.navigateToAdminMasterFiles()
    await pageNav.navigateToActivityTemplate()
    await expect(adminMasterFilesActivityTemplate.firstRow).toBeVisible()
    await adminMasterFilesActivityTemplate.clickOnAddNewRecord()
    await expect(adminMasterFilesActivityTemplate.templatetitle_AddRecord).toBeVisible()
    
    var report_name= "test-report_"+Math.floor(Math.random() * 1000)
    var report_desc= "report-desc_"+Math.floor(Math.random() * 1000)

    
    //check Maintain Reports Field
    await adminMasterFilesActivityTemplate.clickOnMaintainReports()
    await expect(adminMasterFilesActivityTemplate.reportpage).toBeVisible()

    await adminMasterFilesActivityTemplate.clickOnAddNewReport()
    await expect(adminMasterFilesActivityTemplate.reportform).toBeVisible()
    await adminMasterFilesActivityTemplate.fillReportDetails("Tagged Invoices - EN", report_name, report_desc)
    await adminMasterFilesActivityTemplate.clickOnSubmitReport()
    await adminMasterFilesActivityTemplate.searchReport_Reports(report_name)
    expect(await adminMasterFilesActivityTemplate.returnReportName_Reports()).toContain(report_name, "Report is not matching")
    await adminMasterFilesActivityTemplate.closeMaintainReportspopup()
    await adminMasterFilesActivityTemplate.clickOnMaintainReportSyncbtn()
    expect(await adminMasterFilesActivityTemplate.validateNewlyAddedReport(report_name)).toBe(true)

    //delete the added report
    await adminMasterFilesActivityTemplate.clickOnMaintainReports()
    await expect(adminMasterFilesActivityTemplate.reportpage).toBeVisible()
    await adminMasterFilesActivityTemplate.searchReport_Reports(report_name)
    await adminMasterFilesActivityTemplate.clickOnDeleteIconReports()
    await adminMasterFilesActivityTemplate.closeMaintainReportspopup()
    await adminMasterFilesActivityTemplate.clickOnMaintainReportSyncbtn()
    expect(await adminMasterFilesActivityTemplate.validateNewlyAddedReport(report_name)).toBe(false)
})

//TC_07 Validate that Maintain Communication Template Field is working as expected
test('Activity Template_Validate Maintain Communication Template Field', async({page}) => {
    const loginPage = new LoginPage(page)
    const pageNav = new PageNavigation(page)
    const adminMasterFilesActivityTemplate = new Admin_MasterFiles_ActivityTemplate(page)
    await loginPage.navigateTo(envConfig.baseURL);
    await loginPage.login(envConfig.userName, envConfig.password);
    await pageNav.navigateToAdmin()
    await pageNav.navigateToAdminMasterFiles()
    await pageNav.navigateToActivityTemplate()
    await expect(adminMasterFilesActivityTemplate.firstRow).toBeVisible()
    await adminMasterFilesActivityTemplate.clickOnAddNewRecord()
    await expect(adminMasterFilesActivityTemplate.templatetitle_AddRecord).toBeVisible()

    adminMasterFilesActivityTemplate.clickOnMaintainCommunicationTemplates()
    await expect(adminMasterFilesActivityTemplate.templatepage).toBeVisible()// futher code to be added- as of now react changes are not available for this page
})

//TC_08 Validate that user is able to perform quick search for each column on activity template page
test('Activity Template_Quick Search for each column', async({page}) => {
    const loginPage = new LoginPage(page)
    const pageNav = new PageNavigation(page)
    const adminMasterFilesActivityTemplate = new Admin_MasterFiles_ActivityTemplate(page)
    await loginPage.navigateTo(envConfig.baseURL);
    await loginPage.login(envConfig.userName, envConfig.password);
    await pageNav.navigateToAdmin()
    await pageNav.navigateToAdminMasterFiles()
    await pageNav.navigateToActivityTemplate()
    await expect(adminMasterFilesActivityTemplate.firstRow).toBeVisible()
    await adminMasterFilesActivityTemplate.clickOnAddNewRecord()
    await expect(adminMasterFilesActivityTemplate.templatetitle_AddRecord).toBeVisible()
    var activitytemp_name2= dataSet.Activity_Temp+"_"+Math.floor(Math.random() * 1000)

    //Fill Activity template details and submit
    await adminMasterFilesActivityTemplate.fillActivityTemplateDetails(activitytemp_name2, "issue-desc-1", "41", "notes-41", "Collections Letter - EN", "First Reminder", "Missing PO", "4", "Text")
    await adminMasterFilesActivityTemplate.clickOnSubmitActivityTemplate()

    //Zoom out the page
    await page.evaluate(() => {
        document.body.style.zoom = '50%'; // Set the zoom level to 50%
    });

    //Validate Quick search for each column
    expect(await adminMasterFilesActivityTemplate.validateSearchFunctionalityTextvalue("ruleViolationID", activitytemp_name2)).toBe(true)
    expect(await adminMasterFilesActivityTemplate.validateSearchFunctionalityTextvalue("priority", "41")).toBe(true)
    expect(await adminMasterFilesActivityTemplate.validateSearchFunctionalityTextvalue("description", "issue-desc-1")).toBe(true)
    expect(await adminMasterFilesActivityTemplate.validateSearchFunctionalityTextvalue("longDescription", "notes-41")).toBe(true)
    expect(await adminMasterFilesActivityTemplate.validateSearchFunctionalityTextvalue("reportName", "Collections Letter - EN")).toBe(true)
    expect(await adminMasterFilesActivityTemplate.validateSearchFunctionalityTextvalue("emailTemplateID", "First Reminder")).toBe(true)
    expect(await adminMasterFilesActivityTemplate.validateSearchFunctionalityTextvalue("disputeCode", "Missing PO")).toBe(true)
    expect(await adminMasterFilesActivityTemplate.validateSelectFunctionalityCheckbox("attachInvoices", "true")).toBe(true)
    expect(await adminMasterFilesActivityTemplate.validateSelectFunctionalityCheckbox("attachInvoiceExternal", "true")).toBe(true)
    expect(await adminMasterFilesActivityTemplate.validateSearchFunctionalityTextvalue("limitOfAttachments", "4")).toBe(true)
    expect(await adminMasterFilesActivityTemplate.validateSelectFunctionalityCheckbox("isCustContact", "true")).toBe(true)
    expect(await adminMasterFilesActivityTemplate.validateSelectFunctionalityCheckbox("invoiceContactTagging", "true")).toBe(true)
    expect(await adminMasterFilesActivityTemplate.validateSelectFunctionalityCheckbox("invoiceContact2Tagging", "true")).toBe(true)
    expect(await adminMasterFilesActivityTemplate.validateSearchFunctionalityTextvalue("reportDefaultOutputText", "TEXT")).toBe(true) 

   //Delete the added Activity Template
    await adminMasterFilesActivityTemplate.searchActivityTemplate(activitytemp_name2)
    await adminMasterFilesActivityTemplate.clickOnDeleteIcon()      
})

//TC_09 Validate that user should not be able to delete Actvity template if it is being used somewhere in the application
test('Activity Template_Validate Delete Activty template', async({page}) => {
    const loginPage = new LoginPage(page)
    const pageNav = new PageNavigation(page)
    const adminMasterFilesActivityTemplate = new Admin_MasterFiles_ActivityTemplate(page)
    await loginPage.navigateTo(envConfig.baseURL);
    await loginPage.login(envConfig.userName, envConfig.password);
    await pageNav.navigateToAdmin()
    await pageNav.navigateToAdminMasterFiles()
    await pageNav.navigateToActivityTemplate()
    //Search for the Activity Template which is being used in the application and Delete it
    await adminMasterFilesActivityTemplate.searchActivityTemplate("Statement Email")
    await adminMasterFilesActivityTemplate.clickOnDeleteIcon()
    //Validate that error is getting displayed
    expect(await adminMasterFilesActivityTemplate.returnDeleteErrorValidation()).toContain("Error", "No error message displayed")
    
})

//TC_10 Validate that page controls are working as expected
test('Activity Template_Validate Page Controls', async({page}) => {
    const loginPage = new LoginPage(page)
    const pageNav = new PageNavigation(page)
    const adminMasterFilesActivityTemplate = new Admin_MasterFiles_ActivityTemplate(page)
    await loginPage.navigateTo(envConfig.baseURL);
    await loginPage.login(envConfig.userName, envConfig.password);
    await pageNav.navigateToAdmin()
    await pageNav.navigateToAdminMasterFiles()
    await pageNav.navigateToActivityTemplate()
    await expect(adminMasterFilesActivityTemplate.firstRow).toBeVisible()
    //Zoom out the page
    await page.evaluate(() => {
        document.body.style.zoom = '50%'; // Set the zoom level to 50%
    });
    
    //Validate that Page Controls are working as expected
    expect(await adminMasterFilesActivityTemplate.validateRecordsPerPage()).toBe(true, "Records are not getting displayed properly")
    expect(await adminMasterFilesActivityTemplate.validatePageNavigation()).toBe(true, "PageNavigation is not working as expected")

})




