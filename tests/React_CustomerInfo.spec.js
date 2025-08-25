// import { test, expect } from '@playwright/test';
const { test, expect } = require('@playwright/test');
const delay = ms => new Promise(resolve => setTimeout(resolve, ms))
const { mailNotRead } = require('../PageObjects/mailNotRead');
const { LoginPage } = require('../PageObjects/LoginPage');
const {Messages} = require("../PageObjects/Messages")
const { CustomerInfo } = require('../PageObjects/CustomerInfo');
const { log, clear } = require('console');
//const { v4: uuidv4 } = require("uuid");
const dataSet = JSON.parse(JSON.stringify(require("../utils/TestData.json")))
const config = require('../config.js');
require('dotenv').config();
const env = process.env.ENVIRONMENT;
const envConfig = config[env];



test('Customer Info_Verify that Customer Info section is available when user navigates from the customer section dropdown', async ({ page }) => {

    const loginPage = new LoginPage(page)
  await loginPage.navigateTo(envConfig.baseURL);
  await loginPage.login(envConfig.userName, envConfig.password);
    const customerInfo = new CustomerInfo(page)
    await customerInfo.searchCustomer()
    await customerInfo.customerInfoSection()
    
 
});

test('Customer Info_Credit_Customer is able to click on  edit payment method option in credit section', async ({ page }) => {

    const loginPage = new LoginPage(page)
    await loginPage.navigateTo(envConfig.baseURL);
    await loginPage.login(envConfig.userName, envConfig.password);
    const messages = new Messages(page)
    const customerInfo = new CustomerInfo(page)
    await customerInfo.searchCustomer()
    await customerInfo.editPaymentMethod()
    await page.screenshot({ path: 'Edit Payment Method.png' });
    
 
});

test('Customer Info_Credit_Customer is able to Add new record in edit payment method option in credit section', async ({ page }) => {

    const loginPage = new LoginPage(page)
    await loginPage.navigateTo(envConfig.baseURL);
    await loginPage.login(envConfig.userName, envConfig.password);
    const messages = new Messages(page)
    const customerInfo = new CustomerInfo(page)
    await customerInfo.searchCustomer()
    await customerInfo.editPaymentMethod()
    await expect(customerInfo.accHolderName).toBeVisible();
    await page.screenshot({ path: 'Add New Record.png', fullPage: true });

});

test('Customer Info_Credit_Customer is able to delete record in edit payment method option in credit section', async ({ page }) => {

    const loginPage = new LoginPage(page)
    await loginPage.navigateTo(envConfig.baseURL);
    await loginPage.login(envConfig.userName, envConfig.password);
    const messages = new Messages(page)
    const customerInfo = new CustomerInfo(page)
    await customerInfo.searchCustomer()
    await expect(customerInfo.editPM).toBeVisible();
    await customerInfo.editPM.click()
    await customerInfo.deletePM.click()
    await expect(customerInfo.deletePMPopUp).toBeVisible();
    await page.screenshot({ path: 'Delete Payment Method.png' });

});



test('Customer Info_Credit_Customer is able to edit record in edit payment method option in credit section', async ({ page }) => {

    const loginPage = new LoginPage(page)
    await loginPage.navigateTo(envConfig.baseURL);
    await loginPage.login(envConfig.userName, envConfig.password);
    const messages = new Messages(page)
    const customerInfo = new CustomerInfo(page)
    await customerInfo.searchCustomer()
    await expect(customerInfo.editPM).toBeVisible();
    await customerInfo.editPM.click()
    await customerInfo.deletePaymentMethod();
    await customerInfo.editPMRecord.click()
    await customerInfo.paymentMethodTitle.fill(dataSet.UpdatePaymentMethodName);
    await customerInfo.updatePM.click();
    // await expect(customerInfo.waitingScreen).toBeVisible();
    // await expect(customerInfo.waitingScreen).toBeHidden();
    const PayMethodUpdateText = await (customerInfo.PMUpdateName).textContent();
    await expect(PayMethodUpdateText).toEqual(dataSet.UpdatePaymentMethodName);
    await page.screenshot({ path: 'Update Payment Method Record.png' });

});

test('Customer Info_Credit_Customer is able to refresh record in edit payment method option in credit section', async ({ page }) => {

    const loginPage = new LoginPage(page)
    await loginPage.navigateTo(envConfig.baseURL);
    await loginPage.login(envConfig.userName, envConfig.password);
    const messages = new Messages(page)
    const customerInfo = new CustomerInfo(page)
    await customerInfo.searchCustomer()
    await expect(customerInfo.editPM).toBeVisible();
    await customerInfo.editPM.click()
    const recordCount1= await (customerInfo.recordCountPM).textContent();
    const recordCountBefore = recordCount1.split(" ").pop();
    console.log("Records Before"+recordCountBefore);
    await customerInfo.deletePaymentMethod();
    await customerInfo.refreshPM.click()
    await expect(customerInfo.recordRefresh).toBeVisible();
    const recordCount2= await (customerInfo.recordCountPM).textContent();
    const recordCountAfter = recordCount2.split(" ").pop();
    console.log("Records After"+recordCountAfter);
    await page.screenshot({ path: 'Refresh Payment Method.png', fullPage: true });

});

test('Customer Info_Credit_Customer is able to edit credit section', async ({ page }) => {

    const loginPage = new LoginPage(page)
    await loginPage.navigateTo(envConfig.baseURL);
    await loginPage.login(envConfig.userName, envConfig.password);
    const messages = new Messages(page)
    const customerInfo = new CustomerInfo(page)
    await customerInfo.searchCustomer()
    await customerInfo.editCreditSection.click()

});

test('Customer Info_Credit_Customer is able to edit credit section(Save Button)', async ({ page }) => {

    const loginPage = new LoginPage(page)
    await loginPage.navigateTo(envConfig.baseURL);
    await loginPage.login(envConfig.userName, envConfig.password);
    const messages = new Messages(page)
    const customerInfo = new CustomerInfo(page)
    await customerInfo.searchCustomer()
    await customerInfo.editCreditSectionMethod();
    await page.screenshot({ path: 'Edit Credit Section.png' });

});

test('Customer Info_Credit_Customer is able to edit credit section(Cancel  Button)', async ({ page }) => {

    const loginPage = new LoginPage(page)
    await loginPage.navigateTo(envConfig.baseURL);
    await loginPage.login(envConfig.userName, envConfig.password);
    const messages = new Messages(page)
    const customerInfo = new CustomerInfo(page)
    await customerInfo.searchCustomer()
    await customerInfo.editCreditSection.click()
    await customerInfo.cancelCS.click()

});

test('Customer Info_Info_Customer is able to edit info section(Save Button)', async ({ page }) => {

    const loginPage = new LoginPage(page)
    await loginPage.navigateTo(envConfig.baseURL);
    await loginPage.login(envConfig.userName, envConfig.password);
    const messages = new Messages(page)
    const customerInfo = new CustomerInfo(page)
    await customerInfo.searchCustomer()
    await customerInfo.infoTab.click()
    await customerInfo.editInfoSection.click();
    await customerInfo.infoDaysToRespond.fill(dataSet.InfoDaysToRespond)
    await customerInfo.saveCS.click()

});

test('Customer Info_Info_Customer is able to edit info section(Cancel Button)', async ({ page }) => {

    const loginPage = new LoginPage(page)
    await loginPage.navigateTo(envConfig.baseURL);
    await loginPage.login(envConfig.userName, envConfig.password);
    const messages = new Messages(page)
    const customerInfo = new CustomerInfo(page)
    await customerInfo.searchCustomer()
    await customerInfo.infoTab.click()
    await customerInfo.editInfoSection.click();
    await customerInfo.cancelCS.click()

});

test('Customer Info_Contacts_Customer is able to add contacts in the contacts section', async ({ page }) => {

    const loginPage = new LoginPage(page)
    await loginPage.navigateTo(envConfig.baseURL);
    await loginPage.login(envConfig.userName, envConfig.password);
    const messages = new Messages(page)
    const customerInfo = new CustomerInfo(page)
    await customerInfo.searchCustomer()
    await customerInfo.addContactMethod(" "," "," " )
    await page.screenshot({ path: 'Add Contact Button.png' });

});

test('Customer Info_Contacts_Customer is able to add contacts in the contacts section (Save Button)', async ({ page }) => {

    const loginPage = new LoginPage(page)
    await loginPage.navigateTo(envConfig.baseURL);
    await loginPage.login(envConfig.userName, envConfig.password);
    const messages = new Messages(page)
    const customerInfo = new CustomerInfo(page)
    await customerInfo.searchCustomer()
    const serialNumber = (uuidv4().slice(-6))
    await customerInfo.addContactMethod((dataSet.ContactName)+serialNumber,dataSet.ContactEmail, dataSet.ContactEmail2 )
    await customerInfo.saveCS.click();
    await expect(customerInfo.pageLoadSymbol).toBeHidden();
    await expect(page.getByRole('cell', { name: (dataSet.ContactName)+serialNumber })).toBeVisible();
    await page.getByRole('cell', { name: (dataSet.ContactName)+serialNumber }).screenshot({ path: 'Add Contact Name.png' });

});

test('Customer Info_Contacts_Customer is able to add contacts in the contacts section (Cancel Button)', async ({ page }) => {

    const loginPage = new LoginPage(page)
    await loginPage.navigateTo(envConfig.baseURL);
    await loginPage.login(envConfig.userName, envConfig.password);
    const messages = new Messages(page)
    const customerInfo = new CustomerInfo(page)
    await customerInfo.searchCustomer()
    await customerInfo.addContactMethod(" "," "," " )
    await expect(customerInfo.cancelCS).toBeVisible()
    await customerInfo.cancelCS.click()

});

test('Customer Info_Contacts_Customer is able to delete contacts in the contacts section', async ({ page }) => {

    const loginPage = new LoginPage(page)
    await loginPage.navigateTo(envConfig.baseURL);
    await loginPage.login(envConfig.userName, envConfig.password);
    const messages = new Messages(page)
    const customerInfo = new CustomerInfo(page)
    await customerInfo.searchCustomer()
    await customerInfo.customerContact.click()
    await expect(customerInfo.selectContact).toBeVisible()
    await customerInfo.selectContact.check()
    await customerInfo.editInfoSection.click();
    await customerInfo.InactiveCheckBox.check()
    await customerInfo.saveCS.click()
    await customerInfo.scrollRight.click()
    await page.keyboard.press('Tab');
    await expect(customerInfo.deleteButton).toBeVisible();
    await customerInfo.deleteButton.click()
    await expect(customerInfo.deleteContactPopUp).toBeVisible()
    await customerInfo.deleteOK.click()
       

});

test('Customer Info_Contacts_Customer is able to add contacts in the contacts section (UDF option)', async ({ page }) => {

    const loginPage = new LoginPage(page)
    await loginPage.navigateTo(envConfig.baseURL);
    await loginPage.login(envConfig.userName, envConfig.password);
    const messages = new Messages(page)
    const customerInfo = new CustomerInfo(page)
    await customerInfo.searchCustomer()
    await customerInfo.customerContact.click()
    await expect(customerInfo.selectContact).toBeVisible()
    await customerInfo.selectContact.check()
    await customerInfo.contactUDF.click()
    await customerInfo.editInfoSection.click();
    await customerInfo.contactUDF1.fill(dataSet.UDF1);
    await customerInfo.saveCS.click()
    await customerInfo.selectContact.check()
    await expect(customerInfo.contactUDF1).toBeVisible()
    const value= await (customerInfo.contactUDF1).inputValue()
    await expect(dataSet.UDF1).toEqual(value)


});

test('Customer Info_Account Notes_Validate that user is able to add account notes', async ({ page }) => {

    const loginPage = new LoginPage(page)
    await loginPage.navigateTo(envConfig.baseURL);
    await loginPage.login(envConfig.userName, envConfig.password);
    const messages = new Messages(page)
    const customerInfo = new CustomerInfo(page)
    await customerInfo.searchCustomer()
    await customerInfo.customerAccountNotes.click()
    await customerInfo.addNote.click()
    await customerInfo.noteTextBox.fill(dataSet.NoteText)
    await customerInfo.deleteOK.click()
    await expect(page.getByText(dataSet.NoteText+NoteNumber).first()).toBeVisible()
    await page.screenshot({ path: 'Add Notes.png' });
    

});

test('Customer Info_Account Notes_Validate that user is able to delete account notes', async ({ page }) => {

    const loginPage = new LoginPage(page)
    await loginPage.navigateTo(envConfig.baseURL);
    await loginPage.login(envConfig.userName, envConfig.password);
    const messages = new Messages(page)
    const customerInfo = new CustomerInfo(page)
    await customerInfo.searchCustomer()
    await customerInfo.customerAccountNotes.click()
    await customerInfo.addNote.click()
    await customerInfo.noteTextBox.fill(dataSet)
    await customerInfo.deleteOK.click()
    await expect(page.getByText(dataSet.NoteText).first()).toBeVisible()
    await customerInfo.deleteNote.click()


});

test('Customer Info_Account Notes_Validate that user is able to  add account notes (cancel button)', async ({ page }) => {

    const loginPage = new LoginPage(page)
    await loginPage.navigateTo(envConfig.baseURL);
    await loginPage.login(envConfig.userName, envConfig.password);
    const messages = new Messages(page)
    const customerInfo = new CustomerInfo(page)
    await customerInfo.searchCustomer()
    await customerInfo.customerAccountNotes.click()
    await customerInfo.addNote.click()
    await customerInfo.noteTextBox.fill(dataSet.NoteText)
    await customerInfo.cancelPM.click()


});

test('Customer Info_Contacts_Customer is able to navigate on History section', async ({ page }) => {

    const loginPage = new LoginPage(page)
    await loginPage.navigateTo(envConfig.baseURL);
    await loginPage.login(envConfig.userName, envConfig.password);
    const messages = new Messages(page)
    const customerInfo = new CustomerInfo(page)
    await customerInfo.searchCustomer()
    await customerInfo.customerHistory.click()
    await expect(customerInfo.historyAvgDays).toBeVisible()
    await expect(customerInfo.historyDueDate).toBeVisible()
    await page.screenshot({ path: 'Customer History Page.png' });

})

test('Customer Info_Contacts_Customer is able to navigate on Rolled Up History section', async ({ page }) => {

    const loginPage = new LoginPage(page)
    await loginPage.navigateTo(envConfig.baseURL);
    await loginPage.login(envConfig.userName, envConfig.password);
    const messages = new Messages(page)
    const customerInfo = new CustomerInfo(page)
    await customerInfo.searchCustomer()
    await customerInfo.customerRolledUpHistory.click()
    await expect(customerInfo.historyAvgDays).toBeVisible()
    await expect(customerInfo.historyDueDate).toBeVisible()
    await page.screenshot({ path: 'Customer Rolled Up History Page.png' });

});

test('Customer Info_Contacts_Customer is able to navigate on Transactions section', async ({ page }) => {

    const loginPage = new LoginPage(page)
    await loginPage.navigateTo(envConfig.baseURL);
    await loginPage.login(envConfig.userName, envConfig.password);
    const messages = new Messages(page)
    const customerInfo = new CustomerInfo(page)
    await customerInfo.searchCustomer()
    await customerInfo.customerTransaction.click()
    await expect((customerInfo.custTransDate).first()).toBeVisible()
    await expect((customerInfo.custTransDate).nth(1)).toBeVisible()
    await expect((customerInfo.custTransAmount).first()).toBeVisible()
    await expect((customerInfo.custTransAmount).nth(1)).toBeVisible()
    await expect(customerInfo.custTransBalance).toBeVisible()
    await page.screenshot({ path: 'Customer Transactions Page.png' });

});

test('Customer Info_Contacts_Customer is able to navigate on NACM section', async ({ page }) => {

    const loginPage = new LoginPage(page)
    await loginPage.navigateTo(envConfig.baseURL);
    await loginPage.login(envConfig.userName, envConfig.password);
    const messages = new Messages(page)
    const customerInfo = new CustomerInfo(page)
    await customerInfo.searchCustomer()
    await customerInfo.customerNACM.click()
    await page.screenshot({ path: 'Customer NACM Page.png' });

});

test('Customer Info_Contacts_Customer is able to navigate on Portal Access section', async ({ page }) => {

    const loginPage = new LoginPage(page)
    await loginPage.navigateTo(envConfig.baseURL);
    await loginPage.login(envConfig.userName, envConfig.password);
    const messages = new Messages(page)
    const customerInfo = new CustomerInfo(page)
    await customerInfo.searchCustomer()
    await customerInfo.customerPortalAccess.click()
    // await expect((customerInfo.custAccessDate).first()).toBeVisible()
    // await expect((customerInfo.custExpireDate)).toBeVisible()
    // await expect((customerInfo.custAccessCount).first()).toBeVisible()
    await page.screenshot({ path: 'Customer Portal Access Page.png' });

});

test('React Migration_custinfo_tab_verify Email2 text field is coming', async ({ page }) => {

    const loginPage = new LoginPage(page)
    await loginPage.navigateTo(envConfig.baseURL);
    await loginPage.login(envConfig.userName, envConfig.password);
    const messages = new Messages(page)
    const customerInfo = new CustomerInfo(page)
    await customerInfo.searchCustomer()
    await customerInfo.customerContact.click()
    await expect(customerInfo.contactEmail2).toBeVisible()
    
});

test('React Migration_custinfo_tab_verify Include In Email2 check box is coming', async ({ page }) => {

    const loginPage = new LoginPage(page)
    await loginPage.navigateTo(envConfig.baseURL);
    await loginPage.login(envConfig.userName, envConfig.password);
    const messages = new Messages(page)
    const customerInfo = new CustomerInfo(page)
    await customerInfo.searchCustomer()
    await customerInfo.customerContact.click()
    await expect(customerInfo.contactEmail2).toBeVisible()
    await expect(customerInfo.email2CheckBox).toBeVisible()
    
});


test('React Migration_custinfo_tab_verify user able to check the  Include In Email2 check box', async ({ page }) => {

    const loginPage = new LoginPage(page)
    await loginPage.navigateTo(envConfig.baseURL);
    await loginPage.login(envConfig.userName, envConfig.password);
    const messages = new Messages(page)
    const customerInfo = new CustomerInfo(page)
    await customerInfo.searchCustomer()
    await customerInfo.customerContact.click()
    await expect(customerInfo.selectContact).toBeVisible()
    await customerInfo.selectContact.check()
    await customerInfo.editInfoSection.click();
    await customerInfo.contactEmail2.fill(dataSet.ContactEmail2)
    await customerInfo.email2CheckBox.check()

});

test('React Migration_custinfo_tab_verify user able to uncheck the  Include In Email2 check box', async ({ page }) => {

    const loginPage = new LoginPage(page)
    await loginPage.navigateTo(envConfig.baseURL);
    await loginPage.login(envConfig.userName, envConfig.password);
    const messages = new Messages(page)
    const customerInfo = new CustomerInfo(page)
    await customerInfo.searchCustomer()
    await customerInfo.customerContact.click()
    await expect(customerInfo.selectContact).toBeVisible()
    await customerInfo.selectContact.check()
    await customerInfo.editInfoSection.click();
    await customerInfo.contactEmail2.fill(dataSet.ContactEmail2)
    await customerInfo.email2CheckBox.check()
    await customerInfo.email2CheckBox.uncheck()
});

test('React Migration_custinfo_tab_verify user able to Enter email address in  Email2 text field', async ({ page }) => {

    const loginPage = new LoginPage(page)
    await loginPage.navigateTo(envConfig.baseURL);
    await loginPage.login(envConfig.userName, envConfig.password);
    const messages = new Messages(page)
    const customerInfo = new CustomerInfo(page)
    await customerInfo.searchCustomer()
    await customerInfo.customerContact.click()
    await expect(customerInfo.selectContact).toBeVisible()
    await customerInfo.selectContact.check()
    await customerInfo.editInfoSection.click();
    await customerInfo.contactEmail2.fill(dataSet.ContactEmail2)
});

test('React Migration_custinfo_tab_verify user able to save the Email2 Address', async ({ page }) => {

    const loginPage = new LoginPage(page)
    await loginPage.navigateTo(envConfig.baseURL);
    await loginPage.login(envConfig.userName, envConfig.password);
    const messages = new Messages(page)
    const customerInfo = new CustomerInfo(page)
    await customerInfo.searchCustomer()
    await customerInfo.customerContact.click()
    await expect(customerInfo.selectContact).toBeVisible()
    await customerInfo.selectContact.check()
    await customerInfo.editInfoSection.click();
    await customerInfo.contactEmail2.fill(dataSet.ContactEmail2)
    await customerInfo.email2CheckBox.check()
    await customerInfo.saveCS.click();
    // await expect(customerInfo.pageLoadSymbol).toBeVisible()
    // await expect(customerInfo.pageLoadSymbol).toBeHidden()
    // await expect(customerInfo.selectContact).toBeVisible()
    // await customerInfo.selectContact.check()
    // const value= await (customerInfo.contactEmail2).inputValue()
    // await expect(dataSet.ContactEmail2).toEqual(value)
});

test('React Migration_custinfo_tab_verify user able to delete the Email2 Address', async ({ page }) => {

    const loginPage = new LoginPage(page)
    await loginPage.navigateTo(envConfig.baseURL);
    await loginPage.login(envConfig.userName, envConfig.password);
    const messages = new Messages(page)
    const customerInfo = new CustomerInfo(page)
    await customerInfo.searchCustomer()
    await customerInfo.customerContact.click()
    await expect(customerInfo.selectContact).toBeVisible()
    await customerInfo.selectContact.check()
    await customerInfo.editInfoSection.click();
    await customerInfo.contactEmail2.fill(dataSet.ContactEmail2)
    await customerInfo.email2CheckBox.check()
    await customerInfo.InactiveCheckBox.check()
    await customerInfo.saveCS.click();
    await customerInfo.scrollRight.click()
    await page.keyboard.press('Tab');
    await expect(customerInfo.deleteNameContact).toBeVisible()
    await expect(customerInfo.deleteButton).toBeVisible()
    await customerInfo.deleteButton.click()
    await expect(customerInfo.deleteContactPopUp).toBeVisible()
    await customerInfo.deleteOK.click()
});

test('React Migration_custinfo_tab_verify user able to Edit the Email2 Address', async ({ page }) => {

    const loginPage = new LoginPage(page)
    await loginPage.navigateTo(envConfig.baseURL);
    await loginPage.login(envConfig.userName, envConfig.password);
    const messages = new Messages(page)
    const customerInfo = new CustomerInfo(page)
   // const serialNumber = (uuidv4().slice(-6))
    await customerInfo.searchCustomer()
    await customerInfo.customerContact.click()
    await expect(customerInfo.selectContact).toBeVisible()
    await customerInfo.selectContact.check()
    await customerInfo.editInfoSection.click();
    await customerInfo.contactEmail2.fill(dataSet.ContactEmail2)
    await customerInfo.saveCS.click()
    // await expect(customerInfo.pageLoadSymbol).toBeVisible()
    // await expect(customerInfo.pageLoadSymbol).toBeHidden()
    // const value= await (page.getByRole('textbox', { name: 'Email2' })).inputValue()
    // //await expect(serialNumber+dataSet.ContactEmail2).toEqual(value)

});
