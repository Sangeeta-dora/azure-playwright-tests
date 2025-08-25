const { test, expect } = require('@playwright/test');
const {InquiriesByUser_ExpectedPayments} = require('../PageObjects/InquiriesByUser_ExpectedPayments')
const {PageNavigation} = require('../PageObjects/PageNavigation');
const { log } = require('console');
const exp = require('constants');
const { LoginPage } = require('../PageObjects/LoginPage');
//JSON-> String->js Object
const dataSet = JSON.parse(JSON.stringify(require("../utils/TestData.json")))
const config = require('../config.js');
require('dotenv').config();
const env = process.env.ENVIRONMENT;
const envConfig = config[env];

test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.navigateTo(envConfig.baseURL);
    await loginPage.login(envConfig.userName, envConfig.password);
});


test("@pageloadtests Navigate to  Favorites page", async ({ page }, testInfo) => {
        const pageNav = new PageNavigation(page);
        await pageNav.navigateToFavorites();
        await pageNav.navigateToFavoritesChildren(testInfo);
});

test("@pageloadtests Navigate to  submenu pages from Message section", async ({ page }, testInfo) => {
        const pageNav = new PageNavigation(page);
        await pageNav.navigateToMessages();
        await pageNav.navigateToMessagesChildren(testInfo);
});

test("@pageloadtests Navigate to  submenu pages from Activites section", async ({ page }, testInfo) => {
        const pageNav = new PageNavigation(page);
        await pageNav.navigateToActivitiesCC();
        await pageNav.navigateToActivitiesChildren(testInfo);
});
  

test('@pageloadtests Navigate to Dashboard Page', async ({ page }) => {
    const pageNav = new PageNavigation(page)
    await pageNav.navigateToDashboard();
});


test('@pageloadtests Navigate to All Accounts Page', async ({ page }) => {
    const pageNav = new PageNavigation(page)
    await pageNav.navigateToAccounts();
    await pageNav.navigateToAllAccounts();
});


test('@pageloadtests Navigate to Inquiries By User Contacts', async ({ page }) => {
    const pageNav = new PageNavigation(page)
    
    await pageNav.navigateToInquiries();
    await pageNav.navigateToByUsers();
    await pageNav.navigateToUserContacts();
});

test('@pageloadtests Navigate to Inquiries By User Activity Summary', async ({ page }) => {
    const pageNav = new PageNavigation(page)
    
    await pageNav.navigateToInquiries();
    await pageNav.navigateToByUsers();
    await pageNav.navigateToActivitySummary();
});

test.skip('Navigate to Inquiries By User Activities', async ({ page }) => {
    const pageNav = new PageNavigation(page)
    
    await pageNav.navigateToInquiries();
    await pageNav.navigateToByUsers();
    await page.waitForTimeout(5000);
    await pageNav.navigateToActivities();
});

test.skip('Navigate to Inquiries By User Expected Payments', async ({ page }) => {
    const pageNav = new PageNavigation(page)
    await pageNav.navigateToInquiries();
    await pageNav.navigateToByUsers();
    await pageNav.navigateToExpectedPayments();
});

test('@pageloadtests Navigate to Inquiries By User FollowUp', async ({ page }) => {
    const pageNav = new PageNavigation(page)
    const inquiriesByUser = new InquiriesByUser_ExpectedPayments(page)
    await pageNav.navigateToInquiries();
    await pageNav.navigateToByUsers();
    await pageNav.navigateToFollowUp();
});

test('@pageloadtests Navigate to Inquiries By User Mail', async ({ page }) => {
    const pageNav = new PageNavigation(page)
    const inquiriesByUser = new InquiriesByUser_ExpectedPayments(page)
    await pageNav.navigateToInquiries();
    await pageNav.navigateToByUsers();
    await pageNav.navigateToUserMail();
});

test.skip('Navigate to Inquiries By User Invoices', async ({ page }) => {
    const pageNav = new PageNavigation(page)
    const inquiriesByUser = new InquiriesByUser_ExpectedPayments(page)
    await pageNav.navigateToInquiries();
    await pageNav.navigateToByUsers();
    await pageNav.navigateToUserInvoices();
});

test.skip('Navigate to Inquiries By User Payments', async ({ page }) => {
    const pageNav = new PageNavigation(page)
    const inquiriesByUser = new InquiriesByUser_ExpectedPayments(page)
    await pageNav.navigateToInquiries();
    await pageNav.navigateToByUsers();
    await pageNav.navigateToUserPayments();
});

test.skip('Navigate to Inquiries By User Pending Payments', async ({ page }) => {
    const pageNav = new PageNavigation(page)
    const inquiriesByUser = new InquiriesByUser_ExpectedPayments(page)
    await pageNav.navigateToInquiries();
    await pageNav.navigateToByUsers();
    await pageNav.navigateToUserPendingPayment();
});

test('@pageloadtests Navigate to Inquiries By User Scheduled Payments', async ({ page }) => {
    const pageNav = new PageNavigation(page)
    const inquiriesByUser = new InquiriesByUser_ExpectedPayments(page)
    await pageNav.navigateToInquiries();
    await pageNav.navigateToByUsers();
    await pageNav.navigateToUserScheduledPayments();
});

test('@pageloadtests Navigate to Inquiries By User Projected Cash Receipts', async ({ page }) => {
    const pageNav = new PageNavigation(page)
    const inquiriesByUser = new InquiriesByUser_ExpectedPayments(page)
    await pageNav.navigateToInquiries();
    await pageNav.navigateToByUsers();
    await pageNav.navigateToUserProjectedCashReceipts();
});

test('@pageloadtests Navigate to Inquiries By User Reporting Group Logs', async ({ page }) => {
    const pageNav = new PageNavigation(page)
    const inquiriesByUser = new InquiriesByUser_ExpectedPayments(page)
    await pageNav.navigateToInquiries();
    await pageNav.navigateToByUsers();
    await pageNav.navigateToUserReportingGroupLogs();
});

test.skip('Navigate to Admin Master Files Activity Templates', async ({ page }) => {
    const pageNav = new PageNavigation(page)
    await pageNav.navigateToAdmin();
    await pageNav.navigateToAdminMasterFiles();
    await pageNav.navigateToActivityTemplate();
});

test.skip('Navigate to Admin Master Files Activity Types', async ({ page }) => {
    const pageNav = new PageNavigation(page)
    await pageNav.navigateToAdmin();
    await pageNav.navigateToAdminMasterFiles();
    await pageNav.navigateToActivityType();
});

test('@pageloadtests Navigate to Admin Master Files Company', async ({ page }) => {
    const pageNav = new PageNavigation(page)
    await pageNav.navigateToAdmin();
    await pageNav.navigateToAdminMasterFiles();
    await pageNav.navigateToCompany();
});

test('@pageloadtests Navigate to Admin Master Files Credit Class', async ({ page }) => {
    const pageNav = new PageNavigation(page)
    await pageNav.navigateToAdmin();
    await pageNav.navigateToAdminMasterFiles();
    await pageNav.navigateToCreditClass();
});

test('@pageloadtests Navigate to Admin Master Files Customer', async ({ page }) => {
    const pageNav = new PageNavigation(page)
    await pageNav.navigateToAdmin();
    await pageNav.navigateToAdminMasterFiles();
    await pageNav.navigateToCustomer();
});

test('@pageloadtests Navigate to Admin Master Files Communication Templates', async ({ page }) => {
    const pageNav = new PageNavigation(page)
    await pageNav.navigateToAdmin();
    await pageNav.navigateToAdminMasterFiles();
    await pageNav.navigateToCommunicationTemplate();
});

test('@pageloadtests Navigate to Admin Master Files Reason Codes', async ({ page }) => {
    const pageNav = new PageNavigation(page)
    await pageNav.navigateToAdmin();
    await pageNav.navigateToAdminMasterFiles();
    await pageNav.navigateToReasonCode();
});

test('@pageloadtests Navigate to Admin Master Files Report', async ({ page }) => {
    const pageNav = new PageNavigation(page)
    await pageNav.navigateToAdmin();
    await pageNav.navigateToAdminMasterFiles();
    await pageNav.navigateToReport();
});

test('@pageloadtests Navigate to Admin Master Files Reporting Groups', async ({ page }) => {
    const pageNav = new PageNavigation(page)
    await pageNav.navigateToAdmin();
    await pageNav.navigateToAdminMasterFiles();
    await pageNav.navigateToReportingGroups();
});

test('@pageloadtests Navigate to Admin Master Files Sales Rep', async ({ page }) => {
    const pageNav = new PageNavigation(page)
    await pageNav.navigateToAdmin();
    await pageNav.navigateToAdminMasterFiles();
    await pageNav.navigateToSalesRep();
});



