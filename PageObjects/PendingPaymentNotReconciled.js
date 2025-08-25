exports.PendingPaymentNotReconciled= class PendingPaymentNotReconciled{

    constructor (page){
        this.page= page
        this.PendingPaymentNotReconciled= page.frameLocator('iframe[name="sideNavIFrame"]').getByRole('link', { name: 'Pending Payment NOT Reconciled' })
        this.firstRow = page.locator('.MuiDataGrid-virtualScrollerRenderZone').locator('div[role="row"]').locator('div[aria-colindex="1"]').nth(1)
        this.refresh = page.getByRole('button', { name: 'Refresh' })
        this.bestFit = page.getByRole('button', { name: 'BestFit' })
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
        this.showFilter= page.getByText('1Filters')
        this.addFilterbutton=page.getByRole('button', { name: 'Add filter' })
        this.removeAllbutton= page.getByRole('button', { name: 'Remove All' })
    }
    async clickonpendingPaymentNotReconciled(){
        this.PendingPaymentNotReconciled.click()
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

    
}

  










