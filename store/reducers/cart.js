import { ADD_TO_CART, REMOVE_FROM_CART } from "../actions/cart"
import CartItem from '../../models/cart-item'

const initState = {
    items: {},
    total: 0
}

export default (state = initState, action) => {
    switch (action.type) {
        case ADD_TO_CART:
            const addedProd = action.payload
            const prodPrice = addedProd.price 
            const prodTitle = addedProd.title

            let newCartItem

            if (state.items[addedProd.id]) {
                newCartItem = new CartItem(
                    state.items[addedProd.id].quantity + 1,
                    prodPrice,
                    prodTitle,
                    state.items[addedProd.id].total + prodPrice
                )
            } else {
                newCartItem = new CartItem(1, prodPrice, prodTitle, prodPrice)
            }
            return {
                ...state, 
                items: {...state.items, [addedProd.id]: newCartItem}, 
                total: state.total + prodPrice
            }
        case REMOVE_FROM_CART:
            const selectedItem = state.items[action.payload]
            const currentQuantity = selectedItem.quantity
            let updatedCart
            if (currentQuantity > 1) {
                const updatedItem = new CartItem(
                    selectedItem.quantity - 1, 
                    selectedItem.productPrice, 
                    selectedItem.productTitle, 
                    selectedItem.total - selectedItem.productPrice
                )
                updatedCart = {...state.items, [action.payload]: updatedItem
                }
            } else {
                updatedCart = {...state.items}
                delete updatedCart[action.payload]
            }
            return {
                ...state,
                items: updatedCart,
                total: state.total - selectedItem.productPrice
            }
        default:
            return state
    }
}

