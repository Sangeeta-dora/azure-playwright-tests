const { test, expect } = require('@playwright/test');

const { mailNotRead } = require('../PageObjects/mailNotRead');
const {ActivityCommunicateWindow} = require('../PageObjects/ActivityCommunicateWindow')
const {ErrorSending} = require('../PageObjects/ErrorSending')
const { log } = require('console');
//JSON-> String->js Object
const dataSet = JSON.parse(JSON.stringify(require("../utils/TestData.json")))


test('Error Sending Email_Navigate to Error Sending Email Page', async({ page }) => {
    const mailnotread = new mailNotRead(page)
    const errorSending = new ErrorSending(page)
    await mailnotread.navigateURl()
    await mailnotread.validLogin(dataSet.username, dataSet.password)
    await mailnotread.clickonMessages()
    await errorSending.clikOnErrorSending()
    await expect(errorSending.firstRow).toBeVisible()

  })

  test('Error Sending Email_Navigate to Error Sending Email Page_Refresh', async({ page }) => {
    const mailnotread = new mailNotRead(page)
    const errorSending = new ErrorSending(page)
    await mailnotread.navigateURl()
    await mailnotread.validLogin(dataSet.username, dataSet.password)
    await mailnotread.clickonMessages()
    await errorSending.clikOnErrorSending()
    await expect(errorSending.firstRow).toBeVisible()
    await errorSending.clikonRefresh()
    await expect(errorSending.firstRow).toBeVisible()

  })
  
  test('Error Sending Email_Navigate to Error Sending Email Page_BestFit', async({ page }) => {
    const mailnotread = new mailNotRead(page)
    const errorSending = new ErrorSending(page)
    await mailnotread.navigateURl()
    await mailnotread.validLogin(dataSet.username, dataSet.password)
    await mailnotread.clickonMessages()
    await errorSending.clikOnErrorSending()
    await expect(errorSending.firstRow).toBeVisible()
    await errorSending.clickonBestFit()
    await expect(errorSending.firstRow).toBeVisible()

  })

  test('Error Sending Email_Navigate to Error Sending Email Page_Export To Excel', async({ page }) => {
    const mailnotread = new mailNotRead(page)
    const errorSending = new ErrorSending(page)
    await mailnotread.navigateURl()
    await mailnotread.validLogin(dataSet.username, dataSet.password)
    await mailnotread.clickonMessages()
    await errorSending.clikOnErrorSending()
    await expect(errorSending.firstRow).toBeVisible()
    await errorSending.clickonExport()
    const downloadPromise = page.waitForEvent('download');
    const download = await downloadPromise;
    await download.saveAs('TestCases-ReactATC/test-results/'+download.suggestedFilename())
    await errorSending.verifyDownloadMessage()


  })

  test('Error Sending Email_Navigate to Error Sending Email Page_Select Columns_ Hide All', async({ page }) => {
    const mailnotread = new mailNotRead(page)
    const errorSending = new ErrorSending(page)
    await mailnotread.navigateURl()
    await mailnotread.validLogin(dataSet.username, dataSet.password)
    await mailnotread.clickonMessages()
    await errorSending.clikOnErrorSending()
    await expect(errorSending.firstRow).toBeVisible()
    await errorSending.clickOnSelectColumn()
    await errorSending.clickOnHideAll()
    


  })

  test('Error Sending Email_Navigate to Error Sending Email Page_Select Columns_ Show All', async({ page }) => {
    const mailnotread = new mailNotRead(page)
    const errorSending = new ErrorSending(page)
    await mailnotread.navigateURl()
    await mailnotread.validLogin(dataSet.username, dataSet.password)
    await mailnotread.clickonMessages()
    await errorSending.clikOnErrorSending()
    await expect(errorSending.firstRow).toBeVisible()
    await errorSending.clickOnSelectColumn()
    await errorSending.clickOnHideAll()
    await errorSending.clickOnShowAll()
    
  })

  test('Error Sending Email_Navigate to Error Sending Email Page_navigate to Account Deatils Page', async({ page }) => {
    const mailnotread = new mailNotRead(page)
    const errorSending = new ErrorSending(page)
    await mailnotread.navigateURl()
    await mailnotread.validLogin(dataSet.username, dataSet.password)
    await mailnotread.clickonMessages()
    await errorSending.clikOnErrorSending()
    await expect(errorSending.firstRow).toBeVisible()
    await errorSending.clickOnFirstCustomer()
    await errorSending.clickonAccountDetails()
    await expect(errorSending.firstRow).toBeVisible()
    
  })

  test('Error Sending Email_Navigate to Error Sending Email Page_navigate to Account Deatils/New Activity Page', async({ page }) => {
    const mailnotread = new mailNotRead(page)
    const errorSending = new ErrorSending(page)
    await mailnotread.navigateURl()
    await mailnotread.validLogin(dataSet.username, dataSet.password)
    await mailnotread.clickonMessages()
    await errorSending.clikOnErrorSending()
    await expect(errorSending.firstRow).toBeVisible()
    await errorSending.clickOnFirstCustomer()
    await errorSending.clickOnAccountDetailsNewActivity()
    await expect(errorSending.firstRow).toBeVisible()
    
  })

  test('Error Sending Email_Navigate to Error Sending Email Page_Click On Density_Comfortable', async({ page }) => {
    const mailnotread = new mailNotRead(page)
    const errorSending = new ErrorSending(page)
    await mailnotread.navigateURl()
    await mailnotread.validLogin(dataSet.username, dataSet.password)
    await mailnotread.clickonMessages()
    await errorSending.clikOnErrorSending()
    await expect(errorSending.firstRow).toBeVisible()
    await errorSending.clickOnDensity()
    await errorSending.clickOnComfortable()
    
  })

  test('Error Sending Email_Navigate to Error Sending Email Page_Click On Density_Compact', async({ page }) => {
    const mailnotread = new mailNotRead(page)
    const errorSending = new ErrorSending(page)
    await mailnotread.navigateURl()
    await mailnotread.validLogin(dataSet.username, dataSet.password)
    await mailnotread.clickonMessages()
    await errorSending.clikOnErrorSending()
    await expect(errorSending.firstRow).toBeVisible()
    await errorSending.clickOnDensity()
    await errorSending.clickOnCompact()
    
  })

  test('Error Sending Email_Navigate to Error Sending Email Page_Click On Density_Standard', async({ page }) => {
    const mailnotread = new mailNotRead(page)
    const errorSending = new ErrorSending(page)
    await mailnotread.navigateURl()
    await mailnotread.validLogin(dataSet.username, dataSet.password)
    await mailnotread.clickonMessages()
    await errorSending.clikOnErrorSending()
    await expect(errorSending.firstRow).toBeVisible()
    await errorSending.clickOnDensity()
    await errorSending.clickOnStandard()
    
  })



