import { test as base } from '@playwright/test';

export const test = base.extend({
    page: async ({ page }, use) => {
        await page.goto('https://shopbase.com');
        await page.click('text="Login"');
        await page.fill('#email', 'dinh.truong@qa.team');
        await page.fill('#password', 'Test@cc123');
        await page.click('//*[@type="submit"]');
        await use(page);
        await page.close();
    },
});

