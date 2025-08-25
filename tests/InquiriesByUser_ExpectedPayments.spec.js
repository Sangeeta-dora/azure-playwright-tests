const { test, expect } = require('@playwright/test');
const {InquiriesByUser_ExpectedPayments} = require('../PageObjects/InquiriesByUser_ExpectedPayments')
const {PageNavigation} = require('../PageObjects/PageNavigation');
const { log } = require('console');
const exp = require('constants');
const { LoginPage } = require('../PageObjects/LoginPage');

const config = require('../config.js');
require('dotenv').config();
const env = process.env.ENVIRONMENT;
const envConfig = config[env];

test('@pageloadtests Expected Payments_Navigate to expected payments page', async({ page }) => {
  const loginPage = new LoginPage(page)
  const expPayments = new InquiriesByUser_ExpectedPayments(page)
  const pageNav = new PageNavigation(page)
  await loginPage.navigateTo(envConfig.baseURL);
  await loginPage.login(envConfig.userName, envConfig.password);
  await pageNav.navigateToInquiries()
  await pageNav.navigateToByUsers()
  await pageNav.navigateToExpectedPayments()
  await expect(expPayments.firstRow).toBeVisible()
  });

  test('Expected Payments_ Click on Refresh', async({ page }) => {
  const loginPage = new LoginPage(page)
  const expPayments = new InquiriesByUser_ExpectedPayments(page)
  const pageNav = new PageNavigation(page)
  await loginPage.navigateTo(envConfig.baseURL);
  await loginPage.login(envConfig.userName, envConfig.password);
  await pageNav.navigateToInquiries()
  await pageNav.navigateToByUsers()
  await pageNav.navigateToExpectedPayments()
  await expect(expPayments.firstRow).toBeVisible()
  await expPayments.clickonRefresh()
  await expect(expPayments.firstRow).toBeVisible()

  })

  test('Expected Payments_ Click on Bestfit', async({ page }) => {
  const loginPage = new LoginPage(page)
  const expPayments = new InquiriesByUser_ExpectedPayments(page)
  const pageNav = new PageNavigation(page)
  await loginPage.navigateTo(envConfig.baseURL);
  await loginPage.login(envConfig.userName, envConfig.password);
  await pageNav.navigateToInquiries()
  await pageNav.navigateToByUsers()
  await pageNav.navigateToExpectedPayments()
  await expect(expPayments.firstRow).toBeVisible()
  await expPayments.clickonBestFit()

  })

  test('Expected Payments_ Click on Density_Compact', async({ page }) => {
  const loginPage = new LoginPage(page)
  const expPayments = new InquiriesByUser_ExpectedPayments(page)
  const pageNav = new PageNavigation(page)
  await loginPage.navigateTo(envConfig.baseURL);
  await loginPage.login(envConfig.userName, envConfig.password);
  await pageNav.navigateToInquiries()
  await pageNav.navigateToByUsers()
  await pageNav.navigateToExpectedPayments()
  await expect(expPayments.firstRow).toBeVisible()
  await expPayments.clickonDensity()
  await expPayments.clickOnCompact()

  })

  test('Expected Payments_ Click on Density_Standard', async({ page }) => {
  const loginPage = new LoginPage(page)
  const expPayments = new InquiriesByUser_ExpectedPayments(page)
  const pageNav = new PageNavigation(page)
  await loginPage.navigateTo(envConfig.baseURL);
  await loginPage.login(envConfig.userName, envConfig.password);
  await pageNav.navigateToInquiries()
  await pageNav.navigateToByUsers()
  await pageNav.navigateToExpectedPayments()
  await expect(expPayments.firstRow).toBeVisible()
  await expPayments.clickonDensity()
  await expPayments.clickOnStandard()

  })

  test('Expected Payments_ Click on Density_Comfortable', async({ page }) => {
  const loginPage = new LoginPage(page)
  const expPayments = new InquiriesByUser_ExpectedPayments(page)
  const pageNav = new PageNavigation(page)
  await loginPage.navigateTo(envConfig.baseURL);
  await loginPage.login(envConfig.userName, envConfig.password);
  await pageNav.navigateToInquiries()
  await pageNav.navigateToByUsers()
  await pageNav.navigateToExpectedPayments()
  await expect(expPayments.firstRow).toBeVisible()
  await expPayments.clickonDensity()
  await expPayments.clickOnComfortable()

  })

  test('Expected Payments_ Click on Columns_Show All', async({ page }) => {
  const loginPage = new LoginPage(page)
  const expPayments = new InquiriesByUser_ExpectedPayments(page)
  const pageNav = new PageNavigation(page)
  await loginPage.navigateTo(envConfig.baseURL);
  await loginPage.login(envConfig.userName, envConfig.password);
  await pageNav.navigateToInquiries()
  await pageNav.navigateToByUsers()
  await pageNav.navigateToExpectedPayments()
  await expect(expPayments.firstRow).toBeVisible()
  await expPayments.clickOnColumns()
  await expPayments.clcikonShowAll()

  })

  test('Expected Payments_ Click on Columns_Hide All', async({ page }) => {
  const loginPage = new LoginPage(page)
  const expPayments = new InquiriesByUser_ExpectedPayments(page)
  const pageNav = new PageNavigation(page)
  await loginPage.navigateTo(envConfig.baseURL);
  await loginPage.login(envConfig.userName, envConfig.password);
  await pageNav.navigateToInquiries()
  await pageNav.navigateToByUsers()
  await pageNav.navigateToExpectedPayments()
  await expect(expPayments.firstRow).toBeVisible()
  await expPayments.clickOnColumns()
  await expPayments.clickonHideAll()

  })

  test('Expected Payments_Click On Export To Excel', async({ page }) => {
  const loginPage = new LoginPage(page)
  const expPayments = new InquiriesByUser_ExpectedPayments(page)
  const pageNav = new PageNavigation(page)
  await loginPage.navigateTo(envConfig.baseURL);
  await loginPage.login(envConfig.userName, envConfig.password);
  await pageNav.navigateToInquiries()
  await pageNav.navigateToByUsers()
  await pageNav.navigateToExpectedPayments()
  await expect(expPayments.firstRow).toBeVisible()
  await expPayments.clickonExportToExcel()
  const downloadPromise = page.waitForEvent('download');
  const download = await downloadPromise;
  await download.saveAs('TestCases-ReactATC/test-results/'+download.suggestedFilename())

  })

  test('Expected Payments_Navigate to Account Details', async({ page }) => {
  const loginPage = new LoginPage(page)
  const expPayments = new InquiriesByUser_ExpectedPayments(page)
  const pageNav = new PageNavigation(page)
  await loginPage.navigateTo(envConfig.baseURL);
  await loginPage.login(envConfig.userName, envConfig.password);
  await pageNav.navigateToInquiries()
  await pageNav.navigateToByUsers()
  await pageNav.navigateToExpectedPayments()
  await expect(expPayments.firstRow).toBeVisible()
  await expPayments.clickOnFirstCust()
  await expPayments.clickonAccountDetails()
  await expect(expPayments.firstRow).toBeVisible()
  })

  test('Expected Payments_Navigate to Account Details/New Activity', async({ page }) => {
  const loginPage = new LoginPage(page)
  const expPayments = new InquiriesByUser_ExpectedPayments(page)
  const pageNav = new PageNavigation(page)
  await loginPage.navigateTo(envConfig.baseURL);
  await loginPage.login(envConfig.userName, envConfig.password);
  await pageNav.navigateToInquiries()
  await pageNav.navigateToByUsers()
  await pageNav.navigateToExpectedPayments()
  await expect(expPayments.firstRow).toBeVisible()
  await expPayments.clickOnFirstCust()
  await expPayments.clickonAccountDetailsNewActivity()
  await expect(expPayments.firstRow).toBeVisible()
  })

  test('Expected Payments_Navigate to Activity Window', async({ page }) => {
  const loginPage = new LoginPage(page)
  const expPayments = new InquiriesByUser_ExpectedPayments(page)
  const pageNav = new PageNavigation(page)
  await loginPage.navigateTo(envConfig.baseURL);
  await loginPage.login(envConfig.userName, envConfig.password);
  await pageNav.navigateToInquiries()
  await pageNav.navigateToByUsers()
  await pageNav.navigateToExpectedPayments()
  await expect(expPayments.firstRow).toBeVisible()
  await expPayments.clickonfirstissue()
  await expect(expPayments.firstRow).toBeVisible()
  })