/**
 * Utility module for handling Sara chat popups that might appear during test execution
 * This module provides functions to detect and close the Sara chat popup
 * @module handleSaraChatPopup
 * 
 * UPDATED LOCATOR STRATEGY:
 * -------------------------
 * The module now uses prioritized locators for more reliable popup detection and closing:
 * 1. button[aria-label="Close message from Sara"] - Specific aria-label (most reliable)
 * 2. button.sc-1uf0igr-0 - Generic class selector without specific subclass
 * 3. button:has(svg.sc-1uf0igr-1) - Button containing SVG with specific class
 * 4. button:has(svg[viewBox="0 0 16 16"]) - Button with SVG that has specific viewBox
 * 
 * CLICK STRATEGY:
 * ---------------
 * If a popup is detected, the module will attempt multiple click strategies in sequence:
 * 1. Standard click
 * 2. Force click (bypasses actionability checks)
 * 3. JavaScript click via evaluate
 * 4. Positional click via bounding box coordinates
 * 5. Direct DOM event dispatch (MouseEvent and PointerEvent)
 * 
 * DEBUG FEATURES:
 * --------------
 * Enhanced debugging with `debug: true` and `verbose: true` options:
 * - Detailed logging of each attempt
 * - Screenshots at various stages
 * - Visual highlighting of detected elements
 * - Numbered indicators for locator priority
 * - HTML structure logging for troubleshooting
 * 
 * USAGE:
 * ------
 * Basic: await handleSaraChatPopup(page);
 * Debug: await handleSaraChatPopup(page, { debug: true, verbose: true });
 * With screenshots: await handleSaraChatPopup(page, { 
 *   debug: true,
 *   takeScreenshot: async (name) => await page.screenshot({ path: `sara-${name}.png` })
 * });
 */

/**
 * Attempts to close a popup using various click strategies
 * @param {Object} locator - Playwright locator for the close button
 * @param {Object} options - Options for handling the popup
 * @returns {Promise<boolean>} True if popup was successfully closed
 */
async function tryClosePopup(locator, options = {}) {
    try {
        // Try standard click first
        await locator.click({ timeout: 2000 });
        console.log("Successfully closed popup with standard click");
        return true;
    } catch (clickError) {
        console.log(`Standard click failed: ${clickError.message}, trying force click...`);
        
        try {
            // Try force click if standard click fails
            await locator.click({ force: true, timeout: 2000 });
            console.log("Successfully force-closed popup");
            return true;
        } catch (forceClickError) {
            console.log(`Force click failed: ${forceClickError.message}, trying JavaScript click...`);
            
            try {
                // Try evaluating JavaScript click if force click fails
                await locator.evaluate(node => node.click());
                console.log("Successfully JS-closed popup");
                return true;
            } catch (jsClickError) {
                console.log(`JavaScript click failed: ${jsClickError.message}, trying click at position...`);
                
                try {
                    // Try to get bounding box and click at center
                    const boundingBox = await locator.boundingBox().catch(() => null);
                    if (boundingBox) {
                        const x = boundingBox.x + boundingBox.width / 2;
                        const y = boundingBox.y + boundingBox.height / 2;
                        await locator.page().mouse.click(x, y);
                        console.log("Successfully clicked at position");
                        return true;
                    } else {
                        console.log("Could not get bounding box for position click, trying direct DOM click...");
                        
                        try {
                            // Last resort: direct DOM click with dispatchEvent
                            await locator.evaluate(node => {
                                // Try multiple event types as last resort
                                const clickEvent = new MouseEvent('click', {
                                    bubbles: true,
                                    cancelable: true,
                                    view: window
                                });
                                
                                // Dispatch the event directly
                                node.dispatchEvent(clickEvent);
                                
                                // Also try pointer events if available
                                if (window.PointerEvent) {
                                    const pointerEvent = new PointerEvent('pointerdown', {
                                        bubbles: true,
                                        cancelable: true,
                                        view: window
                                    });
                                    node.dispatchEvent(pointerEvent);
                                    
                                    const pointerUpEvent = new PointerEvent('pointerup', {
                                        bubbles: true,
                                        cancelable: true,
                                        view: window
                                    });
                                    node.dispatchEvent(pointerUpEvent);
                                }
                            });
                            console.log("Successfully performed direct DOM click");
                            return true;
                        } catch (domClickError) {
                            console.log(`Direct DOM click failed: ${domClickError.message}`);
                            return false;
                        }
                    }
                } catch (positionClickError) {
                    console.log(`Position click failed: ${positionClickError.message}`);
                    return false;
                }
            }
        }
    }
}

/**
 * Handles Sara chat popup by attempting to close it using multiple locator strategies
 * @param {Object} page - The Playwright page object
 * @param {Object} options - Options for handling the popup
 * @param {Function} options.takeScreenshot - Optional function to take screenshots
 * @param {number} options.retries - Number of retries if popup persists (default: 2)
 * @param {boolean} options.debug - Enable visual debugging features (default: false)
 * @param {boolean} options.verbose - Enable detailed console logging (default: false)
 * @returns {Promise<boolean>} True if popup was found and closed or not found
 */
async function handleSaraChatPopup(page, options = {}) {
    const retries = options.retries || 2;
    const debug = options.debug || false;
    const verbose = options.verbose || false;
    
    try {
        // Check if page is defined
        if (!page) {
            console.error("Error: page object is undefined in handleSaraChatPopup");
            throw new Error("Page object is undefined in handleSaraChatPopup. Make sure the page object is correctly passed.");
        }
          console.log("Checking for Sara chat popup...");
        
        // Take a screenshot before attempting to close, if available
        if (options.takeScreenshot && typeof options.takeScreenshot === 'function') {
            await options.takeScreenshot('before-closing-sara-chat');
        }
        
        // Define common locator patterns for the Sara chat close button
        const closeButtonLocators = [
            // SUPER AGGRESSIVE LOCATORS - added for maximum detection probability
            // Direct role and position-based selector
            page.locator('button[role="button"]:right-of(:text("Sara"))').first(),
            // Any button with X or close icon SVG paths (most generic)
            page.locator('button:has(svg:has(path[d*="M3 13L13 3"]))').first(),
            page.locator('button:has(svg:has(path[d*="M19 6.41L17.59 5 12 10.59"]))').first(),
            // Any button near the top-right of a dialog/popup (positional approach)
            page.locator('div[role="dialog"] button:near(:right)').first(),
            // Any SVG close/X icon with a button parent
            page.locator('svg[viewBox="0 0 16 16"]').first().locator('xpath=./ancestor::button'),
            
            // UPDATED PRIORITIZED LOCATORS
            // Most reliable aria-label selector (case insensitive)
            page.locator('button[aria-label*="close" i][aria-label*="sara" i]').first(),
            page.locator('button[aria-label="Close message from Sara"]').first(),
            // Generic selector for all buttons with this class
            page.locator('button.sc-1uf0igr-0').first(),
            // Button with any SVG in this class pattern
            page.locator('button:has(svg.sc-1uf0igr-1)').first(),
            // Button with SVG that has this viewBox (more generic match)
            page.locator('button:has(svg[viewBox="0 0 16 16"])').first(),
            
            // ORIGINAL LOCATORS (kept as fallbacks)
            // Specific Sara chat close button with exact class
            page.locator('button.sc-1uf0igr-0.joknsP').first(),
            // More specific targeting of the SVG inside the button
            page.locator('button:has(svg.sc-1uf0igr-1.fjHZYk)').first(),
            // Try targeting the SVG directly
            page.locator('svg.sc-1uf0igr-1.fjHZYk').first(),
            // Try targeting by the path data
            page.locator('svg path[d="M3 13L13 3m0 10L3 3"]').first().locator('..').locator('..'),
            // Try parent of the path
            page.locator('svg:has(path[d="M3 13L13 3m0 10L3 3"])').first().locator('..'),
            // Common test IDs and generic selectors
            page.locator('[data-testid="close-chat"]').first(),
            page.locator('button[aria-label="Close"]').first(),
            page.locator('button.close-chat-button').first(),
            page.locator('button:has-text("Close")').first(),
            // Additional general close button patterns
            page.locator('[aria-label="close"]').first(),
            page.locator('[data-testid="CloseIcon"]').first(),
            // More general X icon patterns
            page.locator('svg:has(path[d*="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"])').first()
        ];
        //updated
        
        // First check if Sara chat popup is present without attempting to close yet
        let isPopupPresent = false;
        
        // Check if any of the locators are visible to confirm popup presence
        for (const locator of closeButtonLocators) {
            try {
                const isVisible = await locator.isVisible({ timeout: 1000 }).catch(() => false);
                if (isVisible) {
                    isPopupPresent = true;
                    console.log(`Sara chat popup found using selector: ${locator}`);
                    break;
                }
            } catch (error) {
                continue;
            }
        }
        
        // If no popup was found by close button, try to detect it by content
        if (!isPopupPresent) {
            const detection = await detectSaraChatPopup(page, { verbose });
            isPopupPresent = detection.isPresent;
            
            if (isPopupPresent) {
                console.log("Sara chat popup detected by content but no close button found yet");
            }
        }
        
        // If still no popup was found, return early
        if (!isPopupPresent) {
            console.log("No Sara chat popup detected - proceeding with test");
            return false;
        }
        
        // Take screenshot if available
        if (options.takeScreenshot && typeof options.takeScreenshot === 'function') {
            await options.takeScreenshot('sara-popup-detected');
        }
        
        // First try standard strategies - before trying the top-right corner search
        // These are more reliable methods to try first
        
        // Strategy 1: Try to dismiss by pressing Escape key
        try {
            console.log("Trying to dismiss popup with Escape key...");
            await page.keyboard.press('Escape');
            await page.waitForTimeout(500);
            
            // Check if popup is still present after Escape
            const { isPresent: stillPresent } = await detectSaraChatPopup(page, { verbose: false });
            if (!stillPresent) {
                console.log("Successfully dismissed Sara chat popup with Escape key!");
                return true;
            }
        } catch (escapeError) {
            console.log(`Escape key dismissal failed: ${escapeError.message}`);
        }
        
        // Strategy 2: Try to click on common locations for close buttons
        try {
            // Try clicking at the top-right corner of the viewport where close buttons often are
            console.log("Trying to click at typical close button location (top-right)...");
            // Calculate a position near the top-right but not at the edge
            const viewportWidth = page.viewportSize().width;
            const x = viewportWidth - 40; // 40px from right edge
            const y = 40; // 40px from top
            
            await page.mouse.click(x, y);
            await page.waitForTimeout(500);
            
            // Check if popup is still present after clicking
            const { isPresent: stillPresent } = await detectSaraChatPopup(page, { verbose: false });
            if (!stillPresent) {
                console.log("Successfully clicked what might be a close button!");
                return true;
            }
        } catch (positionClickError) {
            console.log(`Position click failed: ${positionClickError.message}`);
        }
        
        // If popup was found by content but no specific close button was identified,
        // try to close it by finding elements in the top-right corner
        if (isPopupPresent && !closeButtonLocators.some(async (locator) => await locator.isVisible().catch(() => false))) {
            console.log("Attempting to find and click any top-right positioned buttons that might be close buttons");
            
            try {
                // Advanced DOM evaluation to find potential close buttons based on position
                const clickedSomething = await page.evaluate(() => {
                    // Find all visible buttons in the document
                    const buttons = Array.from(document.querySelectorAll('button, [role="button"], svg, div[class*="close"], div[class*="Close"]'));
                    
                    // Filter to those likely to be close buttons by position and appearance
                    const potentialCloseButtons = buttons.filter(button => {
                        const rect = button.getBoundingClientRect();
                        const isVisible = rect.width > 0 && rect.height > 0;
                        
                        if (!isVisible) return false;
                        
                        // Check if it's in the top portion of viewport
                        const isTopPositioned = rect.top < window.innerHeight * 0.3;
                        
                        // Check if it's on the right side of viewport
                        const isRightPositioned = rect.right > window.innerWidth * 0.7;
                        
                        // Check for common close button characteristics
                        const innerHTML = button.innerHTML.toLowerCase();
                        const hasCloseText = innerHTML.includes('close') || innerHTML.includes('×') || innerHTML.includes('✕');
                        
                        // Check for small size typical of close buttons
                        const isSmall = rect.width < 50 && rect.height < 50;
                        
                        return (isTopPositioned && isRightPositioned) || hasCloseText || isSmall;
                    });
                    
                    // Try to click each potential close button
                    for (const button of potentialCloseButtons) {
                        try {
                            button.click();
                            console.log("Clicked potential close button:", button);
                            return true;
                        } catch (e) {
                            continue;
                        }
                    }
                    
                    return false;
                });
                
                if (clickedSomething) {
                    console.log("Successfully clicked a potential close button via DOM evaluation");
                    
                    // Wait briefly to let any animations complete
                    await page.waitForTimeout(500);
                    
                    // Take a screenshot after this attempt if available
                    if (options.takeScreenshot && typeof options.takeScreenshot === 'function') {
                        await options.takeScreenshot('after-position-based-close-attempt');
                    }
                }
            } catch (positionCloseError) {
                console.warn(`Position-based close attempt failed: ${positionCloseError.message}`);
            }
        }
        
        // Visual debugging - take screenshot of popup state if requested
        if (options.debug && options.takeScreenshot && typeof options.takeScreenshot === 'function') {
            await options.takeScreenshot('sara-chat-popup-debug');
            
            try {
                // Highlight elements for visual debugging
                let foundVisibleElements = 0;
                
                for (let i = 0; i < closeButtonLocators.length; i++) {
                    const locator = closeButtonLocators[i];
                    const isVisible = await locator.isVisible({ timeout: 500 }).catch(() => false);
                    
                    if (isVisible) {
                        foundVisibleElements++;
                        console.log(`DEBUG: Found visible locator #${i}`);
                        
                        // Highlight the element with different colors based on priority
                        // Red for high priority (first few selectors), yellow for others
                        const highlightColor = i < 4 ? 'rgba(255, 0, 0, 0.3)' : 'rgba(255, 255, 0, 0.3)';
                        const outlineColor = i < 4 ? '2px solid red' : '2px solid orange';
                        
                        await locator.evaluate((node, idx) => {
                            const originalBackground = node.style.backgroundColor;
                            const originalOutline = node.style.outline;
                            const originalPosition = node.style.position;
                            
                            node.style.backgroundColor = idx < 4 ? 'rgba(255, 0, 0, 0.3)' : 'rgba(255, 255, 0, 0.3)';
                            node.style.outline = idx < 4 ? '2px solid red' : '2px solid orange';
                            
                            // Add a number indicator for the locator
                            const indicator = document.createElement('div');
                            indicator.textContent = idx;
                            indicator.style.position = 'absolute';
                            indicator.style.top = '-15px';
                            indicator.style.left = '0';
                            indicator.style.backgroundColor = 'black';
                            indicator.style.color = 'white';
                            indicator.style.padding = '2px 5px';
                            indicator.style.borderRadius = '3px';
                            indicator.style.fontSize = '10px';
                            indicator.style.zIndex = '10000';
                            
                            // Make the node position relative if it's not already positioned
                            if (getComputedStyle(node).position === 'static') {
                                node.style.position = 'relative';
                            }
                            
                            node.appendChild(indicator);
                            
                            setTimeout(() => {
                                node.style.backgroundColor = originalBackground;
                                node.style.outline = originalOutline;
                                node.style.position = originalPosition;
                                if (node.contains(indicator)) {
                                    node.removeChild(indicator);
                                }
                            }, 5000);
                        }, i).catch(() => {});
                        
                        // Take a screenshot for each visible element
                        if (options.verbose) {
                            await options.takeScreenshot(`sara-chat-locator-${i}`);
                        }
                    }
                }
                
                await page.waitForTimeout(500);
                await options.takeScreenshot('sara-chat-popup-highlighted');
                
                if (foundVisibleElements === 0 && options.verbose) {
                    console.log("DEBUG: No visible close button elements were found, but popup was detected");
                    
                    // Take screenshots of potential popup areas
                    await page.screenshot({ path: 'debug-sara-popup-area.png', fullPage: false });
                    
                    // Log the HTML structure if verbose is enabled
                    if (options.verbose) {
                        const htmlContent = await page.evaluate(() => {
                            return document.body.innerHTML;
                        });
                        console.log("DEBUG: Page HTML structure (shortened):");
                        console.log(htmlContent.substring(0, 1000) + "...");
                    }
                }
            } catch (debugError) {
                console.log(`Debug highlighting error (non-critical): ${debugError.message}`);
            }
        }
        
        // Try each locator strategy with retries
        for (let attempt = 0; attempt <= retries; attempt++) {
            if (attempt > 0) {
                console.log(`Retry attempt ${attempt}/${retries} to close Sara chat popup...`);
                // Wait a bit before retrying
                await page.waitForTimeout(1000);
            }
            
            let popupClosed = false;
            
            // Try each locator
            for (let i = 0; i < closeButtonLocators.length; i++) {
                const locator = closeButtonLocators[i];
                try {
                    const isVisible = await locator.isVisible({ timeout: 1000 }).catch(() => false);
                    
                    if (isVisible) {
                        console.log(`Found Sara chat popup close button with selector #${i}, attempting to close...`);
                        
                        // Try to close the popup using various strategies
                        if (await tryClosePopup(locator)) {
                            popupClosed = true;
                            
                            // Take a screenshot after closing, if available
                            if (options.takeScreenshot && typeof options.takeScreenshot === 'function') {
                                await options.takeScreenshot('after-closing-sara-chat');
                            }
                            
                            // Wait a bit to let the popup fully close
                            await page.waitForTimeout(500);
                            
                            // Verify it's actually closed
                            const stillVisible = await locator.isVisible().catch(() => false);
                            if (!stillVisible) {
                                console.log("Sara chat popup is now closed!");
                                return true;
                            } else {
                                console.log("Popup close button still visible after clicking, will retry...");
                                popupClosed = false;
                            }
                        }
                    }
                } catch (locatorError) {
                    // Skip to next locator if this one fails
                    console.log(`Error with locator #${i}: ${locatorError.message}`);
                    continue;
                }
            }
            
            if (popupClosed) {
                return true;
            }
            
            // If all regular locators fail, try one last approach with direct DOM queries
            if (!popupClosed && attempt === retries) {
                console.log("Trying direct DOM query as last resort...");
                try {
                    // Execute JavaScript to directly find and click the close button
                    const directClickResult = await page.evaluate(() => {
                        // Try to find the button with the specific class
                        let closeButton = document.querySelector('button.sc-1uf0igr-0.joknsP');
                        
                        // If not found directly, look for SVG and go up to button
                        if (!closeButton) {
                            const svgElement = document.querySelector('svg.sc-1uf0igr-1.fjHZYk');
                            if (svgElement) {
                                closeButton = svgElement.closest('button');
                            }
                        }
                        
                        // If not found with classes, try aria-label
                        if (!closeButton) {
                            closeButton = document.querySelector('button[aria-label="Close message from Sara"]');
                        }
                        
                        // Try path pattern
                        if (!closeButton) {
                            const pathElement = document.querySelector('path[d="M3 13L13 3m0 10L3 3"]');
                            if (pathElement) {
                                closeButton = pathElement.closest('button');
                            }
                        }
                        
                        // If button found, click it
                        if (closeButton) {
                            closeButton.click();
                            return true;
                        }
                        
                        return false;
                    });
                    
                    if (directClickResult) {
                        console.log("Successfully closed popup with direct DOM manipulation");
                        await page.waitForTimeout(500);
                        return true;
                    }
                } catch (directClickError) {
                    console.log(`Direct DOM click failed: ${directClickError.message}`);
                }
            }
        }
        
        console.log("No Sara chat popup detected or it's already closed");
        return false;    } catch (error) {
        console.log(`Error handling Sara chat popup: ${error.message}`);
        console.log("Continuing test execution");
        return false;
    }
}

/**
 * Attempts to detect the Sara chat popup by looking for popup content indicators
 * This is useful when the close button itself is hard to detect
 * @param {Object} page - The Playwright page object
 * @param {Object} options - Options for detection
 * @param {boolean} options.verbose - Enable detailed logging
 * @returns {Promise<{isPresent: boolean, popupElement: Object|null}>} Detection result with popup reference if found
 */
async function detectSaraChatPopup(page, options = {}) {
  const verbose = options.verbose || false;
  let popupElement = null;
  
  try {
    if (verbose) console.log("Running enhanced Sara chat popup detection...");
    
    // Comprehensive list of indicators for Sara chat popup
    const popupIndicators = [
      // Primary indicators - most specific to Sara chat
      page.locator('div:has-text("Sara"):visible').first(),
      page.locator('div:has-text("message from Sara"):visible').first(),
      
      // Common chat message container patterns
      page.locator('.sara-chat-popup, .chat-popup, .notification-popup, [class*="sara"]:visible').first(),
      
      // Dialog or modal patterns
      page.locator('div[role="dialog"]:has-text("Sara")').first(),
      page.locator('div.modal:has-text("Sara"), div.popup:has-text("Sara")').first(),
      
      // Look for typical Sara chat styling/classes - more comprehensive
      page.locator('div.sc-1uf0igr-2, div.sc-1uf0igr-3, div.sc-*').first(),
      
      // Look for any fixed position elements that might be popups
      page.locator('div[style*="position: fixed"]:has-text("Sara")').first(),
      
      // Any elements with chat/message in their attributes
      page.locator('[class*="chat"], [class*="message"], [id*="chat"], [id*="message"]').first()
    ];
    
    // Check each indicator and store a reference to the popup if found
    for (const indicator of popupIndicators) {
      try {
        const isVisible = await indicator.isVisible({ timeout: 800 }).catch(() => false);
        if (isVisible) {
          if (verbose) console.log(`Sara chat popup detected via indicator: ${indicator}`);
          popupElement = indicator;
          return { isPresent: true, popupElement };
        }
      } catch (e) {
        // Just continue to next indicator
        if (verbose) console.log(`Error checking indicator: ${e.message}`);
      }
    }
    
    // Enhanced DOM content analysis - more comprehensive
    const detectionResult = await page.evaluate(() => {
      // Helper to check if element is visible
      const isElementVisible = (element) => {
        if (!element) return false;
        const style = window.getComputedStyle(element);
        const rect = element.getBoundingClientRect();
        
        return style.display !== 'none' && 
               style.visibility !== 'hidden' && 
               parseFloat(style.opacity) > 0 &&
               rect.width > 0 && rect.height > 0;
      };
      
      // Stage 1: Check for Sara-related text content
      const bodyText = document.body.innerText || '';
      const hasSaraText = bodyText.toLowerCase().includes('sara');
      
      // No Sara text, no Sara popup
      if (!hasSaraText) return { isPresent: false, info: 'No Sara text found' };
      
      // Stage 2: Look for popup/dialog elements with Sara content
      const possiblePopupSelectors = [
        'div[role="dialog"]', '.popup', '.modal', '.toast', '.notification',
        '[class*="popup"]', '[class*="modal"]', '[class*="toast"]', '[class*="notification"]',
        'div[style*="position: fixed"]', 'div[style*="position: absolute"]'
      ];
      
      // Combine all possible popup elements
      const allPossiblePopups = Array.from(
        document.querySelectorAll(possiblePopupSelectors.join(', '))
      ).filter(isElementVisible);
      
      // Find the best candidate popup
      for (const popup of allPossiblePopups) {
        const popupText = popup.innerText.toLowerCase();
        const popupHTML = popup.innerHTML.toLowerCase();
        
        // Strong indicators this is a Sara popup
        if (
          (popupText.includes('sara') && 
           (popupText.includes('message') || popupText.includes('chat') || popupText.includes('help'))) ||
          (popupHTML.includes('sara') && 
           (popupHTML.includes('close') || popupHTML.includes('button')))
        ) {
          // Store information about the popup for reference
          const rect = popup.getBoundingClientRect();
          const attributes = {};
          
          // Collect element's attributes for identification
          Array.from(popup.attributes).forEach(attr => {
            attributes[attr.name] = attr.value;
          });
          
          return { 
            isPresent: true, 
            info: 'Found via content analysis',
            position: { x: rect.left, y: rect.top, width: rect.width, height: rect.height },
            attributes,
            classes: popup.className,
            id: popup.id,
            hasCloseButton: !!popup.querySelector('button, [role="button"], svg')
          };
        }
      }
      
      // Stage 3: If no clear popup but Sara is mentioned, check for dialog-like elements
      if (hasSaraText) {
        // Look for elements that appeared recently and are currently visible
        const allRecentElements = Array.from(document.querySelectorAll('div, section, article'))
          .filter(isElementVisible)
          .filter(el => {
            const rect = el.getBoundingClientRect();
            // Reasonable size for a popup/toast
            return rect.width > 150 && rect.height > 60;
          });
        
        if (allRecentElements.length > 0) {
          // Get the top-most (highest z-index or last in DOM) visible element
          const topElement = allRecentElements.sort((a, b) => {
            const aZIndex = parseInt(window.getComputedStyle(a).zIndex) || 0;
            const bZIndex = parseInt(window.getComputedStyle(b).zIndex) || 0;
            return bZIndex - aZIndex;
          })[0];
          
          if (topElement) {
            return {
              isPresent: true,
              info: 'Found possible popup via DOM analysis',
              elementType: topElement.tagName,
              classes: topElement.className,
              position: topElement.getBoundingClientRect()
            };
          }
        }
      }
      
      return { isPresent: false, info: 'No popup detected after comprehensive search' };
    });
    
    if (detectionResult.isPresent) {
      if (verbose) {
        console.log("Sara chat popup detected via enhanced DOM analysis:");
        console.log(JSON.stringify(detectionResult, null, 2));
      } else {
        console.log("Sara chat popup detected via enhanced DOM analysis");
      }
      return { isPresent: true, popupElement: null, detectionResult };
    }
    
    if (verbose) console.log("No Sara chat popup detected after comprehensive checks");
    return { isPresent: false, popupElement: null };
  } catch (error) {
    console.log(`Error in enhanced Sara chat popup detection: ${error.message}`);
    return { isPresent: false, popupElement: null, error: error.message };
  }
}

/**
 * Utility function to check and handle Sara chat popup before clicking an element
 * This is a wrapper around the handleSaraChatPopup function to simplify its usage before clicking elements
 * 
 * @param {Object} page - The Playwright page object
 * @param {Function} clickAction - The callback function to execute after handling popup (usually a click operation)
 * @param {Object} options - Options for handling the popup
 * @param {Function} options.takeScreenshot - Optional function to take screenshots
 * @returns {Promise<any>} - Returns the result of the clickAction callback
 */
async function handlePopupBeforeClick(page, clickAction, options = {}) {
    try {
        // Handle popup first
        await handleSaraChatPopup(page, options);
    } catch (popupError) {
        console.log(`Non-critical popup handling error: ${popupError.message}`);
    }
    
    // Execute the click action
    return await clickAction();
}

/**
 * Utility middleware function to wrap navigation methods to automatically handle Sara chat popups
 * This allows adding popup handling to any navigation method without modifying its implementation
 * 
 * @param {Function} navigationMethod - The navigation method to wrap
 * @param {Object} options - Options for handling the popup
 * @returns {Function} - Returns a wrapped function that handles popups before navigation
 */
function withPopupHandling(navigationMethod, options = {}) {
    return async function(...args) {
        const page = this.page;
        
        try {
            // Handle popup first
            await handleSaraChatPopup(page, options);
        } catch (popupError) {
            console.log(`Non-critical popup handling error: ${popupError.message}`);
        }
        
        // Execute the original navigation method
        return await navigationMethod.apply(this, args);
    };
}

/**
 * Sets up a navigation and mutation observer to automatically handle Sara chat popup
 * when page content changes or navigation occurs
 * @param {Object} page - The Playwright page object
 * @param {Object} options - Options for handling the popup
 * @returns {Promise<Function>} Cleanup function to stop the observer
 */
/**
 * Sets up an automatic handler for Sara chat popups that monitors page changes
 * This creates event listeners and a mutation observer to detect and handle popups
 * 
 * @param {Object} page - The Playwright page object
 * @param {Object} options - Options for handling the popup
 * @param {boolean} options.debug - Enable visual debugging features
 * @param {boolean} options.verbose - Enable detailed logging
 * @param {Function} options.takeScreenshot - Optional function to take screenshots
 * @param {number} options.checkInterval - Milliseconds between periodic checks (default: 5000)
 * @returns {Promise<Function>} Cleanup function to stop the observer
 */
async function setupSaraChatAutoHandler(page, options = {}) {
  console.log("Setting up enhanced automatic Sara chat popup handler for page changes...");
  
  if (!page) {
    console.error("Error: page object is undefined in setupSaraChatAutoHandler");
    throw new Error("Page object is undefined in setupSaraChatAutoHandler");
  }

  // Create enhanced options with debugging disabled by default for auto-handling
  const autoOptions = {
    ...options,
    debug: options.debug || false,
    retries: options.retries || 1,  // Use fewer retries for automatic handling
    verbose: options.verbose || false,
    checkInterval: options.checkInterval || 5000 // Default check every 5 seconds
  };

  // Counter to track periodic checks
  let checkCount = 0;
  let lastPopupHandleTime = Date.now();
  
  // More comprehensive handler that tries multiple strategies
  const handlePopupComprehensively = async (reason) => {
    try {
      // Skip if we just handled a popup recently (within 2 seconds)
      const now = Date.now();
      if (now - lastPopupHandleTime < 2000) {
        return;
      }
      
      lastPopupHandleTime = now;
      checkCount++;
      
      console.log(`[AutoHandler] Checking for Sara chat popup (reason: ${reason}) - check #${checkCount}`);
      
      // Take screenshot before handling if enabled
      if (autoOptions.takeScreenshot && typeof autoOptions.takeScreenshot === 'function') {
        try {
          await autoOptions.takeScreenshot(`auto-before-${reason.replace(/\s+/g, '-')}`);
        } catch (screenshotError) {
          console.log(`Non-critical error taking before screenshot: ${screenshotError.message}`);
        }
      }
      
      // First try standard popup handling
      const handled = await handleSaraChatPopup(page, autoOptions).catch(err => {
        console.log(`Non-critical error auto-handling Sara chat: ${err.message}`);
        return false;
      });
      
      // If standard handling didn't work but it's been a while since our last attempt,
      // try the emergency approach as well - but only on every 3rd check to avoid disrupting tests
      if (!handled && (checkCount % 3 === 0)) {
        console.log("[AutoHandler] Trying emergency popup handling as fallback");
        
        // Try emergency methods that don't rely on finding a close button
        await page.keyboard.press('Escape').catch(() => {});
        await page.waitForTimeout(300);
        
        // Try clicking at common close button locations
        try {
          const viewportSize = await page.viewportSize();
          // Top right
          await page.mouse.click(viewportSize.width - 30, 30).catch(() => {});
          await page.waitForTimeout(200);
          
          // Also try emergency force close occasionally (every 6th check)
          if (checkCount % 6 === 0) {
            console.log("[AutoHandler] Attempting emergency force close");
            await emergencyForceClosePopup(page).catch(() => {});
          }
        } catch (emergencyError) {
          console.log(`Non-critical error in emergency popup handling: ${emergencyError.message}`);
        }
      }
      
      // Take screenshot after handling if enabled
      if (autoOptions.takeScreenshot && typeof autoOptions.takeScreenshot === 'function') {
        try {
          await autoOptions.takeScreenshot(`auto-after-${reason.replace(/\s+/g, '-')}`);
        } catch (screenshotError) {
          console.log(`Non-critical error taking after screenshot: ${screenshotError.message}`);
        }
      }
    } catch (handlerError) {
      console.log(`Error in comprehensive popup handler: ${handlerError.message}`);
    }
  };
  
  // Set up event listeners for various page change events
  const loadHandler = async () => {
    await handlePopupComprehensively('page-load');
  };
  
  const navHandler = async () => {
    // Wait a bit to let the popup appear after navigation
    await page.waitForTimeout(1000);
    await handlePopupComprehensively('navigation');
  };

  const clickHandler = async () => {
    // Wait a bit to let the popup appear after clicking
    await page.waitForTimeout(500);
    await handlePopupComprehensively('user-click');
  };

  // Listen for page load events
  await page.evaluate(() => {
    window.__saraHandlerAttached = true;
    
    // Create a flag to avoid multiple simultaneous handlers
    window.__saraHandling = false;
    
    // Store event timestamps to avoid excessive handling
    window.__saraLastHandled = 0;
    
    // Function to throttle handler calls
    window.__throttleSaraHandler = function() {
      const now = Date.now();
      if (window.__saraHandling || (now - window.__saraLastHandled < 2000)) {
        return false; // Skip if already handling or handled recently
      }
      window.__saraHandling = true;
      window.__saraLastHandled = now;
      return true;
    };
    
    // Function to release the handler lock
    window.__releaseSaraHandler = function() {
      window.__saraHandling = false;
    };
  });

  // Set up listeners for various page events
  await page.on('load', loadHandler);
  await page.on('framenavigated', navHandler);
  await page.on('dialog', loadHandler); // Check when dialogs appear
  
  // Set up a listener for user interactions that might trigger popups
  await page.on('click', clickHandler);
  
  // Create a flag to track if periodic checker is running
  let isPeriodicCheckerRunning = false;
  let periodicCheckIntervalId = null;
  
  // Set up periodic checker function to run at regular intervals
  const startPeriodicChecker = async () => {
    if (isPeriodicCheckerRunning) return;
    
    console.log(`[AutoHandler] Starting periodic Sara chat popup checker (every ${autoOptions.checkInterval}ms)`);
    isPeriodicCheckerRunning = true;
    
    // Initial check
    await handlePopupComprehensively('periodic');
    
    // Set up interval for regular checks
    periodicCheckIntervalId = setInterval(async () => {
      await handlePopupComprehensively('periodic');
    }, autoOptions.checkInterval);
  };
  
  // Start the periodic checker
  await startPeriodicChecker();
  
  // Set up DOM mutation observer to detect popup appearance
  await page.evaluate(() => {
    if (window.__saraMutationObserver) return; // Don't set up multiple observers
    
    // Enhanced mutation observer that's more sensitive to popup-like changes
    window.__saraMutationObserver = new MutationObserver((mutations) => {
      // Only process significant DOM changes to avoid excessive handling
      const significantChanges = mutations.some(mutation => {
        // Added nodes that might be popups
        if (mutation.addedNodes && mutation.addedNodes.length) {
          for (let i = 0; i < mutation.addedNodes.length; i++) {
            const node = mutation.addedNodes[i];
            
            // Check if this could be a popup/modal
            if (node.nodeType === 1) { // Element node
              // If it's a div, dialog or has a class/style that suggests it's a popup
              if (
                node.tagName === 'DIV' || 
                node.tagName === 'DIALOG' ||
                (node.className && (
                  node.className.includes('popup') || 
                  node.className.includes('modal') || 
                  node.className.includes('dialog') ||
                  node.className.includes('notification') ||
                  node.className.includes('message')
                )) ||
                (node.style && (
                  node.style.position === 'fixed' || 
                  node.style.position === 'absolute'
                ))
              ) {
                return true;
              }
            }
          }
        }
        
        // Check for attribute changes that might indicate a popup appearing
        if (mutation.type === 'attributes') {
          const target = mutation.target;
          if (target && target.nodeType === 1) {
            if (mutation.attributeName === 'class' && 
                target.className && (
                  target.className.includes('show') || 
                  target.className.includes('visible') || 
                  target.className.includes('open')
                )) {
              return true;
            }
            
            if (mutation.attributeName === 'style' && 
                target.style && (
                  target.style.display === 'block' || 
                  target.style.visibility === 'visible'
                )) {
              return true;
            }
          }
        }
        
        return false;
      });
      
      if (significantChanges) {
        // Check if we should handle (throttled)
        if (!window.__throttleSaraHandler()) return;
        
        // Post a message that Playwright can listen for
        window.postMessage({ 
          type: 'SARA_CHAT_POSSIBLY_APPEARED',
          timestamp: Date.now()
        }, '*');
        
        // Release handler after a timeout
        setTimeout(() => window.__releaseSaraHandler(), 2000);
      }
    });
    
    // Start observing the entire document with a configuration for childList and subtree
    window.__saraMutationObserver.observe(document.body, { 
      childList: true, 
      subtree: true,
      attributes: true,
      attributeFilter: ['class', 'style', 'aria-hidden']
    });
    
    console.log("Sara chat mutation observer attached to page");
  });
  
  // Listen for the custom message from the mutation observer
  await page.on('console', async msg => {
    if (msg.text().includes('SARA_CHAT_POSSIBLY_APPEARED')) {
      console.log("Mutation detected - checking for Sara chat popup");
      await handleSaraChatPopup(page, autoOptions).catch(err => {
        console.log(`Non-critical error auto-handling Sara chat: ${err.message}`);
      });
    }
  });

  // Also watch for page interactions that might trigger the popup
  await page.on('dialog', async () => {
    console.log("Dialog detected - checking for Sara chat popup");
    await handleSaraChatPopup(page, autoOptions).catch(err => {
      console.log(`Non-critical error auto-handling Sara chat: ${err.message}`);
    });
  });

  // Return a comprehensive cleanup function to remove all event listeners and timers
  return async () => {
    console.log("Cleaning up enhanced Sara chat auto handler...");
    try {
      // Clear the periodic check interval
      if (periodicCheckIntervalId) {
        clearInterval(periodicCheckIntervalId);
        periodicCheckIntervalId = null;
      }
      
      // Remove all event listeners
      await page.off('load', loadHandler);
      await page.off('framenavigated', navHandler);
      await page.off('click', clickHandler);
      await page.off('dialog', loadHandler);
      
      // Disconnect the mutation observer and clean up browser-side resources
      await page.evaluate(() => {
        // Clear any intervals
        if (window.__saraIntervalCheck) {
          clearInterval(window.__saraIntervalCheck);
          delete window.__saraIntervalCheck;
        }
        
        // Disconnect mutation observer
        if (window.__saraMutationObserver) {
          window.__saraMutationObserver.disconnect();
          delete window.__saraMutationObserver;
        }
        
        // Clean up all other handler-related properties
        delete window.__saraHandlerAttached;
        delete window.__saraHandling;
        delete window.__saraLastHandled;
        delete window.__throttleSaraHandler;
        delete window.__releaseSaraHandler;
        
        console.log("Browser-side Sara chat handlers cleaned up");
      });
      
      console.log("Sara chat auto handler cleaned up successfully");
    } catch (cleanupError) {
      console.warn(`Error cleaning up Sara chat auto handler: ${cleanupError.message}`);
    }
  };
}

/**
 * Emergency last-resort method to forcefully close any popup/dialog using JavaScript
 * This method is aggressive and should only be used when all other methods fail
 * @param {Object} page - The Playwright page object
 * @returns {Promise<boolean>} True if any action was taken
 */
async function emergencyForceClosePopup(page) {
  console.log("EMERGENCY: Using force close method as last resort");
  
  try {
    // Execute aggressive JavaScript to find and close any popup-like elements
    const didSomething = await page.evaluate(() => {
      let actionTaken = false;
      
      // 1. Try to find and click any close buttons
      const closeButtons = Array.from(document.querySelectorAll(
        'button, [role="button"], [aria-label*="close" i], [class*="close" i], [id*="close" i], ' +
        'svg, [class*="dismiss" i], [class*="cancel" i], [class*="exit" i]'
      ));
      
      for (const button of closeButtons) {
        try {
          const rect = button.getBoundingClientRect();
          // Only consider visible elements
          if (rect.width > 0 && rect.height > 0) {
            console.log("Emergency: clicking potential close element", button);
            button.click();
            actionTaken = true;
          }
        } catch (e) { /* continue to next element */ }
      }
      
      // 2. Try to find and remove modal/dialog/popup elements directly from DOM
      const modalElements = Array.from(document.querySelectorAll(
        'div[role="dialog"], .modal, .popup, .dialog, [class*="modal"], ' +
        '[class*="popup"], [class*="dialog"], [class*="overlay"], .overlay'
      ));
      
      for (const modal of modalElements) {
        try {
          // Check if it appears to be a popup/modal
          const style = window.getComputedStyle(modal);
          const rect = modal.getBoundingClientRect();
          
          if (rect.width > 100 && rect.height > 100 && 
             (style.position === 'fixed' || style.position === 'absolute')) {
            console.log("Emergency: removing popup element", modal);
            
            // First try to click any close buttons within this popup
            const innerCloseButtons = modal.querySelectorAll('button, svg, [role="button"]');
            for (const closeBtn of innerCloseButtons) {
              try { closeBtn.click(); } catch (e) { /* continue */ }
            }
            
            // Then try to hide it
            modal.style.display = 'none';
            modal.style.visibility = 'hidden';
            modal.setAttribute('aria-hidden', 'true');
            
            // If it has a parent with class/id suggesting it's a container,
            // try to hide that too
            const parent = modal.parentElement;
            if (parent && (
                parent.className.toLowerCase().includes('modal') ||
                parent.className.toLowerCase().includes('popup') ||
                parent.className.toLowerCase().includes('overlay')
            )) {
              parent.style.display = 'none';
              parent.style.visibility = 'hidden';
              parent.setAttribute('aria-hidden', 'true');
            }
            
            actionTaken = true;
          }
        } catch (e) { /* continue to next element */ }
      }
      
      // 3. Handle any overlay/backdrop elements
      const overlays = Array.from(document.querySelectorAll(
        '.overlay, .backdrop, .modal-backdrop, [class*="overlay"], [class*="backdrop"]'
      ));
      
      for (const overlay of overlays) {
        try {
          overlay.style.display = 'none';
          actionTaken = true;
        } catch (e) { /* continue */ }
      }
      
      return actionTaken;
    });
    
    if (didSomething) {
      console.log("EMERGENCY: Took action to force-close popups");
      // Wait a moment for any animations/effects to complete
      await page.waitForTimeout(500);
      return true;
    }
    
    return false;
  } catch (error) {
    console.log(`Error in emergency force close: ${error.message}`);
    return false;
  }
}

/**
 * Specialized function to handle Sara chat popup without relying on close buttons
 * Use this when the standard handleSaraChatPopup is not closing the popup successfully
 * 
 * @param {Object} page - The Playwright page object
 * @param {Object} options - Options for handling the popup
 * @returns {Promise<boolean>} True if popup was handled successfully
 */
async function handleSaraChatNoButton(page, options = {}) {
  console.log("Attempting to handle Sara chat popup without relying on close buttons...");
  
  if (!page) {
    throw new Error("Page object is undefined in handleSaraChatNoButton");
  }
  
  const takeScreenshot = async (name) => {
    if (options.takeScreenshot && typeof options.takeScreenshot === 'function') {
      try {
        await options.takeScreenshot(`no-button-${name}`);
      } catch (screenshotError) {
        console.log(`Non-critical error taking screenshot: ${screenshotError.message}`);
      }
    }
  };
  
  try {
    // Take initial screenshot
    await takeScreenshot('before');
    
    // First check if popup is present using our enhanced detection
    const { isPresent } = await detectSaraChatPopup(page, { verbose: options.verbose });
    
    if (!isPresent) {
      console.log("No Sara chat popup detected - proceeding with test");
      return false;
    }
    
    console.log("Sara chat popup detected - attempting alternative closing methods");
    
    // Strategy 1: Press Escape key
    console.log("Strategy 1: Pressing Escape key");
    await page.keyboard.press('Escape');
    await page.waitForTimeout(500);
    
    // Check if it worked
    const { isPresent: stillPresentAfterEscape } = await detectSaraChatPopup(page, {});
    if (!stillPresentAfterEscape) {
      console.log("Successfully closed popup with Escape key");
      await takeScreenshot('after-escape');
      return true;
    }
    
    // Strategy 2: Click in typical positions for close buttons
    console.log("Strategy 2: Clicking at typical close button positions");
    const viewportSize = await page.viewportSize();
    
    // Top right corner (most common)
    await page.mouse.click(viewportSize.width - 25, 25);
    await page.waitForTimeout(300);
    
    // Check if it worked
    const { isPresent: stillPresentAfterTopRight } = await detectSaraChatPopup(page, {});
    if (!stillPresentAfterTopRight) {
      console.log("Successfully closed popup by clicking top right position");
      await takeScreenshot('after-top-right');
      return true;
    }
    
    // Top right but a bit further in
    await page.mouse.click(viewportSize.width - 45, 45);
    await page.waitForTimeout(300);
    
    // Check if it worked
    const { isPresent: stillPresentAfterTopRightInner } = await detectSaraChatPopup(page, {});
    if (!stillPresentAfterTopRightInner) {
      console.log("Successfully closed popup by clicking inner top right position");
      await takeScreenshot('after-top-right-inner');
      return true;
    }
    
    // Strategy 3: Try JavaScript-based detection and closing
    console.log("Strategy 3: Using JavaScript to find and close the popup");
    const jsClosedPopup = await page.evaluate(() => {
      // Helper to check if an element might be a close button
      const isLikelyCloseButton = (el) => {
        if (!el) return false;
        
        // Check element properties
        const tag = el.tagName && el.tagName.toLowerCase();
        if (tag !== 'button' && tag !== 'a' && tag !== 'div' && tag !== 'span') return false;
        
        // Text content check
        const text = el.textContent && el.textContent.toLowerCase();
        if (text && (text.includes('close') || text.includes('×') || text === 'x')) return true;
        
        // Attribute checks
        const ariaLabel = el.getAttribute('aria-label');
        if (ariaLabel && ariaLabel.toLowerCase().includes('close')) return true;
        
        // Class checks
        const className = el.className && el.className.toLowerCase();
        if (className && (
          className.includes('close') || 
          className.includes('dismiss') || 
          className.includes('cancel')
        )) return true;
        
        // Position check - small elements in corners are often close buttons
        const rect = el.getBoundingClientRect();
        const isSmall = rect.width < 40 && rect.height < 40;
        const isCorner = (
          (rect.right > window.innerWidth - 60 && rect.top < 60) || // top right
          (rect.left < 60 && rect.top < 60) // top left
        );
        
        return isSmall && isCorner;
      };
      
      // Find all potential close buttons
      const allElements = document.querySelectorAll('*');
      const potentialCloseButtons = Array.from(allElements).filter(isLikelyCloseButton);
      
      // Try clicking each one
      for (const button of potentialCloseButtons) {
        try {
          console.log("Trying to click potential close button:", button.tagName);
          button.click();
          return true;
        } catch (e) {
          // Just try the next one
        }
      }
      
      // If no close buttons found, look for popup/dialog elements to hide
      const popups = document.querySelectorAll(
        'div[role="dialog"], .modal, .popup, [class*="modal"], [class*="popup"], [class*="dialog"]'
      );
      
      for (const popup of popups) {
        try {
          // Try to hide the popup
          popup.style.display = 'none';
          popup.style.visibility = 'hidden';
          popup.setAttribute('aria-hidden', 'true');
          return true;
        } catch (e) {
          // Try the next one
        }
      }
      
      return false;
    });
    
    if (jsClosedPopup) {
      console.log("Successfully closed popup using JavaScript");
      await takeScreenshot('after-js-close');
      
      // Verify it worked
      const { isPresent: stillPresentAfterJs } = await detectSaraChatPopup(page, {});
      if (!stillPresentAfterJs) {
        return true;
      }
    }
    
    // Strategy 4: Last resort - emergency force close
    console.log("Strategy 4: Emergency force close");
    const forceClosed = await emergencyForceClosePopup(page);
    
    // Take final screenshot
    await takeScreenshot('after-emergency');
    
    if (forceClosed) {
      console.log("Successfully force-closed popup");
      return true;
    }
    
    console.log("All strategies failed to close the Sara chat popup");
    return false;
  } catch (error) {
    console.error(`Error handling Sara chat popup without button: ${error.message}`);
    return false;
  }
}

module.exports = {
    handleSaraChatPopup,
    handlePopupBeforeClick,
    withPopupHandling,
    setupSaraChatAutoHandler,
    emergencyForceClosePopup,
    handleSaraChatNoButton,
    detectSaraChatPopup
};
