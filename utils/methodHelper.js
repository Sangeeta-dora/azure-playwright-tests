/**
 * Helper utilities for safely calling methods
 */

/**
 * Safely calls a method on an object, handling 'this' context issues
 * @param {Object} obj - The object containing the method
 * @param {string} methodName - The name of the method to call
 * @param {Array} args - Arguments to pass to the method
 * @returns {Promise<any>} - Result of the method call
 */
exports.safeMethodCall = async function(obj, methodName, ...args) {
    if (!obj || typeof obj !== 'object') {
        throw new Error(`Invalid object passed to safeMethodCall for method '${methodName}'`);
    }
    
    const method = obj[methodName];
    if (typeof method !== 'function') {
        console.error(`Error: '${methodName}' is not a function.`, 
            Object.getOwnPropertyNames(obj)
                .filter(prop => typeof obj[prop] === 'function')
                .slice(0, 10)); // Log first 10 methods for debugging
        throw new Error(`Method '${methodName}' is undefined or not a function`);
    }
    
    // Bind the method to the object and call it with the provided arguments
    return method.bind(obj)(...args);
};

/**
 * Safely calls a UI interaction method, with fallbacks for common interactions
 * @param {Object} page - The Playwright page object
 * @param {Object} instance - The page object instance 
 * @param {string} methodName - Name of the method to call
 * @param {Object} options - Options for fallback behavior
 * @returns {Promise<boolean>} - True if interaction was successful
 */
exports.safeUIInteraction = async function(page, instance, methodName, options = {}) {
    const {
        fallbackSelectors = [],
        takeScreenshot = null, // Function to take screenshots
        timeout = 5000
    } = options;
    
    try {
        // First try the direct method call
        if (typeof instance[methodName] === 'function') {
            await instance[methodName]();
            return true;
        }
        
        // If method doesn't exist, try fallback selectors
        console.log(`Method ${methodName} not found, trying fallback selectors`);
        
        // Try each fallback selector
        for (const selector of fallbackSelectors) {
            try {
                const element = page.locator(selector);
                const isVisible = await element.isVisible({ timeout: 2000 }).catch(() => false);
                
                if (isVisible) {
                    await element.click({ timeout: timeout });
                    console.log(`Clicked element using fallback selector: ${selector}`);
                    
                    if (takeScreenshot) {
                        await takeScreenshot(`after-fallback-${methodName}`);
                    }
                    
                    return true;
                }
            } catch (fallbackError) {
                console.log(`Fallback selector ${selector} failed: ${fallbackError.message}`);
                // Continue to next selector
            }
        }
        
        throw new Error(`All fallback attempts for ${methodName} failed`);
    } catch (error) {
        console.error(`Safe interaction failed for ${methodName}: ${error.message}`);
        if (takeScreenshot) {
            await takeScreenshot(`failed-${methodName}`);
        }
        throw error;
    }
};

/**
 * Selects a view settings option from the dropdown.
 * @param {import('@playwright/test').Page} page - The Playwright page object
 * @param {string} viewoption - The option to select
 * @param {boolean} AccountOverview_activity_grid - If true, selects from the second dropdown
 */
exports.selectViewSettingsOption = async function(page, viewoption, AccountOverview_activity_grid = false) {
    if (AccountOverview_activity_grid) {
        await page.locator("(//label[text()='View Settings']//following-sibling::div//div)[2]").click();
    } else {
        await page.locator("(//label[text()='View Settings']//following-sibling::div//div)[1]").click();
    }
    await page.waitForSelector(`//li[text()="${viewoption}"]`);
    await page.locator(`//li[text()="${viewoption}"]`).click();
    await page.waitForTimeout(1000); // Wait for the view to apply
};