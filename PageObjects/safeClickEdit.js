/**
 * Safe clickonEdit function that can be used as a replacement
 * This handles the case when this.clickonEdit is not found or has context issues
 * @param {Object} instance - The instance of mailNotRead class
 */
async function safeClickEdit(instance) {
    try {
        console.log("Attempting to safely click Edit button...");
        
        // First try the direct method if it exists
        if (typeof instance.clickonEdit === 'function') {
            try {
                await instance.clickonEdit();
                console.log("Successfully clicked Edit using direct method");
                return true;
            } catch (directError) {
                console.log(`Direct clickonEdit failed: ${directError.message}`);
                // Continue to fallback methods
            }
        } else {
            console.error("Warning: clickonEdit method not found on instance");
        }
        
        // Fallback 1: Try using the editButton property if available
        if (instance.editButton) {
            try {
                await instance.editButton.click();
                console.log("Successfully clicked Edit using editButton property");
                return true;
            } catch (editButtonError) {
                console.log(`editButton click failed: ${editButtonError.message}`);
                // Continue to next fallback
            }
        }
        
        // Fallback 2: Try various CSS selectors for edit buttons
        const page = instance.page;
        if (!page) {
            throw new Error("Page object not available");
        }
        
        const editSelectors = [
            'button:has-text("Edit")',
            '[aria-label="Edit"]',
            '.edit-button',
            '#editButton',
            'button.btn-edit'
        ];
        
        for (const selector of editSelectors) {
            try {
                const locator = page.locator(selector).first();
                const isVisible = await locator.isVisible({ timeout: 2000 }).catch(() => false);
                
                if (isVisible) {
                    await locator.click();
                    console.log(`Successfully clicked Edit using selector: ${selector}`);
                    return true;
                }
            } catch (selectorError) {
                console.log(`Selector ${selector} failed: ${selectorError.message}`);
                // Try next selector
            }
        }
        
        throw new Error("All methods to click Edit button failed");
    } catch (error) {
        console.error(`Safe click Edit failed: ${error.message}`);
        throw error;
    }
}

module.exports = safeClickEdit;
