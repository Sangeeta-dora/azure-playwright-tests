const { expect } = require('@playwright/test');
const {test} =  require('../Fixtures/fixtures.js');
const { InquiryUserInvoices } = require('../PageObjects/InquiryUserInvoices.js');
const config = require('../config.js');
require('dotenv').config();
const env = process.env.ENVIRONMENT;
const envConfig = config[env];

let inquiryUserInvoices;

// test.beforeEach(async ({ page }) => {
//     inquiryUserInvoices = new InquiryUserInvoices(page);
// });

// Test: Page load

test('@pageloadtests InquireByUserInvoices_Navigate to InquireByUserInvoices', async ({ userInvoicesPageReady, page ,pageNav}) => {
    const inquiryUserInvoices = new InquiryUserInvoices(userInvoicesPageReady)
    await expect(inquiryUserInvoices.firstissue).toBeVisible();
});

// Test: Export to Excel

test('InquireByUserInvoices_Click on Export to Excel', async ({  userInvoicesPageReady, page ,pageNav }) => {
    const inquiryUserInvoices = new InquiryUserInvoices(userInvoicesPageReady)
    await inquiryUserInvoices.clickonExport();
    await page.screenshot({ path: 'UserInvoices_ExportToExcel.png' });
});

// Test: Refresh

test('InquireByUserInvoices_Click on Refresh', async ({ userInvoicesPageReady, page ,pageNav  }) => {
    const inquiryUserInvoices = new InquiryUserInvoices(userInvoicesPageReady)
    await inquiryUserInvoices.clickonrefresh();
    await page.screenshot({ path: 'UserInvoices_Refresh.png' });
});

// Test: Best Fit
test('InquireByUserInvoices_Click on Best Fit', async ({ userInvoicesPageReady, page ,pageNav }) => {
    const inquiryUserInvoices = new InquiryUserInvoices(userInvoicesPageReady)
    await inquiryUserInvoices.clickonBestFit();
    await page.screenshot({ path: 'UserInvoices_BestFit.png' });
});


// Test: Density - Compact

test('InquireByUserInvoices_Click on Density Compact', async ({ userInvoicesPageReady, page ,pageNav }) => {
    const inquiryUserInvoices = new InquiryUserInvoices(userInvoicesPageReady)
    await inquiryUserInvoices.clickonDensity();
    await inquiryUserInvoices.clickonCompact();
    await page.screenshot({ path: 'UserInvoices_DensityCompact.png' });
});

// Test: Density - Standard

test('InquireByUserInvoices_Click on Density Standard', async ({ userInvoicesPageReady, page ,pageNav }) => {
    const inquiryUserInvoices = new InquiryUserInvoices(userInvoicesPageReady)
    await inquiryUserInvoices.clickonDensity();
    await inquiryUserInvoices.clickonStandard();
    await page.screenshot({ path: 'UserInvoices_DensityStandard.png' });
});

// Test: Density - Comfortable

test('InquireByUserInvoices_Click on Density Comfortable', async ({ userInvoicesPageReady, page ,pageNav }) => {
    const inquiryUserInvoices = new InquiryUserInvoices(userInvoicesPageReady)
    await inquiryUserInvoices.clickonDensity();
    await inquiryUserInvoices.clickonComfortable();
    await page.screenshot({ path: 'UserInvoices_DensityComfortable.png' });
});

// Test: Search

test('InquireByUserInvoices_Click on Search', async ({ userInvoicesPageReady, page ,pageNav }) => {
    const inquiryUserInvoices = new InquiryUserInvoices(userInvoicesPageReady)
    await inquiryUserInvoices.clickonSearch();
    await page.screenshot({ path: 'UserInvoices_Search.png' });
});

// Test: Clear Search Box

test('InquireByUserInvoices_Click on Clear Search Box', async ({ userInvoicesPageReady, page ,pageNav }) => {
    const inquiryUserInvoices = new InquiryUserInvoices(userInvoicesPageReady)
    await inquiryUserInvoices.clickonSearch();
    await inquiryUserInvoices.clearSearchBox();
    await page.screenshot({ path: 'UserInvoices_ClearSearchBox.png' });
});

// Test: Select Row Checkbox

test('InquireByUserInvoices_Click on Row Checkbox', async ({ userInvoicesPageReady, page ,pageNav }) => {
    const inquiryUserInvoices = new InquiryUserInvoices(userInvoicesPageReady)
    await inquiryUserInvoices.SelectRowCheckBox();
    await page.screenshot({ path: 'UserInvoices_RowCheckbox.png' });
});

// Test: Account Details

test('InquireByUserInvoices_Click on Account Details', async ({ userInvoicesPageReady, page ,pageNav }) => {
    const inquiryUserInvoices = new InquiryUserInvoices(userInvoicesPageReady)
    await inquiryUserInvoices.clickonAccountDetails();
    await page.screenshot({ path: 'UserInvoices_AccountDetails.png' });
});

// Test: New Activity

test('InquireByUserInvoices_Click on New Activity', async ({ userInvoicesPageReady, page ,pageNav }) => {
    const inquiryUserInvoices = new InquiryUserInvoices(userInvoicesPageReady)
    await inquiryUserInvoices.clickonNewActivity();
    await page.screenshot({ path: 'UserInvoices_NewActivity.png' });
});

// Test: Total Amount and Balance

test('InquireByUserInvoices_Verify Total Amount and Balance', async ({ userInvoicesPageReady, page ,pageNav }) => {
    const inquiryUserInvoices = new InquiryUserInvoices(userInvoicesPageReady)
    await inquiryUserInvoices.verifyTotalAmounAndBalanceVisible();
    await page.screenshot({ path: 'UserInvoices_TotalAmountAndBalance.png' });
});
