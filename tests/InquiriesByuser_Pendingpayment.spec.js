const { test, expect } = require('@playwright/test');
const { InquiriesByUser_Pendingpayment } = require("../PageObjects/InquiriesByUser_Pendingpayment");
const {PageNavigation} = require('../PageObjects/PageNavigation');
const { log } = require('console');
const exp = require('constants');
const { LoginPage } = require('../PageObjects/LoginPage');

const config = require('../config.js');
require('dotenv').config();
const env = process.env.ENVIRONMENT;
const envConfig = config[env];

test('@pageloadtests Pendingpayment_Navigate to Pendingpayment', async({ page }) => {
  const loginPage = new LoginPage(page)
  const Pendingpayment = new InquiriesByUser_Pendingpayment(page)
  const pageNav = new PageNavigation(page)
  await loginPage.navigateTo(envConfig.baseURL);
  await loginPage.login(envConfig.userName, envConfig.password);
  await pageNav.navigateToInquiries()
  await pageNav.navigateToByUsers()
  await pageNav.navigateToUserPendingPayment()
  await expect(Pendingpayment.firstRow).toBeVisible()
 })
 test('pendingpayment_Navigate to pendingpayment Page_Refresh', async({ page }) => {
  const loginPage = new LoginPage(page)
  const Pendingpayment = new InquiriesByUser_Pendingpayment(page)
  const pageNav = new PageNavigation(page)
  await loginPage.navigateTo(envConfig.baseURL);
  await loginPage.login(envConfig.userName, envConfig.password);
  await pageNav.navigateToInquiries()
  await pageNav.navigateToByUsers()
  await pageNav.navigateToUserPendingPayment()
  await expect(Pendingpayment.firstRow).toBeVisible()
  await Pendingpayment.clickonrefresh()
  await expect(Pendingpayment.firstRow).toBeVisible()
  })
  test('pendingpayment_Navigate to pendingpayment Page_BestFit', async({ page }) => {
  const loginPage = new LoginPage(page)
  const Pendingpayment = new InquiriesByUser_Pendingpayment(page)
  const pageNav = new PageNavigation(page)
  await loginPage.navigateTo(envConfig.baseURL);
  await loginPage.login(envConfig.userName, envConfig.password);
  await pageNav.navigateToInquiries()
  await pageNav.navigateToByUsers()
  await pageNav.navigateToUserPendingPayment()
  await Pendingpayment.clickonBestFit()
  await expect(Pendingpayment.firstRow).toBeVisible()
  })

  test('pendingpayment_Navigate to pendingpayment Page_Click On Density_Comfortable', async({ page }) => {
  const loginPage = new LoginPage(page)
  const Pendingpayment = new InquiriesByUser_Pendingpayment(page)
  const pageNav = new PageNavigation(page)
  await loginPage.navigateTo(envConfig.baseURL);
  await loginPage.login(envConfig.userName, envConfig.password);
  await pageNav.navigateToInquiries()
  await pageNav.navigateToByUsers()
  await pageNav.navigateToUserPendingPayment()
  await expect(Pendingpayment.firstRow).toBeVisible()
  await Pendingpayment.clickOnDensity()
  await Pendingpayment.clickOnComfortable()
  })
  test('pendingpayment_Navigate to pendingpayment Page_Click On Density_Compact', async({ page }) => {
  const loginPage = new LoginPage(page)
  const Pendingpayment = new InquiriesByUser_Pendingpayment(page)
  const pageNav = new PageNavigation(page)
  await loginPage.navigateTo(envConfig.baseURL);
  await loginPage.login(envConfig.userName, envConfig.password);
  await pageNav.navigateToInquiries()
  await pageNav.navigateToByUsers()
  await pageNav.navigateToUserPendingPayment()
  await expect(Pendingpayment.firstRow).toBeVisible()
  await Pendingpayment.clickOnDensity()
  await Pendingpayment.clickOnCompact()
  })
  test('pendingpayment_Navigate to pendingpayment Page_Click On Density_Standard', async({ page }) => {
  const loginPage = new LoginPage(page)
  const Pendingpayment = new InquiriesByUser_Pendingpayment(page)
  const pageNav = new PageNavigation(page)
  await loginPage.navigateTo(envConfig.baseURL);
  await loginPage.login(envConfig.userName, envConfig.password);
  await pageNav.navigateToInquiries()
  await pageNav.navigateToByUsers()
  await pageNav.navigateToUserPendingPayment()
  await expect(Pendingpayment.firstRow).toBeVisible()
  await Pendingpayment.clickOnDensity()
  await Pendingpayment.clickOnStandard()
  })
  test('pendingpayment_Navigate to pendingpayment Page_Select Columns_ Hide All', async({ page }) => {
  const loginPage = new LoginPage(page)
  const Pendingpayment = new InquiriesByUser_Pendingpayment(page)
  const pageNav = new PageNavigation(page)
  await loginPage.navigateTo(envConfig.baseURL);
  await loginPage.login(envConfig.userName, envConfig.password);
  await pageNav.navigateToInquiries()
  await pageNav.navigateToByUsers()
  await pageNav.navigateToUserPendingPayment()
  await expect(Pendingpayment.firstRow).toBeVisible()
  await Pendingpayment.clickOnSelectColumn()
  await Pendingpayment.clickOnHideAll()
  })

  test('pendingpayment_Navigate to pendingpayment Page_Select Columns_ Show All', async({ page }) => {
  const loginPage = new LoginPage(page)
  const Pendingpayment = new InquiriesByUser_Pendingpayment(page)
  const pageNav = new PageNavigation(page)
  await loginPage.navigateTo(envConfig.baseURL);
  await loginPage.login(envConfig.userName, envConfig.password);
  await pageNav.navigateToInquiries()
  await pageNav.navigateToByUsers()
  await pageNav.navigateToUserPendingPayment()
  await expect(Pendingpayment.firstRow).toBeVisible()
  await Pendingpayment.clickOnSelectColumn()
  await Pendingpayment.clickOnHideAll()
  await Pendingpayment.clickOnShowAll()
  })
  test('pendingpayment_Navigate to pendingpayment Page_navigate to Account Deatils Page', async({ page }) => {
  const loginPage = new LoginPage(page)
  const Pendingpayment = new InquiriesByUser_Pendingpayment(page)
  const pageNav = new PageNavigation(page)
  await loginPage.navigateTo(envConfig.baseURL);
  await loginPage.login(envConfig.userName, envConfig.password);
  await pageNav.navigateToInquiries()
  await pageNav.navigateToByUsers()
  await pageNav.navigateToUserPendingPayment()
  await expect(Pendingpayment.firstRow).toBeVisible()
  await Pendingpayment.clickOnFirstCustomer()
  await Pendingpayment.clickonAccountDetails()
  await expect(Pendingpayment.firstRow).toBeVisible()
  })

  test('pendingpayment_Navigate to pendingpayment Page_navigate to Account Deatils/New Activity Page', async({ page }) => {
  const loginPage = new LoginPage(page)
  const Pendingpayment = new InquiriesByUser_Pendingpayment(page)
  const pageNav = new PageNavigation(page)
  await loginPage.navigateTo(envConfig.baseURL);
  await loginPage.login(envConfig.userName, envConfig.password);
  await pageNav.navigateToInquiries()
  await pageNav.navigateToByUsers()
  await pageNav.navigateToUserPendingPayment()
  await expect(Pendingpayment.firstRow).toBeVisible()
  await Pendingpayment.clickOnFirstCustomer()
  await Pendingpayment.clickOnAccountDetailsNewActivity()
  await expect(Pendingpayment.firstRow).toBeVisible()
  })
  test('pendingpayment_Navigate to pendingpayment Page_Export To Excel', async({ page }) => {
  const loginPage = new LoginPage(page)
  const Pendingpayment = new InquiriesByUser_Pendingpayment(page)
  const pageNav = new PageNavigation(page)
  await loginPage.navigateTo(envConfig.baseURL);
  await loginPage.login(envConfig.userName, envConfig.password);
  await pageNav.navigateToInquiries()
  await pageNav.navigateToByUsers()
  await pageNav.navigateToUserPendingPayment()
  await expect(Pendingpayment.firstRow).toBeVisible()
  await Pendingpayment.clickonExport()
  const downloadPromise = page.waitForEvent('download');
  const download = await downloadPromise;
  await download.saveAs('TestCases-ReactATC/test-results/'+download.suggestedFilename())
  })