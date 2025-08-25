const { count } = require("console")
const exp = require("constants")
const { expect } = require("playwright/test")
const { mailNotRead } = require('../PageObjects/mailNotRead');
const dataSet = JSON.parse(JSON.stringify(require("../utils/TestData.json")))
exports.InquiryUserInvoices=class InquiryUserInvoices{

    constructor(page)
    {
        this.page= page
        this.inquiries= page.frameLocator('iframe[name="sideNavIFrame"]').locator('#Repeater1_spnParentItem_6 div').getByRole('img')
        this.byUser= page.frameLocator('iframe[name="sideNavIFrame"]').locator('#Repeater1_Repeater1_6_spnParentItem_1 div')
        this.invoices= page.frameLocator('iframe[name="sideNavIFrame"]').getByRole('link', { name: 'invoices' })
        this.invoicecolumn = page.getByRole('row').nth(1).getByLabel('Invoice').nth(1)
        this.showFilter= page.getByLabel('Show filters').first()
        this.filterPopUp= page.locator('.MuiDataGrid-panelWrapper')
        this.filterColumn= page.getByLabel('Columns', { exact: true })
        this.filterValue= page.getByPlaceholder('Filter value')
        this.refresh = page.getByRole('button', { name: 'Refresh' })
        this.exportToExcel = page.getByRole('button', { name: 'Export To Excel' })
        this.addFilter= page.getByRole('button', { name: 'Add filter' })
        this.removeAll= page.getByRole('button', { name: 'Remove All' })
        this.bestFit = page.getByRole('button', { name: 'Best Fit' })
        this.clearFilter = page.getByTestId('ClearIcon').first();
        this.search= page.getByPlaceholder('Search…')
        this.searchClear= page.getByTestId('CloseIcon')
        this.closeFilter= page.getByLabel('Delete').getByTestId('CloseIcon')
        this.selectRowCheckbox= page.locator('div:nth-child(2) >.MuiDataGrid-cellCheckbox')
        this.selectMultiRowCheckbox= page.locator('div:nth-child(2) >.MuiDataGrid-cellCheckbox')
        this.selectAllRowCheckbox= page.getByLabel('Select all rows')
        this.companyIDFilter= page.locator('.MuiDataGrid-headerFilterRow').getByLabel('Company ID').getByLabel('Contains')
        this.custIDFilter= page.locator('.MuiDataGrid-headerFilterRow').getByLabel('Cust ID').getByLabel('Contains')
        this.custNameFilter= page.locator('.MuiDataGrid-headerFilterRow').getByLabel('Cust Name').getByLabel('Contains')
        this.invoiceFilter= page.locator('.MuiDataGrid-headerFilterRow').getByLabel('Invoice').getByLabel('Contains')
        this.invDateFilter= page.locator('.MuiDataGrid-headerFilterRow').getByLabel('Invoice Date').getByLabel('Is').getByPlaceholder('date')
        // this.dueDateFilter= page.locator('[id="\\:r9i\\:"]')
        // this.amountFilter= page.locator('[id="\\:r9m\\:"]')
        // this.balanceFilter= page.locator('[id="\\:r9q\\:"]')
        // this.discFilter= page.locator('[id="\\:r9u\\:"]')
        // this.discDateFilter= page.locator('[id="\\:ra2\\:"]')
        this.rowSelection = page.locator('.MuiDataGrid-virtualScrollerRenderZone').nth(0).locator('div[data-rowindex="1"]').locator('div[aria-colindex="4"]').locator('.blueLink')
        this.accountDetails= page.getByText('Account Details')
        this.accountDetailsPage= page.getByText('Statement of Accounts')
        this.newActivity= page.getByText('Account Detail/New activity')
        this.newActivityPage = page.locator('.p-3').getByText('Activity').nth(2)
        this.totalAmount= page.getByText('Total Amount')
        this.totalBalance= page.getByText('Total Balance')
        this.user1 = page.locator('.MuiDataGrid-virtualScrollerRenderZone').nth(0).locator('div[data-rowindex="4"]').locator('div[aria-colindex="4"]').locator('.blueLink');
        this.footerPage =page.getByLabel('Go to page')
        this.nextPageFooter = page.getByTestId('NavigateNextIcon');
        this.backPageFooter = page.getByTestId('NavigateBeforeIcon');
        this.pageLoadSymbol = page.locator('.MuiCircularProgress-svg');
        this.expectedResult = page.locator('.MuiDataGrid-row')
        this.reactInvoiceCount = page.locator('.MuiTablePagination-displayedRows')
        this.homeSideNav = page.getByTitle('Home');
        this.legacyInvoiceCount = page.locator('xpath=//strong[3]')
        
    
    }

    async verifyFooterPagination(){
     
        for (let i = 1; i < (dataSet.PaginationCount); i ++)
        {
        await expect(this.footerPage.nth(i)).toBeVisible();
        await this.footerPage.nth(i).click()
        // await expect(this.pageLoadSymbol).toBeVisible();
        await expect(this.pageLoadSymbol).toBeHidden();
        
    }
        await expect(this.nextPageFooter).toBeVisible();
        await this.nextPageFooter.click();
        await expect(this.pageLoadSymbol).toBeHidden();
        await expect(this.backPageFooter).toBeVisible();
        await this.backPageFooter.click();
        await expect(this.pageLoadSymbol).toBeHidden();
        
    }
    async verifyTotalAmounAndBalanceVisible(){
     
        await expect(this.totalAmount).toBeVisible();
        await expect(this.totalBalance).toBeVisible()
    }

    async clickonNewActivity(){
     
        await expect(this.rowSelection).toBeVisible()
        await this.rowSelection.click()
        await expect(this.newActivity).toBeVisible()
        await this.newActivity.click()
        await expect(this.newActivityPage).toBeVisible();
    }

    async clickonAccountDetails(){
        await expect(this.rowSelection).toBeVisible()
        await this.rowSelection.click()
        await expect(this.accountDetails).toBeVisible()
        await this.accountDetails.click()
        await expect(this.accountDetailsPage).toBeVisible();
    }

    async verifyColumnFilter(){

            
        await this.companyIDFilter.fill(dataSet.CompanyID);
        await expect(this.pageLoadSymbol).toBeVisible();
        await expect(this.pageLoadSymbol).toBeHidden();
        await this.page.screenshot({ path: 'CompanyID Filter.png' });
        await this.clearFilter.click()
        await expect(this.pageLoadSymbol).toBeVisible();
        await expect(this.pageLoadSymbol).toBeHidden();

        await this.custNameFilter.fill(dataSet.CustName)
        await expect(this.pageLoadSymbol).toBeVisible();
        await expect(this.pageLoadSymbol).toBeHidden();
        await this.page.screenshot({ path: 'CustName Filter.png' });
        await this.clearFilter.click()
        await expect(this.pageLoadSymbol).toBeVisible();
        await expect(this.pageLoadSymbol).toBeHidden();

        await this.custIDFilter.fill(dataSet.CustID);
        await expect(this.pageLoadSymbol).toBeVisible();
        await expect(this.pageLoadSymbol).toBeHidden();
        await this.page.screenshot({ path: 'CustID Filter.png' });
        await this.clearFilter.click()
        await expect(this.pageLoadSymbol).toBeVisible();
        await expect(this.pageLoadSymbol).toBeHidden();

        await this.invoiceFilter.fill(dataSet.InvoiceID)
        await expect(this.pageLoadSymbol).toBeVisible();
        await expect(this.pageLoadSymbol).toBeHidden();
        await this.page.screenshot({ path: 'InvoiceID Filter.png' });
        await this.clearFilter.click()
        await expect(this.pageLoadSymbol).toBeVisible();
        await expect(this.pageLoadSymbol).toBeHidden();

    }

    async clickonFilterColumn(){
     
        await this.filterColumn.selectOption('custName');
        await expect(this.pageLoadSymbol).toBeVisible();
        await expect(this.pageLoadSymbol).toBeHidden();
        await this.filterValue.click();
        await this.filterValue.fill(dataSet.CustName);
        await this.addFilter.click()
        await expect(this.pageLoadSymbol).toBeHidden();

        return 
   }

   async clickonRemoveFilter(){
     
    await expect(this.removeAll).toBeVisible();
    await this.removeAll.screenshot({ path: 'RemoveAll.png' });
    await this.removeAll.click()

}

async clickonSearch(){
     
    await this.search.click()
    await this.search.fill(dataSet.CustID);
}

async clearSearchBox(){
     
    await this.searchClear.click()
}

async clickCloseFilter(){
     
    await this.closeFilter.click()

}

async SelectRowCheckBox(){
     

        await this.selectRowCheckbox.click()
        await this.selectMultiRowCheckbox.click()
        await this.selectAllRowCheckbox.click()

}

   async clickonInquiries(){
     
    await this.inquiries.click()
}

   async clickonFilters(){
    await expect(this.showFilter).toBeVisible()
    await this.showFilter.click()
    await expect(this.filterPopUp).toBeVisible()
    
    
}

   async clickonByUser(){
     
    await this.byUser.click()
}
async clickonInvoices(){

    await expect(this.invoices).toBeVisible();
    await this.invoices.click()
    await expect(this.pageLoadSymbol).toBeHidden();
    await expect(this.invoicecolumn).toBeVisible();
}

async clickonBestFit(){
    await this.bestFit.click()
}

async clickonrefresh(){
    await this.refresh.click()
}

async clickonExport(){
    await this.exportToExcel.click()
}

}