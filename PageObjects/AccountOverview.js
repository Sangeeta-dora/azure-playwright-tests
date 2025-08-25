exports.AccountOverview = class AccountOverview{

    constructor(page){

        this.page= page
        //page.locator('.MuiDataGrid-virtualScrollerRenderZone').locator('div[role="row"]').locator('div[aria-colindex="1"]').nth(1)
        this.invoice = page.locator('.MuiDataGrid-virtualScrollerRenderZone').nth(0).locator('div[data-rowindex="0"]').locator('div[aria-colindex="2"]').locator('.blueLink')
        this.customerInput = page.locator('//input[@role="combobox"]')
        this.FolderName = page.getByLabel('Enter the new folder name')
        //this.firstContactDropDown = page.locator('span').filter({ hasText: 'Override Invoice Contact 1' }).locator('div').nth(2)
        this.firstContactDropDown = page.locator('span').filter({ hasText: 'Override Invoice Contact 1' }).getByRole('checkbox')
        this.invoiceListView = page.getByTitle('List view').getByRole('img')
        this.invoiceGridView = page.getByTitle('Grid View').getByRole('img')
        this.refreshinvoicedocs = page.getByTitle('refresh').getByRole('img')
        //this.invoicecontactkey = page.locator('#invcContactKey').getByRole('textbox')
        this.firstinvoicecontactkey = page.locator('//span[contains(text(),"Override Invoice Contact 1")]//following-sibling::div//div[@role="button"]')
        this.selectFirstoption =page.locator('(//ul[@class="MuiList-root MuiList-padding MuiMenu-list css-r8u8y9"]//li)[1]')
        this.enterName = page.getByLabel('Enter the new folder name')
        this.secondContactDropDown = page.locator('span').filter({ hasText: 'Override Invoice Contact 2' }).getByRole('checkbox')
        //this.secondContactDetail = page.locator('#invcContactKey2').getByRole('textbox')
        this.secondinvoicecontactkey = page.locator('//span[contains(text(),"Override Invoice Contact 2")]//following-sibling::div//div[@role="button"]')
        this.addFolder =  page.getByTitle('Add folder').getByRole('img')
        this.selectFolder = page.getByTitle('Testing')
        this.density_compact = page.getByRole('menuitem', { name: 'Compact' })
        this.density_comfortable = page.getByRole('menuitem', { name: 'Comfortable' })
        this.density_standard = page.getByRole('menuitem', { name: 'Standard' })
        //this.density = page.getByRole('main').locator('div').filter({ hasText: 'Statement of AccountsSettings~StatementsSettingsShow Invoice LinesShow All Accou' }).getByLabel('Density')
        this.density = page.locator('(//button[@aria-label="Density"])[1]')
        this.bestFit = page.getByRole('button', { name: 'BestFit' })
        this.refresh = page.getByRole('button', { name: 'Refresh' }).first()
        this.newactivity = page.getByRole('button', { name: 'New Activity' })
        this.deleteokButton = page.getByRole('button', { name: 'Ok' })
        this.foldersave = page.getByLabel('New Folder', { exact: true }).getByRole('button', { name: 'Save' })
        this.deleteFolder = page.getByTitle('Delete').locator('path')
        this.InvoiceDocuments = page.getByLabel('Invoice Details').locator('i').nth(1)
        this.InvoicesSave = page.locator('div').filter({ hasText: /^Save$/ }).getByRole('button')
        this.customer = page.locator('#ctl00_cboCustomer_i0_lblSearch')
        //this.donotsync = page.locator('span').filter({ hasText: 'DO NOT Sync' }).locator('div').nth(2)
        this.donotsync = page.locator('span').filter({ hasText: 'DO NOT Sync' }).getByRole('checkbox')
        this.customerpage = page.locator('(//h6)[1]')
        this.statementofaccount_viewdrpdwn = page.locator('(//div[@aria-labelledby="select-label"])[2]')
        this.invoiceoption = page.getByRole('option', { name: '~Invoices' })
        this.firstinvoice = page.locator('(//div[@data-field="tranId" and @role="cell"]//span)[1]')
        this.invoicedetails = page.locator('(//div[contains(@class,"justify-content-between mt-4")]//span)[2]')
        this.invoicedetils_documentpage = page.locator('//div[contains(@class,"d-flex gap-4 align-items-center mb-2")]//p[@class="h5"]')
        this.newactivityname = page.locator('(//main[@class="main-container"]//h1)[1]')

        //New Activity locators
        this.newActivitybtn= page.locator('//button[contains(text(),"New Activity")]')
        this.activitytypelbl= page.locator('//label[contains(text(),"Activity Type")]')
        this.activitytypedrpdwnfield= page.locator('//label[text()="Activity Type"]//parent::div//div//input')
        //div[@class=" css-1dimb5e-singleValue"]


    }

    async clickondensityStandard(){

        await this.density_standard.click()
    }


    async clickondensityCComfortable(){

        await this.density_comfortable.click()
    }




    async clickondensityCompact(){

        await this.density_compact.click()
    }

    async clickonDensity(){

        await this.density.click()
    }

    async clickonBestFit(){

        await this.bestFit.click()
    }

    async clickonRefresh(){

        await this.refresh.click()
    }
    async clickonNewActivity(){

        await this.newactivity.click()
        this.page.waitForTimeout(2000)
     }

    async selectsecondContactDropDown(){

        await this.secondContactDropDown.click()
        await this.secondinvoicecontactkey.click()
        await this.selectFirstoption.click()


     }

    async selectfirstContactDropDown(){

        await this.firstContactDropDown.click()
        await this.firstinvoicecontactkey.click()
        await this.selectFirstoption.click()
        
        
    }
    async clickonListView(){

        await this.invoiceListView.click()


    }

    async clickonGridView(){

        await this.invoiceGridView.click()


    }

    async clickonRefreshInvoiceDocuments(){


        await this.refreshinvoicedocs.click()


    }


    async clickOkondelete(){

        await this.deleteokButton.click()
    }



    async enterFolderName(folder_name){

        await this.FolderName.fill(folder_name)
        await this.enterName.press('Enter')
        await this.foldersave.click()

    }

    async deleteCreatedFolder(folder_Name){

        await this.page.locator(`//span[@title="${folder_Name}"]`).click()
        await this.deleteFolder.click()
    }

    async clickOnAddFolder(){

        await this.addFolder.click()
    }

    async clickonInvoiceDocuments(){

        await this.InvoiceDocuments.click()
    }

    async clickonDontNotSync(){
        await this.invoicedetails.waitFor({ state: 'visible' });
        await this.donotsync.click()
    }

    async clickOnInvoiceSave(){

        await this.InvoicesSave.click()
    }

    async clickonCustomerInput(){


        await this.customerInput.click()
    }

    async enterCustomerName(Cust_ID_Name){

        await this.customerInput.fill(Cust_ID_Name)
        await this.customerInput.press('Enter')
        await this.customerInput.press('Enter')
        await this.customerInput.press('Enter')   

    }
    
    async selectCustomerFromDropdown(Cust_ID_Name){

        //await this.customer.press('Enter')
        await this.page.getByRole('option').getByText(`${Cust_ID_Name}`, { exact: true }).click();

    }

    async clickonInvoice(){

        await this.invoice.click()


    }

    //to return customer name and ID displayed on Account Overview page
    async ReturnCustomerName() {
        return await this.customerpage.textContent(); // returns a Promise that resolves to a string
    }

    //to click on first invoice displayed on Account Overview page
    async clickOnFirstInvoice() {
        await this.firstinvoice.click()

    }

    //to return first invoice no displayed on Account Overview page
    async returnFirstInvoice() {
        return await this.firstinvoice.textContent(); // returns a Promise that resolves to a string
    }

    //to return invoice details displayed on Invoice Details popup page
    async returnInvoiceDetails() {
        await this.invoicedetails.waitFor({ state: 'visible' });
        return await this.invoicedetails.textContent(); // returns a Promise that resolves to a string

    }

    //to check or uncheck Do Not Sync checkbox
    async checkOrUncheckDontNotSyncChkbx(){
        await this.invoicedetails.waitFor({ state: 'visible' });
        const isChecked = await this.donotsync.isChecked()
        if(isChecked){
            await this.donotsync.uncheck()
        }
        else{
            await this.donotsync.check()
        }
    }

    //to return the status of Do Not Sync checkbox
    async validatethatDoNotSyncIsChecked(){
        await this.invoicedetails.waitFor({ state: 'visible' });
        return await this.donotsync.isChecked()
    }

    //to return invoice no displayed on Invoice document pop-up page
    async returnInvoiceDocumentDetails() {
        let invoiceDocumentText = await this.invoicedetils_documentpage.textContent();
        console.log("Invoice Document text: ", invoiceDocumentText)
        return await this.invoicedetils_documentpage.textContent(); // returns a Promise that resolves to a string
    }

    //to validate and retrun that the created folder is visible or not
    async validatethatTheCreatedFolderIsVisible(folder_Name){
        await this.page.waitForTimeout(5000);
        console.log("folder is visible: ", await this.page.locator(`//span[@title="${folder_Name}"]`).isVisible())
        return await this.page.locator(`//span[@title="${folder_Name}"]`).isVisible()
    }

    //to return the name of the new activity
    async returnNewActivity(){
        return await this.newactivityname.textContent()
    }

    async validateActivityType(activity_ID) {
        await this.activitytypedrpdwnfield.click()
        await this.activitytypedrpdwnfield.clear()
        await this.activitytypedrpdwnfield.fill(activity_ID)
        await this.page.getByRole('option').getByText(`${activity_ID}`, { exact: true }).click()
        console.log("Activity Type selected: "+await this.activitytypedrpdwnfield.getAttribute('value'))
        return await this.activitytypedrpdwnfield.getAttribute('value')

    }


}