const { test, expect } = require('@playwright/test');

const { mailNotRead } = require('../PageObjects/mailNotRead');
const {ActivityCommunicateWindow} = require('../PageObjects/ActivityCommunicateWindow')
const {InternalMessage} = require('../PageObjects/InternalMessage')
const { log } = require('console');
//JSON-> String->js Object
const dataSet = JSON.parse(JSON.stringify(require("../utils/TestData.json")))


test('Internal message_Navigate to internal Message Page', async({ page }) => {
    const mailnotread = new mailNotRead(page)
    const internalMessage = new InternalMessage(page)
    await mailnotread.navigateURl()
    await mailnotread.validLogin(dataSet.username, dataSet.password)
    await mailnotread.clickonMessages()
    await internalMessage.clickoninternalmessage()
    await internalMessage.Internalmessageuncheck()
    await expect(internalMessage.firstRow).toBeVisible()

  })
  test('Internal message_Navigate to Internal message Page_Refresh', async({ page }) => {
    const mailnotread = new mailNotRead(page)
    const internalMessage = new InternalMessage(page)
    await mailnotread.navigateURl()
    await mailnotread.validLogin(dataSet.username, dataSet.password)
    await mailnotread.clickonMessages()
    await internalMessage.clickoninternalmessage()
    await internalMessage.Internalmessageuncheck()
    await expect(internalMessage.firstRow).toBeVisible()
    await internalMessage.clickonrefresh()
    await expect(internalMessage.firstRow).toBeVisible()


  })
  
  test('Internal Message_Navigate to Internal Message Page_BestFit', async({ page }) => {
    const mailnotread = new mailNotRead(page)
    const internalMessage = new InternalMessage(page)
    await mailnotread.navigateURl()
    await mailnotread.validLogin(dataSet.username, dataSet.password)
    await mailnotread.clickonMessages()
    await internalMessage.clickoninternalmessage()
    await internalMessage.Internalmessageuncheck()
    await expect(internalMessage.firstRow).toBeVisible()
    await internalMessage.clickonBestFit()
    await expect(internalMessage.firstRow).toBeVisible()


  })
  test('Internal Message_Navigate to Internal Message Page_Click On Density_Comfortable', async({ page }) => {
    const mailnotread = new mailNotRead(page)
    const internalMessage = new InternalMessage(page)
    await mailnotread.navigateURl()
    await mailnotread.validLogin(dataSet.username, dataSet.password)
    await mailnotread.clickonMessages()
    await internalMessage.clickoninternalmessage()
    await internalMessage.Internalmessageuncheck()
    await expect(internalMessage.firstRow).toBeVisible()
    await internalMessage.clickOnDensity()
    await internalMessage.clickOnComfortable()
    
  })

  test('Internal Message_Navigate to Internal Message_Click On Density_Compact', async({ page }) => {
    const mailnotread = new mailNotRead(page)
    const internalMessage = new InternalMessage(page)
    await mailnotread.navigateURl()
    await mailnotread.validLogin(dataSet.username, dataSet.password)
    await mailnotread.clickonMessages()
    await internalMessage.clickoninternalmessage()
    await internalMessage.Internalmessageuncheck()
    await expect(internalMessage.firstRow).toBeVisible()
    await internalMessage.clickOnDensity()
    await internalMessage.clickOnCompact()
    
  })

  test('Internal Message_Navigate to Internal message Page_Click On Density_Standard', async({ page }) => {
    const mailnotread = new mailNotRead(page)
    const internalMessage = new InternalMessage(page)
    await mailnotread.navigateURl()
    await mailnotread.validLogin(dataSet.username, dataSet.password)
    await mailnotread.clickonMessages()
    await internalMessage.clickoninternalmessage()
    await internalMessage.Internalmessageuncheck()
    await expect(internalMessage.firstRow).toBeVisible()
    await internalMessage.clickOnDensity()
    await internalMessage.clickOnStandard()
    
  })
  test('Internal Message_Navigate to Internal Message_Select Columns_ Hide All', async({ page }) => {
    const mailnotread = new mailNotRead(page)
    const internalMessage = new InternalMessage(page)
    await mailnotread.navigateURl()
    await mailnotread.validLogin(dataSet.username, dataSet.password)
    await mailnotread.clickonMessages()
    await internalMessage.clickoninternalmessage()
    await internalMessage.Internalmessageuncheck()
    await expect(internalMessage.firstRow).toBeVisible()
    await internalMessage.clickOnSelectColumn()
    await internalMessage.clickOnHideAll()

  })

  test('Internal Message_Navigate to Internal Message Page_Select Columns_ Show All', async({ page }) => {
    const mailnotread = new mailNotRead(page)
    const internalMessage = new InternalMessage(page)
    await mailnotread.navigateURl()
    await mailnotread.validLogin(dataSet.username, dataSet.password)
    await mailnotread.clickonMessages()
    await internalMessage.clickoninternalmessage()
    await internalMessage.Internalmessageuncheck()
    await expect(internalMessage.firstRow).toBeVisible()
    await internalMessage.clickOnSelectColumn()
    await internalMessage.clickOnHideAll()
    await internalMessage.clickOnShowAll()
    
  })
  test('Internal Message_Navigate to Internal Message Page_navigate to Account Deatils Page', async({ page }) => {
    const mailnotread = new mailNotRead(page)
    const internalMessage = new InternalMessage(page)
    await mailnotread.navigateURl()
    await mailnotread.validLogin(dataSet.username, dataSet.password)
    await mailnotread.clickonMessages()
    await internalMessage.clickoninternalmessage()
    await internalMessage.Internalmessageuncheck()
    await expect(internalMessage.firstRow).toBeVisible()
    await internalMessage.clickOnFirstCustomer()
    await internalMessage.clickonAccountDetails()
    await expect(internalMessage.firstRow).toBeVisible()
    
  })

  test('Internal Message_Navigate to Internal Message Page_navigate to Account Deatils/New Activity Page', async({ page }) => {
    const mailnotread = new mailNotRead(page)
    const internalMessage = new InternalMessage(page)
    await mailnotread.navigateURl()
    await mailnotread.validLogin(dataSet.username, dataSet.password)
    await mailnotread.clickonMessages()
    await internalMessage.clickoninternalmessage()
    await internalMessage.Internalmessageuncheck()
    await expect(internalMessage.firstRow).toBeVisible()
    await internalMessage.clickOnFirstCustomer()
    await internalMessage.clickOnAccountDetailsNewActivity()
    await expect(internalMessage.firstRow).toBeVisible()
    
  })
  test('Navigate to Internal Message _Navigate to Internal Message Page_Export To Excel', async({ page }) => {
    const mailnotread = new mailNotRead(page)
    const internalMessage = new InternalMessage(page)
    await mailnotread.navigateURl()
    await mailnotread.validLogin(dataSet.username, dataSet.password)
    await mailnotread.clickonMessages()
    await internalMessage.clickoninternalmessage()
    await internalMessage.Internalmessageuncheck()
    await expect(internalMessage.firstRow).toBeVisible()
    await internalMessage.clickonExport()
    const downloadPromise = page.waitForEvent('download');
    const download = await downloadPromise;
    await download.saveAs('test-results'+download.suggestedFilename())
   // await internalMessage.verifyDownloadMessage()
  })
  test('Navigate to internal message_Verify if the filter option is available', async ({ page }) => {
    const mailnotread = new mailNotRead(page)
    const internalMessage = new InternalMessage(page)
    await mailnotread.navigateURl()
    await mailnotread.validLogin(dataSet.username, dataSet.password)
    await mailnotread.clickonMessages()
    await internalMessage.clickoninternalmessage()
    await internalMessage.Internalmessageuncheck()
    await expect(internalMessage.firstRow).toBeVisible()
    await internalMessage.clickonfilter()
    await expect(internalMessage.firstRow).toBeVisible()
  })
  test('Internal Message_Verify if the add filter option is available', async ({ page }) => {
    const mailnotread = new mailNotRead(page)
    const internalMessage = new InternalMessage(page)
    await mailnotread.navigateURl()
    await mailnotread.validLogin(dataSet.username, dataSet.password)
    await mailnotread.clickonMessages()
    await internalMessage.clickoninternalmessage()
    await internalMessage.Internalmessageuncheck()
    await internalMessage.clickonfilter()
    await internalMessage.addFilterbuttonavailable()

   })
   test('Internal Message_Verify if the Remove All option is available', async ({ page }) => {
    const internalMessage = new InternalMessage(page)
    const mailnotread = new mailNotRead(page)
    await mailnotread.navigateURl()
    await mailnotread.validLogin(dataSet.username, dataSet.password)
    await mailnotread.clickonMessages()
    await internalMessage.clickoninternalmessage()
    await internalMessage.Internalmessageuncheck()
    await internalMessage.clickonfilter()
    await internalMessage.Removeallbuttonavailable()
   })

  