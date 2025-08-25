const { expect } = require("playwright/test")


exports.inquireByuserpayments=class inquireByuserpayments{
 
    constructor(page)
    {
        this.page= page
        this.inquiries= page.frameLocator('iframe[name="sideNavIFrame"]').locator('#Repeater1_spnParentItem_6 div')
        this.byUser = page.frameLocator('iframe[name="sideNavIFrame"]').locator('#Repeater1_Repeater1_6_spnParentItem_1 div')
        this.Payments=page.frameLocator('iframe[name="sideNavIFrame"]').getByRole('link', { name: 'payments', exact: true })
        this.totalAmount=page.getByText('Total Amount')
        this.refresh = page.getByRole('button', { name: 'Refresh' })
        this.bestFit = page.getByRole('button', { name: 'Best Fit' })
        this.exportToExcel = page.getByRole('button', { name: 'Export To Excel' })
        this.Totalunapplied=page.getByText('Total Unapplied')
        this.viewsetting=page.getByText('~Unapplied')
        this.Allviewsetting=page.getByText('~All', { exact: true })
        this.clickonByuser=page.frameLocator('iframe[name="sideNavIFrame"]').locator('#Repeater1_Repeater1_6_spnParentItem_1 div').getByRole('img')
        this.Reactinquiries=page.frameLocator('iframe[name="sideNavIFrame"]').locator('#Repeater1_spnParentItem_6 div').getByRole('img')
        this.selectcheckbox = page.locator('div.MuiDataGrid-virtualScroller.css-frlfct>div>div').locator('div[data-rowindex="0"]').locator('div[data-colindex]:nth-child(1)>span').getByLabel('Select row')
        this.CustNAme = page.locator('div.MuiDataGrid-virtualScroller.css-frlfct>div>div').locator('div[data-rowindex="0"]').locator('div[data-colindex]:nth-child(3)').locator('span[class="blueLink cursor-pointer"]')
        this.CustID = page.locator('div.MuiDataGrid-virtualScroller.css-frlfct>div>div').locator('div[data-rowindex="0"]').locator('div[data-colindex]:nth-child(2)').locator('div[class="MuiDataGrid-cellContent"]')
        this.NewActivity = page.locator('li[class="MuiButtonBase-root MuiMenuItem-root MuiMenuItem-gutters MuiMenuItem-root MuiMenuItem-gutters css-1j3jjyc"]:nth-child(2)')
        this.AccountDetails= page.locator('li[class="MuiButtonBase-root MuiMenuItem-root MuiMenuItem-gutters MuiMenuItem-root MuiMenuItem-gutters css-1j3jjyc"]:nth-child(1)')
        this.showFilter= page.getByTestId('custom-filter-button')
        this.filterColumnpayment=page.getByLabel('Columns', { exact: true })
        this.filterValuepayment= page.getByPlaceholder('Filter value')
        this.addFilterbutton=page.getByRole('button', { name: '+ Rule' }).first()
        this.removeAllbutton= page.getByRole('button', { name: 'Remove rule' }).first()
       // this.cusdid=page.locator('div[class="MuiDataGrid-headerFilterRow css-k008qs"]').locator('div[aria-colindex="2"]')
        this.pageLoadSymbol = page.locator('.MuiCircularProgress-root')
        this.AccountDetailNewActivity = page.getByRole('menuitem', { name: 'Account Detail/New activity' })
        this.footerPage =page.getByLabel('Go to page')
        this.nextPageFooter = page.getByTestId('NavigateNextIcon');
        this.backPageFooter = page.getByTestId('NavigateBeforeIcon');
        this.firstCustomer = page.locator('.MuiDataGrid-virtualScrollerRenderZone').locator('div[data-rowindex="0"]').locator('div[data-field="custName"]').locator('.blueLink')
        this.accountDetails = page.getByRole('menuitem', { name: 'Account Details' })
        this.accountNewActivity = page.getByRole('menuitem', { name: 'Account Detail/New activity' })
        this.cusdid=page.locator('label[class="MuiFormLabel-root MuiInputLabel-root MuiInputLabel-formControl MuiInputLabel-animated MuiInputLabel-sizeSmall MuiInputLabel-outlined MuiFormLabel-colorPrimary MuiInputLabel-root MuiInputLabel-formControl MuiInputLabel-animated MuiInputLabel-sizeSmall MuiInputLabel-outlined css-tuzd62"]').nth(0)
        this.newActivity = page.getByRole('menuitem', { name: 'New Activity', exact: true })
        this.firstActivityIcon = page.locator('.MuiDataGrid-virtualScrollerRenderZone').locator('div[data-rowindex="0"]').locator('div[data-field="activity"]').locator('.pi')
        this.firstRow=  page.locator('.MuiDataGrid-virtualScrollerRenderZone').locator('div[role="row"]').locator('div[aria-colindex="1"]').nth(1)
      }


       async columnfilters(CustId){

      // await this.cusdid.click()
       await this.cusdid.fill(CustId)

     }

     async getCustId(){

      // await this.cusdid.click()
       await this.CustID

     }

       async addFilterbuttonavailable(){

       await expect(this.addFilterbutton).toBeVisible()
       await this.page.getByRole('button', { name: '+ Rule' })

    }
  
    async Removeallbuttonavailable(){

       await expect(this.removeAllbutton).toBeVisible()
       await this.page.getByRole('button', { name: 'Remove rule' }).first()
    }
    
   
    async clickonfilteronpayment(){

     await this.showFilter.click()
    }
    

    async clickonfilter(){

     await expect(this.showFilter).toBeVisible()
    }
    async custNameLocator(){

    await expect(this.CustNAme).toBeVisible()

    }
    
    async clickcheckbox(){

     await this.selectcheckbox.click()
    }
    async clickonCustomerName(){

     await this.CustNAme.click()
    }
    async clickonNewActivity(){

     await this.NewActivity.click()
        
    }
    async clickonAccountdetails(){
     await this.AccountDetails.click()  
    }

    async clickonInquiries(){
     
     await this.inquiries.click()

   }
   async clickonReactInquiries(){
     
    await this.Reactinquiries.click()
  }
    async clickonByUser(){

    await this.byUser.click()
   }
   async clickonByuserforReact(){

    await this.clickonByuser.click()
   }
   async clickonpayments(){

    await this.Payments.click()
   }
    async containstotalamount(){

    await expect(this.totalAmount).toBeVisible()
   }
   async containstotalunaplied(){

    await expect(this.Totalunapplied).toBeVisible()
   }
   async clickonviewsetting(){

    await this.viewsetting.click()
   }
   async clickAllviewsetting(){

   await this.Allviewsetting.click()
   
   }
   async legacyinvoicecount(){

   await this.legacycount.textContent()

   }
   async verifyFooterPagination(){
     
    for (let i = 1; i < 4; i ++)
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

async clickonrefresh(){
  await this.refresh.click()
}
async clickonBestFit(){
  await this.bestFit.click()
}

async clickonExport(){
  await this.exportToExcel.click()
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

async clickonNewActivity(){

  await this.newActivity.click()
}

async clickonfirstActivityIcon(){

  await this.firstActivityIcon.click()
}

async clickonAccountDetailNewActivity(){

  await this.AccountDetailNewActivity.click()
}

}