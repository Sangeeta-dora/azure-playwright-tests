const {test, expect} = require('@playwright/test');
const {LoginPage} = require('../PageObjects/LoginPage');
const dataSet = JSON.parse(JSON.stringify(require("../utils/TestData.json")))
const { log } = require('console');
const config = require('../config.js'); // Adjusted path to locate the file correctly
require('dotenv').config();
const env = process.env.ENVIRONMENT || 'devqa';
const envConfig = config[env];
// test to login to the application
test('Login to the application', async({page}) => {
    console.log (LoginPage)
    const loginPage = new LoginPage(page);
    await loginPage.navigateTo(envConfig.baseURL);
    await loginPage.login(envConfig.userName, envConfig.password);
    await loginPage.verifyLogin();
});