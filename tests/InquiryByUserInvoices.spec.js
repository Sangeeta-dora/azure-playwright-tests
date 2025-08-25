// import { test, expect } from '@playwright/test';
const { test, expect } = require('@playwright/test');
const delay = ms => new Promise(resolve => setTimeout(resolve, ms))
const {Messages} = require("../PageObjects/Messages")
const { InquiryUserInvoices } = require('../PageObjects/InquiryUserInvoices');
const {PageNavigation} = require('../PageObjects/PageNavigation');
const { log } = require('console');
const exp = require('constants');
const { LoginPage } = require('../PageObjects/LoginPage');

const config = require('../config.js');
require('dotenv').config();
const env = process.env.ENVIRONMENT;
const envConfig = config[env];


test('@pageloadtests Inquire by for User_Invoices_Verify if the React view of Inquire by user_Invoices page is available', async ({ page }) => {
    const loginPage = new LoginPage(page)
    const pageNav = new PageNavigation(page)
    await loginPage.navigateTo(envConfig.baseURL);
    await loginPage.login(envConfig.userName, envConfig.password);
    await pageNav.navigateToInquiries()
    await pageNav.navigateToByUsers()
    await pageNav.navigateToUserInvoices()
    await page.screenshot({ path: 'Invoice Page.png' });
});

test('Inquire by for User_Invoices_Verify Click on Density(Compact)', async ({ page }) => {

    const loginPage = new LoginPage(page)
    const pageNav = new PageNavigation(page)
    await loginPage.navigateTo(envConfig.baseURL);
    await loginPage.login(envConfig.userName, envConfig.password);
    await pageNav.navigateToInquiries()
    await pageNav.navigateToByUsers()
    await pageNav.navigateToUserInvoices()
    const messages = new Messages(page)
    await messages.clickonDensity();
    await messages.clickonCompact();
    await page.screenshot({ path: 'Density Compact.png' });
});

test('Inquire by for User_Invoices_Verify Click on Density(Standard)', async ({ page }) => {

    const loginPage = new LoginPage(page)
    const pageNav = new PageNavigation(page)
    await loginPage.navigateTo(envConfig.baseURL);
    await loginPage.login(envConfig.userName, envConfig.password);
    await pageNav.navigateToInquiries()
    await pageNav.navigateToByUsers()
    await pageNav.navigateToUserInvoices()
    const messages = new Messages(page)
    await messages.clickonDensity();
    await messages.clickonStandard();
    await page.screenshot({ path: 'Density Standard.png' });
});

test('Inquire by for User_Invoices_Verify Click on Density(Comfortable)', async ({ page }) => {

    const loginPage = new LoginPage(page)
    const pageNav = new PageNavigation(page)
    await loginPage.navigateTo(envConfig.baseURL);
    await loginPage.login(envConfig.userName, envConfig.password);
    await pageNav.navigateToInquiries()
    await pageNav.navigateToByUsers()
    await pageNav.navigateToUserInvoices()
    const messages = new Messages(page)
    await messages.clickonDensity();
    await messages.clickonComfortable();
    await page.screenshot({ path: 'Density Comfortable.png' });
});

test('Inquire by for User_Invoices_Verify if the Export to Excel option is working', async ({ page }) => {

  const loginPage = new LoginPage(page)
  const pageNav = new PageNavigation(page)
  await loginPage.navigateTo(envConfig.baseURL);
  await loginPage.login(envConfig.userName, envConfig.password);
  await pageNav.navigateToInquiries()
  await pageNav.navigateToByUsers()
  await pageNav.navigateToUserInvoices()
  const inquiryUserInvoices = new InquiryUserInvoices(page)
  await inquiryUserInvoices.clickonExport()
  await page.screenshot({ path: 'Export to Excel.png' });
});

test('Inquire by for User_Invoices_Verify if the Refresh option is working', async ({ page }) => {

  const loginPage = new LoginPage(page)
  const pageNav = new PageNavigation(page)
  await loginPage.navigateTo(envConfig.baseURL);
  await loginPage.login(envConfig.userName, envConfig.password);
  await pageNav.navigateToInquiries()
  await pageNav.navigateToByUsers()
  await pageNav.navigateToUserInvoices()
  const inquiryUserInvoices = new InquiryUserInvoices(page)
  await inquiryUserInvoices.clickonrefresh()
});


test('Inquire by for User_Invoices_Verify if the Best Fit option is working', async ({ page }) => {

  const loginPage = new LoginPage(page)
  const pageNav = new PageNavigation(page)
  await loginPage.navigateTo(envConfig.baseURL);
  await loginPage.login(envConfig.userName, envConfig.password);
  await pageNav.navigateToInquiries()
  await pageNav.navigateToByUsers()
  await pageNav.navigateToUserInvoices()
  const inquiryUserInvoices = new InquiryUserInvoices(page)
  await inquiryUserInvoices.clickonBestFit()
  await page.screenshot({ path: 'Best Fit.png' });
});

test('Inquire by for User_Invoices_Verify if the Seach Text box option is working', async ({ page }) => {
  const loginPage = new LoginPage(page)
  const pageNav = new PageNavigation(page)
  await loginPage.navigateTo(envConfig.baseURL);
  await loginPage.login(envConfig.userName, envConfig.password);
  await pageNav.navigateToInquiries()
  await pageNav.navigateToByUsers()
  await pageNav.navigateToUserInvoices()
  const inquiryUserInvoices = new InquiryUserInvoices(page)
  await inquiryUserInvoices.clickonSearch()
  await page.screenshot({ path: 'Search.png' });
});

test('Inquire by for User_Invoices_Verify if the Seach Textbox Clear option is working', async ({ page }) => {

  const loginPage = new LoginPage(page)
  const pageNav = new PageNavigation(page)
  await loginPage.navigateTo(envConfig.baseURL);
  await loginPage.login(envConfig.userName, envConfig.password);
  await pageNav.navigateToInquiries()
  await pageNav.navigateToByUsers()
  await pageNav.navigateToUserInvoices()
  const inquiryUserInvoices = new InquiryUserInvoices(page)
  await inquiryUserInvoices.clickonSearch()
  await inquiryUserInvoices.clearSearchBox()
  await page.screenshot({ path: 'Clear Search Box.png' });
});

test('Inquire by for User_Invoices_Verify That the select checkbox is working', async ({ page }) => {

  const loginPage = new LoginPage(page)
  const pageNav = new PageNavigation(page)
  await loginPage.navigateTo(envConfig.baseURL);
  await loginPage.login(envConfig.userName, envConfig.password);
  await pageNav.navigateToInquiries()
  await pageNav.navigateToByUsers()
  await pageNav.navigateToUserInvoices()
  const inquiryUserInvoices = new InquiryUserInvoices(page)
  await inquiryUserInvoices.SelectRowCheckBox()
  await page.screenshot({ path: 'Click Row Checkbox.png' });
});

test('Inquire by for User_Invoices_Verify That the Account Details option from Activity Column is working', async ({ page }) => {

  const loginPage = new LoginPage(page)
  const pageNav = new PageNavigation(page)
  await loginPage.navigateTo(envConfig.baseURL);
  await loginPage.login(envConfig.userName, envConfig.password);
  await pageNav.navigateToInquiries()
  await pageNav.navigateToByUsers()
  await pageNav.navigateToUserInvoices()
  const inquiryUserInvoices = new InquiryUserInvoices(page)
  await inquiryUserInvoices.clickonAccountDetails()
  await page.screenshot({ path: 'Account Details.png' });
});

test('Inquire by for User_Invoices_Verify That the Account Details/New Activity option from Activity Column is working', async ({ page }) => {

  const loginPage = new LoginPage(page)
  const pageNav = new PageNavigation(page)
  await loginPage.navigateTo(envConfig.baseURL);
  await loginPage.login(envConfig.userName, envConfig.password);
  await pageNav.navigateToInquiries()
  await pageNav.navigateToByUsers()
  await pageNav.navigateToUserInvoices()
  const inquiryUserInvoices = new InquiryUserInvoices(page)
  await inquiryUserInvoices.clickonNewActivity()
  await page.screenshot({ path: 'New Activity.png' });
});

test('Inquire by for User_Invoices_Verify if the TOTAL AMOUNT and TOTAL BALANCE is present', async ({ page }) => {

  const loginPage = new LoginPage(page)
  const pageNav = new PageNavigation(page)
  await loginPage.navigateTo(envConfig.baseURL);
  await loginPage.login(envConfig.userName, envConfig.password);
  await pageNav.navigateToInquiries()
  await pageNav.navigateToByUsers()
  await pageNav.navigateToUserInvoices()
  const inquiryUserInvoices = new InquiryUserInvoices(page)
  await inquiryUserInvoices.verifyTotalAmounAndBalanceVisible();
  await page.screenshot({ path: 'Total Amount and Balance.png' });
});