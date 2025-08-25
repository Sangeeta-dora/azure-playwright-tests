const { expect } = require("playwright/test");

/**
 * Page object representing the login page
 * @class LoginPage
 */
exports.LoginPage = class LoginPage {
    constructor(page) {
        this.page = page;
        this.userName= page.locator('#ctrlLogin_UserName');
        this.pwd= page.locator('.inputPassword');
        this.signIn= page.locator('.LoginButton');
        this.loginsuccess = page.frameLocator('iframe[name="pageIframe"]').locator('.card-title');
    }

    /**
     * Navigates to the specified URL
     * @param {string} WebClientURL - The URL to navigate to
     * @returns {Promise<void>}
     */
    async navigateTo(WebClientURL) {
        await this.page.goto(WebClientURL);
    }

    /**
     * Logs in with the specified credentials
     * @param {string} username - The username to login with
     * @param {string} password - The password to login with
     * @returns {Promise<void>}
     */
    async login(username, password) {
        await this.userName.fill(username);
        await this.pwd.fill(password);
        await this.signIn.click();
    }

    /**
     * Verifies successful login
     * @returns {Promise<void>}
     */
    async verifyLogin() {
        // Add verification logic here, e.g., checking for a specific element that appears upon successful login
        await this.page.waitForLoadState('domcontentloaded');
       // await expect(this.loginsuccess).toBeVisible();
        await this.page.screenshot({ path: 'Login success Page.png' });
    }
}