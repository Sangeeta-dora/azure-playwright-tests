const{expect} = require("playwright/test");

exports.Messages_DraftActivities = class Messages_DraftActivities {
    constructor(page) {
        this.page = page;
        this.firstrow= page.locator('(//div[@data-rowindex="0"])[1]')
        this.draftedNotes= page.locator('//div[contains(@class,"editor-editable")]')

    }

    //To open draft activity
    async OpenDraftedIssue(issueName) {
        
        await this.page.locator(`(//span[text()="${issueName}"])[1]`).click()
    }

    //To return draft issue name
    async validateDraftedIssueName(issueName) {

        return await this.page.locator(`(//span[text()="${issueName}"])[1]`).textContent()
    }

    //To return draft notes text
    async returnDraftedNotesText() {

        return await this.draftedNotes.textContent()
    }
}