import { test } from '@playwright/test'
require('dotenv').config()
import { Homepage } from '../../pages/Homepage'
import { Collections } from '../../pages/Collections'
import { ProdOverview } from '../../pages/POP'
import { ProdDetail } from '../../pages/PDP'
import { Cart } from '../../pages/Cart'
import { CheckOut } from '../../pages/CheckOut'

test.describe.serial('Assignment of Lecture 03', () => {
    let homepage: Homepage;
    let collections: Collections;
    let productOverview: ProdOverview;
    let productDetail: ProdDetail;
    let cart: Cart;
    let checkOut: CheckOut;

    test.beforeAll(async ({ page }) => {
        const domain = process.env.DOMAIN;
        page.goto(`${domain}`);
        homepage = new Homepage(page);
        collections = new Collections(page);
        productOverview = new ProdOverview(page);
        collections = new Collections(page);
        productOverview = new ProdOverview(page);
        productDetail = new ProdDetail(page);
        cart = new Cart(page);
        checkOut = new CheckOut(page);

    })

    test.afterAll(async ({ page }) => {
        await page.close();
    })
    test('View products on store', async ({ }) => {
        await homepage.goToCollections();
        await collections.openTopSell();
        await productOverview.openFirstProdDetailPage();
        await productDetail.checkSamePriceAsPOP();
    })

    test('Check out cart', async ({ }) => {
        const card: string = process.env.CARD_NUMBER!;
        const cvv: string = process.env.CVV!;
        const date: string = process.env.EXPIRED_DATE!;
        const phone: string = process.env.PHONE_NUMBER!;

        await productDetail.addProductToCart();
        await cart.checkOutProduct();
        await checkOut.enterShippingInfo({
            email: 'dinh.truong@qa.team',
            firstName: 'Dinh',
            lastName: 'Truong',
            address: '130 Trung Phung',
            city: 'Hanoi',
            country: 'Viet Nam',
            zipCode: '100000',
            phone: phone
        })

        await checkOut.chooseShippingMethodAndContinue('standard');
        await checkOut.enterPaymentMethodAndCompleteOrder({
            cardNumber: card,
            cardHolder: 'Truong Cong Dinh',
            CVV: cvv,
            expiredDate: date
        })
        await checkOut.verifySuccessfullyCompletedOrder();
    })

    test('View order', async ({ }) => {


    })
})
