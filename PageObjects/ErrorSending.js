exports.ErrorSending = class ErrorSending{

    constructor(page){

        this.page= page
        this.density = page.getByLabel('Density')
        this.firstCustomer = page.locator('.MuiDataGrid-virtualScrollerRenderZone').locator('div[role="row"]').locator('div[aria-colindex="6"]').nth(1).locator('.blueLink')
        this.accountDetails = page.getByRole('menuitem', { name: 'Account Details' })
        this.accountNewActivity = page.getByRole('menuitem', { name: 'Account Detail/New activity' })
        this.compact = page.getByRole('menuitem', { name: 'Compact' })
        this.comfortable = page.getByRole('menuitem', { name: 'Comfortable' })
        this.standard = page.getByRole('menuitem', { name: 'Standard' })
        this.selectColumn = page.getByLabel('Select columns')
        this.selectColumnShowAll = page.getByRole('button', { name: 'Show all' })
        this.selectColumnHideAll = page.getByRole('button', { name: 'Hide all' })
        this.exportSuccessmessage = page.getByText('Exported SuccessfullyMailNotRead Exported To Excel')
        this.bestFit = page.getByRole('button', { name: 'Best Fit' })
        this.exportToExcel = page.getByRole('button', { name: 'Export To Excel' })
        this.refresh = page.getByRole('button', { name: 'Refresh' })
        this.firstRow=  page.locator('.MuiDataGrid-virtualScrollerRenderZone').locator('div[role="row"]').locator('div[aria-colindex="1"]').nth(1)
        this.errorSending =  page.frameLocator('iframe[name="sideNavIFrame"]').getByRole('link', { name: 'Error Sending Email' })
    }

    async clickOnFirstCustomer(){

        await this.firstCustomer.click()
    }

    async clickOnAccountDetailsNewActivity(){

        await this.accountNewActivity.click()
    }

    async clickonAccountDetails(){

        await this.accountDetails.click()
    }

    async clickOnComfortable(){

        await this.comfortable.click()
    }
    
    async clickOnStandard(){

        await this.standard.click()
    }

    async clickOnCompact(){

        await this.compact.click()
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

    async clickOnDensity(){

        await this.density.click()
    }

    


    async verifyDownloadMessage(){

       await this.exportSuccessmessage.click()
    }

    async clikOnErrorSending(){

        await this.errorSending.click()
    }

    async clikonRefresh(){

        await this.refresh.click()
    }
    

    async clickonBestFit(){
        
        await this.bestFit.click()
    
    }
    
    async clickonExport(){

        await this.exportToExcel.click()
    }
}