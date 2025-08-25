const { expect } = require("playwright/test")
const { ScreenshotManager } = require('../utils/screenshotManager');

/**
 * Page object representing the Activity Communicate Window
 * @class ActivityCommunicateWindow
 */
exports.ActivityCommunicateWindow = class ActivityCommunicateWindow{

    constructor(page){

        this.page= page
        this.archiveissuecheckbox = page.locator('div').filter({ hasText: /^Archive issue$/ }).getByRole('checkbox')
        this.issueCompleteCheckbox = page.locator('div').filter({ hasText: /^Issue CompleteArchive issueOpen Customer DocsCreatedCreated$/ }).getByRole('checkbox').first()
        this.markasunread = page.getByRole('button', { name: 'Mark as unread' })
        this.toaddress = page.locator('#toAddress-address')
        this.forward =  page.getByRole('button', { name: 'Forward' })
        this.replyall = page.getByRole('button', { name: 'Reply All' })
        this.sentemailicon = page.getByTitle('Sent Email').first()
        this.overview = page.getByRole('button', { name: 'OVERVIEW' })
        this.ok = page.getByRole('button', { name: 'OK' })
        this.replybody =page.locator('.ql-editor')
        this.ccaddress = page.locator('//input[@id="ccAddress-address"]')
        this.reply = page.getByRole('button', { name: 'Reply', exact: true })
        this.selectcontact = page.getByRole('checkbox', { name: 'Select row' }).first()
        this.errormessageonnotselectingcontacts = page.getByText('Please select records to add contact to notes')
        this.addcontactsToNotes = page.getByRole('button', { name: 'Add Contacts To Note' })
        this.viewContacts = page.getByRole('button', { name: 'View Contacts' })
        this.cancelButton = page.getByRole('button', { name: 'Cancel' })
        this.emailBody = page.locator('//div[contains(@class,"sun-editor-editable")]')
        this.emailtemplate = page.locator('//label[text()="Select email template to insert"]//following-sibling::div//input')
        this.Toaddressfeild = page.locator('#toAddress-address')
        this.selectTemplate =page.locator('//div[.="Statement Email"]')
        this.saveAndsendButton = page.getByRole('button', { name: 'Save and Send' })
        this.emailtab = page.getByRole('tab', { name: 'Email' })
       // this.saveButton = page.getByRole('button', { name: 'Save' })
        this.saveButton = page.locator('button').filter({ hasText: 'Save' }).first()
        this.notestab = page.locator('//div[contains(@class,"editor-editable")]')
        this.description = page.locator('div').filter({ hasText: /^Description$/ }).getByRole('textbox')
        this.responseDays = page.locator('div').filter({ hasText: /^Response Days$/ }).getByRole('textbox')
        this.scheduleFollowupCheckbox = page.getByRole('main').locator('div').filter({ hasText: 'New Activity ' }).getByRole('checkbox').nth(4)
        this.copyNotesEmail = page.getByRole('button', { name: 'Copy Notes/Email' })
        this.newActivityButton = page.getByRole('button', { name: 'New Activity' })
        this.firstissue = page.locator('.MuiDataGrid-virtualScrollerRenderZone').locator('div[role="row"]').locator('div[aria-colindex="7"]').nth(1).locator('.blueLink')
        this.TaggedtoActivity=page.getByLabel('Tagged To Activity')
        this.taggedtoActivities=page.getByText('Tagged To Activity')
        this.taggedtoissue=page.getByLabel('Tagged To Issue')
        this.All= page.getByLabel('All', { exact: true })
        this.open=page.locator('//span[text()="Open"]')
        this.editupdate = page.getByRole('button', { name: 'Update' })
        this.reasonoption = page.locator('#react-select-5-option-0')
        this.reasondropdown = page.locator('div:nth-child(2) > .css-13cymwt-control > .css-hlgwow > .css-19bb58m')
        this.pastdue=page.getByLabel('Past Due', { exact: true })
        this.showall=page.getByText('Show All Accounts').first()
        this.Edittaggedinvoice=page.getByRole('button', { name: 'Edit All Tagged Invoices' })
        this.reasoncheckbox=page.locator('div').filter({ hasText: /^Reason$/ }).getByRole('checkbox')
        this.reasondropdown=page.locator('div').filter({ hasText: /^ReasonSelect Reason Code$/ }).locator('svg').nth(1)
        this.hideinvoice=page.locator('div').filter({ hasText: /^Hide invoices with 0\.00 balance$/ }).getByRole('checkbox')
        this.Transactiontable=page.locator('.MuiDataGrid-virtualScrollerRenderZone').locator('div[role="row"]').locator('div[aria-colindex="1"]').nth(1)
        this.invoicenumber=page.locator('.MuiDataGrid-virtualScrollerRenderZone').locator('div[role="row"]').locator('div[aria-colindex="8"]').locator('.blueLink').nth(1)
        this.Transactionstab=page.locator('//button[.="Transactions"]')
        this.update=page.getByRole('button', { name: 'Update' })
        this.reason=page.getByText('Missing PO').nth(1)
        this.Reasoncode=page.locator('.MuiDataGrid-virtualScrollerRenderZone').locator('div[role="row"]').locator('div[aria-colindex="5"]').locator('div[aria-labelledby="select-label"]').nth(1)
        this.checkbox= page.locator('.MuiDataGrid-virtualScrollerRenderZone').nth(1).locator('div[role="row"]').locator('div[aria-colindex="1"]').locator('input[type="checkbox"]').nth(8)
      //  this.custnumber1= this.invoicenumber.textContent()

        //New changes for Create new activity
        this.issuetxtarea= page.locator('(//label[contains(text(),"Issue")]//following-sibling::div//textarea)[1]')
        this.schfollowupchkbox= this.page.locator('//span[contains(text(),"FOLLOW UP")]//following-sibling::div//input[@type="checkbox"]')
        this.selecttagcheckbox= this.page.locator('(//div[@data-field="tagged" and @role="cell"]//input)[1]')
        this.firsttransactionid= this.page.locator('(//div[@data-field="documentNo" and @role="cell"]//span)[1]')
        this.paymentstab= page.locator('//button[text()="Attachments"]//following-sibling::button[text()="Payment"]')
        this.paymentamounttxtbox= page.locator('//input[@id="payment-amount"]')
        this.paybydatefield= page.locator('//label[text()="Pay By Date"]//following-sibling::div//input')
        this.selectdate= page.locator('//button[text()="28" and @role="gridcell"]')
        this.paybydate_okbtn= page.locator('//button[text()="OK"]')
        this.custpromisedchkbox= page.locator('//span[text()="Customer Promised"]//following-sibling::span//input')
        this.selectcontact_toadd= page.locator('(//div[@role="dialog"]//div[@data-field="__check__" and @role="cell"])[1]')
        this.contactnameselected= page.locator('(//div[@role="dialog"]//div[@data-field="contactName" and @role="cell"]//div)[1]')
        this.contectnameinnotes= page.locator('//div[contains(@class,"editor-editable")]')
        this.attachementstab= page.getByRole('tab', { name: 'Attachments' })
        this.selectreportdrpdwn= page.locator('//label[contains(text(),"Select Report")]//following-sibling::div//div')
        this.attachreportbtn= page.locator('//button[text()="Attach Report"]')
        this.notestabbtn= page.locator('//button[text()="Notes"]')
        this.saveactivitybtn= page.locator('//button[text()="Save"]')
        this.activitygridrefreshbtn= this.page.locator('(//button[text()="Refresh"])[2]')

        //New changes for New Activty 2.0
        this.contactTbl_firstrow= page.locator('(//button[text()="Add Contact"]/../../following-sibling::div//div[@role="row" and @data-id])[1]')

        this.subjectlineselector= page.locator('//button[text()="Subject"]//following-sibling::div//input[contains(@value,"{CustID} {CustName}:")]')
        this.emailbodytextselector= page.locator('//span[contains(text(),"{CustName|Valued Customer}")]')
        this.transactiontblselector= page.locator('(//div[@role="cell" and @data-field="tagged"])[1]')
        this.selectallbtn= page.locator('//button[text()="Select All"]')
        this.clearallbtn= page.locator('//button[text()="Clear All"]')

        this.voicemessagetab= page.locator('//button[text()="Voice Message"]')
        this.texttab= page.locator('//button[text()="Text"]')
        this.overviewbtn= page.locator('//button[text()="OVERVIEW"]')
        this.refreshbtn = page.locator('(//button[text()="Refresh"])[1]')
        this.issuetxtarea= page.locator('(//label[text()="Issue"]//following-sibling::div//textarea)[1]')

        this.spokewithcustomerchkbx= page.locator('//input[@id="spoke-with-customer-checkbox"]')
        this.assignuserfield= page.locator('//label[text()="Assign to"]//following-sibling::div//div')
        this.selectuser= page.locator('(//li[text()="UnAssigned System User"]//following-sibling::li)[1]')
        this.followupdatefield= page.locator('//label[text()="Follow Up Date"]//..//input')
        this.selectfirstcontactchkbx= page.locator('(//div[@role="cell" and @data-field="selectedRecipient"]//input)[1]')
        this.subjectlinefield= page.locator('//button[text()="Subject"]/following-sibling::div//input')
        this.emailbodyarea= page.locator('//span[text()="Please type here..."]//following-sibling::div[@contenteditable="true"]')
        this.selectfirstemailact= page.locator('(//div[@role="cell"]//i[contains(@class,"email")])[1]')
        this.responsedaysfield= page.locator('//label[text()="Response Days"]//..//input')
        this.followupdescfield= page.locator('//label[text()="Description"]//..//div//textarea[@aria-invalid="false"]')
        this.subjectlinefield_readonly= page.locator('//input[@id="subject"]')
        this.emailbodyarea_readonly= page.locator('//div[@id="mailContent"]')
        this.attachedreportname= page.locator('//button[text()="Preview"]//preceding-sibling:: div')
        this.paymentamountreadonly= page.locator('//input[@id="payment-amount"]')
        this.paybydatereadonly= page.locator('//label[text()="Pay By Date"]//..//input')
        this.custpromisedchkboxreadonly= page.locator('//span[text()="Customer Promised"]//following-sibling::span//input')
        this.notestab_readtext= page.locator('//div[@id="mailContent"]')
        this.spokewithcustchkboxreadonly= page.locator('//input[@id="spoke-with-customer-checkbox"]')
        this.notestab_contactadded_readtext= page.locator('//div[contains(@class,"editor-editable")]')
        this.saveAsdraft= page.locator('//button[text()="Save as Draft"]')
        this.followupday_okbtn= page.locator('//button[text()="OK"]')
        this.toaddress_readonly= page.locator('//input[@id="toAddress-address"]')
        this.ccaddress_readonly= page.locator('//input[@id="ccAddress-address"]')
        this.closecontactlistbtn= page.locator('//button[text()="Close"]')

    }

    /**
     * Gets the tagged invoice number
     * @returns {Promise<void>}
     */
    async gettaggedinvoicenum(){

        //let custnumber1= this.invoicenumber.textContent()
        console.log("before tagged to activity :"+this.custnumber1)
    }

    /**
     * Clicks on the archive issue checkbox
     * @returns {Promise<void>}
     */
    async clickonarchiveissue(){

        await this.archiveissuecheckbox.check()
    }

    /**
     * Clicks on the issue complete checkbox
     * @returns {Promise<void>}
     */
    async clickonissuecomplete(){

        await this.issueCompleteCheckbox.check()
    }

    async clickonmarkasunread(){

        await this.markasunread.click()
    }

    async entertoaddress(toAddress){

        await this.toaddress.click()
        await this.toaddress.type(toAddress)
    }

    async clickonforward(){

        await this.forward.click()

    }

    async clickonreplyall(){

        await this.replyall.click()
    }

    async clickonsentemailicon(){

        await this.page.hover('//i[@title="Sent Email"]')
        await this.sentemailicon.click()
    }

    async clickonoverview(){

        await this.overview.click()
    }

    async waitforemailtobesent(){

        await new Promise(resolve => setTimeout(resolve, 20000))
    }

    async clickonok(){
        try{

        await this.ok.click()
        }catch(err){

            console.log("ok button not found")
        }
    }

    async enterreplybody(description){

        await this.emailBody.type(description)
    }

    async clickonreplybody(){

        await this.page.hover('//div[contains(@class,"sun-editor-editable")]')
        await this.emailBody.click()
    }

    async enterccaddress(CCaddress){

        await this.page.hover('//input[@id="ccAddress-address"]')
        await this.ccaddress.type(CCaddress)

    }

    async clickonccaddress(){

        await  this.ccaddress.click()
    }

    async clickonreply(){
        await this.page.waitForSelector('//button[.="Reply"]')
        await this.reply.click()
    }

    async clickonupdate(){

        await this.editupdate.clcik()
    }

    async selectreasonoption(){

        await this.reasonoption.click()
    }

    async clickonreasondropdown(){

        await this.reasondropdown.click()
    }
    async clickonreason(){
        await this.reason.check()

    }
    async clickonupdate(){
        await this.update.click()
        
    }
    async clickonreasondropdown(){
        await this.reasondropdown.click()
    }

    async clickonreasoncheckbox(){
        await this.reasoncheckbox.click()
    }
    async clickoneditalltaggedinvoice(){
        await this.Edittaggedinvoice.click()
    }
    async clickoncheckbox(){
        await this.checkbox.check()
    }
    
    async clickonshowall(){
       await this.showall.click() 
    }

    async clickonHideinvoice(){
        await this.hideinvoice.click()

    }
    
    async clickonpastdue(){

        await this.pastdue.click()
    }

    async clickonopen(){
        await this.open.click()
    }
    

    async clickonAll(){
        await this.All.click()
        //await this.page.waitForSelector('(//div[@data-field="tagged" and @role="cell"])')
    }

    async  clicktaggedtoissue(){
        await this.taggedtoissue.click()
    
    }
    async clickontaggedactivity(){

        await this.TaggedtoActivity.click()
       
    }

    async clickonTransactions(){

        await this.Transactionstab.click()
        await expect(this.taggedtoActivities).toBeVisible()
    }

    async clikonSave(){
        
        await this.saveButton.click()
    }

    async enterDescription(dataSet, test = "This is a test description"){

        await this.description.fill(test)
        dataSet.description = test
    }

    async fillvaluesinResponsedays(dataSet, response_days = "2"){

        await this.responseDays.fill(response_days)
        dataSet.responseDays = response_days
    }

    async clickScheduleFollowupcheckbox(){

        await this.scheduleFollowupCheckbox.click()
    }

    async clikOnCopyNotesEmail(){

        await this.copyNotesEmail.click()
    }

    async selectaContact(){

        await this.selectcontact.check()
    }

    async VerifyProperErrorMessageContacts(){

        await this.errormessageonnotselectingcontacts.click()
    }

    async clickonAddContactstoNotes(){

        await this.addcontactsToNotes.click()
    }

    async clickonViewContacts(){

        await this.viewContacts.click()
    }

    async clickonCancel(){

        await this.cancelButton.click()
    } 

    async enterTextinEmailBody(){

        await this.emailBody.click()

        await this.emailBody.fill("This is a serious email")
    }

    async clickSaveAndSend(){

        await this.saveAndsendButton.click()
    }

    async selectemailTemplate(dataSet, templateName = "test"){

        //await this.selectTemplate.click()
        await this.emailtemplate.fill(templateName)
        await this.page.getByRole('option').getByText(`${templateName}`, { exact: true }).click();
        await this.page.waitForSelector('//span[contains(text(),"{CustName|Valued Customer}")]')
        dataSet.emailTemplate = templateName; // Store the selected template in testdata for later use
    }

    async clickonTemplate(){

        await this.emailtemplate.click()
    }

    async enteraddressinTofield(dataSet, to_contact_id = "namrata.dubey@sage.com"){

        //await this.Toaddressfeild.click()
        await this.Toaddressfeild.fill(to_contact_id)
        dataSet.to_contact_id = to_contact_id; // Store the To contact email in testdata for later use
    }



    async navigatetoemailTab(){

        await this.emailtab.click()
    }

    async clickonSaveButton(){

        await this.saveButton.click()
    }

    /**
     * Clicks on New Activity button
     * @returns {Promise<void>}
     */
    async clickOnNewActivity(){

        await this.newActivityButton.click()
    }

    /**
     * Navigates to Notes tab
     * @returns {Promise<void>}
     */
    async navigatetoNotes(){

        await this.notestab.click()

    }

    async addNotes(testnotes = "This is a test note"){

        await this.notestab.fill(testnotes);
        await this.page.waitForTimeout(2000); // Wait for the content to be set
    }

    //Changes related to Create New Activity

    //To add Issue Name in the textarea
    async enterIssueName(issueName){
        
        await this.issuetxtarea.click()
        await this.issuetxtarea.clear() // Clear any existing text
        await this.issuetxtarea.fill(issueName)
    }

    //To wait for the activity window to load
    async waitForActivtyToLoad(){
        
        await this.page.waitForSelector('//button[contains(text(),"View Contacts")]')
    }

    //To Click on Schedule Followup checkbox
    async checkScheduleFollowupcheckbox(){
        
        await this.schfollowupchkbox.click()
    }

    //To Validate the issue name in Activity table of Account details page
    async validateIssueName(issueName){
        
        return await this.page.locator(`(//span[text()="${issueName}"])[1]`).textContent()
    }

    //To Validate Followup flag in Activity table of Account details page
    async validateFollowupflag(issueName){
        
        //return await this.page.locator(`//span[text()="${issueName}"]/..//following-sibling::div//i[@title="Open FollowUp"]`).isVisible()
        return await this.page.locator(`//span[text()="${issueName}"]/..//following-sibling::div[@data-field="followUp"]//i`).isVisible()
    }

    //To Validate Email sent flag in Activity table of Account details page
    async validateEmailSent(issueName){
        
        await this.clickonRefreshbtn(issueName)
        return await this.page.locator(`(//span[text()="${issueName}"]/..//following-sibling::div//i[@title="Sent Email"])[1]`).isVisible()
    }

    //To Validate Expected Payment flag in Activity table of Account details page
    async validatePaymentflag(issueName){
        
        return await this.page.locator(`//span[text()="${issueName}"]/..//following-sibling::div//i[contains(@class,"dollar")]`).isVisible()
    }

    //To Validate Attachment flag in Activity table of Account details page
    async validateAttachment(issueName){

        return await this.page.locator(`//span[text()="${issueName}"]/..//following-sibling::div//i[contains(@class,"attachment")]`).isVisible()
    }

    //To Click on Refresh button in Activity table of Account details page untill the email sent flag is visible
    async clickonRefreshbtn(issueName){
        for (let i = 0; i < 30; i++) {
            await this.activitygridrefreshbtn.click()
            let emaiflag = await this.page.locator(`(//span[text()="${issueName}"]/..//following-sibling::div//i[@title="Sent Email"])[1]`).isVisible()
            await this.page.waitForTimeout(10000) // Wait for 10 seconds before checking again
            if (emaiflag) {
                break; // Exit the loop if the email flag is found
            }
            console.log(`Attempt ${i + 1}: Email not sent yet. Retrying...`);
        }
    }

    //To wait for Transaction tab to load in Activity window
    async waitFortransactionsToLoad(){
        
        await this.page.waitForSelector('(//div[@data-field="tagged" and @role="cell"])[1]')
    }

    //To click on Tag checkbox in Transaction table
    async clickonTagcheckbox(){
        
        await this.selecttagcheckbox.click()
    }

    //To return the transaction ID of tagged row from Transaction table 
    async returnTransactionID(){
        
        return await this.firsttransactionid.textContent()
    }

    //To Navigate to Payments tab in Activity window
    async navigatetoPaymentsTab(){
        
        await this.paymentstab.click()

    }

    //To Enter Payment Amount in Payments tab
    async enterpaymentamount(dataSet, payamount = "6"){
        
        await this.paymentamounttxtbox.fill(payamount)
        dataSet.paymentAmount = payamount; // Store the payment amount in testdata for later use
    }

    //To Select Pay By Date in Payments tab
    async enterpaybydate(dataSet){
        
        await this.paybydatefield.click()
        await this.selectdate.click()
        await this.paybydate_okbtn.click()
        dataSet.payByDate = await this.paybydatefield.getAttribute('value'); // Store the selected date in testdata for later use
    }

    //To click on Customer Promised checkbox in Payments tab
    async clickonCustomerpromisedchkbox(){
        
        await this.custpromisedchkbox.click()
    }
    
    //To Select contact from View Contacts window
    async selectcontacttoAdd(){
        
        await this.selectcontact_toadd.click()
    }

    //To get the contact name from View Contacts window
    async returnContactName(){
        
        return await this.contactnameselected.textContent()
    }

    //To get the contact name that is added in Notes
    async returnAddedContactNameinNotes(){
        
        return await this.contectnameinnotes.textContent()
    }
    
    //To Navigate to Attachments tab in Activity window
    async navigatetoAttachmentsTab(){
        
        await this.attachementstab.click()
    }

    //To click on report-dropdown in Attachments tab
    async clickonselectreportdrpdwn(){
        
        await this.selectreportdrpdwn.click()
    }

    //To select the report from dropdown in Attachments tab
    async selectReport(dataSet, reportname = "Statement - EN"){
        
        await this.page.locator(`//li[text()="${reportname}"]`).click()
        dataSet.attachedReportName = reportname; // Store the selected report name in testdata for later use
    }

    //To click on Attach Report button in Attachments tab
    async clickOnAttachReport(){
        
        await this.attachreportbtn.click()
        await this.waitForAttachementstoLoad()
    }

    //To wait for Attachments to load in Activity window
    async waitForAttachementstoLoad(){
        
        await this.page.waitForSelector('//button[text()="Preview"]')
    }

    //To Navigate to Notes tab in Activity window
    async navigateToNotesTab(){
        
        await this.notestabbtn.click()
    }
    
    //To Select User to assign followup in Activity window
    async selectFollowupAssignUser(dataSet, assignUser = "UnAssigned System User"){

        await this.assignuserfield.click()
        if (await this.page.locator(`//li[text()="${assignUser}"]`).isVisible())
        {
            await this.page.locator(`//li[text()="${assignUser}"]`).click()
        }
        else
        {
            await this.selectuser.click()
        }
        dataSet.assignedUser = await this.assignuserfield.textContent(); // Store the selected user in testdata for later use
    }

    //To Select Followup Date in Activity window
   async selectFollowupDate(dataSet){
       
        await this.followupdatefield.click()
        await this.page.locator('//button[text()="28" and @role="gridcell"]').click()
        await this.followupday_okbtn.click()
        dataSet.followupDate = await this.followupdatefield.getAttribute('value') // Store the selected date in testdata for later use
    }

    //To click on contact btn in Activity window (To or CC)
    async clickOnEmailContactbtn_Type(contactype){

        await this.page.locator(`//button[text()="${contactype}"]`).click()
    }

    //To select contact from To or CC contactlist in Activity window
    async selectContactFromToList_Or_CcList(dataSet, contacttype){
        
        await this.selectfirstcontactchkbx.click()
        await this.closePopupByClickingOutside()
        if (contacttype === "To") {
            dataSet.to_contact_mailid = await this.toaddress_readonly.getAttribute('value') // Store the selected To contact email in testdata for later use
        } 
        else {
            dataSet.cc_contact_mailid = await this.ccaddress_readonly.getAttribute('value')// Store the selected Cc contact email in testdata for later use
        }
    
    }
    // Click at coordinates outside the popup
    async closePopupByClickingOutside() {
        
        await this.page.mouse.click(10, 10); // Click near the top left of the page
    }

    //To Close Contact list popup in Activity window
    async closeContactListPopup() {

        await this.closecontactlistbtn.click()
    }


    //To Enter Subjectline in Activity window
    async enterSubjectline(dataSet, subjectline = "Test Email Subject - "){
       
        await this.subjectlinefield.click()
        await this.subjectlinefield.type(subjectline)
        await this.subjectlinefield.press('Enter') // Press Enter to save the subject line
        dataSet.subjectline = subjectline // Store the subject line in testdata for later use
    }

    //To Enter Email Body text in Activity window
    async enterEmailBodytext(dataSet, emailbodytext = "This is a test email body text"){
        
        await this.emailbodyarea.click()
        await this.emailbodyarea.clear() // Clear any existing text
        await this.emailbodyarea.type(emailbodytext)
        await this.emailbodyarea.press('Enter') // Press Enter to save the email body text

        await this.page.waitForTimeout(2000); // Wait for the content to be set
        dataSet.emailbodytext = emailbodytext // Store the email body text in testdata for later use
    }

    //To Enter Email Body text in Activity window for Forward
    // This method is similar to enterEmailBodytext but specifically for the Forward action because the locator is different
    async enterEmailBodytext_Forward(dataSet, fwd_emailbodytext = "This is a test email body text for Forward"){

        await this.emailbodyarea.evaluate(
            (el, value) => {
            el.innerHTML = `<p>${value}</p>` + el.innerHTML;
            // Trigger input/change events so the editor registers the change
            el.dispatchEvent(new Event('input', { bubbles: true }));
            el.dispatchEvent(new Event('change', { bubbles: true }));}, fwd_emailbodytext
        );
        await this.page.waitForTimeout(2000); // Wait for the content to be set
        dataSet.fwd_emailbodytext = await this.emailbodyarea.textContent() // Store the email body text in testdata for later use
    }

    //To click on first Email activity in Activity table
    async select_N_OpenFirstEmailActivity(){

        await this.selectfirstemailact.click()
    }
    
    //To click on select all button in Transaction tab
    async clickonSelectAllbtn(){
        
        await this.selectallbtn.click()
    }

    //To click on clear all button in Transaction tab
    async clickonClearAllbtn(){
        
        await this.clearallbtn.click()
    }

    //To Validate if Voice Message and Text tab is visible and clickable
    async navigatetoVoiceMessage_Or_TextTab(selector, errorMessage) {
    
        const locator = selector;
        const isVisible = await locator.isVisible();
        const isEnabled = await locator.isEnabled();
        if (!isVisible || !isEnabled) {
        throw new Error(errorMessage);
        }
    }

    //To Open Activity by clicking on the issue name in Activity table
    async OpenActivity(issueName){

        await this.page.locator(`(//span[text()="${issueName}"])[1]`).click()
    }

    //To return the assigned user from Activity window
    async returnAssignedUser(){
        
        return await this.assignuserfield.textContent();
    }

    //To return the Followup date from Activity window
    async returnFollowupDate(){

        return await this.followupdatefield.getAttribute('value');
    }

    //To return the Response Days from Activity window
    async returnResponseDays(){

        return await this.responsedaysfield.getAttribute('value');
    }

    //To return the Description from Activity window
    async returnDescription(){

        return await this.followupdescfield.textContent();
    }

    //To return 'To' contact email from Activity window
    async returnTocontactEmail(){
        
        return await this.toaddress_readonly.getAttribute('value')
    }

    //To return 'CC' contact email from Activity window
    async returnCccontactEmail(){
        
        return await this.ccaddress_readonly.getAttribute('value')
    }

    //To return Subject line from Activity window
    async returnSubjectline(){
        
        return await this.subjectlinefield_readonly.getAttribute('value')
    }

    //To return the email body text from Activity window
    async returnEmailBodytext(){

        return await this.emailbodyarea_readonly.textContent()
    }

    //To return attached report name from Attachments tab in Activity window
    async returnAttachedReportName(){
        
        return await this.attachedreportname.textContent()
    }

    //To return the Payment Amount from Payments tab in Activity window
    async returnPaymentAmount(){
        return await this.paymentamountreadonly.getAttribute('value')
    }

    //To return the Pay By Date from Payments tab in Activity window
    async returnPayByDate(){
        return await this.paybydatereadonly.getAttribute('value')
    }

    //To return the Customer Promised checkbox status from Payments tab in Activity window
    async returnCustomerPromisedStatus(){
        return await this.custpromisedchkboxreadonly.isChecked()
    }

    //To return the notes text from Notes tab in Activity window
    async returnNotesText(){

        return await this.notestab_readtext.textContent()
    }

    //To validate the notes cell in Activity table of Account details page
    async validateNotescell(issueName){
        
        return await this.page.locator(`(//span[text()="${issueName}"]/..//following-sibling::div[@data-field="notes"])[1]`).textContent()
    }

    //To click on spoke with customer checkbox in Activity window
    async clickonSpokewithCustomerCheckbox(){
        
        await this.spokewithcustchkboxreadonly.click()
    }

    //To return the notes tab details from Activity window when the notes tab is opened and contact is added to notes
    async returnnotestabdetails(){
        
        return await this.notestab_contactadded_readtext.textContent()
    }

    //To click on Save as Draft button in Activity window
    async clickonSaveAsDraft(){
        
        await this.saveAsdraft.click()
    }

    //To click on Refresh button in Statement table
    async clickOnRefreshbtn_statementtable(){
        
        await this.refreshbtn.click()
    }
    
}