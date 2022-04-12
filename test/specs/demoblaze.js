const StoreHomePage = require('../pageobjects/storeHomePage');
const ProductsPage = require('../pageobjects/productPage');
const ProductDetailPage = require('../pageobjects/productDetailPage');
const MenuPage = require('../pageobjects/menuPage');
const CartPage = require('../pageobjects/cartPage');
const FormPage = require('../pageobjects/formPage');
const ConfirmPage = require('../pageobjects/confirmPage');

describe('Primer proyecto con WDIO', () => {
    it('Prueba Demoblaze', async () => {
        await StoreHomePage.open();

        //Click en categoría laptops
        await StoreHomePage.clickLaptopCategory();

        //Click en el primer producto
        await ProductsPage.clickFirstLaptop();

        //Obtener modelo y precio del producto
        const modelDetail = await ProductDetailPage.getModel();
        const priceDetail = await ProductDetailPage.getPrice();
        await expect(modelDetail).toEqual("Sony vaio i5");
        await expect(priceDetail).toEqual("790");
        //Agregar al cart
        await ProductDetailPage.clickAddToCart();

        // Capturar mensaje de alerta, compararlo y aceptar alerta
        await browser.pause(2000);
        const alertmessage = await browser.getAlertText();
        await browser.acceptAlert();
        await expect(alertmessage).toEqual("Product added");
      
        //Click en Cart del menú
        await MenuPage.clickCart();

        //Declarar variables modelCart y priceCart
        const modelCart = await CartPage.getModelCart();
        const priceCart = await CartPage.getPriceCart();
        //Validar que el título de la columna y precio son los mismos
        await expect(modelDetail).toEqual(modelCart);
        await expect(priceDetail).toEqual(priceCart);
        //Click en el botón de ordenar
        await CartPage.clickButtonPlaceOrder();

        //Rellenar formulario y hacer click en "Purchase"
        await FormPage.formComplete("Maria", "Argentina", "CABA", "4444333322221111", "Diciembre", "2024");
        await FormPage.clickPurchaseButton();

        //Traer título del mensaje de confirmación y comparar con "Thank you for your purchase!"
        const tituloMsg = await ConfirmPage.getMessage();
        await expect(tituloMsg).toEqual("Thank you for your purchase!");

        //Traer mensaje de confirmación
        //Comparar el nombre, tarjeta de crédito y el precio del carrito con los datos anteriores
        const message = await ConfirmPage.getValidate();
        await expect(message.includes("Maria")).toBe(true);
        await expect(message.includes("4444333322221111")).toBe(true);
        await expect(message.includes(priceDetail)).toBe(true);

        //Click en botón "OK" del mensaje de confirmación.
        await ConfirmPage.clickButtonOk();

        //Cerrar browser
        await StoreHomePage.closeUrl();
    });
});