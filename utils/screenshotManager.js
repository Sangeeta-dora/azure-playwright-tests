/**
 * Screenshot Manager Utility
 * Handles creation of organized screenshot folders and screenshot taking based on test name
 */
const fs = require('fs');
const path = require('path');

/**
 * Screenshot Manager class
 * Provides methods for organizing screenshots by test name
 */
class ScreenshotManager {
    /**
     * Constructor
     * @param {Object} options Configuration options
     * @param {string} options.baseDir Base directory for screenshots (default: 'test-screenshots')
     */
    constructor(options = {}) {
        this.baseDir = options.baseDir || 'test-screenshots';
        // Ensure base directory exists
        this.ensureDirectoryExists(this.baseDir);
    }

    /**
     * Ensures a directory exists, creating it if necessary
     * @param {string} dirPath Directory path to ensure
     * @returns {string} The directory path
     */
    ensureDirectoryExists(dirPath) {
        if (!fs.existsSync(dirPath)) {
            fs.mkdirSync(dirPath, { recursive: true });
            console.log(`Created directory: ${dirPath}`);
        }
        return dirPath;
    }

    /**
     * Sanitizes a test name to use as a folder name
     * @param {string} testName Original test name
     * @returns {string} Sanitized folder name
     */
    sanitizeTestName(testName) {
        // Remove characters that might not be valid in folder names
        // and replace spaces with underscores
        return testName
            .replace(/[\\/:*?"<>|]/g, '')
            .replace(/\s+/g, '_')
            .replace(/['()]/g, '')
            .trim();
    }

    /**
     * Gets a screenshot folder path for a specific test
     * @param {string} testName Name of the test
     * @returns {string} Path to the screenshot folder for this test
     */
    getScreenshotDir(testName) {
        const sanitizedName = this.sanitizeTestName(testName);
        const dirPath = path.join(this.baseDir, sanitizedName);
        return this.ensureDirectoryExists(dirPath);
    }

    /**
     * Takes a screenshot and saves it in the appropriate test folder
     * @param {Object} page Playwright Page object
     * @param {string} testName Name of the test
     * @param {string} screenshotName Name for the screenshot
     * @param {Object} options Screenshot options (fullPage, etc)
     * @returns {Promise<string>} Path to the saved screenshot
     */
    async takeScreenshot(page, testName, screenshotName, options = {}) {
        const testDir = this.getScreenshotDir(testName);
        const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
        const filename = `${screenshotName.replace(/\s+/g, '_')}_${timestamp}.png`;
        const filePath = path.join(testDir, filename);
        
        await page.screenshot({
            path: filePath,
            ...options
        });
        
        console.log(`Screenshot saved: ${filePath}`);
        return filePath;
    }
}

module.exports = { ScreenshotManager };
