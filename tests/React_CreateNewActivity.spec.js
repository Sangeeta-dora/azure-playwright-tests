const { test, expect } = require('@playwright/test');
const { PageNavigation } = require('../PageObjects/PageNavigation');
const { LoginPage } = require('../PageObjects/LoginPage');
const { AccountOverview } = require('../PageObjects/AccountOverview');
const { AllAccounts } = require('../PageObjects/AllAccounts');
const {ActivityCommunicateWindow} = require('../PageObjects/ActivityCommunicateWindow')
const { Messages_DraftActivities } = require('../PageObjects/Messages_DraftActivities')
const {ScreenshotManager} = require('../utils/screenshotManager');
const { selectViewSettingsOption } = require('../utils/methodHelper');
const dataSet = JSON.parse(JSON.stringify(require("../utils/TestData.json")))
const log = require('console');
const config = require('../config.js');
const exp = require('constants');
const { create } = require('domain');
const { act } = require('react');
require('dotenv').config();
const env = process.env.ENVIRONMENT;
const envConfig = config[env];

test.beforeEach(async ({ page }) => {
  
    // Create instances of page objects
    const pageNav = new PageNavigation(page)
    const loginPage = new LoginPage(page)
    const allaccounts = new AllAccounts(page)
    //const activityWindow = new ActivityCommunicateWindow(page)

    //Login to application
    await loginPage.navigateTo(envConfig.baseURL)
    await loginPage.login(envConfig.userName, envConfig.password)

    //Navigate to Accounts and open Account details
    await pageNav.navigateToAccounts()
    await pageNav.navigateToAllAccounts()
    await expect(allaccounts.firstdatarow).toBeVisible()
    //await allaccounts.selectViewSettingsOption("~Standard Late")
    await selectViewSettingsOption(page, "~Standard Late");
    await allaccounts.searchAndClick(dataSet.CustomerName)
    await allaccounts.clickonAccountDetailsOption()

})

//TC_01: Create new activity with followup only
test('Create New Activity_With followup only', async ({ page }, testInfo) => {
    const accountOverview = new AccountOverview(page)
    const activityWindow = new ActivityCommunicateWindow(page)
    const screenshotManager = new ScreenshotManager();

    await screenshotManager.takeScreenshot(page, testInfo.title, "New Activity-with followup");

    var issueName = dataSet.Followup_IssueName + Date().toLocaleString()

    //Click on New Activity
    await accountOverview.clickonNewActivity()
    await activityWindow.waitForActivtyToLoad()

    //Enter Issue name
    await activityWindow.enterIssueName(issueName)
    
    //Add Followup details
    await activityWindow.checkScheduleFollowupcheckbox()
    await activityWindow.selectFollowupAssignUser(dataSet, dataSet.Followup_AssignUser)
    await activityWindow.selectFollowupDate(dataSet)
    await activityWindow.fillvaluesinResponsedays(dataSet, dataSet.Followup_ResponseDays)
    await activityWindow.enterDescription(dataSet, dataSet.Followup_desc)

    await screenshotManager.takeScreenshot(page, testInfo.title, "Followup details before saving")

    //save
    await activityWindow.clikonSave()
    
    //validate Account Overview > Activity table with Issue name and Followup flag
    expect(await activityWindow.validateIssueName(issueName)).toContain(issueName, "Issue not created")
    expect(await activityWindow.validateFollowupflag(issueName)).toBe(true, "Followup is not set")

    //Refresh the page and Open Created Issue
    await activityWindow.clickOnRefreshbtn_statementtable()
    await activityWindow.OpenActivity(issueName)
    await activityWindow.waitForActivtyToLoad()
    await expect(await activityWindow.issuetxtarea).toHaveValue(/.+/)
    
    //-----------Validate Followup details---------------

    //validate followup checkbox
    await screenshotManager.takeScreenshot(page, testInfo.title, "Followup details after creating activity");
    let chekbox = await activityWindow.schfollowupchkbox.isChecked()
    console.log("Followup checkbox status: ", chekbox)
    expect(await activityWindow.schfollowupchkbox.isChecked()).toBe(true, "Followup checkbox is not checked")
    //validate assigned user
    console.log("Assigned User from dataset: ", dataSet.assignedUser)
    expect(await activityWindow.returnAssignedUser()).toContain(dataSet.assignedUser, "Assigned user is not matching")
    //validate followup date
    console.log("Followup date from dataset: ", dataSet.followupDate)
    expect(await activityWindow.returnFollowupDate()).toContain(dataSet.followupDate, "Followup date is not matching")
    //validate response days
    console.log("Response days from dataset: ", dataSet.responseDays)
    expect(await activityWindow.returnResponseDays()).toContain(dataSet.responseDays, "Response days is not matching")
    //validate description
    console.log("Description from dataset: ", dataSet.description)
    expect(await activityWindow.returnDescription()).toContain(dataSet.description, "Description is not matching")
    
})

//TC_02: Create new activity with email only (without template)
test('Create New Activity_With email only (without template)', async ({ page }, testInfo) => {
    const accountOverview = new AccountOverview(page)
    const allaccounts = new AllAccounts(page)
    const activityWindow = new ActivityCommunicateWindow(page)
    const screenshotManager = new ScreenshotManager();

    var issueName = dataSet.Email_IssueName1 + Date().toLocaleString()
    var emailSubject = dataSet.Email_Subject + Date().toLocaleString()
    var emailbodytext = dataSet.Email_textbody + Date().toLocaleString()

    //Click on New Activity
    await accountOverview.clickonNewActivity()
    await activityWindow.waitForActivtyToLoad()

    //Zoom out the page
    await page.evaluate(() => {
        document.body.style.zoom = '50%'; // Set the zoom level to 50%
    });

    //Enter Issue name
    await activityWindow.enterIssueName(issueName)

    //Navigate to Email tab and Add Email details
    await activityWindow.navigatetoemailTab()
    //Contact selection
    await activityWindow.clickOnEmailContactbtn_Type("To")
    await expect(activityWindow.contactTbl_firstrow).toBeVisible()
    await activityWindow.selectContactFromToList_Or_CcList(dataSet, "To")
    await activityWindow.clickOnEmailContactbtn_Type("Cc")
    await expect(activityWindow.contactTbl_firstrow).toBeVisible()
    await activityWindow.selectContactFromToList_Or_CcList(dataSet, "Cc")

    //Email Subject line
    await activityWindow.enterSubjectline(dataSet, emailSubject) 
    //Email Body
    await activityWindow.enterEmailBodytext(dataSet, emailbodytext)

    await screenshotManager.takeScreenshot(page, testInfo.title, "Email details before save and send");
    //save and send
    await activityWindow.clickSaveAndSend()
    
    //validate Account Overview > Activity table with Issue name and Email sent flag
    expect(await activityWindow.validateIssueName(issueName)).toContain(issueName, "Issue not created")
    expect(await activityWindow.validateEmailSent(issueName)).toBe(true, "Email is not sent")

    //Refresh the page and Open Created Issue 
    await activityWindow.clickOnRefreshbtn_statementtable()
    await activityWindow.OpenActivity(issueName)
    await activityWindow.waitForActivtyToLoad()
    await expect(await activityWindow.issuetxtarea).toHaveValue(/.+/)

    //-----------Validate Email details---------------
    //Navigate to Email tab and validate Email details
    await activityWindow.navigatetoemailTab()
    await screenshotManager.takeScreenshot(page, testInfo.title, "Email details after creating activity");
    //validate To and Cc contact email
    expect(await activityWindow.returnTocontactEmail()).toContain((dataSet.to_contact_mailid).trim(''), "To contact email is not matching")
    expect(await activityWindow.returnCccontactEmail()).toContain((dataSet.cc_contact_mailid).trim(''), "Cc contact email is not matching")
    //validate Email subject
    expect(await activityWindow.returnSubjectline()).toContain(dataSet.subjectline, "Email subject line is not matching")
    //validate Email body text
    expect(await activityWindow.returnEmailBodytext()).toContain(dataSet.emailbodytext, "Email body text is not matching")
  
})

//TC_03: Create new activity with email template
test('Create New Activity_With email template', async ({ page }, testInfo) => {
    const accountOverview = new AccountOverview(page)
    const allaccounts = new AllAccounts(page)
    const activityWindow = new ActivityCommunicateWindow(page)
    const screenshotManager = new ScreenshotManager();

    var issueName = dataSet.Email_IssueName2 + Date().toLocaleString()

    //Click on New Activity
    await accountOverview.clickonNewActivity()
    await activityWindow.waitForActivtyToLoad()

    //Zoom out the page
    await page.evaluate(() => {
        document.body.style.zoom = '50%'; // Set the zoom level to 50%
    });

    //Enter Issue name
    await activityWindow.enterIssueName(issueName)

     //Navigate to Email tab and Add Email details
    await activityWindow.navigatetoemailTab()

    //Validate that when user clicks on To and CC buttons it displaying customers contact list
    await activityWindow.clickOnEmailContactbtn_Type("To")
    await expect(activityWindow.contactTbl_firstrow).toBeVisible()
    await activityWindow.closePopupByClickingOutside()
    await activityWindow.clickOnEmailContactbtn_Type("Cc")
    await expect(activityWindow.contactTbl_firstrow).toBeVisible()
    await activityWindow.closePopupByClickingOutside()

    //Select Email Template
    await activityWindow.clickonTemplate()
    await activityWindow.selectemailTemplate(dataSet, dataSet.Email_Template)
    await expect(activityWindow.subjectlineselector).toBeVisible()
    await expect(activityWindow.emailbodytextselector).toBeVisible()

    //Enter emailid in 'To' contact field
    await activityWindow.enteraddressinTofield(dataSet, dataSet.To_Email_address)

    await screenshotManager.takeScreenshot(page, testInfo.title, "Email details before save and send");

    //save and send
    await activityWindow.clickSaveAndSend()
    
    //validate Account Overview > Activity table with Issue name and Email sent flag
    expect(await activityWindow.validateIssueName(issueName)).toContain(issueName, "Issue not created")
    expect(await activityWindow.validateEmailSent(issueName)).toBe(true, "Email is not sent")

    //Refresh the page and Open Created Issue 
    await activityWindow.clickOnRefreshbtn_statementtable()
    await activityWindow.OpenActivity(issueName)
    await activityWindow.waitForActivtyToLoad()
    await expect(await activityWindow.issuetxtarea).toHaveValue(/.+/)

    //-----------Validate Email details---------------
    //Navigate to Email tab and validate Email details
    await activityWindow.navigatetoemailTab()
    await screenshotManager.takeScreenshot(page, testInfo.title, "Email details after creating activity");
    //validate To contact email
    expect(await activityWindow.returnTocontactEmail()).toContain((dataSet.to_contact_id).trim(''), "To contact email is not matching")
    //validate Email subject
    expect(await activityWindow.returnSubjectline()).toContain(dataSet.CustomerName, "Email subject line is not matching")
    //validate Email body text
    expect(await activityWindow.returnEmailBodytext()).toContain(dataSet.CustomerName, "Email body text is not matching")
})

//TC_04: Forward Email
test('Create New Activity_forward email', async ({ page }, testInfo) => {
    const accountOverview = new AccountOverview(page)
    const allaccounts = new AllAccounts(page)
    const activityWindow = new ActivityCommunicateWindow(page)
    const screenshotManager = new ScreenshotManager();

    var issueName = dataSet.ForwardEmail_IssueName + Date().toLocaleString()
    var fwd_emailbodytext = dataSet.Fwd_Email_textbody + Date().toLocaleString()

    //Select an existing activity with email
    await activityWindow.select_N_OpenFirstEmailActivity()
    await activityWindow.waitForActivtyToLoad()

    //Zoom out the page
    await page.evaluate(() => {
        document.body.style.zoom = '50%'; // Set the zoom level to 50%
    });

    //Navigate to Email tab
    await activityWindow.navigatetoemailTab()

    //Click on Forward Email button
    await activityWindow.clickonforward()
    //Enter Issue name for forwarded email
    await activityWindow.enterIssueName(issueName)

    //Enter emailid in 'To' contact field
    await activityWindow.enteraddressinTofield(dataSet, dataSet.To_Email_address)

    //Enter text in Email body
    await activityWindow.enterEmailBodytext_Forward(dataSet, fwd_emailbodytext)
    
    //get subject line from email after clicking on forward button
    dataSet.fwd_subjectline = await activityWindow.returnSubjectline()
    console.log("Subject line for forwarded email: ", dataSet.fwd_subjectline)
    
    await screenshotManager.takeScreenshot(page, testInfo.title, "Forward Email details before save and send");

    //save and send
    await activityWindow.clickSaveAndSend()
    await allaccounts.waitforAccountDetailsToLoad()
    
    //validate Account Overview > Activity table with Issue name and Email sent flag
    expect(await activityWindow.validateIssueName(issueName)).toContain(issueName, "Issue not created")
    expect(await activityWindow.validateEmailSent(issueName)).toBe(true, "Forwarded Email is not sent")

    //Refresh the page and Open Created Issue
    await activityWindow.clickOnRefreshbtn_statementtable()
    await activityWindow.OpenActivity(issueName)
    await activityWindow.waitForActivtyToLoad()
    await expect(await activityWindow.issuetxtarea).toHaveValue(/.+/)

    //-----------Validate Email details---------------
    //Navigate to Email tab and validate Email details
    await activityWindow.navigatetoemailTab()
    await screenshotManager.takeScreenshot(page, testInfo.title, "Email details after successfully creating activity via Forward functionality");
    //validate To contact email
    expect(await activityWindow.returnTocontactEmail()).toContain((dataSet.to_contact_id).trim(''), "To contact email is not matching")
    //validate Email subject
    expect(await activityWindow.returnSubjectline()).toContain(dataSet.fwd_subjectline, "Email subject line is not matching")
    //validate Email body text
    expect(await activityWindow.returnEmailBodytext()).toContain(dataSet.fwd_emailbodytext, "Email body text is not matching")
})

//TC_05: Create new activity with attachments only
test('Create New Activity_With Attachments', async ({ page }, testInfo) => {
    const accountOverview = new AccountOverview(page)
    const allaccounts = new AllAccounts(page)
    const activityWindow = new ActivityCommunicateWindow(page)
    const screenshotManager = new ScreenshotManager();

    var issueName = dataSet.Attachment_IssueName + Date().toLocaleString()

    //Click on New Activity
    await accountOverview.clickonNewActivity()
    await activityWindow.waitForActivtyToLoad()
    //Enter Issue name
    await activityWindow.enterIssueName(issueName)

    //Zoom out the page
    await page.evaluate(() => {
        document.body.style.zoom = '50%'; // Set the zoom level to 50%
    });

    //Navigate to Attachments tab and Add Attachment (Report)
    await activityWindow.navigatetoAttachmentsTab()
    await activityWindow.clickonselectreportdrpdwn()
    await activityWindow.selectReport(dataSet, dataSet.Report_Name)
    await activityWindow.clickOnAttachReport()

    await screenshotManager.takeScreenshot(page, testInfo.title, "Attachment details before saving");
    //save
    await activityWindow.clikonSave()

    //validate Account Overview > Activity table with Issue name and Attachment flag
    expect(await activityWindow.validateIssueName(issueName)).toContain(issueName, "Issue not created")
    expect(await activityWindow.validateAttachment(issueName)).toBe(true, "Attachment is not sent")

    //Refresh the page and Open Created Issue
    await activityWindow.clickOnRefreshbtn_statementtable()
    await activityWindow.OpenActivity(issueName)
    await activityWindow.waitForActivtyToLoad()
    await expect(await activityWindow.issuetxtarea).toHaveValue(/.+/)

    //-----------Validate Attachment details---------------
    //Navigate to Attachments tab and validate Attachment details
    await activityWindow.navigatetoAttachmentsTab()
    await screenshotManager.takeScreenshot(page, testInfo.title, "Attachment details after creating activity");
    //validate Attached Report name
    expect(await activityWindow.returnAttachedReportName()).toContain(dataSet.attachedReportName, "Report name is not matching")
})

//TC_06: Create new activity with Expected Payments
test('Create New Activity_With Expected Payments', async ({ page }, testInfo) => {
    const accountOverview = new AccountOverview(page)
    const allaccounts = new AllAccounts(page)
    const activityWindow = new ActivityCommunicateWindow(page)
    const screenshotManager = new ScreenshotManager();

    var issueName = dataSet.ExpectedPayments_IssueName + Date().toLocaleString()

    //Click on New Activity
    await accountOverview.clickonNewActivity()
    await activityWindow.waitForActivtyToLoad()

    //Enter Issue name
    await activityWindow.enterIssueName(issueName)

    //Zoom out the page
    await page.evaluate(() => {
        document.body.style.zoom = '50%'; // Set the zoom level to 50%
    });

    //Navigate to Payments tab and enter Expected Payments details
    await activityWindow.navigatetoPaymentsTab()
    await activityWindow.enterpaymentamount(dataSet, dataSet.Expected_PaymentAmt)
    await activityWindow.enterpaybydate(dataSet)
    await activityWindow.clickonCustomerpromisedchkbox()

    await screenshotManager.takeScreenshot(page, testInfo.title, "Expected Payments details before saving");

    //save
    await activityWindow.clikonSave()
    
    //validate Account Overview > Activity table with Issue name and Payment flag
    expect(await activityWindow.validateIssueName(issueName)).toContain(issueName, "Issue not created")
    expect(await activityWindow.validatePaymentflag(issueName)).toBe(true, "Payment is not set")

    //Refresh the page and Open Created Issue
    await activityWindow.clickOnRefreshbtn_statementtable()
    await activityWindow.OpenActivity(issueName)
    await activityWindow.waitForActivtyToLoad()
    await expect(await activityWindow.issuetxtarea).toHaveValue(/.+/)

    //-----------Validate Expected Payments details---------------
    //Navigate to Payments tab and validate Expected Payments details
    await activityWindow.navigatetoPaymentsTab()
    await screenshotManager.takeScreenshot(page, testInfo.title, "Expected Payments details after creating activity");

    //validate Payment amount
    expect(await activityWindow.returnPaymentAmount()).toContain(dataSet.paymentAmount, "Payment amount is not matching")
    //validate Pay by date
    expect(await activityWindow.returnPayByDate()).toContain(dataSet.payByDate, "Pay by date is not matching")
    //validate Customer promised checkbox
    expect(await activityWindow.returnCustomerPromisedStatus()).toBe(true, "Customer promised checkbox is not checked")
})

//TC_07: Create new activity with only Notes
test('Create New Activity_With Notes', async ({ page }, testInfo) => {
    const accountOverview = new AccountOverview(page)
    const allaccounts = new AllAccounts(page)
    const activityWindow = new ActivityCommunicateWindow(page)
    const screenshotManager = new ScreenshotManager();
    
    var issueName = dataSet.Notes_IssueName + Date().toLocaleString()
    var notesText = dataSet.Test_Note + Date().toLocaleString()
    
    //Click on New Activity
    await accountOverview.clickonNewActivity()
    await activityWindow.waitForActivtyToLoad()

    //Enter Issue name
    await activityWindow.enterIssueName(issueName)

    //Zoom out the page
    await page.evaluate(() => {
        document.body.style.zoom = '50%'; // Set the zoom level to 50%
    });

    //Navigate to Notes tab and Add Notes
    await activityWindow.navigateToNotesTab()
    await activityWindow.addNotes(notesText)

    await screenshotManager.takeScreenshot(page, testInfo.title, "Notes details before saving");
    //save
    await activityWindow.clikonSave()
    
    //validate Account Overview > Activity table with Issue name and Notes 
    expect(await activityWindow.validateIssueName(issueName)).toContain(issueName, "Issue not created")
    expect(await activityWindow.validateNotescell(issueName)).toContain(notesText, "Note not created")

    //Refresh the page and Open Created Issue
    await activityWindow.clickOnRefreshbtn_statementtable()
    await activityWindow.OpenActivity(issueName)
    await activityWindow.waitForActivtyToLoad()
    await expect(await activityWindow.issuetxtarea).toHaveValue(/.+/)

    //-----------Validate Notes details---------------
    //Navigate to Notes tab and validate Notes details
    await activityWindow.navigateToNotesTab()
    await screenshotManager.takeScreenshot(page, testInfo.title, "Notes details after creating activity");
    //validate Notes text
    expect(await activityWindow.returnNotesText()).toContain(notesText, "Note text is not matching")
})

//TC_08: Create new activity with transactions tab -- Need to add more validation part once filter is implemented
test('Create New Activity_With Transactions', async ({ page }, testInfo) => {
    const accountOverview = new AccountOverview(page)
    const allaccounts = new AllAccounts(page)
    const activityWindow = new ActivityCommunicateWindow(page)
    const screenshotManager = new ScreenshotManager()

    var issueName = dataSet.Transaction_IssueName + Date().toLocaleString()

    //Click on New Activity
    await accountOverview.clickonNewActivity()
    await activityWindow.waitForActivtyToLoad()

    //Enter Issue name
    await activityWindow.enterIssueName(issueName)

    //Zoom out the page
    await page.evaluate(() => {
        document.body.style.zoom = '50%'; // Set the zoom level to 50%
    });

    //Navigate to Transactions tab and validate all the btns
    await activityWindow.clickonTransactions()
    //Select All radio btn 
    await activityWindow.clickonAll()
    await screenshotManager.takeScreenshot(page, testInfo.title, "Transactions tab with All filter");
    await expect(activityWindow.transactiontblselector).toBeVisible()

    //click on tag checkbox
    await activityWindow.clickonTagcheckbox()
    let docno1 = await activityWindow.returnTransactionID()
    console.log("Document Number before tagging: ", docno1)
    //Select Tagged to Issue radio btn
    await activityWindow.clicktaggedtoissue()
    await screenshotManager.takeScreenshot(page, testInfo.title, "Transactions tab after tagging to Issue filter");
    let docno2 = await activityWindow.returnTransactionID()
    console.log("Document Number after tagging to Issue: ", docno2)
    expect(docno1).toEqual(docno2)
    //Select tagged to Activity radio btn
    await activityWindow.clickontaggedactivity()
    await screenshotManager.takeScreenshot(page, testInfo.title, "Transactions tab after tagging to Activity filter");
    let docno3 = await activityWindow.returnTransactionID()
    console.log("Document Number after tagging to Activity: ", docno3)  
    expect(docno1).toEqual(docno3)

    //Select Open radio btn
    await activityWindow.clickonopen()
    await screenshotManager.takeScreenshot(page, testInfo.title, "Transactions tab with Open filter");
    await expect(activityWindow.transactiontblselector).toBeVisible()

    //Select past due radio btn
    await activityWindow.clickonpastdue()
    await screenshotManager.takeScreenshot(page, testInfo.title, "Transactions tab with Past Due filter");
    await expect(activityWindow.transactiontblselector).toBeVisible()

    //Again click on All radio btn
    await activityWindow.clickonAll()
    await screenshotManager.takeScreenshot(page, testInfo.title, "Transactions tab with All filter after selecting Past Due");
    await expect(activityWindow.transactiontblselector).toBeVisible()
    //select show all accounts checkbox
    await activityWindow.clickonshowall()
    await screenshotManager.takeScreenshot(page, testInfo.title, "Transactions tab with Show All Accounts checkbox selected");
    await expect(activityWindow.transactiontblselector).toBeVisible()

    //select hide all transactions checkbox with zero balance
    await activityWindow.clickonHideinvoice()
    await screenshotManager.takeScreenshot(page, testInfo.title, "Transactions tab with Hide Zero Balance Transactions checkbox selected");
    await expect(activityWindow.transactiontblselector).toBeVisible()

    //select all btn
    await activityWindow.clickonSelectAllbtn()
    await screenshotManager.takeScreenshot(page, testInfo.title, "Transactions tab with Select All button clicked");
    await expect(activityWindow.transactiontblselector).toBeVisible()
    //clear all selection
    await activityWindow.clickonClearAllbtn()
    await screenshotManager.takeScreenshot(page, testInfo.title, "Transactions tab with Clear All button clicked");
    await expect(activityWindow.transactiontblselector).toBeVisible()

    //------Edit all tagged Invoices -- need to implement

    //save
    await activityWindow.clikonSave()
    
    //validate Account Overview > Activity table with Issue name
    expect(await activityWindow.validateIssueName(issueName)).toContain(issueName, "Issue not created")
})

//TC_09: Create new activity with Voice Message--(Not implemented yet)
test('Create New Activity_With Voice Message--(Not implemented yet)', async ({ page }, testInfo) => {

    throw new Error("Voice Message tab in activity window is not implemented completed yet")

    const accountOverview = new AccountOverview(page)
    const allaccounts = new AllAccounts(page)
    const activityWindow = new ActivityCommunicateWindow(page)
    const screenshotManager = new ScreenshotManager();

    var issueName = dataSet.VoiceMessage_IssueName + Date().toLocaleString()

    //Click on New Activity
    await accountOverview.clickonNewActivity()
    await activityWindow.waitForActivtyToLoad()

    //Enter Issue name
    await activityWindow.enterIssueName(issueName)

    //Zoom out the page
    await page.evaluate(() => {
        document.body.style.zoom = '50%'; // Set the zoom level to 50%
    });

    // Navigate to Voice Message tab and add details
    await activityWindow.navigatetoVoiceMessage_Or_TextTab(activityWindow.voicemessagetab, "Voice Message tab in activity window is not implemented in React yet")

    //save
    await activityWindow.clikonSave()
    
    //validate Account Overview > Activity table with Issue name
    expect(await activityWindow.validateIssueName(issueName)).toContain(issueName, "Issue not created")
})

//TC_10: Create new activity with Text Only--(Not implemented yet)
test('Create New Activity_With Text Only--(Not implemented yet)', async ({ page }, testInfo) => {

    throw new Error("Text tab in activity window is not implemented completed yet")

    const accountOverview = new AccountOverview(page)
    const allaccounts = new AllAccounts(page)
    const activityWindow = new ActivityCommunicateWindow(page)
    const screenshotManager = new ScreenshotManager()

    var issueName = dataSet.Text_IssueName + Date().toLocaleString()

    //Click on New Activity
    await accountOverview.clickonNewActivity()
    await activityWindow.waitForActivtyToLoad()

    //Enter Issue name
    await activityWindow.enterIssueName(issueName)

    //Zoom out the page
    await page.evaluate(() => {
        document.body.style.zoom = '50%'; // Set the zoom level to 50%
    });

    //Navigate to Text tab and add Text
    await activityWindow.navigatetoVoiceMessage_Or_TextTab(activityWindow.texttab, "Text tab in activity window is not implemented in React yet")

    //save
    await activityWindow.clikonSave()

    //validate
    //validate Account Overview > Activity table with Issue name
    expect(await activityWindow.validateIssueName(issueName)).toContain(issueName, "Issue not created")
})

//TC_11: Create new  activity and cancel it
test('Create New Activity_Cancel btn', async ({ page }, testInfo) => {
    
    const accountOverview = new AccountOverview(page)
    const allaccounts = new AllAccounts(page)
    const activityWindow = new ActivityCommunicateWindow(page)
    const screenshotManager = new ScreenshotManager();

    var issueName = dataSet.Notes_IssueName + Date().toLocaleString()

    //Click on New Activity
    await accountOverview.clickonNewActivity()
    await activityWindow.waitForActivtyToLoad()

    //Enter Issue name
    await activityWindow.enterIssueName(issueName)
    
    await screenshotManager.takeScreenshot(page, testInfo.title, "Activity details before canceling")

    //cancel
    await activityWindow.clickonCancel()

    //validate page is redirected to Account Overview page
    await screenshotManager.takeScreenshot(page, testInfo.title, "Account overview page after canceling Activity");
    await activityWindow.clickOnRefreshbtn_statementtable()
    await expect(accountOverview.firstinvoice).toBeVisible()
})

//TC_12: Create new activity with notes only and save it as draft
test('Create New Activity_With Notes and save it as Draft', async ({ page }, testInfo) => {
    const pageNav = new PageNavigation(page)
    const accountOverview = new AccountOverview(page)
    const allaccounts = new AllAccounts(page)
    const activityWindow = new ActivityCommunicateWindow(page)
    const draftActivities = new Messages_DraftActivities(page)
    const screenshotManager = new ScreenshotManager();
    
    var issueName = dataSet.Draft_IssueName + Date().toLocaleString()
    var notesText = dataSet.Test_Note + Date().toLocaleString()

    //Click on New Activity
    await accountOverview.clickonNewActivity()
    await activityWindow.waitForActivtyToLoad()

    //Enter Issue name
    await activityWindow.enterIssueName(issueName)

    //Navigate to Notes tab and Add Notes
    await activityWindow.navigateToNotesTab()
    await activityWindow.addNotes(notesText)
    
    await screenshotManager.takeScreenshot(page, testInfo.title, "Notes details before saving as draft")

    //save as draft
    await activityWindow.clickonSaveAsDraft()

    //Navigate to Messages > Draft Activities and validate Issue name
    await pageNav.navigateToMessagesUsinguniqueLocator()
    await pageNav.navigateToDraftActivities()
    await expect(draftActivities.firstrow).toBeVisible()
    expect(await draftActivities.validateDraftedIssueName(issueName)).toContain(issueName, "Draft Issue not created")

    //Open Drafted issue and validate Notes details
    await screenshotManager.takeScreenshot(page, testInfo.title, "Drafted Activity details after saving as draft")
    await draftActivities.OpenDraftedIssue(issueName)
    await activityWindow.waitForActivtyToLoad()
    await expect(await activityWindow.issuetxtarea).toHaveValue(/.+/)

    //Navigate to Notes tab and validate Notes text
    await activityWindow.navigateToNotesTab()
    //validate Notes text
    expect(await draftActivities.returnDraftedNotesText()).toContain(notesText, "Note text is not matching")
})

//-----------Create New activity by forming some combinations of above functionalities---------------//

//TC_13: Create new activity with followup, email and attachment
test('Create New Activity_With followup, email and attachament', async ({ page }, testInfo) => {
    const accountOverview = new AccountOverview(page)
    const allaccounts = new AllAccounts(page)
    const activityWindow = new ActivityCommunicateWindow(page)
    const screenshotManager = new ScreenshotManager();

    var issueName = dataSet.ActivityName_MultipleTabs + Date().toLocaleString()

    await accountOverview.clickonNewActivity()
    await activityWindow.waitForActivtyToLoad()

    //Enter Issue name
    await activityWindow.enterIssueName(issueName)

    //set spoke with customer checkbox
    await activityWindow.clickonSpokewithCustomerCheckbox()

    //Add Followup details
    await activityWindow.checkScheduleFollowupcheckbox()
    await activityWindow.selectFollowupAssignUser(dataSet, dataSet.Followup_AssignUser)
    await activityWindow.selectFollowupDate(dataSet)
    await activityWindow.fillvaluesinResponsedays(dataSet, dataSet.Followup_ResponseDays)
    await activityWindow.enterDescription(dataSet, dataSet.Followup_desc)
    await screenshotManager.takeScreenshot(page, testInfo.title, "Followup details before save and send");
    
    //Navigate to Email tab and Add Email details
    await activityWindow.navigatetoemailTab()
    await activityWindow.enteraddressinTofield(dataSet, dataSet.To_Email_address)
    await activityWindow.clickonTemplate()
    await activityWindow.selectemailTemplate(dataSet, dataSet.Email_Template)
    await expect(activityWindow.subjectlineselector).toBeVisible()
    await expect(activityWindow.emailbodytextselector).toBeVisible()
    await screenshotManager.takeScreenshot(page, testInfo.title, "Email details before save and send");

    //Navigate to Attachments tab and Add Attachment (Report)
    await activityWindow.navigatetoAttachmentsTab()
    await activityWindow.clickonselectreportdrpdwn()
    await activityWindow.selectReport(dataSet, dataSet.Report_Name)
    await activityWindow.clickOnAttachReport()
    await screenshotManager.takeScreenshot(page, testInfo.title, "Attachment details before save and send");

    //save and send
    await activityWindow.clickSaveAndSend()

    //validate Account Overview > Activity table with Issue name, Followup, Email sent and Attachment flags
    expect(await activityWindow.validateIssueName(issueName)).toContain(issueName, "Issue not created")
    expect(await activityWindow.validateFollowupflag(issueName)).toBe(true, "Followup is not set")
    expect(await activityWindow.validateEmailSent(issueName)).toBe(true, "Email is not sent")
    expect(await activityWindow.validateAttachment(issueName)).toBe(true, "Attachment is not sent")
    await screenshotManager.takeScreenshot(page, testInfo.title, "Activity listing in ACtivity table after creating activity with Followup, Email and Attachment");

    //Refresh the page and Open Created Issue
    await activityWindow.clickOnRefreshbtn_statementtable()
    await activityWindow.OpenActivity(issueName)
    await activityWindow.waitForActivtyToLoad()
    await expect(await activityWindow.issuetxtarea).toHaveValue(/.+/)
    
    //-----------Validate Activity details---------------

    //validate spoke with customer checkbox
    expect(await activityWindow.spokewithcustomerchkbx.isChecked()).toBe(true, "Spoke with customer checkbox is not checked")

    //validate Followup details
    await screenshotManager.takeScreenshot(page, testInfo.title, "Followup details after creating activity");
    expect(await activityWindow.returnAssignedUser()).toContain(dataSet.assignedUser, "Assigned user is not matching")
    expect(await activityWindow.schfollowupchkbox.isChecked()).toBe(true, "Followup checkbox is not checked")
    expect(await activityWindow.returnFollowupDate()).toContain(dataSet.followupDate, "Followup date is not matching")
    expect(await activityWindow.returnResponseDays()).toContain(dataSet.responseDays, "Response days is not matching")
    expect(await activityWindow.returnDescription()).toContain(dataSet.description, "Description is not matching")

    //Navigate to Email tab and validate Email details
    await activityWindow.navigatetoemailTab()
    await screenshotManager.takeScreenshot(page, testInfo.title, "Email details after creating activity");
    expect(await activityWindow.returnTocontactEmail()).toContain((dataSet.to_contact_id).trim(''), "To contact email is not matching")
    expect(await activityWindow.returnSubjectline()).toContain(dataSet.CustomerName, "Email subject line is not matching")
    expect(await activityWindow.returnEmailBodytext()).toContain(dataSet.CustomerName, "Email body text is not matching")

    //Navigate to Attachments tab and validate Attachment
    await activityWindow.navigatetoAttachmentsTab()
    await screenshotManager.takeScreenshot(page, testInfo.title, "Attachment details after creating activity");
    expect(await activityWindow.returnAttachedReportName()).toContain(dataSet.attachedReportName, "Report name is not matching")

})

//TC_14: Create new activity by adding notes, contacts and tagged invoices
test('Create New Activity_With Notes, Add contacts and Tagged Invoices', async ({ page }, testInfo) => {
    const accountOverview = new AccountOverview(page)
    const allaccounts = new AllAccounts(page)
    const activityWindow = new ActivityCommunicateWindow(page)
    const screenshotManager = new ScreenshotManager();

    var issueName = dataSet.ActivityName_MultipleTabs + Date().toLocaleString()
    var notesText = dataSet.Test_Note + Date().toLocaleString()

    //Click on New Activity
    await accountOverview.clickonNewActivity()
    await activityWindow.waitForActivtyToLoad()

    //Enter Issue name
    await activityWindow.enterIssueName(issueName)

    //Zoom out the page
    await page.evaluate(() => {
        document.body.style.zoom = '50%'; // Set the zoom level to 50%
    });

    //Navigate to Notes tab and Add Notes
    await activityWindow.navigateToNotesTab()
    await activityWindow.addNotes(notesText) 
    //Add contacts to Notes
    await activityWindow.clickonViewContacts()
    await activityWindow.selectcontacttoAdd()
    let contactName1 = await activityWindow.returnContactName()
    console.log("Contact Name that should get displayed in Notes: ", contactName1)
    await activityWindow.clickonAddContactstoNotes()
    let contactName2 = await activityWindow.returnAddedContactNameinNotes()
    console.log("Contact Name that is displayed in Notes: ", contactName2)
    expect(contactName2).toContain(contactName1)
    let notesTabDetails = await activityWindow.returnnotestabdetails()
    await screenshotManager.takeScreenshot(page, testInfo.title, "Notes details before saving activity with contacts"); 

    //Navigate to Transactions tab and tag TranID
    await activityWindow.clickonTransactions()
    await activityWindow.clickonAll()
    await expect(activityWindow.transactiontblselector).toBeVisible()
    await activityWindow.clickonTagcheckbox()
    let docno1 = await activityWindow.returnTransactionID()
    console.log("Document Number before tagging: ", docno1)
    await activityWindow.clicktaggedtoissue()
    await expect(activityWindow.transactiontblselector).toBeVisible()
    let docno2 = await activityWindow.returnTransactionID()
    console.log("Document Number after tagging: ", docno2)
    expect(docno1).toEqual(docno2)
    await screenshotManager.takeScreenshot(page, testInfo.title, "Transactions tab with Tagged TranID before saving activity");

    //save
    await activityWindow.clikonSave()

    //validate Account Overview > Activity table with Issue name and Notes
    expect(await activityWindow.validateIssueName(issueName)).toContain(issueName, "Issue not created")
    expect(await activityWindow.validateNotescell(issueName)).toContain(notesText, "Note not created")
    await screenshotManager.takeScreenshot(page, testInfo.title, "Activity listing in ACtivity table after creating activity with notes and Tagged TranID");

    //Refresh the page and Open Created Issue
    await activityWindow.clickOnRefreshbtn_statementtable()
    await activityWindow.OpenActivity(issueName)
    await activityWindow.waitForActivtyToLoad()
    await expect(await activityWindow.issuetxtarea).toHaveValue(/.+/)

    //-----------Validate Activity details---------------

    //Navigate to Notes tab and validate Notes text
    await activityWindow.navigateToNotesTab()
    await screenshotManager.takeScreenshot(page, testInfo.title, "Notes details after creating activity with contacts");
    expect(await activityWindow.returnNotesText()).toContain(notesTabDetails, "Note text is not matching")

    //Navigate to Transactions tab and validate Tagged TranID
    await activityWindow.clickonTransactions()
    await screenshotManager.takeScreenshot(page, testInfo.title, "Transactions tab after creating activity with Tagged TranID");
    await expect(activityWindow.transactiontblselector).toBeVisible()
    await activityWindow.clicktaggedtoissue()
    expect(await activityWindow.returnTransactionID()).toContain(docno1, "Tagged Invoices are not set")

})

//TC_15: Create new activity by adding notes, expected payments and email template
test('Create New Activity_With Notes, Expected payments and email', async ({ page }, testInfo) => {
    const accountOverview = new AccountOverview(page)
    const allaccounts = new AllAccounts(page)
    const activityWindow = new ActivityCommunicateWindow(page)
    const screenshotManager = new ScreenshotManager();

    var issueName = dataSet.ActivityName_MultipleTabs + Date().toLocaleString()
    var notesText = dataSet.Test_Note + Date().toLocaleString()

    //Click on New Activity
    await accountOverview.clickonNewActivity()
    await activityWindow.waitForActivtyToLoad()

    //Enter Issue name
    await activityWindow.enterIssueName(issueName)

    //Zoom out the page
    await page.evaluate(() => {
        document.body.style.zoom = '50%'; // Set the zoom level to 50%
    });

    //Navigate to Notes tab and Add Notes
    await activityWindow.navigateToNotesTab()
    await activityWindow.addNotes(notesText) 
    await screenshotManager.takeScreenshot(page, testInfo.title, "Notes details before saving activity");

    //Navigate to Payments tab and enter Expected Payments details
    await activityWindow.navigatetoPaymentsTab()
    await activityWindow.enterpaymentamount(dataSet, dataSet.Expected_PaymentAmt)
    await activityWindow.enterpaybydate(dataSet)
    await activityWindow.clickonCustomerpromisedchkbox()
    await screenshotManager.takeScreenshot(page, testInfo.title, "Expected Payments details before saving activity");
    
    //Navigate to Email tab and Add Email details
    await activityWindow.navigatetoemailTab()
    await activityWindow.enteraddressinTofield(dataSet, dataSet.To_Email_address)
    await activityWindow.clickonTemplate()
    await activityWindow.selectemailTemplate(dataSet, dataSet.Email_Template)
    await expect(activityWindow.subjectlineselector).toBeVisible()
    await expect(activityWindow.emailbodytextselector).toBeVisible()
    await screenshotManager.takeScreenshot(page, testInfo.title, "Email details before saving activity");
    
    //save and send
    await activityWindow.clickSaveAndSend()

    //validate Account Overview > Activity table with Issue name, Notes, Expected Payments and Email sent flags
    expect(await activityWindow.validateIssueName(issueName)).toContain(issueName, "Issue not created")
    expect(await activityWindow.validatePaymentflag(issueName)).toBe(true, "Payment is not set")
    expect(await activityWindow.validateEmailSent(issueName)).toBe(true, "Email is not sent")
    await screenshotManager.takeScreenshot(page, testInfo.title, "Activity listing in ACtivity table after creating activity with Notes, Expected Payments and Email");

    //Refresh the page and Open Created Issue
    await activityWindow.clickOnRefreshbtn_statementtable()
    await activityWindow.OpenActivity(issueName)
    await activityWindow.waitForActivtyToLoad()
    await expect(await activityWindow.issuetxtarea).toHaveValue(/.+/)

    //-----------Validate Activity details---------------

    //Navigate to Notes tab and validate Notes text
    await activityWindow.navigateToNotesTab()
    await screenshotManager.takeScreenshot(page, testInfo.title, "Notes details after creating activity");
    expect(await activityWindow.returnNotesText()).toContain(notesText, "Note text is not matching")

    //Navigate to Payments tab and validate Expected Payments details
    await activityWindow.navigatetoPaymentsTab()
    await screenshotManager.takeScreenshot(page, testInfo.title, "Expected Payments details after creating activity");
    expect(await activityWindow.returnPaymentAmount()).toContain(dataSet.paymentAmount, "Payment amount is not matching")
    expect(await activityWindow.returnPayByDate()).toContain(dataSet.payByDate, "Pay by date is not matching")
    expect(await activityWindow.returnCustomerPromisedStatus()).toBe(true, "Customer promised checkbox is not checked")

    //Navigate to Email tab and validate Email details
    await activityWindow.navigatetoemailTab()
    await screenshotManager.takeScreenshot(page, testInfo.title, "Email details after creating activity");
    expect(await activityWindow.returnTocontactEmail()).toContain((dataSet.to_contact_id).trim(''), "To contact email is not matching")
    expect(await activityWindow.returnSubjectline()).toContain(dataSet.CustomerName, "Email subject line is not matching")
    expect(await activityWindow.returnEmailBodytext()).toContain(dataSet.CustomerName, "Email body text is not matching")
})
