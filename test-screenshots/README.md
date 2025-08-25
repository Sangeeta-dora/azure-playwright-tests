# Screenshot Management System

This folder contains screenshots organized by test name. Each test's screenshots are stored in a separate folder.

## Folder Structure

```
test-screenshots/
├── React_Migration_Navigate_to_account_details/
│   ├── before-new-activity-click_2023-06-03T12-30-45-123Z.png
│   ├── after-new-activity-click_2023-06-03T12-30-48-456Z.png
│   └── ...
├── React_Migration_Click_on_BestFit/
│   ├── before-best-fit-click_2023-06-03T12-35-12-789Z.png
│   ├── after-best-fit-click_2023-06-03T12-35-15-012Z.png
│   └── ...
└── ...
```

## Usage in Tests

The screenshot system is automatically used in all page object methods. For example:

```javascript
// Instead of:
await page.screenshot({ path: 'some-name.png' });

// Use:
await mailNotReadPage.takeScreenshot('some-name');
```

Every screenshot will be saved with a timestamp and placed in a folder named after the test.

## Benefits

1. **Organization**: Screenshots are neatly organized by test name
2. **Timestamp**: Each screenshot includes a timestamp for precise tracking
3. **No collisions**: Different tests will never overwrite each other's screenshots
4. **Diagnostics**: Makes debugging test failures much easier by keeping related screenshots together
