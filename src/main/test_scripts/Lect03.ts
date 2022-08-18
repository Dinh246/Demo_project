import { test, expect } from '@playwright/test';

test('sign in', async ({ page }) => {

  // Go to https://shopbase.com/
  await page.goto('https://accounts.shopbase.com/');

  // Fill [placeholder="example\@email\.com"]
  await page.locator('[placeholder="example\\@email\\.com"]').fill('wrongmail@gmail.com');

  // Fill [placeholder="Password"]
  await page.locator('[placeholder="Password"]').fill('test1234');

  // Click button:has-text("Sign in")
  await page.locator('button:has-text("Sign in")').click();

  // Click text=Email or password is not valid
  await expect(page.locator('text=Email or password is not valid')).toHaveText("Email or password is not valid");

});

test('sign up', async ({ page }) => {
  await page.goto('https://accounts.shopbase.com/');
  await page.click('text=Sign up');
  await page.fill('[placeholder="example\@email\.com"]', 'demo_signup4@qa.team');
  await page.fill('[placeholder="Password"]','Test@cc1234');
  await page.fill('[placeholder="Your shop name"]', 'ShopeeClone11');
  await page.click('button:has-text("Sign up")');
  await page.fill('[placeholder="Enter your name"]', 'Dinh');
  await page.fill('[placeholder="Enter your last name"]', 'Truong');
  await page.fill('//*[@id="phone-number"]', '0364240695');
  await page.click('button:has-text("Next")');
  await page.click('text=General Dropshipping');
  await page.click('text=$500,000+');
  await page.click('button:has-text("Next")');
  await page.click('button:has-text("I want a ShopBase store")');
  await page.waitForSelector('text=Welcome to ShopBase, Dinh');
  await expect(page).toHaveTitle('shopeeclone11 ~ Home ~ ShopBase');
})

test('Log in', async ({ page }) => {
  await page.goto('https://accounts.shopbase.com/');
  await page.locator('[placeholder="example\\@email\\.com"]').fill('demo_signup4@qa.team');
  await page.fill('[placeholder="Password"]','Test@cc1234');
  await page.locator('button:has-text("Sign in")').click();
  await page.waitForSelector('text=Welcome to ShopBase, Dinh');
  await expect(page).toHaveTitle('shopeeclone11 ~ Home ~ ShopBase')
})

