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
  await page.getByRole('textbox', { name: 'Type for hints...' }).fill('a');
  await page.getByText('Timothy Lewis Amiano').click();
  await page.getByRole('textbox').nth(2).click();

  const d = new Date();
  let ms = d.getMilliseconds();

  const ExpUserName = 'Shreyas' + ms;

  await page.getByRole('textbox').nth(2).fill(ExpUserName);
  await page.waitForTimeout(5000)
  await page.getByRole('button', { name: 'Save' }).click();
  await page.waitForTimeout(5000)
  await expect(page.locator("//div[text()='"+ExpUserName+"']")).toContainText(ExpUserName)
});