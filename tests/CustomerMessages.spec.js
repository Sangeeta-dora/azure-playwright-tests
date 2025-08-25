const { test, expect } = require('@playwright/test');

const { mailNotRead } = require('../PageObjects/mailNotRead');
const {ActivityCommunicateWindow} = require('../PageObjects/ActivityCommunicateWindow')
const {CustomerMessages} = require('../PageObjects/CustomerMessages')
const { log } = require('console');
//JSON-> String->js Object
const dataSet = JSON.parse(JSON.stringify(require("../utils/TestData.json")))


test('Customer Message_Navigate to Customer Messages Page', async({ page }) => {
    const mailnotread = new mailNotRead(page)
    const customerMessages = new CustomerMessages(page)
    await mailnotread.navigateURl()
    await mailnotread.validLogin(dataSet.username, dataSet.password)
    await mailnotread.clickonMessages()
    await customerMessages.clikOnCustomerMessages()
    //await customerMessages.uncheckrestricted()
    await expect(customerMessages.firstRow).toBeVisible()

    //console.log(await page.textContent('page.locator('.MuiDataGrid-virtualScrollerRenderZone').locator('div[role="row"]').locator('div[aria-colindex="9"]').locator('.blueLink').nth(1)'));

  })

test('Customer Message_Navigate to Customer Messages Page_Refresh', async({ page }) => {
    const mailnotread = new mailNotRead(page)
    const customerMessages = new CustomerMessages(page)
    await mailnotread.navigateURl()
    await mailnotread.validLogin(dataSet.username, dataSet.password)
    await mailnotread.clickonMessages()
    await customerMessages.clikOnCustomerMessages()
    await customerMessages.uncheckrestricted()
    await expect(customerMessages.firstRow).toBeVisible()
    await customerMessages.clikonRefresh()
    await expect(customerMessages.firstRow).toBeVisible()

  })
  
test('Customer Message_Navigate to Customer Messages Page_BestFit', async({ page }) => {
    const mailnotread = new mailNotRead(page)
    const customerMessages = new CustomerMessages(page)
    await mailnotread.navigateURl()
    await mailnotread.validLogin(dataSet.username, dataSet.password)
    await mailnotread.clickonMessages()
    await customerMessages.clikOnCustomerMessages()
    await customerMessages.uncheckrestricted()
    await expect(customerMessages.firstRow).toBeVisible()
    await customerMessages.clickonBestFit()
    await expect(customerMessages.firstRow).toBeVisible()

  })

  test('Customer Message_Navigate to Customer Messages Page_Export To Excel', async({ page }) => {
    const mailnotread = new mailNotRead(page)
    const customerMessages = new CustomerMessages(page)
    await mailnotread.navigateURl()
    await mailnotread.validLogin(dataSet.username, dataSet.password)
    await mailnotread.clickonMessages()
    await customerMessages.clikOnCustomerMessages()
    await customerMessages.uncheckrestricted()
    await expect(customerMessages.firstRow).toBeVisible()
    await customerMessages.clickonExport()
    const downloadPromise = page.waitForEvent('download');
    const download = await downloadPromise;
    await download.saveAs('test-results/'+download.suggestedFilename())
    await customerMessages.verifyDownloadMessage()


  })

  test('Customer Message_Navigate to Customer Messages Page_Select Columns_ Hide All', async({ page }) => {
    const mailnotread = new mailNotRead(page)
    const customerMessages = new CustomerMessages(page)
    await mailnotread.navigateURl()
    await mailnotread.validLogin(dataSet.username, dataSet.password)
    await mailnotread.clickonMessages()
    await customerMessages.clikOnCustomerMessages()
    await customerMessages.uncheckrestricted()
    await expect(customerMessages.firstRow).toBeVisible()
    await customerMessages.clickOnSelectColumn()
    await customerMessages.clickOnHideAll()
    


  })

  test('Customer Message_Navigate to Customer Messages Page_Select Columns_ Show All', async({ page }) => {
    const mailnotread = new mailNotRead(page)
    const customerMessages = new CustomerMessages(page)
    await mailnotread.navigateURl()
    await mailnotread.validLogin(dataSet.username, dataSet.password)
    await mailnotread.clickonMessages()
    await customerMessages.clikOnCustomerMessages()
    await customerMessages.uncheckrestricted()
    await expect(customerMessages.firstRow).toBeVisible()
    await customerMessages.clickOnSelectColumn()
    await customerMessages.clickOnHideAll()
    await customerMessages.clickOnShowAll()
    
  })

  test('Customer Message_Navigate to Customer Messages Page_navigate to Account Deatils Page', async({ page }) => {
    const mailnotread = new mailNotRead(page)
    const customerMessages = new CustomerMessages(page)
    await mailnotread.navigateURl()
    await mailnotread.validLogin(dataSet.username, dataSet.password)
    await mailnotread.clickonMessages()
    await customerMessages.clikOnCustomerMessages()
    await customerMessages.uncheckrestricted()
    await expect(customerMessages.firstRow).toBeVisible()
    await customerMessages.clickOnFirstCustomer()
    await customerMessages.clickonAccountDetails()
    await expect(customerMessages.firstRow).toBeVisible()
    
  })

  test('Customer Message_Navigate to Customer Messages Page_navigate to Account Deatils/New Activity Page', async({ page }) => {
    const mailnotread = new mailNotRead(page)
    const customerMessages = new CustomerMessages(page)
    await mailnotread.navigateURl()
    await mailnotread.validLogin(dataSet.username, dataSet.password)
    await mailnotread.clickonMessages()
    await customerMessages.clikOnCustomerMessages()
    await customerMessages.uncheckrestricted()
    await expect(customerMessages.firstRow).toBeVisible()
    await customerMessages.clickOnFirstCustomer()
    await customerMessages.clickOnAccountDetailsNewActivity()
    await expect(customerMessages.firstRow).toBeVisible()
    
  })

  test('Customer Message_Navigate to Customer Messages Page_Click On Density_Comfortable', async({ page }) => {
    const mailnotread = new mailNotRead(page)
    const customerMessages = new CustomerMessages(page)
    await mailnotread.navigateURl()
    await mailnotread.validLogin(dataSet.username, dataSet.password)
    await mailnotread.clickonMessages()
    await customerMessages.clikOnCustomerMessages()
    await customerMessages.uncheckrestricted()
    await expect(customerMessages.firstRow).toBeVisible()
    await customerMessages.clickOnDensity()
    await customerMessages.clickOnComfortable()
    
  })

  test('Customer Message_Navigate to Customer Messages Page_Click On Density_Compact', async({ page }) => {
    const mailnotread = new mailNotRead(page)
    const customerMessages = new CustomerMessages(page)
    await mailnotread.navigateURl()
    await mailnotread.validLogin(dataSet.username, dataSet.password)
    await mailnotread.clickonMessages()
    await customerMessages.clikOnCustomerMessages()
    await customerMessages.uncheckrestricted()
    await expect(customerMessages.firstRow).toBeVisible()
    await customerMessages.clickOnDensity()
    await customerMessages.clickOnCompact()
    
  })

  test('Customer Message_Navigate to Customer Messages Page_Click On Density_Standard', async({ page }) => {
    const mailnotread = new mailNotRead(page)
    const customerMessages = new CustomerMessages(page)
    await mailnotread.navigateURl()
    await mailnotread.validLogin(dataSet.username, dataSet.password)
    await mailnotread.clickonMessages()
    await customerMessages.clikOnCustomerMessages()
    await customerMessages.uncheckrestricted()
    await expect(customerMessages.firstRow).toBeVisible()
    await customerMessages.clickOnDensity()
    await customerMessages.clickOnStandard()
    
  })