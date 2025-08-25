const{expect} = require("playwright/test");

exports.React_PageNavigation = class React_PageNavigation {
    constructor(page){
        this.page= page
        this.accounts= page.locator('(//span[contains(text(),"Accounts")])[1]')
        this.allAccounts= page.locator('//span[contains(text(),"All accounts")]')

        this.admin= page.locator('//span[contains(text(),"Admin")]')
        this.masterFiles= page.locator('//span[contains(text(),"Master Files")]')
        this.activityTypes= page.locator('//span[contains(text(),"Activity Types")]')

    }

   // Click on Accounts
   async reactNavigateToAccounts(){
    await this.accounts.click()
    }

    //Click on All Accounts
    async reactNavigateToAllAccounts(){
    await this.allAccounts.click()
    }

    //Click on Admin
    async reactNavigateToAdmin(){
    await this.admin.click()
    }

    //Click on Master Files 
    async reactNavigateToMasterFiles(){
    await this.masterFiles.click()
    }

    //Click on Activity Types
    async reactNavigateToActivityTypes(){
    await this.activityTypes.click()
    }



}