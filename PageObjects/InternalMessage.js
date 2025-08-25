exports.InternalMessage = class InternalMessage{

    constructor(page){
        this.page= page
        this.internalmessage= page.frameLocator('iframe[name="sideNavIFrame"]').getByRole('link', { name: 'Internal Message' })
        this.firstRow=  page.locator('.MuiDataGrid-virtualScrollerRenderZone').locator('div[role="row"]').locator('div[aria-colindex="1"]').nth(1)
        this.refresh = page.getByRole('button', { name: 'Refresh' })
        this.bestFit = page.getByRole('button', { name: 'Best Fit' })
        this.density = page.getByLabel('Density')
        this.comfortable = page.getByRole('menuitem', { name: 'Comfortable' })
        this.compact = page.getByRole('menuitem', { name: 'Compact' })
        this.standard = page.getByRole('menuitem', { name: 'Standard' })
        this.selectColumn = page.getByLabel('Select columns')
        this.selectColumnShowAll = page.getByRole('button', { name: 'Show all' })
        this.selectColumnHideAll = page.getByRole('button', { name: 'Hide all' })
        this.firstCustomer = page.locator('.MuiDataGrid-virtualScrollerRenderZone').locator('div[role="row"]').locator('div[aria-colindex="6"]').nth(1).locator('.blueLink')
        this.accountDetails = page.getByRole('menuitem', { name: 'Account Details' })
        this.accountNewActivity = page.getByRole('menuitem', { name: 'Account Detail/New activity' })
        this.exportToExcel = page.getByRole('button', { name: 'Export To Excel' })
        this.exportSuccessmessage = page.getByText('Exported SuccessfullyMailNotRead Exported To Excel')
        this.showFilter= page.getByLabel('Show filters')
        this.addFilterbutton=page.getByRole('button', { name: 'Add filter' })
        this.removeAllbutton= page.getByRole('button', { name: 'Remove All' })
        this.Restrict=page.getByLabel('Restricted to Alert Internal')

    }
    async clickoninternalmessage(){
        await this.internalmessage.click()
    }
    async clickonrefresh(){
        await this.refresh.click()
    }
    async clickonBestFit(){
        await this.bestFit.click()
    }
    async clickOnDensity(){
        await this.density.click()
    }
    async clickOnComfortable(){
        await this.comfortable.click()
    }
    async clickOnCompact(){
        await this.compact.click()
    }
    async clickOnStandard(){
        await this.standard.click()   
    }
    async clickOnSelectColumn(){
        await this.selectColumn.click()
    }
    async clickOnHideAll(){
        await this.selectColumnHideAll.click()
    }
    async clickOnShowAll(){
        await this.selectColumnShowAll.click()
        
    }
    async clickOnFirstCustomer(){
        await this.firstCustomer.click()
    }
    async clickonAccountDetails(){
        await this.accountDetails.click()
    }
    async clickOnAccountDetailsNewActivity(){
        await this.accountNewActivity.click()
    }
    async clickonExport(){
        await this.exportToExcel.click()
    }
    async verifyDownloadMessage(){
        await this.exportSuccessmessage.click()
    }
    async clickonfilter(){
        await this.showFilter.click()
    }
    async clickonfilteronpayment(){
        await this.showFilter.click()
    }
    async addFilterbuttonavailable(){
        await this.addFilterbutton.click()
    }
    async Removeallbuttonavailable(){

        await this.removeAllbutton.click()
    }
    async Internalmessageuncheck(){
        await this.Restrict.click()
    }

}
