import { expect, Locator, Page } from '@playwright/test';

export type cardCredentials = {
    cardHolder: string;
    cardNumber: string;
    CVV: string;
    expiredDate: string;
}

export type shippingInfo = {
    email: string;
    firstName: string;
    lastName: string;
    address: string;
    city: string;
    country: string;
    zipCode: string;
    phone: string;
}

export class CheckOut {

    readonly page: Page;
    readonly cardNumberField: Locator;
    readonly cardHolderField: Locator;
    readonly CVVField: Locator;
    readonly expiredDateField: Locator;
    readonly emailField: Locator;
    readonly firstNameField: Locator;
    readonly lastNameField: Locator;
    readonly addressField: Locator;
    readonly cityField: Locator;
    readonly countryField: Locator;
    readonly zipCodeField: Locator;
    readonly phoneField: Locator;
    readonly continueBtn: Locator;
    readonly receiveNewsBtn: Locator;
    readonly saveInfoBtn: Locator;
    readonly standardShippingOpt: Locator;
    readonly fastShippingOpt: Locator;
    readonly completeOrderBtn: Locator;
    readonly sameBillingAddressBtn: Locator;

    constructor(page: Page) {

        this.page = page;
        this.CVVField = page.locator('#stripe-card-cvc');
        this.cardNumberField = page.locator('#stripe-card-cvc');
        this.expiredDateField = page.locator('#stripe-card-cvc');
        this.emailField = page.locator('[placeholder="Email"]');
        this.firstNameField = page.locator('[placeholder="First name (optional)"]');
        this.lastNameField = page.locator('[placeholder="Last name"]');
        this.addressField = page.locator('[placeholder="Address"]');
        this.cityField = page.locator('[placeholder="City"]');
        this.countryField = page.locator('[placeholder="Country"]');
        this.zipCodeField = page.locator('[placeholder="Zip Code (optional)"]');
        this.phoneField = page.locator('[placeholder="Phone number"]');
        this.continueBtn = page.locator('.step__continue-button');
        this.receiveNewsBtn = page.locator('#accept-marketing');
        this.saveInfoBtn = page.locator('#checkout_shipping_address_remember_me');
        this.standardShippingOpt = page.locator('.s-radio >> nth=0');
        this.fastShippingOpt = page.locator('.s-radio >> nth=1');
        this.completeOrderBtn = page.locator('.step__continue-button');
        this.sameBillingAddressBtn = page.locator('.s-check >> nth=1');
    }

    async verifyCheckOutPage() {
        await expect(this.page).toHaveURL('/.*step=contact_information/')
    }

    async enterShippingInfo(info: shippingInfo) {
        await this.emailField.fill(info.email);
        await this.firstNameField.fill(info.firstName);
        await this.lastNameField.fill(info.lastName);
        await this.addressField.fill(info.address);
        await this.cityField.fill(info.city);
        await this.countryField.fill(info.country);
        await this.zipCodeField.fill(info.zipCode);
        await this.phoneField.fill(info.phone);
    }

    async continueToShippingMethod() {
        await this.continueBtn.click();
        await expect(this.page).toHaveURL(/.*step=shipping_method/);
    }

    async chooseShippingMethodAndContinue(type) {

        if(type == "fast") {
            await this.fastShippingOpt.click();
        }else if(type == "standard") {
            await this.standardShippingOpt.click();
        }
        await this.continueBtn.click();
        await expect(this.page).toHaveURL(/.*step=payment_method/);
    }

    async enterPaymentMethodAndCompleteOrder(info: cardCredentials) {
        await this.cardNumberField.type(info.cardNumber);
        await this.cardHolderField.type(info.cardHolder);
        await this.CVVField.type(info.CVV);
        await this.expiredDateField.type(info.expiredDate);
        await expect(this.sameBillingAddressBtn).toBeChecked();
        await this.completeOrderBtn.click();
    }

    async verifySuccessfullyCompletedOrder(){
        await expect(this.page).toHaveURL(/.*step=thank_you/)
    }
}