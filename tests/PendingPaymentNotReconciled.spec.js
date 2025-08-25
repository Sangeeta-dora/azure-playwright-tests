const { test, expect } = require('@playwright/test');
const { mailNotRead } = require('../PageObjects/mailNotRead');
const { PendingPaymentNotReconciled } = require("../PageObjects/PendingPaymentNotReconciled");
const { log, Console } = require('console');
//JSON-> String->js Object
const dataSet = JSON.parse(JSON.stringify(require("../utils/TestData.json")))

test('PendingPaymentNotReconciled_Navigate to PendingPaymentNotReconciled', async({ page }) => {
    const mailnotread = new mailNotRead(page)
    const pending_PaymentNotReconciled = new PendingPaymentNotReconciled(page)
    await mailnotread.navigateURl()
    await mailnotread.validLogin(dataSet.username, dataSet.password)
    await mailnotread.clickonMessages()
    await pending_PaymentNotReconciled.clickonpendingPaymentNotReconciled()
    await expect(pending_PaymentNotReconciled.firstRow).toBeVisible()
 })
 test('PendingPaymentNotReconciled_Navigate to PendingPaymentNotReconciled Page_Refresh', async({ page }) => {
  const mailnotread = new mailNotRead(page)
  const pending_PaymentNotReconciled = new PendingPaymentNotReconciled(page)
  await mailnotread.navigateURl()
  await mailnotread.validLogin(dataSet.username, dataSet.password)
  await mailnotread.clickonMessages()
  await pending_PaymentNotReconciled.clickonpendingPaymentNotReconciled()
  await expect(pending_PaymentNotReconciled.firstRow).toBeVisible()
  await pending_PaymentNotReconciled.clickonrefresh()
  await expect(pending_PaymentNotReconciled.firstRow).toBeVisible()
 
})
test('PendingPaymentNotReconciled_Navigate to PendingPaymentNotReconciled Page_BestFit', async({ page }) => {
  const mailnotread = new mailNotRead(page)
  const pending_PaymentNotReconciled = new PendingPaymentNotReconciled(page)
  await mailnotread.navigateURl()
  await mailnotread.validLogin(dataSet.username, dataSet.password)
  await mailnotread.clickonMessages()
  await pending_PaymentNotReconciled.clickonpendingPaymentNotReconciled()
  await pending_PaymentNotReconciled.clickonBestFit()
  await expect(pending_PaymentNotReconciled.firstRow).toBeVisible()
})
test('PendingPaymentNotReconciled_Navigate to PendingPaymentNotReconciled Page_Click On Density_Comfortable', async({ page }) => {
  const mailnotread = new mailNotRead(page)
  const pending_PaymentNotReconciled = new PendingPaymentNotReconciled(page)
  await mailnotread.navigateURl()
  await mailnotread.validLogin(dataSet.username, dataSet.password)
  await mailnotread.clickonMessages()
  await pending_PaymentNotReconciled.clickonpendingPaymentNotReconciled()
  await expect(pending_PaymentNotReconciled.firstRow).toBeVisible()
  await pending_PaymentNotReconciled.clickOnDensity()
  await pending_PaymentNotReconciled.clickOnComfortable()

})
test('PendingPaymentNotReconciled_Navigate to PendingPaymentNotReconciled Page_Click On Density_Compact', async({ page }) => {
  const mailnotread = new mailNotRead(page)
  const pending_PaymentNotReconciled = new PendingPaymentNotReconciled(page)
  await mailnotread.navigateURl()
  await mailnotread.validLogin(dataSet.username, dataSet.password)
  await mailnotread.clickonMessages()
  await pending_PaymentNotReconciled.clickonpendingPaymentNotReconciled()
  await expect(pending_PaymentNotReconciled.firstRow).toBeVisible()
  await pending_PaymentNotReconciled.clickOnDensity()
  await pending_PaymentNotReconciled.clickOnCompact()
})
test('PendingPaymentNotReconciled_Navigate to PendingPaymentNotReconciled Page_Click On Density_Standard', async({ page }) => {
  const mailnotread = new mailNotRead(page)
  const pending_PaymentNotReconciled = new PendingPaymentNotReconciled(page)
  await mailnotread.navigateURl()
  await mailnotread.validLogin(dataSet.username, dataSet.password)
  await mailnotread.clickonMessages()
  await pending_PaymentNotReconciled.clickonpendingPaymentNotReconciled()
  await expect(pending_PaymentNotReconciled.firstRow).toBeVisible()
  await pending_PaymentNotReconciled.clickOnDensity()
  await pending_PaymentNotReconciled.clickOnStandard()
})
test   ('pendingpayment_Navigate to pendingpayment Page_Select Columns_ Hide All', async({ page }) => {
  const mailnotread = new mailNotRead(page)
  const pending_PaymentNotReconciled = new PendingPaymentNotReconciled(page)
  await mailnotread.navigateURl()
  await mailnotread.validLogin(dataSet.username, dataSet.password)
  await mailnotread.clickonMessages()
  await pending_PaymentNotReconciled.clickonpendingPaymentNotReconciled()
  await expect(pending_PaymentNotReconciled.firstRow).toBeVisible()
  await pending_PaymentNotReconciled.clickOnSelectColumn()
  await pending_PaymentNotReconciled.clickOnHideAll()

})
test('pendingpayment_Navigate to pendingpayment Page_Select Columns_ Show All', async({ page }) => {
  const mailnotread = new mailNotRead(page)
  const pending_PaymentNotReconciled = new PendingPaymentNotReconciled(page)
  await mailnotread.navigateURl()
  await mailnotread.validLogin(dataSet.username, dataSet.password)
  await mailnotread.clickonMessages()
  await pending_PaymentNotReconciled.clickonpendingPaymentNotReconciled()
  await expect(pending_PaymentNotReconciled.firstRow).toBeVisible()
  await pending_PaymentNotReconciled.clickOnSelectColumn()
  await pending_PaymentNotReconciled.clickOnHideAll()
  await pending_PaymentNotReconciled.clickOnShowAll()
})
test('pendingpayment_Navigate to pendingpayment Page_navigate to Account Deatils Page', async({ page }) => {
  const mailnotread = new mailNotRead(page)
  const pending_PaymentNotReconciled = new PendingPaymentNotReconciled(page)
  await mailnotread.navigateURl()
  await mailnotread.validLogin(dataSet.username, dataSet.password)
  await mailnotread.clickonMessages()
  await pending_PaymentNotReconciled.clickonpendingPaymentNotReconciled()
  await expect(pending_PaymentNotReconciled.firstRow).toBeVisible()
  await pending_PaymentNotReconciled.clickOnFirstCustomer()
  await pending_PaymentNotReconciled.clickonAccountDetails()
  await expect(pending_PaymentNotReconciled.firstRow).toBeVisible()
})
test('pendingpayment_Navigate to pendingpayment Page_navigate to Account Deatils/New Activity Page', async({ page }) => {
  const mailnotread = new mailNotRead(page)
  const pending_PaymentNotReconciled = new PendingPaymentNotReconciled(page)
  await mailnotread.navigateURl()
  await mailnotread.validLogin(dataSet.username, dataSet.password)
  await mailnotread.clickonMessages()
  await pending_PaymentNotReconciled.clickonpendingPaymentNotReconciled()
  await expect(pending_PaymentNotReconciled.firstRow).toBeVisible()
  await pending_PaymentNotReconciled.clickOnFirstCustomer()
  await pending_PaymentNotReconciled.clickOnAccountDetailsNewActivity()
  await expect(pending_PaymentNotReconciled.firstRow).toBeVisible()
})
test('pendingpayment_Navigate to pendingpayment Page_Export To Excel', async({ page }) => {
  const mailnotread = new mailNotRead(page)
  const pending_PaymentNotReconciled = new PendingPaymentNotReconciled(page)
  await mailnotread.navigateURl()
  await mailnotread.validLogin(dataSet.username, dataSet.password)
  await mailnotread.clickonMessages()
  await pending_PaymentNotReconciled.clickonpendingPaymentNotReconciled()
  await expect(pending_PaymentNotReconciled.firstRow).toBeVisible()
  await pending_PaymentNotReconciled.clickonExport()
  const downloadPromise = page.waitForEvent('download');
  const download = await downloadPromise;
  await download.saveAs('TestCases-ReactATC/test-results'+download.suggestedFilename())
 // await internalMessage.verifyDownloadMessage()
})
test('pendingpayment_Navigate to pendingpayment Page_Verify if the filter option is available', async ({ page }) => {
  const mailnotread = new mailNotRead(page)
  const pending_PaymentNotReconciled = new PendingPaymentNotReconciled(page)
  await mailnotread.navigateURl()
  await mailnotread.validLogin(dataSet.username, dataSet.password)
  await mailnotread.clickonMessages()
  await pending_PaymentNotReconciled.clickonpendingPaymentNotReconciled()
  await expect(pending_PaymentNotReconciled.firstRow).toBeVisible()
  await pending_PaymentNotReconciled.clickonfilter()
  await expect(pending_PaymentNotReconciled.firstRow).toBeVisible()
})
test('pendingpayment_Navigate to pendingpayment Page_Verify if the add filter option is available', async ({ page }) => {
  const mailnotread = new mailNotRead(page)
  const pending_PaymentNotReconciled = new PendingPaymentNotReconciled(page)
  await mailnotread.navigateURl()
  await mailnotread.validLogin(dataSet.username, dataSet.password)
  await mailnotread.clickonMessages()
  await pending_PaymentNotReconciled.clickonpendingPaymentNotReconciled()
  await pending_PaymentNotReconciled.clickonfilter()
  await pending_PaymentNotReconciled.addFilterbuttonavailable()

 });
 test('pendingpayment_Navigate to pendingpayment Page_Verify if the Remove All option is available', async ({ page }) => {
  const mailnotread = new mailNotRead(page)
  const pending_PaymentNotReconciled = new PendingPaymentNotReconciled(page)
  await mailnotread.navigateURl()
  await mailnotread.validLogin(dataSet.username, dataSet.password)
  await mailnotread.clickonMessages()
  await pending_PaymentNotReconciled.clickonpendingPaymentNotReconciled()
  await pending_PaymentNotReconciled.clickonfilter()
  await pending_PaymentNotReconciled.Removeallbuttonavailable()

 });





