export const ADD_ORDER = 'ADD_ORDER'

export const addOrder = (cartItems, totalAmount) => {
    return {
        action: ADD_ORDER, payload: {items: cartItems, total: totalAmount}
    }
}