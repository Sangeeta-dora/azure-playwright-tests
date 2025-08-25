exports.ExpectedPaymentsPromiseBroken = class ExpectedPaymentsPromiseBroken{

    constructor(page){

        this.page= page
        this.exportToExcel = page.getByRole('button', { name: 'Export To Excel' })
        this.firstissue = page.locator('.MuiDataGrid-virtualScrollerRenderZone').locator('div[role="row"]').locator('div[aria-colindex="3"]').nth(1).locator('.blueLink')
        this.AccountDetailsNewActivity = page.getByRole('menuitem', { name: 'Account Detail/New activity' })
        this.AccountDetails = page.getByRole('menuitem', { name: 'Account Details' })
        this.refresh = page.getByRole('button', { name: 'Refresh' })
        this.bestfit = page.getByRole('button', { name: 'BestFit' })
        this.density = page.getByLabel('Density')
        this.CustNameFirst = page.locator('.MuiDataGrid-virtualScrollerRenderZone').locator('div[role="row"]').locator('div[aria-colindex="2"]').nth(1).locator('.blueLink')
        this.Cust_ID = page.locator('.MuiDataGrid-virtualScrollerRenderZone').locator('div[role="row"]').locator('div[aria-colindex="5"]')
        this.compact = page.getByRole('menuitem', { name: 'Compact' })
        this.comfortable = page.getByRole('menuitem', { name: 'Comfortable' })
        this.standard = page.getByRole('menuitem', { name: 'Standard' })
        this.firstRow=  page.locator('.MuiDataGrid-virtualScrollerRenderZone').locator('div[role="row"]').locator('div[aria-colindex="1"]').nth(1)
        this.expectedPayments = page.frameLocator('iframe[name="sideNavIFrame"]').getByRole('link', { name: 'Expected Payment Promise' })


    }

    async clickOnExport(){

         await this.exportToExcel.click()
    }

    async clickonFirstIssue(){

        await this.firstissue.click()
    }

    async clickOnaccountDetailsNewActivity(){

        await this.AccountDetailsNewActivity.click()
    }

    async clickOnAccountDetails(){

        await this.AccountDetails.click()
    }

    async clickonFirstcustName(){

        await this.CustNameFirst.click()
    }

    async clickonfirstcustomer(){


    }

    async clickOnExpectedPayments(){

        await this.expectedPayments.click()
    }

    async clickonRefresh(){

        await this.refresh.click()
    }

    async clickonBestFit(){

        await this.bestfit.click()
    }

    async clickondensity(){

        await this.density.click()
    }

    async clickoncomfortable(){

        await this.comfortable.click()
    }
    async clickonstandard(){

        await this.standard.click()
    }
    async clickoncompact(){

        await this.compact.click()
    }

    
    
}