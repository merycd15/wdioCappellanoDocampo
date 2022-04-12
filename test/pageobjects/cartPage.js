const Page = require('./page');

/**
 * sub page containing specific selectors and methods for a specific page
 */
class CartPage extends Page {
    /**
     * define selectors using getter methods
     */
    get titleFirstModelAdd(){
        return $("td:nth-child(2)")
    };
    get priceFirstModelAdd(){
        return $("td:nth-child(3)")
    };
    get buttonPlaceOrder(){
        return $("//button[normalize-space()='Place Order']")
    };

    async getModelCart() {
        return (await this.getTextFromWebElement(this.titleFirstModelAdd));
    }
    async getPriceCart() {
        return (await this.getTextFromWebElement(this.priceFirstModelAdd));
    }

    async clickButtonPlaceOrder() {
        await this.clickOnWebElement(this.buttonPlaceOrder);
    }
}

module.exports = new CartPage();