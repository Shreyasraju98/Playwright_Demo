//import { test, expect } from '@playwright/test';
import { test, expect } from '@playwright/test';

test('Create Unique Order', async ({ page }) => {
  await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
  await page.getByRole('textbox', { name: 'Username' }).fill('Admin');
  await page.getByRole('textbox', { name: 'Username' }).press('Tab');
  await page.getByRole('textbox', { name: 'Password' }).fill('admin123');
  await page.getByRole('button', { name: 'Login' }).click();
  await page.getByRole('link', { name: 'Admin' }).click();
  await page.getByRole('button', { name: ' Add' }).click();
  await page.locator('.oxd-icon.bi-caret-down-fill.oxd-select-text--arrow').first().click();
  await page.getByRole('option', { name: 'Admin' }).click();
  await page.locator('div:nth-child(3) > .oxd-input-group > div:nth-child(2) > .oxd-select-wrapper > .oxd-select-text > .oxd-select-text--after > .oxd-icon').click();
  await page.getByText('Enabled').click();
  await page.getByRole('textbox').nth(3).click();
  await page.getByRole('textbox').nth(3).fill('qwerty12');
  await page.getByRole('textbox').nth(4).click();
  await page.getByRole('textbox').nth(4).fill('qwerty12');
  await page.getByRole('textbox', { name: 'Type for hints...' }).click();
  await page.getByRole('textbox', { name: 'Type for hints...' }).fill('t');
  await page.getByText('Timothy Lewis Amiano').click();
  await page.getByRole('textbox').nth(2).click();

  const d = new Date();
  let ms = d.getMilliseconds();

  const ExpUserName = 'Shreyas' + ms;

  await page.getByRole('textbox').nth(2).fill(ExpUserName);
  await page.waitForTimeout(5000)
  await page.getByRole('button', { name: 'Save' }).click();
  await page.waitForTimeout(5000)
  let userFound = false;
  let currentPage = 1;
  const maxPages = 10; // Reasonable limit to prevent infinite loops

  while (!userFound && currentPage <= maxPages) {
    console.log(`Checking page ${currentPage} for user: ${ExpUserName}`);

    // Check if user exists on current page
    const userLocator = page.locator(("//div[text()='"+ExpUserName+"']"));
    const userCount = await userLocator.count();

    if (userCount > 0) {
      userFound = true;
      console.log(`User ${ExpUserName} found on page ${currentPage}`);
      await expect(userLocator.first()).toHaveText(ExpUserName);
      break;
    }

    // Try to go to next page
    const nextButton = page.locator('oxd-icon bi-chevron-right');
    const isNextDisabled = await nextButton.getAttribute('class');

    if (isNextDisabled && isNextDisabled.includes('disabled')) {
      console.log(`No more pages available. User ${ExpUserName} not found after checking all pages.`);
      break;
    }

    await nextButton.click();
    await page.waitForTimeout(2000); // Wait for page to load
    currentPage++;
  }

  if (!userFound) {
    throw new Error(`User ${ExpUserName} not found after checking all ${currentPage - 1} pages`);
  }

  console.log(`Successfully validated user ${ExpUserName} exists in the system`);

//   await expect(page.locator("//div[text()='"+ExpUserName+"']")).toHaveText(ExpUserName)
  await page.locator('div:nth-child(17) > .oxd-table-row > div:nth-child(6) > .oxd-table-cell-actions > button:nth-child(2)').click();
  await page.locator('div:nth-child(3) > .oxd-input-group > div:nth-child(2) > .oxd-select-wrapper > .oxd-select-text > .oxd-select-text--after > .oxd-icon').click();
  await page.getByRole('option', { name: 'Disabled' }).click();
  await page.getByRole('textbox', { name: 'Type for hints...' }).click();
  await page.getByRole('textbox', { name: 'Type for hints...' }).fill('a');
  await page.getByText('Ranga Akunuri').click();
  await page.getByRole('button', { name: 'Save' }).click();
  await page.waitForTimeout(5000)
  await expect(page.getByText('Ranga Akunuri').nth(1)).toBeVisible();
  await expect(page.getByText('Disabled').nth(2)).toBeVisible();
});