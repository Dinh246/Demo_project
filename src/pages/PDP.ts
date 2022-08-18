import { expect, Locator, Page } from '@playwright/test';
import { ProdOverview } from './POP';

export class ProdDetail extends ProdOverview {
    readonly page: Page;
    readonly prodName: Locator;
    readonly prodPrice: Locator;
    readonly quantityFieldPDP: Locator;
    readonly increaseQuantityBtn: Locator;
    readonly decreaseQuantityBtn: Locator;
    readonly addToCartBtn: Locator;
    readonly checkOutBtn: Locator;
    readonly goToCartBtn: Locator;
    readonly removeItemBtn: Locator;
    readonly subTotalPrice: Locator;
    readonly quantityFieldCart: Locator;

    constructor(page: Page) {
        super(page);
        this.prodName = page.locator('.collection-detail__product-image > .w-100 >> nth=0');
        this.prodPrice = page.locator('.product__price-span');
        this.quantityFieldPDP = page.locator('//*[@type="number"]');
        this.quantityFieldCart = page.locator('text=QuantityRemove item >> input[type="number"]');
        this.increaseQuantityBtn = page.locator('.chevron-top');
        this.decreaseQuantityBtn = page.locator('.chevron-bottom');
        this.addToCartBtn = page.locator('.btn-buy-now');
        this.removeItemBtn = page.locator('.product-cart__remove');
        this.subTotalPrice = page.locator('.cart__subtotal-price');
    }

    async checkSamePriceAsPOP(){
        await expect(await this.prodPrice.innerText).toEqual(await this.firstProdPrice.innerText);
    }
    async setTheQuantity(number) {
        await this.quantityFieldPDP.fill(`${number}`)
    }

    async increaseTheQuantityBy(number) {
        for(let i=0; i<number; i++){
            await this.increaseQuantityBtn.click();
        }
    }

    async decreaseTheQuantityBy(number) {
        for(let i=0; i<number; i++){
            await this.decreaseQuantityBtn.click();
        }
    }

    async addProductToCart() {
        await expect(this.addToCartBtn).toBeVisible();
        await this.addToCartBtn.click();
    }

    async verifySubTotalIsCorrect() {
        await expect(this.subTotalPrice).toEqual(parseInt(this.prodPrice.toString().slice(1).replace(/,/g, '')) * parseInt(this.quantityFieldCart.inputValue.toString()));
    }

    async removeItemFromCart(){
        await this.removeItemBtn.click()
    }
}