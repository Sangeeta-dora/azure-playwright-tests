exports.Payments=class Payments{

    constructor(page)
    {
        this.page= page
        this.pay_Button = page.locator('[data-test-id="open-invoices__button-pay"]')
        this.makePaymentButton = page.locator('[data-test-id="make-payment__pay"]')

    }
}