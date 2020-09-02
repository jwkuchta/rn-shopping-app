import { ADD_TO_CART } from "../actions/cart"
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

            if (state.items[addedProd.id]) {
                const updatedCartItem = new CartItem(
                    state.items[addedProd.id].quantity + 1,
                    prodPrice,
                    prodTitle,
                    state.items[addedProd.id].sum + prodPrice
                )
                return {
                    ...state, 
                    items: {...state.items, [addedProd.id]: updatedCartItem},
                    total: state.total + prodPrice
                }

            } else {
                const newCartItem = new CartItem(1, prodPrice, prodTitle, prodPrice)
                return {
                    ...state, 
                    [addedProd.id]: newCartItem,
                    total: state.total + prodPrice
                }
            }
    }
    return state
}