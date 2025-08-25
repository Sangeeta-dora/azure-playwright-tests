exports.InquiriesByUser_ExpectedPayments = class InquiriesByUser_ExpectedPayments{

    constructor(page){

        this.page= page
        this.firstissue = page.locator('.MuiDataGrid-virtualScrollerRenderZone').locator('div[data-rowindex="0"]').locator('div[data-colindex="2"]').locator('.blueLink')
        this.accountDetailsNewActivity = page.getByRole('menuitem', { name: 'Account Detail/New activity' })
        this.accountDetails =  page.getByRole('menuitem', { name: 'Account Details' })
        this.firstCust = page.locator('.MuiDataGrid-virtualScrollerRenderZone').locator('div[data-rowindex="0"]').locator('div[data-colindex="1"]').locator('.blueLink')
        this.exportexcel = page.getByRole('button', { name: 'Export To Excel' })
        this.hideAll = page.getByRole('button', { name: 'Hide all' })
        this.showAll = page.getByRole('button', { name: 'Show all' })
        this.selectColumns = page.getByLabel('Select columns')
        this.compact = page.getByRole('menuitem', { name: 'Compact' })
        this.comfortable = page.getByRole('menuitem', { name: 'Comfortable' })
        this.standard =page.getByRole('menuitem', { name: 'Standard' })
        this.density= page.getByLabel('Density')
        this.bestFit = page.getByRole('button', { name: 'Best Fit' })
        this.refresh = page.getByRole('button', { name: 'Refresh' })
        this.firstRow=  page.locator('.MuiDataGrid-virtualScrollerRenderZone').locator('div[role="row"]').locator('div[aria-colindex="1"]').nth(1)
    }

    async clickonfirstissue(){

        await this.firstissue.click()
    }
    async clickonAccountDetailsNewActivity(){

        await this.accountDetailsNewActivity.click()
    }

    async clickonAccountDetails(){

        await this.accountDetails.click()
    }

    async clickOnFirstCust(){

        await this.firstCust.click()
    }

    
    async clickonExportToExcel(){

        await this.exportexcel.click()
    }

    async clcikonShowAll(){

        await this.showAll.click()
    }

    async clickonHideAll(){

        await this.hideAll.click()
    }

    async clickOnColumns(){

        await this.selectColumns.click()
    }

    async clickOnCompact(){

        await this.compact.click()
    }

    async clickOnStandard(){

        await this.standard.click()
    }

    async clickOnComfortable(){

        await this.comfortable.click()
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
}