import { expect, Locator, Page } from '@playwright/test';

export class ProdOverview{
    readonly page: Page;
    readonly firstProd: Locator;
    readonly firstProdPrice: Locator;
    readonly secondProd: Locator;
    readonly secondProdPrice: Locator;
    readonly thirdProd: Locator;
    readonly thirdProdPrice: Locator;
    readonly fourthProd: Locator;
    readonly fourthProdPrice: Locator;

    constructor(page: Page) {
        this.page = page;
        this.firstProd = page.locator('.collection-detail__product-image > .w-100 >> nth=0');
        this.firstProdPrice = page.locator('.money-original >> nth=0');
        this.secondProd = page.locator('.collection-detail__product-image > .w-100 >> nth=1');
        this.secondProdPrice = page.locator('.money-original >> nth=1');
        this.thirdProd = page.locator('.collection-detail__product-image > .w-100 >> nth=2');
        this.thirdProdPrice = page.locator('.money-original >> nth=2');
        this.fourthProd = page.locator('.collection-detail__product-image > .w-100 >> nth=3');
        this.fourthProdPrice = page.locator('.money-original >> nth=3');
    }

    async openFirstProdDetailPage() {
        await this.firstProd.click();
        await this.page.waitForLoadState('networkidle');
    }

    async openSecondProdDetailPage() {
        await this.secondProd.click();
        await this.page.waitForLoadState('networkidle');
    }

    async openThirdProdDetailPage() {
        await this.thirdProd.click();
        await this.page.waitForLoadState('networkidle');
    }

    async openFourthProdDetailPage() {
        await this.fourthProd.click();
        await this.page.waitForLoadState('networkidle');
    }

    async verifyProductsInfo() {
       await console.log('There are ' + await this.page.locator('.collection-detail__product-image > .w-100').count() + ' product(s) in this collection');
    }
}