const { test, expect } = require('@playwright/test');

const { mailNotRead } = require('../PageObjects/mailNotRead');
const {ActivityCommunicateWindow} = require('../PageObjects/ActivityCommunicateWindow')
const {CustomerMessages} = require('../PageObjects/CustomerMessages')
const {ExpectedPaymentsPromiseBroken} = require('../PageObjects/ExpectedPaymentsPromiseBroken')
const { log } = require('console');
//JSON-> String->js Object
const dataSet = JSON.parse(JSON.stringify(require("../utils/TestData.json")))

test('Expected Payments_Navigate to Expected Payments Page', async({ page }) => {
    const mailnotread = new mailNotRead(page)
    const customerMessages = new CustomerMessages(page)
    const expected = new ExpectedPaymentsPromiseBroken(page)
    await mailnotread.navigateURl()
    await mailnotread.validLogin(dataSet.username, dataSet.password)
    await mailnotread.clickonMessages()
    await expected.clickOnExpectedPayments()
    await expect(expected.firstRow).toBeVisible()

    //console.log(await page.textContent('page.locator('.MuiDataGrid-virtualScrollerRenderZone').locator('div[role="row"]').locator('div[aria-colindex="9"]').locator('.blueLink').nth(1)'));

  })

  test('Expected Payments_Click On refresh', async({ page }) => {
    const mailnotread = new mailNotRead(page)
    const customerMessages = new CustomerMessages(page)
    const expected = new ExpectedPaymentsPromiseBroken(page)
    await mailnotread.navigateURl()
    await mailnotread.validLogin(dataSet.username, dataSet.password)
    await mailnotread.clickonMessages()
    await expected.clickOnExpectedPayments()
    await expect(expected.firstRow).toBeVisible()
    await expected.clickonRefresh()
     
  })

  test('Expected Payments_Click On bestfit', async({ page }) => {
    const mailnotread = new mailNotRead(page)
    const customerMessages = new CustomerMessages(page)
    const expected = new ExpectedPaymentsPromiseBroken(page)
    await mailnotread.navigateURl()
    await mailnotread.validLogin(dataSet.username, dataSet.password)
    await mailnotread.clickonMessages()
    await expected.clickOnExpectedPayments()
    await expect(expected.firstRow).toBeVisible()
    await expected.clickonBestFit()
     
  })

  test('Expected Payments_Click On Density_Comfortable', async({ page }) => {
    const mailnotread = new mailNotRead(page)
    const customerMessages = new CustomerMessages(page)
    const expected = new ExpectedPaymentsPromiseBroken(page)
    await mailnotread.navigateURl()
    await mailnotread.validLogin(dataSet.username, dataSet.password)
    await mailnotread.clickonMessages()
    await expected.clickOnExpectedPayments()
    await expect(expected.firstRow).toBeVisible()
    await expected.clickondensity()
    await expected.clickoncomfortable()
  })

  test('Expected Payments_Click On Density_Compact', async({ page }) => {
    const mailnotread = new mailNotRead(page)
    const customerMessages = new CustomerMessages(page)
    const expected = new ExpectedPaymentsPromiseBroken(page)
    await mailnotread.navigateURl()
    await mailnotread.validLogin(dataSet.username, dataSet.password)
    await mailnotread.clickonMessages()
    await expected.clickOnExpectedPayments()
    await expect(expected.firstRow).toBeVisible()
    await expected.clickondensity()
    await expected.clickoncompact()
  })

  test('Expected Payments_Click On Density_Standard', async({ page }) => {
    const mailnotread = new mailNotRead(page)
    const customerMessages = new CustomerMessages(page)
    const expected = new ExpectedPaymentsPromiseBroken(page)
    await mailnotread.navigateURl()
    await mailnotread.validLogin(dataSet.username, dataSet.password)
    await mailnotread.clickonMessages()
    await expected.clickOnExpectedPayments()
    await expect(expected.firstRow).toBeVisible()
    await expected.clickondensity()
    await expected.clickoncompact()
  })


  test('Expected payments_Click oN Export To Excel', async({ page }) => {
    const mailnotread = new mailNotRead(page)
    const expected = new ExpectedPaymentsPromiseBroken(page)
    await mailnotread.navigateURl()
    await mailnotread.validLogin(dataSet.username, dataSet.password)
    await mailnotread.clickonMessages()
    await expected.clickOnExpectedPayments()
    await expect(expected.firstRow).toBeVisible()
    await expected.clickOnExport()
    const downloadPromise = page.waitForEvent('download');
    const download = await downloadPromise;
    await download.saveAs('TestCases-ReactATC/test-results/'+download.suggestedFilename())
  


  })

  test('Expected payments_Open Account Details', async({ page }) => {
    const mailnotread = new mailNotRead(page)
    const expected = new ExpectedPaymentsPromiseBroken(page)
    await mailnotread.navigateURl()
    await mailnotread.validLogin(dataSet.username, dataSet.password)
    await mailnotread.clickonMessages()
    await expected.clickOnExpectedPayments()
    await expect(expected.firstRow).toBeVisible()
    await expected.clickonFirstcustName()
    await expected.clickOnAccountDetails()
    await expect(expected.firstRow).toBeVisible()
    


  })
  test('Expected payments_Open Account Details/New Activity', async({ page }) => {
    const mailnotread = new mailNotRead(page)
    const expected = new ExpectedPaymentsPromiseBroken(page)
    await mailnotread.navigateURl()
    await mailnotread.validLogin(dataSet.username, dataSet.password)
    await mailnotread.clickonMessages()
    await expected.clickOnExpectedPayments()
    await expect(expected.firstRow).toBeVisible()
    await expected.clickonFirstcustName()
    await expected.clickOnaccountDetailsNewActivity()
    await expect(expected.firstRow).toBeVisible()

  })





