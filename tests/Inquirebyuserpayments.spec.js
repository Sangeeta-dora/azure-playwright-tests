
const { test, expect } = require('@playwright/test');
const { mailNotRead } = require('../PageObjects/mailNotRead');
const {Messages} = require("../PageObjects/Messages")
const { inquireByuserpayments } = require("../PageObjects/inquireByuserpayments");
const {PageNavigation} = require('../PageObjects/PageNavigation');
const { log } = require('console');
const exp = require('constants');
const dataSet = JSON.parse(JSON.stringify(require("../utils/TestData.json")))
const { LoginPage } = require('../PageObjects/LoginPage');

const config = require('../config.js');
require('dotenv').config();
const env = process.env.ENVIRONMENT;
const envConfig = config[env];
const delay = ms => new Promise(resolve => setTimeout(resolve, ms))


 test('@pageloadtests Inquire by for User_Payments_Verify if the React view of Inquire by User_Payments page is available', async ({ page }) => {
  const inquirebyuserpayments = new inquireByuserpayments(page)
  const loginPage = new LoginPage(page)
  const pageNav = new PageNavigation(page)
  await loginPage.navigateTo(envConfig.baseURL);
  await loginPage.login(envConfig.userName, envConfig.password);
  await pageNav.navigateToInquiries()
  await pageNav.navigateToByUsers()
    await pageNav.navigateToUserPayments();
    await expect(inquirebyuserpayments.CustID).toBeVisible()
    await page.screenshot({ path: 'Payments page .png', fullPage: true });

});

 test('Inquire by for User_Payments_Verify if the filter option is available', async ({ page }) => {
   const inquirebyuserpayments = new inquireByuserpayments(page)
   const loginPage = new LoginPage(page)
   const pageNav = new PageNavigation(page)
   await loginPage.navigateTo(envConfig.baseURL);
   await loginPage.login(envConfig.userName, envConfig.password);
   await pageNav.navigateToInquiries()
   await pageNav.navigateToByUsers()
   await pageNav.navigateToUserPayments();
   await inquirebyuserpayments.clickonfilter()
   await expect(inquirebyuserpayments.CustID).toBeVisible()
   await page.screenshot({ path: 'fliter page .png', fullPage: true });
 });

 test('Inquire by for User_Payments_Verify if the add filter option is available', async ({ page }) => {
   const inquirebyuserpayments = new inquireByuserpayments(page)
   const loginPage = new LoginPage(page)
   const pageNav = new PageNavigation(page)
   await loginPage.navigateTo(envConfig.baseURL);
   await loginPage.login(envConfig.userName, envConfig.password);
   await pageNav.navigateToInquiries()
   await pageNav.navigateToByUsers()
   await pageNav.navigateToUserPayments();
   await inquirebyuserpayments.clickonfilteronpayment()
   await inquirebyuserpayments.addFilterbuttonavailable()
   await page.screenshot({path: 'AddFilter.png', fullPage: true})


  });
  test('Inquire by for User_Payments_Verify if the Remove All option is available', async ({ page }) => {
   const inquirebyuserpayments = new inquireByuserpayments(page)
   const loginPage = new LoginPage(page)
   const pageNav = new PageNavigation(page)
   await loginPage.navigateTo(envConfig.baseURL);
   await loginPage.login(envConfig.userName, envConfig.password);
   await pageNav.navigateToInquiries()
   await pageNav.navigateToByUsers()
   await pageNav.navigateToUserPayments();
   await inquirebyuserpayments.clickonfilteronpayment()
   await inquirebyuserpayments.Removeallbuttonavailable()
   await page.screenshot({path: 'RemoveAll.png'})
  });

 test('Inquire by for User_Payments_Verify if the Export to Excel option is working', async ({ page }) => {
  const inquirebyuserpayments = new inquireByuserpayments(page)
  const loginPage = new LoginPage(page)
  const pageNav = new PageNavigation(page)
  await loginPage.navigateTo(envConfig.baseURL);
  await loginPage.login(envConfig.userName, envConfig.password);
  await pageNav.navigateToInquiries()
  await pageNav.navigateToByUsers()
    await pageNav.navigateToUserPayments();
    await inquirebyuserpayments.clickonExport()
 });
 test('Inquire by for User_Payments_Verify if the Refresh option is working', async ({ page }) => {
  const inquirebyuserpayments = new inquireByuserpayments(page)
  const loginPage = new LoginPage(page)
  const pageNav = new PageNavigation(page)
  await loginPage.navigateTo(envConfig.baseURL);
  await loginPage.login(envConfig.userName, envConfig.password);
  await pageNav.navigateToInquiries()
  await pageNav.navigateToByUsers()
    await pageNav.navigateToUserPayments();
  await inquirebyuserpayments.clickonrefresh();
  await expect(inquirebyuserpayments.CustID).toBeVisible()
  await page.screenshot({ path: 'refresh.png', fullPage: true });
 });

 test('Inquire by for User_Payments_Verify if the Best Fit option is working', async ({ page }) => {
  const inquirebyuserpayments = new inquireByuserpayments(page)
  const loginPage = new LoginPage(page)
  const pageNav = new PageNavigation(page)
  await loginPage.navigateTo(envConfig.baseURL);
  await loginPage.login(envConfig.userName, envConfig.password);
  await pageNav.navigateToInquiries()
  await pageNav.navigateToByUsers()
    await pageNav.navigateToUserPayments();
  await inquirebyuserpayments.clickonBestFit()
  await expect(inquirebyuserpayments.firstRow).toBeVisible()
    await page.screenshot({ path: 'Bestfit.png', fullPage: true });
 });
//  test('Inquire by for User_Payments_Verify if the View Settings option is working', async ({ page }) => {
//   const inquirebyuserpayments = new inquireByuserpayments(page)
//   const loginPage = new LoginPage(page)
//   const pageNav = new PageNavigation(page)
//   await loginPage.navigateTo(envConfig.baseURL);
//   await loginPage.login(envConfig.userName, envConfig.password);
//   await pageNav.navigateToInquiries()
//   await pageNav.navigateToByUsers()
//     await pageNav.navigateToUserPayments();
//   await inquirebyuserpayments.clickonviewsetting()
//   await inquirebyuserpayments.clickAllviewsetting()
//  });
 test('Inquire by for User_Payments_Verify That the select checkbox is working', async ({ page }) => {
  const inquirebyuserpayments = new inquireByuserpayments(page)
  const loginPage = new LoginPage(page)
  const pageNav = new PageNavigation(page)
  await loginPage.navigateTo(envConfig.baseURL);
  await loginPage.login(envConfig.userName, envConfig.password);
  await pageNav.navigateToInquiries()
  await pageNav.navigateToByUsers()
    await pageNav.navigateToUserPayments();
  await inquirebyuserpayments.clickcheckbox()
  await expect(inquirebyuserpayments.CustID).toBeVisible()
  await page.screenshot({ path: 'checkbox.png', fullPage: true });
  
 });

//  test('Inquire by for User_Payments_Verify That the Column Level filters are working', async ({ page }) => {
//   const inquirebyuserpayments = new inquireByuserpayments(page)
//   const loginPage = new LoginPage(page)
//   const pageNav = new PageNavigation(page)
//   await loginPage.navigateTo(envConfig.baseURL);
//   await loginPage.login(envConfig.userName, envConfig.password);
//   await pageNav.navigateToInquiries()
//   await pageNav.navigateToByUsers()
//     await pageNav.navigateToUserPayments();
//   await delay(10000)
//   await inquirebyuserpayments.columnfilters(dataSet.CustID)
//   await delay(10000)
//   let Expected_CustId=await inquirebyuserpayments.CustID.textContent()
//    let Actual_CustId=dataSet.CustID
//    console.log("custid number : "+Expected_CustId);
//    expect(Actual_CustId).toEqual(expect.stringContaining(Expected_CustId));
//  });

 test('Inquire by for User_Payments_Verify That the New Activity option from Activity Column is working', async ({ page }) => {

  const inquirebyuserpayments = new inquireByuserpayments(page)
  const loginPage = new LoginPage(page)
  const pageNav = new PageNavigation(page)
  await loginPage.navigateTo(envConfig.baseURL);
  await loginPage.login(envConfig.userName, envConfig.password);
  await pageNav.navigateToInquiries()
  await pageNav.navigateToByUsers()
    await pageNav.navigateToUserPayments();
  await inquirebyuserpayments.clickOnFirstCustomer()
  await inquirebyuserpayments.clickonAccountDetails()
  await page.screenshot({ path: 'New activity.png', fullPage: true });

 });
test('Inquire by for User_Payments_Verify That theAccount Details/New Activity option from Activity Column is working', async ({ page }) => {
  const inquirebyuserpayments = new inquireByuserpayments(page)
  const loginPage = new LoginPage(page)
  const pageNav = new PageNavigation(page)
  await loginPage.navigateTo(envConfig.baseURL);
  await loginPage.login(envConfig.userName, envConfig.password);
  await pageNav.navigateToInquiries()
  await pageNav.navigateToByUsers()
    await pageNav.navigateToUserPayments();
    await inquirebyuserpayments.clickOnFirstCustomer()
    await inquirebyuserpayments.clickonAccountDetailNewActivity()
 await page.screenshot({ path: 'Account details.png', fullPage: true });

 });

//   test('Inquire by for User_Payments_Verify That the footer pagination is proper', async ({ page }) => {
//     const inquirebyuserpayments = new inquireByuserpayments(page)
//   const loginPage = new LoginPage(page)
//   const pageNav = new PageNavigation(page)
//   await loginPage.navigateTo(envConfig.baseURL);
//   await loginPage.login(envConfig.userName, envConfig.password);
//   await pageNav.navigateToInquiries()
//   await pageNav.navigateToByUsers()
//     await pageNav.navigateToUserPayments();
//     await inquirebyuserpayments.verifyFooterPagination()


//  });

//   test('Inquire by for User_Payments_Verify That the data count is matching with Legacy', async ({ page }) => {
  
// //  const inquirebyuserpayments = new inquireByuserpayments(page)
// //   const mailnotread = new mailNotRead(page)
// //   await mailnotread.navigateURl()
// //   await mailnotread.validLogin(dataSet.username, dataSet.password)
// //   await inquirebyuserpayments.clickonInquiries()
// //   await inquirebyuserpayments.clickonByUser()
// //   await inquirebyuserpayments.clickonpayments()
// //   let legacy_count =await page.frameLocator('iframe[name="pageIframe"]').locator('#ctl00_MainContent_grdDataView_ctl00_Pager').getByText('273').textContent()
// //   console.log("Length from legacy : "+legacy_count);
// //   await mailnotread.clickonPreview()
// //   await delay(10000)
// //   await inquirebyuserpayments.clickonInquiries()
// //   await delay(10000)
// //   await inquirebyuserpayments.clickonInquiries()
// //   await delay(10000)
// //   await inquirebyuserpayments.clickonByuserforReact()
// //   await inquirebyuserpayments.clickonpayments()
// //   await delay(10000)
// //   let React_count = await page.getByText('–10 of 273').textContent()
// //   console.log("Length from React : "+React_count);
// //   expect('legacy_count').toEqual(expect.stringContaining('React_count'));

//  })

 test('Inquire by for User_Payments_Verify That the TOTAL AMOUNT   is Present', async ({ page }) => {
  const inquirebyuserpayments = new inquireByuserpayments(page)
  const loginPage = new LoginPage(page)
  const pageNav = new PageNavigation(page)
  await loginPage.navigateTo(envConfig.baseURL);
  await loginPage.login(envConfig.userName, envConfig.password);
  await pageNav.navigateToInquiries()
  await pageNav.navigateToByUsers()
    await pageNav.navigateToUserPayments();
  await inquirebyuserpayments.containstotalamount()
  await expect(inquirebyuserpayments.CustID).toBeVisible()
  await page.screenshot({ path: 'Total Amount .png', fullPage: true });
 });
 test('Inquire by for User_Payments_Verify That the  TOTAL UNAPPLIED  is Present', async ({ page }) => {
  const inquirebyuserpayments = new inquireByuserpayments(page)
  const loginPage = new LoginPage(page)
  const pageNav = new PageNavigation(page)
  await loginPage.navigateTo(envConfig.baseURL);
  await loginPage.login(envConfig.userName, envConfig.password);
  await pageNav.navigateToInquiries()
  await pageNav.navigateToByUsers()
    await pageNav.navigateToUserPayments();
  await inquirebyuserpayments.containstotalunaplied()
  await expect(inquirebyuserpayments.CustID).toBeVisible()
  await page.screenshot({ path: 'unapplied Amount .png', fullPage: true });
 });

test('Inquirebyuserpayments_Click on Density(Compact)', async({ page }) => {
  const messages = new Messages(page)
  const inquirebyuserpayments = new inquireByuserpayments(page)
  const loginPage = new LoginPage(page)
  const pageNav = new PageNavigation(page)
  await loginPage.navigateTo(envConfig.baseURL);
  await loginPage.login(envConfig.userName, envConfig.password);
  await pageNav.navigateToInquiries()
  await pageNav.navigateToByUsers()
    await pageNav.navigateToUserPayments();
  await messages.clickonDensity()
  await messages.clickonCompact()
  await expect(inquirebyuserpayments.CustID).toBeVisible()
  await page.screenshot({ path: 'compact page .png', fullPage: true });

})

 test('Inquirebyuserpayments_Click on Density(Comfortable)', async({ page }) => {
  const messages = new Messages(page)
  const inquirebyuserpayments = new inquireByuserpayments(page)
  const loginPage = new LoginPage(page)
  const pageNav = new PageNavigation(page)
  await loginPage.navigateTo(envConfig.baseURL);
  await loginPage.login(envConfig.userName, envConfig.password);
  await pageNav.navigateToInquiries()
  await pageNav.navigateToByUsers()
    await pageNav.navigateToUserPayments();
  await messages.clickonDensity()
  await messages.clickonComfortable()
  await expect(inquirebyuserpayments.CustID).toBeVisible()
  await page.screenshot({ path: 'comfortable page .png', fullPage: true });
 })

 test('Inquirebyuserpayments_Click on Density(Standard)', async({ page }) => {
  const messages = new Messages(page)
  const inquirebyuserpayments = new inquireByuserpayments(page)
  const loginPage = new LoginPage(page)
  const pageNav = new PageNavigation(page)
  await loginPage.navigateTo(envConfig.baseURL);
  await loginPage.login(envConfig.userName, envConfig.password);
  await pageNav.navigateToInquiries()
  await pageNav.navigateToByUsers()
    await pageNav.navigateToUserPayments();
  await messages.clickonDensity()
  await messages.clickonStandard()
  await expect(inquirebyuserpayments.CustID).toBeVisible()
  await page.screenshot({ path: 'Density view.png', fullPage: true });
  
 })


