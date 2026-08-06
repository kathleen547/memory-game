import { test, expect } from '@playwright/test';

test('should display game board with 16 cards', async ({ page }) => {
  await page.goto('http://127.0.0.1:3000/');

  const locator = page.locator('.card');
  await expect(locator).toHaveCount(16);
});


test('should start with move counter set to 0', async ({ page }) => {
    await page.goto('http://127.0.0.1:3000/');

    const locator = page.locator('#moves');
    await expect(locator).toContainText("0");
} );

test('should flip a card after click', async ({ page }) => {
    await page.goto('http://127.0.0.1:3000/');

    const cards = page.locator('.card');
    await expect(cards).toHaveCount(16);

    const card = page.locator('.card').first();
    await card.click();
    await expect(card).toHaveClass(/flipped/);
});
