import PRODUCTS from '../../data/dummy-data'
import { DELETE_PRODUCT } from '../actions/products'

const initState = {
    availableProducts: PRODUCTS,
    userProducts: PRODUCTS.filter(p => p.ownerId === 'u1'),

}

export default (state = initState, action) => {
    switch(action.type) {
        case DELETE_PRODUCT:
            return {
                ...state,
                availableProducts: state.availableProducts.filter(prod => prod.id !== action.payload),
                userProducts: state.userProducts.filter(prod => prod.id !== action.payload)
            }
    }
    return state
}

