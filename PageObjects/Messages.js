exports.Messages = class Messages{
    constructor(page){
        this.page= page
        this.messagesimage = page.getByRole('img', { name: 'Inbox' })
        this.exportToExcel = page.getByRole('button', { name: 'Export To Excel' })
        this.bestfit = page.getByRole('button', { name: 'Best Fit' })
        this.refresh = page.getByRole('button', { name: 'Refresh' })
        this.density =  page.getByRole('button', { name: 'Density' })
        this.densityComfortable = page.getByRole('menuitem', { name: 'Comfortable' })
        this.densityCompact = page.getByRole('menuitem', { name: 'Compact' })
        this.densityStandard = page.getByRole('menuitem', { name: 'Standard' })
        this.showAllMessages = page.getByLabel('Show All Messages')       
        this.unreadIcon = page.locator(".pi-unread")
        this.readIcon = page.locator(".pi-read")
        this.pageLoded = page.waitForSelector('.pi-unread', { timeout: 120000, state: 'visible' });
       // this.table = page.waitForSelector('div[role="cell"]', { timeout: 30000 })
        this.firstRow = page.locator('div[role="cell"][data-field="source"][data-colindex="1"]')
        
        // Better locators for checking data is loaded
        this.gridWithData = page.locator('div.MuiDataGrid-main:has(div.MuiDataGrid-cellContent)')
        this.anyCellWithContent = page.locator('div.MuiDataGrid-cellContent:not(:empty)')
        this.dataGridRows = page.locator('div.MuiDataGrid-row')
        this.gridLoadedAndVisible = page.locator('.MuiDataGrid-root:has(.MuiDataGrid-row:nth-child(1))')

    }

      async tableVisible(){
        await this.table 
    }
    async PageLoaded(){
        await this.pageLoded
    }
    
    async waitForGridDataToLoad(timeout = 60000) {
        // Wait for the grid to be visible with at least one row of data
        await this.gridLoadedAndVisible.waitFor({ timeout })
        
        // Additionally ensure we have at least one cell with content
        await this.anyCellWithContent.first().waitFor({ timeout })
        
        return true
    }
    async clickonReadIcon(){

        await this.readIcon.nth(1).click()
    }
    

    async clickonUnreadIcon(){

        await this.unreadIcon.nth(1).click()
    }
    async clickonShowMessages(){

        await this.showAllMessages.check()
    }
    async clickonDensity(){

        await this.density.click()
    }

    async clickonCompact(){

        await this.densityCompact.click()
    }

    async clickonComfortable(){

        await this.densityComfortable.click()
    }

    async clickonStandard(){

        await this.densityStandard.click()
    }

    async clikonMessageImage(){

        await this.messagesimage.click()


    }

    async clickonBestFit(){

        await this.bestfit.click()
    }

    async clickonRefresh(){

        await this.refresh.click()
    }

    async clickonExportToExcel(){

        await this.exportToExcel.click()
    }
    async waitForPageStable(timeout = 5000) {
        try {
            await this.page.waitForTimeout(timeout);
            return true;
        } catch (e) {
            console.log('Page is stable', e.message);
            return false;
        }
    }
}