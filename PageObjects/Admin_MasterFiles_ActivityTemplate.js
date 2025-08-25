exports.Admin_MasterFiles_ActivityTemplate = class Admin_MasterFiles_ActivityTemplate{

    constructor(page){
        this.page = page
        this.activityTemplate = page.locator('//h5[contains(text(),"Activity Template")]')
        this.firstColumn= page.locator('//div[contains(text(),"Actions")]')
        this.firstRow= page.locator('(//div[@data-rowindex="0"])[2]')
        
        //Activity Template form locators
        this.addNewRecordbtn= page.locator('//button[contains(text(),"Add new record")]')
        this.templatetitle_AddRecord= page.locator('//h5[contains(text(),"Add Activity Template")]')
        this.activityTemplatetxtbx= page.locator('//input[@name="ruleViolationID"]')
        this.issueDesctxtbx= page.locator('//textarea[@name="description"]')
        this.pritority= page.locator('//input[@name="priority"]')
        this.communicationNotes= page.locator('//textarea[@name="longDescription"]')
        this.reportNamedrpdwn= page.locator('#mui-component-select-reportKey')
        this.reasonCodedrpdwn= page.locator('//div[@id="mui-component-select-disputeCodeKey"]')
        this.attachInvoicechbx= page.locator('//input[@name="attachInvoices"]')
        this.attachExtInvoicechkbx= page.locator('//input[@name="attachInvoiceExternal"]')
        this.limitattachmentchknx= page.locator('//input[@name="oneInvoicePerEmail"]')
        this.limitAttchmentsTo= page.locator('//input[@name="limitOfAttachments"]')
        this.custContactchkbx= page.locator('//input[@name="isCustContact"]')
        this.tagbyInvoiceContact= page.locator('//input[@name="invoiceContactTagging"]')
        this.tagbyInvoiceCOntact2= page.locator('//input[@name="invoiceContact2Tagging"]')
        this.reportDefaultdrpdwn= page.getByLabel('Pdf')
        //Color Locators
        //this.color= page.locator('div:nth-child(17) > div > .MuiButtonBase-root')
        //this.selectColorOption= page.locator('//div[@title="#F5A623"]')
        //this.colorpopover= page.locator('#color-popover > .MuiBackdrop-root')
        this.submitbtn= page.locator('//button[@type="submit"]')

        //Activity Template Table locators
        this.searchContainer_ActivityTemplate= page.locator('//div[@data-field="ruleViolationID" and @role="columnheader"]//input')
        //this.emailTemplate= page.locator('(//div[@class=" css-19bb58m"]//input)')
        this.emailTemplate= page.locator('//label[contains(text(),"Select email template")]//following-sibling::div//input')
        this.templatetitle_EditRecord= page.locator('//h5[contains(text(),"Edit Activity Template")]')
        this.editIcon= page.locator('//*[local-name()="svg" and @data-testid="EditIcon"]')
        this.deleteIcon= page.locator('//*[local-name()="svg" and @data-testid="DeleteIcon"]')
        this.deleteIcon_Okbtn= page.locator('//button[contains(text(),"OK")]')
        this.deleteError= page.locator('(//div[@class="d-flex flex-column p-1 "]//p)[1]')
        this.activityNameMandatoryError= page.locator('//p[contains(text(),"Rule Action ID blank or already exists")]')
        this.priorityMandatoryError= page.locator('//p[contains(text(),"Priority must be a valid number")]')
        this.issuedescMandatoryError= page.locator('//p[contains(text(),"Issue Description Required")]')
        this.clearquicksearchFilter= page.locator('//button[@aria-label="Clear filter"]')

        //Page Navigation locators
        this.rowsPerPagedrpdwn= page.locator('//div[contains(@class,"MuiSelect-select MuiTablePagination")]')
        this.pageSize_20= page.locator('//li[@role="option" and @data-value="20"]')
        this.total_recordsNo= page.locator('//p[@class="MuiTablePagination-displayedRows css-141284n"]')
        this.pageSize_50= page.locator('//li[@role="option" and @data-value="50"]')
        this.pageNo_1= page.locator('button[aria-label*="page 1"]')
        this.pageNo_2= page.locator('button[aria-label*="page 2"]')
        this.gotoNextPage= page.locator('//button[contains(@aria-label,"Go to next page")]')
        this.gotoPreviousPage= page.locator('//button[contains(@aria-label,"Go to previous page")]')

        //Maintain Reports locators
        this.maintainReportbtn= page.locator('//button[contains(text(),"Maintain Reports")]')
        this.reportpage= page.locator('//div[@class="dialog-title__text m-2"]')
        this.addNewReportbtn= page.locator('//div[@aria-labelledby="draggable-dialog-title"]//button[contains(text(),"Add new record")]')
        this.reportform= page.locator('//h5[contains(text(),"Report Form")]')
        this.reportBasedrpdwn= page.locator('//div[@id="mui-component-select-systemReportKey"]')
        this.reportName= page.locator('//input[@name="reportName"]')
        this.reportDesc= page.locator('//input[@name="buttonText"]')
        this.submitReportbtn= page.locator('(//button[@type="submit"])[2]')
        this.reportNameSearchbox= page.locator('//div[@aria-labelledby="draggable-dialog-title"]//div[@data-field="reportName" and @role="columnheader"]//input')
        this.reportNameCellvalue= page.locator('//div[@aria-labelledby="draggable-dialog-title"]//div[@data-field="reportName" and @role="cell"]//div')
        this.closeMaintainReportspopupbtn= page.locator('//button[@title="Close"]')
        this.maintainReportSyncbtn= page.locator('//button[contains(text(),"Maintain Reports")]//preceding-sibling::button')
        this.reportNamedrpdwnvalues= page.locator('//ul[@role="listbox"]//li')
        this.deleteIconReports= page.locator('//div[@aria-labelledby="draggable-dialog-title"]//*[local-name()="svg" and @data-testid="DeleteIcon"]')
        this.deleteIconReports_Okbtn= page.locator('//div[@aria-labelledby="draggable-dialog-title"]//button[contains(text(),"OK")]')
        this.deletepopupText= page.locator('//div[@aria-labelledby="draggable-dialog-title"]//h6[contains(text(),"Are you sure?")]')

        //Maintain Communication Template locators
        this.maintainCommunicationTemplates= page.locator('//button[contains(text(),"Maintain Templates")]')
        //this.templatepage= page.locator('//div[@class="dialog-title__text m-2"]')

    }

     //To return the page name
     async returnPageName(){
        return this.activityTemplate.textContent()
    }

    //To click on add new record button- Activity Template
    async clickOnAddNewRecord(){
        await this.addNewRecordbtn.click()
    }

    //To fill the activity template details
    async fillActivityTemplateDetails(activitytemp_name, issueDesc, pritority, communicationNotes, reportName, emailTemplate_name, reasonCode, limitAttchmentsTo, reportDefaulttype){ 
        await this.activityTemplatetxtbx.fill(activitytemp_name)
        await this.issueDesctxtbx.fill(issueDesc)
        await this.pritority.fill(pritority)
        await this.communicationNotes.fill(communicationNotes)
        await this.reportNamedrpdwn.click()
        await this.page.locator(`//li[text()="${reportName}"]`).click()
        await this.emailTemplate.click()
        await this.emailTemplate.fill(emailTemplate_name)
        await this.page.getByRole('option').getByText(`${emailTemplate_name}`, { exact: true }).click();
       // await this.page.getByText(`${emailTemplate_name}`, { exact: true }).first().press('Enter')
        await this.reasonCodedrpdwn.click()
        await this.page.getByRole('option', { name: `${reasonCode}` }).click()
        await this.attachInvoicechbx.click()
        await this.attachExtInvoicechkbx.click()
        await this.limitattachmentchknx.click()
        await this.limitAttchmentsTo.fill(limitAttchmentsTo)  
        await this.custContactchkbx.click()
        await this.tagbyInvoiceContact.click()
        await this.tagbyInvoiceCOntact2.click()
        await this.reportDefaultdrpdwn.click()
        await this.page.getByRole('option', { name: `${reportDefaulttype}` }).click()
    }

    //To fill the activity template details with mandatory fields only
    async fillOnlyMandatoryFields(activitytemp_name, setpriority, issuedesc){
        await this.activityTemplatetxtbx.fill(activitytemp_name)
        await this.issueDesctxtbx.fill(issuedesc)
        await this.pritority.fill(setpriority)
    }

    //To click on Submit button- Activity Template
    async clickOnSubmitActivityTemplate(){
        await this.submitbtn.click()
    }

     //To search activity template
     async searchActivityTemplate(activitytemp_name){
        await this.searchContainer_ActivityTemplate.fill(activitytemp_name)
        await this.searchContainer_ActivityTemplate.press('Enter')
        await this.page.waitForTimeout(5000)
    }

    //To return text cell value of the first row after search
    async returnFirstRowCellValue_texttype(datafieldname){
        console.log(`${datafieldname} value: `+ await this.page.locator(`//div[@data-field="${datafieldname}" and @role="cell"]//div`).textContent())
        return await this.page.locator(`//div[@data-field="${datafieldname}" and @role="cell"]//div`).textContent()
    }

    //To return checkbox cell value of the first row after search
    async returnFirstRowCellValue_checkboxtype(datafieldname){
        console.log(`${datafieldname} value: `+ await this.page.locator(`//div[@data-field="${datafieldname}" and @role="cell"]//input`).isChecked())
        return await this.page.locator(`//div[@data-field="${datafieldname}" and @role="cell"]//input`).isChecked()
    }

    //To click on edit icon
    async clickOnEditIcon(){
        await this.editIcon.click();
        await this.page.waitForTimeout(5000)
    }

    //To edit the fields (Issue Description and Attach External Invoice checkbox)
    async editFields(issuedesc){
        await this.issueDesctxtbx.fill(issuedesc)
        await this.attachExtInvoicechkbx.uncheck()
    }

    //To click on delete icon- Activity Template
    async clickOnDeleteIcon(){
        await this.deleteIcon.click();
        await this.deleteIcon_Okbtn.click()
        await this.page.waitForTimeout(5000)
    }

    //To return the error text when trying to delete a record which is in use
    async returnDeleteErrorValidation(){
        return this.deleteError.textContent()
    }

    //To return validation message when mandatory field 'Activity Template' is not filled
    async returnIsActivityTemp_MandatoryField(){
        console.log("Mandatory field Validation message for Activity template: "+ await this.activityNameMandatoryError.textContent())
        return this.activityNameMandatoryError.isVisible()
    }

    //To return validation message when mandatory field 'Priority' is not filled
    async returnIsPriority_MandatoryField(){ 
        console.log("Mandatory field Validation message for Priority: "+ await this.priorityMandatoryError.textContent())
        return this.priorityMandatoryError.isVisible()
    }

    //To return validation message when mandatory field 'Issue Description' is not filled
    async returnIsDescription_MandatoryField(){
        console.log("Mandatory field Validation message for Description: "+ await this.issuedescMandatoryError.textContent())
        return this.issuedescMandatoryError.isVisible()
    }

    //To add few more activity templates if the records on page are less than or equal to 20
    async addNewRecordsIfNeeded(){
        await this.rowsPerPagedrpdwn.click()
        await this.pageSize_20.click()

        var total_records= await this.total_recordsNo.textContent()

        if(total_records.split(" ")[2] <= 20){
            var addnewrecords= 21 - total_records.split(" ")[2] 
            console.log("adding few more records: "+addnewrecords)
            for(let i=0; i<addnewrecords; i++){
                var activitytempname = 'Activity temp_'+ Math.floor(Math.random() * 1000)
                await this.clickOnAddNewRecord()
                await this.fillOnlyMandatoryFields(activitytempname, "1", 'Test Issue Description')
                await this.clickOnSubmitActivityTemplate()
            }
        }
    }

    //To return true if the Records per page functionality is working fine esle false
    async validateRecordsPerPage(){
        await this.addNewRecordsIfNeeded()
        var total_records= await this.total_recordsNo.textContent()
        console.log("Records on page before resize: "+(total_records.split(" ")[0]).split("–")[1])

        //Resizing the records per page to 50
        await this.rowsPerPagedrpdwn.click()
        await this.pageSize_50.click()

        var new_total_records= await this.total_recordsNo.textContent()
        var newpagesize= (new_total_records.split(" ")[0]).split("–")[1]
        console.log("Records on page after resize: "+newpagesize)
        
        //Validating if the records per page is resized to 50
        if(20<newpagesize && newpagesize<=50){
            return true 
        }
        else{
            return false
        }
    }

    //To check and return if page is selected
    async isPageSelected(selector) {
        // Check if the button has a specific class or attribute that indicates it is selected
        const isSelected = await this.page.evaluate((selector) => {
            const button = document.querySelector(selector);
            if (!button) return false;
            // Or check for an attribute
            return button.getAttribute('aria-pressed') === 'true';
        }, selector);

        return isSelected
    }

    //To return true if the page navigation is working fine else false
    async validatePageNavigation(){

        await this.addNewRecordsIfNeeded()
        await this.pageNo_1.click()
        
        if(this.isPageSelected('button[aria-label*="page 1"]')){
            console.log("Page 1 is selected")
        }
        else{
            return false;
        }
    
        await this.gotoNextPage.click()
        if(this.isPageSelected('button[aria-label*="page 2"]')){
            console.log("clicked on next page btn and Page 2 is selected now")
        }
        else{
            return false;
        }
        await this.gotoPreviousPage.click()
        if(this.isPageSelected('button[aria-label*="page 1"]')){
            console.log("clicked on previous page btn and Page 1 is selected now")
        }
        else{
            return false
        }
        return true
    }

    //To return true if the search functionality is working fine for text fields else false
    async validateSearchFunctionalityTextvalue(datafieldvalue, searchvalue){
        await this.page.locator(`//div[@data-field="${datafieldvalue}" and @role="columnheader"]//input`).fill(searchvalue)
        await this.page.locator(`//div[@data-field="${datafieldvalue}" and @role="columnheader"]//input`).press('Enter')
        await this.page.waitForTimeout(5000)
        // Get the locator for the elements
        const searchResultsLocator = this.page.locator(`//div[@data-field="${datafieldvalue}" and @role="cell"]//div`)
    
        // Get the count of elements
        const count = await searchResultsLocator.count();
        console.log(`Number of search results for ${datafieldvalue} is: ${count}`)

        // Loop through the elements
        for (let i = 0; i < count; i++) {
            const element = searchResultsLocator.nth(i)
            const elementText = await element.textContent()
            console.log(`Element ${i + 1} text: ${elementText}`)
            if (elementText !== searchvalue) {
                return false;
            }
        }
        await this.clearquicksearchFilter.click()
        return true;
    }

    //To return true if the search functionality is working fine for checkbox else false
    async validateSelectFunctionalityCheckbox(datafieldvalue, searchvalue){
        const booleanSearchValue = (str) => str.toLowerCase() === 'true';
        console.log("string to boolean: "+booleanSearchValue(searchvalue))
        await this.page.locator(`//div[@data-field="${datafieldvalue}" and @role="columnheader"]//select`).click()
        await this.page.waitForTimeout(5000)
        await this.page.locator(`//div[@data-field="${datafieldvalue}" and @role="columnheader"]//select`).selectOption(searchvalue)
        await this.page.waitForTimeout(5000)
        // Get the locator for the elements
        const searchResultsLocator = this.page.locator(`//div[@data-field="${datafieldvalue}" and @role="cell"]//input`);

        // Get the count of elements
        const count = await searchResultsLocator.count()
        console.log(`Number of search results for ${datafieldvalue} is: ${count}`)

        // Loop through the elements
        for (let i = 0; i < count; i++) {
            const element = searchResultsLocator.nth(i)
            const iselementchecked = await element.isChecked()
            console.log(`Element ${i + 1} is checked: ${iselementchecked}`)
            if (iselementchecked != booleanSearchValue(searchvalue)) {
                return false
            }
        }
        await this.clearquicksearchFilter.click()
        return true
    }

    //To Click on Maintain Reports button
    async clickOnMaintainReports(){
        await this.maintainReportbtn.click()
    }

    //To click on Add new report button
    async clickOnAddNewReport() {
        await this.addNewReportbtn.click()
    }

    //To fill the report details
    async fillReportDetails(reporttype, reportname, reportdesc){
        await this.reportBasedrpdwn.click()
        await this.page.locator(`//ul[@role="listbox"]//li[contains(text(),"${reporttype}")]`).click()
        await this.reportName.fill(reportname)
        await this.reportDesc.fill(reportdesc)
    }

    //To Click on Submit button- Reports
    async clickOnSubmitReport(){
        await this.submitReportbtn.click()
    }

    //To search report
    async searchReport_Reports(reportname){
        await this.reportNameSearchbox.fill(reportname)
        await this.reportNameSearchbox.press('Enter')
        await this.page.waitForTimeout(5000)
    }

    //To return the value of the report name
    async returnReportName_Reports() {
        console.log("report name: "+ await this.reportNameCellvalue.textContent())
        return await this.reportNameCellvalue.textContent()
    }

    //To Close Maintain Reports popup
    async closeMaintainReportspopup() {
        await this.closeMaintainReportspopupbtn.click()
    }

    //To click on Sync button- Reports
    async clickOnMaintainReportSyncbtn() {
        await this.maintainReportSyncbtn.click()
        await this.page.waitForTimeout(5000) 
    }

    //To Verify if the newly added report is present in the report dropdown
    async validateNewlyAddedReport(reportname){
        await this.reportNamedrpdwn.click()
         // Get the locator for the elements
         const searchResultsLocator = this.reportNamedrpdwnvalues

         // Get the count of elements
         const count = await searchResultsLocator.count()
         console.log(`Number of search results for report is: ${count}`)
 
         // Loop through the elements
         for (let i = 0; i < count; i++) {
             const element = searchResultsLocator.nth(i);
             var elementtext = await element.textContent();
             console.log(`Element ${i + 1} name: ${elementtext}`)
             if (elementtext == reportname) {
                console.log("Report is present in the dropdown: "+elementtext)
                await element.click()
                return true
             }
         }
         return false
    }

    //To click on delete icon- Reports
    async clickOnDeleteIconReports(){
        await this.deleteIconReports.click()
        await this.deleteIconReports_Okbtn.click()
        await this.deletepopupText.waitFor({ state: 'hidden' })
        await this.page.waitForTimeout(5000)
    }

    //To click on Maintain Templates button
    async clickOnMaintainCommunicationTemplates(){
        await this.maintainCommunicationTemplates.click()
    }

}