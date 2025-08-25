exports.Admin_MasterFiles_ActivityType = class Admin_MasterFiles_ActivityType {

    constructor(page) {
        this.page = page;
        this.activityType = page.locator('//h5[contains(text(),"Activity Types")]')
        this.firstColumn= page.locator('//div[contains(text(),"Actions")]')
        this.firstRow= page.locator('(//div[@data-rowindex="0"])[2]')

         //Activity Type form locators
         this.addNewRecordbtn= page.locator('//button[contains(text(),"Add new record")]')
         this.title_AddRecord= page.locator('//h5[contains(text(),"Add Activity Type")]')
         this.activityBasedrpdwn= page.locator('//div[@id="mui-component-select-activityBase"]')
         this.activityIDtxtbx= page.locator('//input[@name="activityID"]')
         this.descriptiontxtbx= page.locator('//input[@name="description"]')
         this.displayPrioritytxtbx= page.locator('//input[@name="displayPriority"]')
         this.excludefromDashBoardchkbox= page.locator('//input[@name="excludeFromDashboard"]')
         this.excludefromCRMchkbox= page.locator('//input[@name="excludeFromCRM"]')
         this.activechkbx= page.locator('//input[@name="active"]')
         this.procnotetxtarea= page.locator('//div[@contenteditable="true"]')
         this.proctest= page.locator('div').filter({ hasText: "Please type here..." }).locator('div').first()
         this.submitbtn= page.locator('//div[@class="MuiBox-root css-3nq2yw"]//button[@type="submit"]')

          //Activity Type Table locators
        this.searchContainer_ActivityID= page.locator('//div[@data-field="activityID" and @role="columnheader"]//input')
        this.activitytypetitle_EditRecord= page.locator('//h5[contains(text(),"Edit Activity Type")]')

        this.activityID_MandatoryError= page.locator('//p[contains(text(),"Activity ID blank or already exists")]')
        this.description_MandatoryError= page.locator('//p[contains(text(),"Description Required")]')
        this.displaypriority_MandatoryError= page.locator('//p[contains(text(),"Display Priority is required")]')

        this.activitydeleteIcon= page.locator('//*[local-name()="svg" and @data-testid="DeleteIcon"]')

        //Page Navigation locators
        this.rowsPerPagedrpdwn= page.locator('//div[contains(@class,"MuiSelect-select MuiTablePagination")]')
        this.pageSize_20= page.locator('//li[@role="option" and @data-value="20"]')
        this.total_recordsNo= page.locator('//p[@class="MuiTablePagination-displayedRows css-141284n"]')
        this.pageSize_50= page.locator('//li[@role="option" and @data-value="50"]')
        this.pageNo_1= page.locator('button[aria-label*="page 1"]')
        this.pageNo_2= page.locator('button[aria-label*="page 2"]')
        this.gotoNextPage= page.locator('//button[contains(@aria-label,"Go to next page")]')
        this.gotoPreviousPage= page.locator('//button[contains(@aria-label,"Go to previous page")]')
    }

    //To return the page name
    async returnPageName(){
        return this.activityType.textContent()
    }

    //To click on add new record button- Activity Template
    async clickOnAddNewRecord(){
        await this.addNewRecordbtn.click()
    }

    async fillActivityTypeFormDetails(activityBase, activityID, description, displayPriority, procNote){
        await this.activityBasedrpdwn.click()
        await this.page.locator(`//li[text()="${activityBase}"]`).click()
        await this.activityIDtxtbx.fill(activityID)
        await this.descriptiontxtbx.fill(description)
        await this.displayPrioritytxtbx.fill(displayPriority)
        await this.procnotetxtarea.click()
        //await this.page.locator('div').filter({ hasText: /^Please type here\.\.\.$/ }).locator('div').first().fill('test-1')
        await this.procnotetxtarea.type(procNote)
        await this.page.waitForTimeout(2000)
        
        await this.excludefromDashBoardchkbox.check()
        await this.excludefromCRMchkbox.check()
        await this.activechkbx.check()
       
        //await this.submitbtn.click()

    }

    async fillActivityTypeFormWithMandatoryFieldsOnly(activityBase, activityID, description, displayPriority){
        await this.activityBasedrpdwn.click()
        await this.page.locator(`//li[text()="${activityBase}"]`).click()
        await this.activityIDtxtbx.fill(activityID)
        await this.descriptiontxtbx.fill(description)
        await this.displayPrioritytxtbx.fill(displayPriority)
    }

    async clickOnSubmitActivityTypeForm(){
        await this.submitbtn.click()
    }

     //To search activity template
     async searchActivityType(activityID){
        await this.searchContainer_ActivityID.fill(activityID)
        await this.searchContainer_ActivityID.press('Enter')
        await this.page.waitForTimeout(5000)
    }

    async editActivityTypeFormDetails(description){
        await this.descriptiontxtbx.fill(description) 
        await this.excludefromCRMchkbox.uncheck()
    }

    //To return validation message when mandatory field 'Activity ID' is not filled
    async returnIsActivityID_MandatoryField(){
        console.log("Mandatory field Validation message for Activity template: "+ await this.activityID_MandatoryError.textContent())
        return this.activityID_MandatoryError.isVisible()
    }

    //To return validation message when mandatory field 'Description' is not filled
    async returnIsDescription_MandatoryField(){
        console.log("Mandatory field Validation message for Description: "+ await this.description_MandatoryError.textContent())
        return this.description_MandatoryError.isVisible()
    }

    //To return validation message when mandatory field 'Priority' is not filled
    async returnIsDisplayPriority_MandatoryField(){ 
        console.log("Mandatory field Validation message for Priority: "+ await this.displaypriority_MandatoryError.textContent())
        return this.displaypriority_MandatoryError.isVisible()
    }

    async returnIsdeleteBtnDisabled(){
        console.log("Delete button is disabled: "+ this.activitydeleteIcon.isDisabled())
        return this.activitydeleteIcon.isDisabled()
    }

    //To add few more activity types if the records on page are less than or equal to 20
    async addNewActivityIfNeeded(){
        await this.rowsPerPagedrpdwn.click()
        await this.pageSize_20.click()

        var total_records= await this.total_recordsNo.textContent()

        if(total_records.split(" ")[2] <= 20){
            var addnewrecords= 21 - total_records.split(" ")[2] 
            console.log("adding few more records: "+addnewrecords)
            for(let i=0; i<addnewrecords; i++){
                var activity_ID = 'Activity_ID_'+ Math.floor(Math.random() * 1000)
                await this.clickOnAddNewRecord()
                await this.fillActivityTypeFormWithMandatoryFieldsOnly("ExpectPay", activity_ID, "Test_desc_1", "4")
                await this.clickOnSubmitActivityTypeForm()
            }
        }
    }

    //To return true if the Records per page functionality is working fine else false
    async validateRecordsPerPage(){
        await this.addNewActivityIfNeeded()
        var total_records= await this.total_recordsNo.textContent()
        console.log("Records on page before resize: "+(total_records.split(" ")[0]).split("–")[1])

        //Resizing the records per page to 50
        await this.rowsPerPagedrpdwn.click()
        await this.pageSize_50.click()
        //this.page.waitForTimeout(2000)

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

        await this.addNewActivityIfNeeded()
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

    //To return text cell value of the first row after search- decodedProcedureNote
    async returnFirstRowCellValue_texttype(datafieldname){
        console.log(`${datafieldname} value: `+ await this.page.locator(`//div[@data-field="${datafieldname}" and @role="cell"]`).textContent())
        return await this.page.locator(`//div[@data-field="${datafieldname}" and @role="cell"]`).textContent()
    }



    

}