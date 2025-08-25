const { test, expect } = require('@playwright/test');
const { AccountOverview } = require('../PageObjects/AccountOverview')
const { AllAccounts } = require('../PageObjects/AllAccounts')
const {PageNavigation} = require('../PageObjects/PageNavigation');
const { LoginPage } = require('../PageObjects/LoginPage');
const { selectViewSettingsOption } = require('../utils/methodHelper');
const dataSet = JSON.parse(JSON.stringify(require("../utils/TestData.json")))
const { log } = require('console');
//JSON-> String->js Object

const config = require('../config.js');
require('dotenv').config();
const env = process.env.ENVIRONMENT;
const envConfig = config[env];

//TC_1
test('Account Overview_Navigation to account Overview page from Customer Input', async ({ page }) => {
  const loginPage = new LoginPage(page)
  const accountOverview = new AccountOverview(page)
  await loginPage.navigateTo(envConfig.baseURL);
  await loginPage.login(envConfig.userName, envConfig.password);
  await accountOverview.clickonCustomerInput()
  await accountOverview.enterCustomerName(dataSet.Cust_ID_Name)
  await accountOverview.selectCustomerFromDropdown(dataSet.Cust_ID_Name)
  var exp_customername = await accountOverview.ReturnCustomerName();
  console.log("Customer Name is: " + exp_customername);
  expect(exp_customername, 'Customer AccountOverview did not open').toContain(dataSet.Cust_ID_Name);


})

//TC_2
test("Account Overview_Invoices Page_Navigation to Invoices Page ", async ({ page }) => {
  const loginPage = new LoginPage(page)
  const pageNav = new PageNavigation(page)
  const allaccounts = new AllAccounts(page)
  const accountOverview = new AccountOverview(page)
  await loginPage.navigateTo(envConfig.baseURL);
  await loginPage.login(envConfig.userName, envConfig.password);
  await pageNav.navigateToAccounts()
  await pageNav.navigateToAllAccounts()
  await expect(allaccounts.firstdatarow).toBeVisible()
  await selectViewSettingsOption(page, "~Standard Late");
  await allaccounts.searchAndClick(dataSet.CustomerName)
  await allaccounts.clickonAccountDetailsOption()
  await selectViewSettingsOption(page, "~Invoices");
  var expected_invoice = await accountOverview.returnFirstInvoice()
  console.log("Expected Invoice is: " + expected_invoice)
  await accountOverview.clickOnFirstInvoice()
  var actual_invoice = await accountOverview.returnInvoiceDetails()
  console.log("Actual Invoice is: " + actual_invoice)
  expect(actual_invoice, 'Expected Invoice did not open').toContain(expected_invoice);

})

//TC_3
test("Account Overview_Invoices Page_Check if user is able to save the invoice after clicking do not sync ", async ({ page }) => {
  const loginPage = new LoginPage(page)
  const pageNav = new PageNavigation(page)
  const allaccounts = new AllAccounts(page)
  const accountOverview = new AccountOverview(page)
  await loginPage.navigateTo(envConfig.baseURL);
  await loginPage.login(envConfig.userName, envConfig.password);
  await pageNav.navigateToAccounts()
  await pageNav.navigateToAllAccounts()
  await expect(allaccounts.firstdatarow).toBeVisible()
  await selectViewSettingsOption(page, "~Standard Late");
  await allaccounts.searchAndClick(dataSet.CustomerName)
  await allaccounts.clickonAccountDetailsOption()
  await selectViewSettingsOption(page, "~Invoices");
  await accountOverview.clickOnFirstInvoice()
  // Capture the initial state of the checkbox
  const previous_state = await accountOverview.validatethatDoNotSyncIsChecked();

  // Perform the action that changes the state of the checkbox
  await accountOverview.checkOrUncheckDontNotSyncChkbx();
  await accountOverview.clickOnInvoiceSave();

  // Capture the new state of the checkbox
  const current_state = await accountOverview.validatethatDoNotSyncIsChecked();

  // Assert that the new state is the opposite of the initial state
  expect(current_state).toBe(!previous_state, 'The checkbox state did not toggle correctly');

})

//TC_4
test("Account Overview_Invoices Page_Open Invoice documents from Invoice Page ", async ({ page }) => {
  const loginPage = new LoginPage(page)
  const pageNav = new PageNavigation(page)
  const allaccounts = new AllAccounts(page)
  const accountOverview = new AccountOverview(page)
  await loginPage.navigateTo(envConfig.baseURL);
  await loginPage.login(envConfig.userName, envConfig.password);
  await pageNav.navigateToAccounts()
  await pageNav.navigateToAllAccounts()
  await expect(allaccounts.firstdatarow).toBeVisible()
  await selectViewSettingsOption(page, "~Standard Late");
  await allaccounts.searchAndClick(dataSet.CustomerName)
  await allaccounts.clickonAccountDetailsOption()
  await selectViewSettingsOption(page, "~Invoices");
  await accountOverview.clickOnFirstInvoice()
  var expected_invoice = await accountOverview.returnFirstInvoice()
  console.log("Expected Invoice is: " + expected_invoice)
  await accountOverview.clickonInvoiceDocuments()
  var actual_invoice = await accountOverview.returnInvoiceDocumentDetails()
  console.log("Actual Invoice is: " + actual_invoice.split(" ")[1])
  expect(actual_invoice, 'Document details of Expected Invoice did not open').toContain(expected_invoice);


})

//TC_5
test("Account Overview_Invoices Page_Add and delete folder in Invoice Documents ", async ({ page }) => {
  const loginPage = new LoginPage(page)
  const pageNav = new PageNavigation(page)
  const allaccounts = new AllAccounts(page)
  const accountOverview = new AccountOverview(page)
  await loginPage.navigateTo(envConfig.baseURL);
  await loginPage.login(envConfig.userName, envConfig.password);
  await pageNav.navigateToAccounts()
  await pageNav.navigateToAllAccounts()
  await expect(allaccounts.firstdatarow).toBeVisible()
  await selectViewSettingsOption(page, "~Standard Late");
  await allaccounts.searchAndClick(dataSet.CustomerName)
  await allaccounts.clickonAccountDetailsOption()
  await selectViewSettingsOption(page, "~Invoices");
  await accountOverview.clickOnFirstInvoice()
  await accountOverview.clickonInvoiceDocuments()
  await accountOverview.clickOnAddFolder()
  var folder_name = dataSet.Folder_Name+"_"+Math.floor(Math.random() * 1000)
  console.log("Folder Name is: " + folder_name)
  await accountOverview.enterFolderName(folder_name)
  const after_creation = await accountOverview.validatethatTheCreatedFolderIsVisible(folder_name)
  expect(after_creation).toBe(true, 'Folder is not created');
  await accountOverview.deleteCreatedFolder(folder_name)
  await accountOverview.clickOkondelete()
  const after_deletion = await accountOverview.validatethatTheCreatedFolderIsVisible(folder_name)
  expect(after_deletion).toBe(false, 'Folder is not deleted');
})

//TC_6
test("Account Overview_Invoices Page_Invoice documents refresh ", async ({ page }) => {
  const loginPage = new LoginPage(page)
  const pageNav = new PageNavigation(page)
  const allaccounts = new AllAccounts(page)
  const accountOverview = new AccountOverview(page)
  await loginPage.navigateTo(envConfig.baseURL);
  await loginPage.login(envConfig.userName, envConfig.password);
  await pageNav.navigateToAccounts()
  await pageNav.navigateToAllAccounts()
  await expect(allaccounts.firstdatarow).toBeVisible()
  await selectViewSettingsOption(page, "~Standard Late");
  await allaccounts.searchAndClick(dataSet.CustomerName)
  await allaccounts.clickonAccountDetailsOption()
  await selectViewSettingsOption(page, "~Invoices");
  await accountOverview.clickOnFirstInvoice()
  await accountOverview.clickonInvoiceDocuments()
  await accountOverview.clickonRefreshInvoiceDocuments()

})

//TC_7
test("Account Overview_Invoices Page_Invoice documents List View ", async ({ page }) => {
  const loginPage = new LoginPage(page)
  const pageNav = new PageNavigation(page)
  const allaccounts = new AllAccounts(page)
  const accountOverview = new AccountOverview(page)
  await loginPage.navigateTo(envConfig.baseURL);
  await loginPage.login(envConfig.userName, envConfig.password);
  await pageNav.navigateToAccounts()
  await pageNav.navigateToAllAccounts()
  await expect(allaccounts.firstdatarow).toBeVisible()
  await selectViewSettingsOption(page, "~Standard Late");
  await allaccounts.searchAndClick(dataSet.CustomerName)
  await allaccounts.clickonAccountDetailsOption()
  await selectViewSettingsOption(page, "~Invoices");
  await accountOverview.clickOnFirstInvoice()
  await accountOverview.clickonInvoiceDocuments()
  await accountOverview.clickonListView()

})

//TC_8
test("Account Overview_Invoices Page_Invoice documents Grid View ", async ({ page }) => {
  const loginPage = new LoginPage(page)
  const pageNav = new PageNavigation(page)
  const allaccounts = new AllAccounts(page)
  const accountOverview = new AccountOverview(page)
  await loginPage.navigateTo(envConfig.baseURL);
  await loginPage.login(envConfig.userName, envConfig.password);
  await pageNav.navigateToAccounts()
  await pageNav.navigateToAllAccounts()
  await expect(allaccounts.firstdatarow).toBeVisible()
  await selectViewSettingsOption(page, "~Standard Late");
  await allaccounts.searchAndClick(dataSet.CustomerName)
  await allaccounts.clickonAccountDetailsOption()
  await selectViewSettingsOption(page, "~Invoices");
  await accountOverview.clickOnFirstInvoice()
  await accountOverview.clickonInvoiceDocuments()
  await accountOverview.clickonGridView()

})

//TC_9
test("Account Overview_Invoices Page_Select Contact Dropdown 1 ", async ({ page }) => {
  const loginPage = new LoginPage(page)
  const pageNav = new PageNavigation(page)
  const allaccounts = new AllAccounts(page)
  const accountOverview = new AccountOverview(page)
  await loginPage.navigateTo(envConfig.baseURL);
  await loginPage.login(envConfig.userName, envConfig.password);
  await pageNav.navigateToAccounts()
  await pageNav.navigateToAllAccounts()
  await expect(allaccounts.firstdatarow).toBeVisible()
  await selectViewSettingsOption(page, "~Standard Late");
  await allaccounts.searchAndClick(dataSet.CustomerName)
  await allaccounts.clickonAccountDetailsOption()
  await selectViewSettingsOption(page, "~Invoices");
  await accountOverview.clickOnFirstInvoice()

  //Zoom out the page
  await page.evaluate(() => {
    document.body.style.zoom = '50%'; // Set the zoom level to 50%
  });

  await accountOverview.selectfirstContactDropDown()

})

//TC_10
test("Account Overview_Invoices Page_Select Contact Dropdown 2 ", async ({ page }) => {
  const loginPage = new LoginPage(page)
  const pageNav = new PageNavigation(page)
  const allaccounts = new AllAccounts(page)
  const accountOverview = new AccountOverview(page)
  await loginPage.navigateTo(envConfig.baseURL);
  await loginPage.login(envConfig.userName, envConfig.password);
  await pageNav.navigateToAccounts()
  await pageNav.navigateToAllAccounts()
  await expect(allaccounts.firstdatarow).toBeVisible()
  await selectViewSettingsOption(page, "~Standard Late");
  await allaccounts.searchAndClick(dataSet.CustomerName)
  await allaccounts.clickonAccountDetailsOption()
  await selectViewSettingsOption(page, "~Invoices");
  await accountOverview.clickOnFirstInvoice()
  await accountOverview.selectsecondContactDropDown()

})

//TC_11
test("Account Overview_Select new activity option from the toolbar ", async ({ page }) => {
  const loginPage = new LoginPage(page)
  const pageNav = new PageNavigation(page)
  const allaccounts = new AllAccounts(page)
  const accountOverview = new AccountOverview(page)
  await loginPage.navigateTo(envConfig.baseURL);
  await loginPage.login(envConfig.userName, envConfig.password);
  await pageNav.navigateToAccounts()
  await pageNav.navigateToAllAccounts()
  await expect(allaccounts.firstdatarow).toBeVisible()
  await selectViewSettingsOption(page, "~Standard Late");
  await allaccounts.searchAndClick(dataSet.CustomerName)
  await allaccounts.clickonAccountDetailsOption()
  await accountOverview.clickonNewActivity()
  var new_activity = await accountOverview.returnNewActivity()
  console.log("New Activity is: " + new_activity)
  expect(new_activity, 'New Activity did not open').toContain("New Activity for " + dataSet.CustomerName);
})

//TC_12
test("Account Overview_Select refresh option from the toolbar ", async ({ page }) => {
  const loginPage = new LoginPage(page)
  const pageNav = new PageNavigation(page)
  const allaccounts = new AllAccounts(page)
  const accountOverview = new AccountOverview(page)
  await loginPage.navigateTo(envConfig.baseURL);
  await loginPage.login(envConfig.userName, envConfig.password);
  await pageNav.navigateToAccounts()
  await pageNav.navigateToAllAccounts()
  await expect(allaccounts.firstdatarow).toBeVisible()
  await selectViewSettingsOption(page, "~Standard Late");
  await allaccounts.searchAndClick(dataSet.CustomerName)
  await allaccounts.clickonAccountDetailsOption()
  await accountOverview.clickonRefresh()

})

//TC_13
test("Account Overview_Select Density (Comfortable) option from the toolbar ", async ({ page }) => {
  const loginPage = new LoginPage(page)
  const pageNav = new PageNavigation(page)
  const allaccounts = new AllAccounts(page)
  const accountOverview = new AccountOverview(page)
  await loginPage.navigateTo(envConfig.baseURL);
  await loginPage.login(envConfig.userName, envConfig.password);
  await pageNav.navigateToAccounts()
  await pageNav.navigateToAllAccounts()
  await expect(allaccounts.firstdatarow).toBeVisible()
  await selectViewSettingsOption(page, "~Standard Late");
  await allaccounts.searchAndClick(dataSet.CustomerName)
  await allaccounts.clickonAccountDetailsOption()
  await accountOverview.clickonDensity()
  await accountOverview.clickondensityCComfortable()

})

//TC_14
test("Account Overview_Select Density (Standard) option from the toolbar ", async ({ page }) => {
  const loginPage = new LoginPage(page)
  const pageNav = new PageNavigation(page)
  const allaccounts = new AllAccounts(page)
  const accountOverview = new AccountOverview(page)
  await loginPage.navigateTo(envConfig.baseURL);
  await loginPage.login(envConfig.userName, envConfig.password);
  await pageNav.navigateToAccounts()
  await pageNav.navigateToAllAccounts()
  await expect(allaccounts.firstdatarow).toBeVisible()
  await selectViewSettingsOption(page, "~Standard Late");
  await allaccounts.searchAndClick(dataSet.CustomerName)
  await allaccounts.clickonAccountDetailsOption()
  await accountOverview.clickonDensity()
  await accountOverview.clickondensityStandard()

})

//TC_15
test("Account Overview_Select Density (Compact) option from the toolbar ", async ({ page }) => {
  const loginPage = new LoginPage(page)
  const pageNav = new PageNavigation(page)
  const allaccounts = new AllAccounts(page)
  const accountOverview = new AccountOverview(page)
  await loginPage.navigateTo(envConfig.baseURL);
  await loginPage.login(envConfig.userName, envConfig.password);
  await pageNav.navigateToAccounts()
  await pageNav.navigateToAllAccounts()
  await expect(allaccounts.firstdatarow).toBeVisible()
  await selectViewSettingsOption(page, "~Standard Late");
  await allaccounts.searchAndClick(dataSet.CustomerName)
  await allaccounts.clickonAccountDetailsOption()
  await accountOverview.clickonDensity()
  await accountOverview.clickondensityCompact()

})


//TC_16
test("Account Overview_Select Bitfit option from the toolbar ", async ({ page }) => {
  const loginPage = new LoginPage(page)
  const pageNav = new PageNavigation(page)
  const allaccounts = new AllAccounts(page)
  const accountOverview = new AccountOverview(page)
  await loginPage.navigateTo(envConfig.baseURL);
  await loginPage.login(envConfig.userName, envConfig.password);
  await pageNav.navigateToAccounts()
  await pageNav.navigateToAllAccounts()
  await expect(allaccounts.firstdatarow).toBeVisible()
  await selectViewSettingsOption(page, "~Standard Late");
  await allaccounts.searchAndClick(dataSet.CustomerName)
  await allaccounts.clickonAccountDetailsOption()
  await accountOverview.clickonBestFit()

})


