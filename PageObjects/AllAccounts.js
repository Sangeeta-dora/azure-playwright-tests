exports.AllAccounts = class AllAccounts{ 

    constructor(page){
        this.page = page
        this.accounts= page.locator('iframe[name="sideNavIFrame"]').contentFrame().getByText('Accounts', { exact: true })
        this.allaccounts= page.locator('iframe[name="sideNavIFrame"]').contentFrame().getByRole('link', { name: 'All accounts' })
        this.containstxtbx= page.getByLabel('Contains').nth(2)
        this.accountDetailsOption= page.getByRole('menuitem', { name: 'Account Details' })
        this.firstdatarow= page.locator('(//div[@role="row"])[3]')

    }

    //to click on Accounts option
    async clickonAccounts(){
        await this.accounts.click()
    }

    //to click on All Accounts option
    async clickonAllAccounts(){
        await this.allaccounts.click()
    }

    //to search and click on the customer
    async searchAndClick(Cust_ID_Name){
        await this.containstxtbx.fill(Cust_ID_Name)
        await this.containstxtbx.press('Enter')
        await this.page.locator('span').filter({ hasText: Cust_ID_Name }).click()
    }

    //to click on Account Details option
    async clickonAccountDetailsOption() {
        await this.accountDetailsOption.click()
        await this.waitforAccountDetailsToLoad
    }

    //to wait for the Account details page to load
    async waitforAccountDetailsToLoad(){
        await this.page.waitForSelector('(//div[@role="row" and @data-rowindex="0"])[1]')
    }
    
}