import { expect, Locator, Page } from '@playwright/test';

export class Collections{
    readonly page: Page;
    readonly topSell: Locator;
    readonly highEnd: Locator;
    readonly forBusiness: Locator;
    readonly bestDou: Locator;

    constructor(page: Page) {
        this.page = page;
        this.topSell = page.locator('.collection--image >> nth=0');
        this.highEnd = page.locator('.collection--image >> nth=1');
        this.forBusiness = page.locator('.collection--image >> nth=2');
        this.bestDou = page.locator('.collection--image >> nth=3');
    }

    async openTopSell() {
        await this.topSell.click();
        await expect(await this.page).toHaveURL(/.*top-selling-products/);
    }

    async openHighEnd() {
        await this.highEnd.click();
        await expect(this.page).toHaveURL(/.*high-end/);
    }

    async openForBusiness() {
        await this.forBusiness.click();
        await expect(this.page).toHaveURL(/.*for-business/);
    }

    async openBestDou() {
        await this.bestDou.click();
        await expect(this.page).toHaveURL(/.*best-dou/);
    }
}