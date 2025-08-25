/**
 * Test suite for Activity/Communicate Window functionality
 * Tests various features of the activity window including email composition,
 * transaction handling, and issue management
 * @typedef {import('../Fixtures/fixtures').TestFixtures} TestFixtures
 */
//const { test, expect } = require('@playwright/test');
const { test, expect } = require('../Fixtures/fixtures');
const { log } = require('console');

const config = require('../config.js');
require('dotenv').config();
const env = process.env.ENVIRONMENT;
const envConfig = config[env];
const dataSet = JSON.parse(JSON.stringify(require("../utils/TestData.json")))
const delay = ms => new Promise(resolve => setTimeout(resolve, ms))

// First two tests are already using fixtures correctly

/**
 * Tests navigation to Activity Window
 * @param {TestFixtures} param0
 */
test('Activity/Communicate_Enable Preview Feature_ Navigate to Activity Window', async({ mailnotread, loginpage, pageNav }) => {
    await loginpage.navigateTo(envConfig.baseURL);
    await loginpage.login(envConfig.userName, envConfig.password);
    await pageNav.clickonMessages()
    await pageNav.clickonMailNotRead()     
    await mailnotread.clikOnRestricted()
    await mailnotread.clickonIssue()
})

/**
 * Tests navigation to Activity Window and clicking cancel button
 * @param {TestFixtures} param0
 */
test('Activity/Communicate_Enable Preview Feature_ Navigate to Activity Window and click on cancel button', async({ mailnotread, loginpage, pageNav, activityWindow }) => {
    await loginpage.navigateTo(envConfig.baseURL);
    await loginpage.login(envConfig.userName, envConfig.password);
    await pageNav.clickonMessages()
    await pageNav.clickonMailNotRead()  
    await mailnotread.clikOnRestricted()
    await mailnotread.clickonIssue()
    await activityWindow.clickonCancel()
})

// Converting the remaining tests to use fixtures

/**
 * Tests navigation to New Activity Window and clicking cancel button
 * @param {TestFixtures} param0
 */
test('Activity/Communicate_Enable Preview Feature_ Navigate to New Activity Window and click on cancel button', async({ mailnotread, loginpage, pageNav, activityWindow }) => {
    await loginpage.navigateTo(envConfig.baseURL);
    await loginpage.login(envConfig.userName, envConfig.password);
    await pageNav.clickonMessages()
    await pageNav.clickonMailNotRead()
    await mailnotread.clikOnRestricted()
    await mailnotread.clickonIssue()
    await activityWindow.clickOnNewActivity()
    await activityWindow.clickonCancel()
})

test('Activity/Communicate_Enable Preview Feature_ Navigate to view contacts in activity Window', async({ mailnotread, loginpage, pageNav, activityWindow }) => {
    await loginpage.navigateTo(envConfig.baseURL);
    await loginpage.login(envConfig.userName, envConfig.password);
    await pageNav.clickonMessages()
    await pageNav.clickonMailNotRead()
    await mailnotread.clikOnRestricted()
    await mailnotread.clickonIssue()
    await activityWindow.clickonViewContacts()
})

test('Activity/Communicate_Enable Preview Feature_ Verify proper message is coming up when no contacts is selected ', async({ mailnotread, loginpage, pageNav, activityWindow }) => {
    await loginpage.navigateTo(envConfig.baseURL);
    await loginpage.login(envConfig.userName, envConfig.password);
    await pageNav.clickonMessages()
    await pageNav.clickonMailNotRead()
    await mailnotread.clikOnRestricted()
    await mailnotread.clickonIssue()
    await activityWindow.clickonViewContacts()
    await activityWindow.clickonAddContactstoNotes()
    await activityWindow.VerifyProperErrorMessageContacts()
})

test('Activity/Communicate_Enable Preview Feature_ AddContacts to notes', async({ mailnotread, loginpage, pageNav, activityWindow }) => {
    await loginpage.navigateTo(envConfig.baseURL);
    await loginpage.login(envConfig.userName, envConfig.password);
    await pageNav.clickonMessages()
    await pageNav.clickonMailNotRead()
    await mailnotread.clikOnRestricted()
    await mailnotread.clickonIssue()
    await activityWindow.clickonViewContacts()
    await activityWindow.selectaContact()
    await activityWindow.clickonAddContactstoNotes()
})

test('Activity/Communicate_Enable Preview Feature_ Navigate to New Activity Window', async({ mailnotread, loginpage, pageNav, activityWindow }) => {
    await loginpage.navigateTo(envConfig.baseURL);
    await loginpage.login(envConfig.userName, envConfig.password);
    await pageNav.clickonMessages()
    await pageNav.clickonMailNotRead()
    await mailnotread.clikOnRestricted()
    await mailnotread.clickonIssue()
    await activityWindow.clickOnNewActivity()
})

test('Activity/Communicate_Enable Preview Feature_ Adding Notes in New Activity', async({ mailnotread, loginpage, pageNav, activityWindow }) => {
    await loginpage.navigateTo(envConfig.baseURL);
    await loginpage.login(envConfig.userName, envConfig.password);
    await pageNav.clickonMessages()
    await pageNav.clickonMailNotRead()
    await mailnotread.clikOnRestricted()
    await mailnotread.clickonIssue()
    await activityWindow.clickOnNewActivity()
    await activityWindow.addNotes()
    await activityWindow.clickonSaveButton()
})

test('Activity/Communicate_Enable Preview Feature_ Compose Email in New Activity', async({ mailnotread, loginpage, pageNav, activityWindow }) => {
    await loginpage.navigateTo(envConfig.baseURL);
    await loginpage.login(envConfig.userName, envConfig.password);
    await pageNav.clickonMessages()
    await pageNav.clickonMailNotRead()
    await mailnotread.clikOnRestricted()
    await mailnotread.clickonIssue()
    await activityWindow.clickOnNewActivity()
    await activityWindow.navigatetoemailTab()
    await activityWindow.enteraddressinTofield(dataSet)
    await activityWindow.clickonTemplate()
    await activityWindow.selectemailTemplate( dataSet, dataSet.Email_Template)
    await activityWindow.clickSaveAndSend()
})

test('Activity/Communicate_Enable Preview Feature_ Compose Email in New Activity_Without template', async({ mailnotread, loginpage, pageNav, activityWindow }) => {
    await loginpage.navigateTo(envConfig.baseURL);
    await loginpage.login(envConfig.userName, envConfig.password);
    await pageNav.clickonMessages()
    await pageNav.clickonMailNotRead()
    await mailnotread.clikOnRestricted()
    await mailnotread.clickonIssue()
    await activityWindow.clickOnNewActivity()
    await activityWindow.navigatetoemailTab()
    await activityWindow.enteraddressinTofield(dataSet)
    await activityWindow.enterTextinEmailBody()
    await activityWindow.clickonTemplate()
    await activityWindow.selectemailTemplate(dataSet, dataSet.Email_Template)
    await activityWindow.clickSaveAndSend()
})

// 26-09-2023

test('Activity/Communicate_Enable Preview Feature_ Navigate to New Activity Window_Copy Notes Email', async({ mailnotread, loginpage, pageNav, activityWindow }) => {
    await loginpage.navigateTo(envConfig.baseURL);
    await loginpage.login(envConfig.userName, envConfig.password);
    await pageNav.clickonMessages()
    await pageNav.clickonMailNotRead()
    await mailnotread.clikOnRestricted()
    await mailnotread.clickonIssue()
    await activityWindow.clickOnNewActivity()
    await activityWindow.clikOnCopyNotesEmail()
    await activityWindow.navigatetoemailTab()
    await activityWindow.enteraddressinTofield(dataSet)
})

test('Activity/Communicate_Enable Preview Feature_ Navigate to New Activity Window_Schedule Followup', async({ mailnotread, loginpage, pageNav, activityWindow }) => {
    await loginpage.navigateTo(envConfig.baseURL);
    await loginpage.login(envConfig.userName, envConfig.password);
    await pageNav.clickonMessages()
    await pageNav.clickonMailNotRead()
    await mailnotread.clikOnRestricted()
    await mailnotread.clickonIssue()
    await activityWindow.clickOnNewActivity()
    await activityWindow.clickScheduleFollowupcheckbox()
    await activityWindow.fillvaluesinResponsedays(dataSet)
    await activityWindow.enterDescription(dataSet)
    await activityWindow.clikonSave()
})

test('Activity_Existing Activity_Transactions_ Verify the Transactions page  is loading ', async({ mailnotread, loginpage, pageNav, activityWindow, page }) => {
    await loginpage.navigateTo(envConfig.baseURL);
    await loginpage.login(envConfig.userName, envConfig.password);
    await pageNav.clickonMessages()
    await pageNav.clickonMailNotRead()
    await mailnotread.clikOnRestricted()
    await mailnotread.clickonIssue()
    await activityWindow.clickonTransactions()
    await expect(activityWindow.Transactiontable).toBeVisible()
    await page.screenshot({ path: 'Transaction page.png', fullPage: true });
})

test('Activity_Existing Activity_Transactions_ Verify that Tagged to Activity bullet is working ', async({ mailnotread, loginpage, pageNav, activityWindow }) => {
    await loginpage.navigateTo(envConfig.baseURL);
    await loginpage.login(envConfig.userName, envConfig.password);
    await pageNav.clickonMessages()
    await pageNav.clickonMailNotRead()
    await mailnotread.clikOnRestricted()
    await mailnotread.clickonIssue() 
    await activityWindow.clickonTransactions()
    await activityWindow.clickonAll()
    let custnumber1 = await activityWindow.invoicenumber.textContent()
    console.log("before tagged to activity :" + custnumber1)
    await activityWindow.clickoncheckbox()
    await activityWindow.clickontaggedactivity()
    let custnumber2 = await activityWindow.invoicenumber.textContent()
    console.log("after tagged to activity  :" + custnumber2)
    expect(custnumber1).toEqual(expect.stringContaining(custnumber2))
})

// Continue with the rest of the tests using the same fixture pattern
test('Activity_Existing Activity_New Activity_Transactions_ Verify that Tagged to Issue bullet is working', async({ mailnotread, loginpage, pageNav, activityWindow }) => {
    await loginpage.navigateTo(envConfig.baseURL);
    await loginpage.login(envConfig.userName, envConfig.password);
    await pageNav.clickonMessages()
    await pageNav.clickonMailNotRead()
    await mailnotread.clikOnRestricted()
    await mailnotread.clickonIssue()
    await activityWindow.clickonTransactions()
    await activityWindow.clickonAll()
    let custnumber1 = await activityWindow.invoicenumber.textContent()
    console.log("before tagged to issue :" + custnumber1)
    await activityWindow.clickoncheckbox()
    await activityWindow.clicktaggedtoissue()
    let custnumber2 = await activityWindow.invoicenumber.textContent()
    console.log("after tagged to issue  :" + custnumber2)
    expect(custnumber1).toEqual(expect.stringContaining(custnumber2));
})

// ...remaining test cases...
test('Activity_Existing Activity_New Activity_Transactions_ Verify that Past Due bullet is working', async({ mailnotread, loginpage, pageNav, activityWindow, page }) => {
    await loginpage.navigateTo(envConfig.baseURL);
    await loginpage.login(envConfig.userName, envConfig.password);
    await pageNav.clickonMessages()
    await pageNav.clickonMailNotRead()
    await mailnotread.clikOnRestricted()
    await mailnotread.clickonIssue()
    await activityWindow.clickonTransactions()
    await activityWindow.clickonpastdue()
    await expect(activityWindow.Transactiontable).toBeVisible()
    await page.screenshot({ path: 'past due.png', fullPage: true });
})

test('Activity_Existing Activity_New Activity_Transactions_ Verify that Open bullet is working', async({ mailnotread, loginpage, pageNav, activityWindow, page }) => {
    await loginpage.navigateTo(envConfig.baseURL);
    await loginpage.login(envConfig.userName, envConfig.password);
    await pageNav.clickonMessages()
    await pageNav.clickonMailNotRead()
    await mailnotread.clikOnRestricted()
    await mailnotread.clickonIssue()
    await activityWindow.clickonTransactions()
    await activityWindow.clickonopen()
    await expect(activityWindow.Transactiontable).toBeVisible()
    await page.screenshot({ path: 'open.png', fullPage: true });
})

test('Activity_Existing Activity_New Activity_Transactions_ Verify that Hide All invoices with 0.00 balance is working', async({ mailnotread, loginpage, pageNav, activityWindow, page }) => {
    await loginpage.navigateTo(envConfig.baseURL);
    await loginpage.login(envConfig.userName, envConfig.password);
    await pageNav.clickonMessages()
    await pageNav.clickonMailNotRead()
    await mailnotread.clikOnRestricted()
    await mailnotread.clickonIssue()
    await activityWindow.clickonTransactions()
    await activityWindow.clickonAll()
    await activityWindow.clickonHideinvoice()
    await expect(activityWindow.Transactiontable).toBeVisible()
    await page.screenshot({ path: '0.00 balance.png', fullPage: true });
})

test('Activity_Existing Activity_New Activity_Transactions_ Verify that All is working', async({ mailnotread, loginpage, pageNav, activityWindow, page }) => {
    await loginpage.navigateTo(envConfig.baseURL);
    await loginpage.login(envConfig.userName, envConfig.password);
    await pageNav.clickonMessages()
    await pageNav.clickonMailNotRead()
    await mailnotread.clikOnRestricted()
    await mailnotread.clickonIssue()
    await activityWindow.clickonTransactions()
    await activityWindow.clickonAll()
    await expect(activityWindow.Transactiontable).toBeVisible()
    await page.screenshot({ path: 'All123.png', fullPage: true });
})

test('Activity_Existing Activity_New Activity_Transactions_ Verify that Edit All Tagged Invoices is working', async({ mailnotread, loginpage, pageNav, activityWindow }) => {
    await loginpage.navigateTo(envConfig.baseURL);
    await loginpage.login(envConfig.userName, envConfig.password);
    await pageNav.clickonMessages()
    await pageNav.clickonMailNotRead()
    await mailnotread.clikOnRestricted()
    await mailnotread.clickonIssue()
    await activityWindow.clickonTransactions()
    await activityWindow.clickonAll()
    await activityWindow.clickoncheckbox()
    await activityWindow.clicktaggedtoissue()
    await activityWindow.clickoncheckbox()
    await activityWindow.clicktaggedtoissue()
    await activityWindow.clickoneditalltaggedinvoice()
    await activityWindow.clickonreasondropdown()
    // await activityWindow.clickonreasondropdown()
    // await activityWindow.selectreasonoption()
    // await activityWindow.clickonupdate()
})

test('Activity_Existing Activity_New Activity_Email_ Send a reply to incoming email', async({ mailnotread, loginpage, pageNav, activityWindow, page }) => {
    await loginpage.navigateTo(envConfig.baseURL);
    await loginpage.login(envConfig.userName, envConfig.password);
    await pageNav.clickonMessages()
    await pageNav.clickonMailNotRead()
    await mailnotread.clickonIssue()
    await activityWindow.clickonreply()
    //await activityWindow.clickonok()
    // await activityWindow.clickonccaddress()
    await activityWindow.enterccaddress(dataSet.CCaddress)
    await activityWindow.clickonreplybody()
    await activityWindow.enterreplybody(dataSet.description)
    await activityWindow.clickSaveAndSend()
    await activityWindow.waitforemailtobesent()
    await activityWindow.clickonoverview()
    await activityWindow.clickonsentemailicon()
    await expect(activityWindow.saveButton).toBeVisible()
    await page.screenshot({ path: 'replyemail.png', fullPage: true });
})

test('Activity_Existing Activity_New Activity_Email_ Send a reply All to incoming email', async({ mailnotread, loginpage, pageNav, activityWindow, page }) => {
    await loginpage.navigateTo(envConfig.baseURL);
    await loginpage.login(envConfig.userName, envConfig.password);
    await pageNav.clickonMessages()
    await pageNav.clickonMailNotRead()
    await mailnotread.clickonIssue()
    await activityWindow.clickonreplyall()
    await activityWindow.clickonok()
    await activityWindow.clickonccaddress()
    await activityWindow.enterccaddress(dataSet.CCaddress)
    await activityWindow.clickonreplybody()
    await activityWindow.enterreplybody(dataSet.description)
    await activityWindow.clickSaveAndSend()
    await activityWindow.waitforemailtobesent()
    await activityWindow.clickonoverview()
    await activityWindow.clickonsentemailicon()
    await expect(activityWindow.saveButton).toBeVisible()
    await page.screenshot({ path: 'replyallemail.png', fullPage: true });
})

test('Activity_Existing Activity_New Activity_Email_ Send a forward to incoming email', async({ mailnotread, loginpage, pageNav, activityWindow, page }) => {
    await loginpage.navigateTo(envConfig.baseURL);
    await loginpage.login(envConfig.userName, envConfig.password);
    await pageNav.clickonMessages()
    await pageNav.clickonMailNotRead()
    await mailnotread.clickonIssue()
    await activityWindow.clickonforward()
    await activityWindow.clickonok()
    await activityWindow.clickonccaddress()
    await activityWindow.entertoaddress(dataSet.Toaddress)
    await activityWindow.clickonreplybody()
    await activityWindow.enterreplybody(dataSet.description)
    await activityWindow.clickSaveAndSend()
    await activityWindow.waitforemailtobesent()
    await activityWindow.clickonoverview()
    await activityWindow.clickonsentemailicon()
    await expect(activityWindow.saveButton).toBeVisible()
    await page.screenshot({ path: 'forward.png', fullPage: true });
})

test('Activity_Existing Activity_New Activity_Email_ Mark emailas unread', async({ mailnotread, loginpage, pageNav, activityWindow }) => {
    await loginpage.navigateTo(envConfig.baseURL);
    await loginpage.login(envConfig.userName, envConfig.password);
    await pageNav.clickonMessages()
    await pageNav.clickonMailNotRead()
    await mailnotread.clickonIssue()
    await activityWindow.clickonmarkasunread()
    await activityWindow.clikonSave()
    await expect(activityWindow.firstissue).toBeVisible()
})

test('Activity_Existing Activity_New Activity_Email_ Mark issue as complete', async({ mailnotread, loginpage, pageNav, activityWindow }) => {
    await loginpage.navigateTo(envConfig.baseURL);
    await loginpage.login(envConfig.userName, envConfig.password);
    await pageNav.clickonMessages()
    await pageNav.clickonMailNotRead()
    await mailnotread.clikOnRestricted()
    await mailnotread.clickonIssue()
    await activityWindow.clickonissuecomplete()
    await activityWindow.clickonok()
    await activityWindow.clikonSave()
    await expect(activityWindow.firstissue).toBeVisible()
})

test('Activity_Existing Activity_New Activity_Email_ Mark issue as archive', async({ mailnotread, loginpage, pageNav, activityWindow }) => {
    await loginpage.navigateTo(envConfig.baseURL);
    await loginpage.login(envConfig.userName, envConfig.password);
    await pageNav.clickonMessages()
    await pageNav.clickonMailNotRead()
    await mailnotread.clikOnRestricted()
    await mailnotread.clickonIssue()
    await activityWindow.clickonarchiveissue()
    await activityWindow.clikonSave()
    await expect(activityWindow.firstissue).toBeVisible()
})











