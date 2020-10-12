class CartItem {
    constructor(quantity, productPrice, productTitle, pushToken, total) {
        this.quantity = quantity
        this.productPrice = productPrice
        this.productTitle = productTitle
        this.pushToken = pushToken
        this.total = total
    }
}

export default CartItem