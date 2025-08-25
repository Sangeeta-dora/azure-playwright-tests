const { count } = require("console")
const exp = require("constants")
const { expect } = require("playwright/test")
const { mailNotRead } = require('../PageObjects/mailNotRead');
const { InquiryUserInvoices } = require("./InquiryUserInvoices");
const dataSet = JSON.parse(JSON.stringify(require("../utils/TestData.json")))
exports.CustomerInfo=class CustomerInfo{

    constructor(page)
    {
        //locators
        this.page= page
        this.customerSearchBox= page.getByRole('combobox', { name: 'Begin Typing Customer Name or' });
        //this.customerSearchList= page.locator('.rcbList').locator('.rcbHovered').locator('#ctl00_cboCustomer_i0_lblSearch')
        this.customerSearchList= page.locator('//div[@role="listbox"]/child::li')
        this.overview= page.locator('//div[contains(@class,"even MuiDataGrid-row MuiDataGrid-row--editable")]');
        this.infoDownArrow= page.locator('.mx-1.arrow-icon');
        this.customerInfo= page.locator('.MuiTabs-flexContainer').getByText('Info')
        this.customerContact= page.locator('.MuiTabs-flexContainer').getByText('CONTACTS')
        this.customerAccountNotes= page.locator('.MuiTabs-flexContainer').getByText('ACCOUNT NOTES')
        this.customerHistory= page.locator('.MuiTabs-flexContainer').getByText('HISTORY').first()
        this.customerRolledUpHistory= page.locator('.MuiTabs-flexContainer').getByText('HISTORY').nth(1)
        this.customerTransaction= page.locator('.MuiTabs-flexContainer').getByText('Transactions')
        this.customerNACM= page.locator('.MuiTabs-flexContainer').getByText('NACM')
        this.customerPortalAccess= page.locator('.MuiTabs-flexContainer').getByText('Portal Access')
        this.addressLine1= page.getByLabel('Address Line 1');
        this.addressLine2= page.getByLabel('Address Line 2');
        this.uDF= page.getByText('User Defined Fields');
        this.pageLoadSymbol = page.locator('.MuiCircularProgress-svg').first();
        this.editPM= page.getByText('Edit Payment Methods');
        this.addNewRecordPM= page.getByText('Add New Record');
        this.paymentMethodTitle= page.locator('#payment-method');
        this.defaultMethod= page.locator('#default-method');
        this.insertPM= page.getByText('Insert');
        this.updatePM= page.getByRole('button', { name: 'Update' });
        this.cancelPM= page.getByText('Cancel');
        this.refreshPM= page.getByText('Refresh');
        this.achPM= page.frameLocator('iframe[title="New Payment method"]').getByText('ACH');
        this.creditCardPM= page.frameLocator('iframe[title="New Payment method"]').getByText('Credit card');
        this.accHolderName= page.frameLocator('iframe[title="New Payment method"]').locator('#cc-part-1').getByText('Account Holder Name')
        this.deletePM= page.getByRole('row', { name: 'Edit Payment Info' }).getByRole('button').nth(2);
        this.deletePMPopUp= page.getByText('Payment method deleted');
        this.closeDeletePMPopUp= page.getByLabel('close');
        this.editPMRecord= page.getByRole('row', { name: 'Edit Payment Info' }).getByRole('button').first();
        this.waitingScreen= page.locator('.full-screen-spinner')
        this.PMUpdateName= page.getByRole('cell').nth(2);
        this.recordRefresh= page.locator('i').nth(2);
        this.recordCountPM= page.getByText('Item 1 - 10 of');
        this.editCreditSection= page.locator('.MuiButtonBase-root.MuiButton-root.MuiButton-contained').getByText('Edit').nth(1);
        this.creditClass =page.getByLabel('Select User to Assign').nth(1);
        this.creditReviewDate =page.getByPlaceholder('MM/DD/YYYY');
        this.creditScore = page.getByLabel('Credit Score');
        this.editCSCheckbox =page.getByLabel('Do Not Share With Credit');
        this.saveCS= page.getByRole('button', { name: 'Save' });
        this.cancelCS =page.getByRole('button', { name: 'Cancel' });
        this.contactUDF= page.getByRole('button', { name: 'UDF' })
        this.infoTab= page.getByRole('tab', { name: 'Info' })
        this.editInfoSection= page.locator('.MuiButtonBase-root.MuiButton-root.MuiButton-contained').first();
        this.infoDaysToRespond=page.getByLabel('Days to Respond')
        this.addContact= page.getByRole('button', { name: 'ADD', exact: true })
        this.contactName= page.getByLabel('Name *')
        this.contactEmail= page.getByLabel('Email *')
        this.contactEmail2 =page.getByRole('textbox', { name: 'Email2' })
        this.email2CheckBox= page.getByLabel('Include In Email2')
        this.selectContact= page.locator('.css-1kcqkhj >> .MuiDataGrid-virtualScrollerRenderZone >> .MuiDataGrid-row').getByRole('checkbox').first()
        this.deleteNameContact= page.locator('.MuiDataGrid-cell--withRenderer').filter({has: page.locator("span")}).filter({has: page.getByText("Test", "React")}).first()
        this.InactiveCheckBox=page.getByLabel('Is Inactive')
        this.deleteButton= page.locator('.MuiDataGrid-virtualScrollerRenderZone').nth(0).getByRole('row',{name:'Delete'}).getByRole('button').first()
        this.scrollRight= page.locator('.MuiDataGrid-row > div:nth-child(4)').first()
        this.deleteContactPopUp= page.getByText('Delete this contact?')
        this.deleteOK= page.getByRole('button', { name: 'OK' }).first()
        this.contactUDF1= page.getByLabel('udf1')
        this.addNote= page.getByText('Add a Note').first()
        this.noteTextBox= page.getByLabel('Note', { exact: true })
        this.deleteNote= page.getByRole('button', { name: 'Delete' }).first()
        this.historyAvgDays= page.getByText('Average days late')
        this.historyDueDate=page.getByText('Aging By Due Date')
        this.custTransDate=page.getByText('Tran Date')
        this.custTransAmount=page.getByText('Amount')
        this.custTransBalance=page.getByText('Balance').first()
        this.custAccessDate=page.getByText('Access Date')
        this.custExpireDate=page.getByText('Expire Date')
        this.custAccessCount=page.getByText('Access Count')
        
    }

    async searchCustomer(){
        await this.customerSearchBox.click()
        await this.customerSearchBox.fill(dataSet.CustID);
        await expect(this.customerSearchList).toBeVisible();
        await this.customerSearchList.click()
        await expect(this.overview.first()).toBeVisible();
        await this.infoDownArrow.click()
        await expect(this.customerInfo).toBeVisible();

    }

    async customerInfoSection(){
        await expect(this.customerInfo).toBeVisible();
        await this.customerInfo.click()
        await expect(this.pageLoadSymbol).toBeHidden();
        await expect(this.addressLine1).toBeVisible();
        await expect(this.addressLine2).toBeVisible();
        await expect(this.uDF).toBeVisible();
        await this.page.screenshot({ path: 'Customer Info Page.png' });

    }

    async editPaymentMethod(){
        await expect(this.editPM).toBeVisible();
        await this.editPM.click()
        await expect(this.addNewRecordPM).toBeVisible();
        await this.addNewRecordPM.click();
        await expect(this.paymentMethodTitle).toBeVisible();
        await this.paymentMethodTitle.fill(dataSet.PaymentMethodName);
        await this.insertPM.click();


    }

    async deletePaymentMethod(){

        await this.deletePM.click()
        await expect(this.deletePMPopUp).toBeVisible();
        await this.closeDeletePMPopUp.click()

    }

    async editCreditSectionMethod(){

        await this.editCreditSection.click()
        await this.creditClass.click()


        const creditClassOption = [
            this.page.getByRole('option', { name: 'Essential' }),
            this.page.getByRole('option', { name: 'Best Practice' })
            ]
            const CreditRandom =creditClassOption[Math.floor(Math.random() * creditClassOption.length)];
            await CreditRandom.click(CreditRandom.type, CreditRandom.selector);


        await this.creditReviewDate.fill(dataSet.CreditReviewDate);
        await this.creditScore.press('Backspace');
        await this.creditScore.fill(dataSet.CrediScore);    

        const onlinePmt = [
            this.page.getByText('ACH only'),
            this.page.getByText('Credit Card/ACH'),
            this.page.getByText('Credit Card Only'),
            this.page.getByText('None')
            ]
        for (const allowonlinePMT of onlinePmt)
        {
            if(await allowonlinePMT.isVisible())
            {
                await allowonlinePMT.click()
                break;
            }
            
        }
        const onlinePmtOptions = [
            this.page.getByRole('option', { name: 'ACH only' }),
            this.page.getByRole('option', { name:'Credit Card/ACH'}),
            this.page.getByRole('option', { name: 'None' }),
            this.page.getByRole('option', { name: 'Credit Card Only' })

            ]

            const PMTRandom =onlinePmtOptions[Math.floor(Math.random() * onlinePmtOptions.length)];
            await PMTRandom.click(PMTRandom.type, PMTRandom.selector);
            await this.editCSCheckbox.click();
            await this.saveCS.click();


    }

    async addContactMethod(ContactName,ContactEmail,ContactEmail2){

        
        await this.customerContact.click()
        await this.addContact.click()
        await expect(this.contactName).toBeVisible()
        await this.contactName.fill(ContactName)
        await expect(this.contactEmail).toBeVisible()
        await this.contactEmail.fill(ContactEmail)
        await expect(this.contactEmail2).toBeVisible()
        await this.contactEmail2.fill(ContactEmail2)
        

    }

    

}