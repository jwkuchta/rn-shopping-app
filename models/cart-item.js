class CartItem {
    constructor(quantity, productPrice, productTitle, ownerPushToken, total) {
        this.quantity = quantity
        this.productPrice = productPrice
        this.productTitle = productTitle
        this.ownerPushToken = ownerPushToken
        this.total = total
    }
}

export default CartItem