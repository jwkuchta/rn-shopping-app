// import PRODUCTS from '../../data/dummy-data'
import { DELETE_PRODUCT, CREATE_PRODUCT, UPDATE_PRODUCT, SET_PRODUCTS } from '../actions/products'
import Product from '../../models/product'

const initState = {
    availableProducts: [],
    userProducts: [],
}

export default (state = initState, action) => {
    switch(action.type) {
        case SET_PRODUCTS:
            return {
                availableProducts: action.payload.products,
                userProducts: action.payload.userProducts
            }
        case DELETE_PRODUCT:
            return {
                ...state,
                availableProducts: state.availableProducts.filter(prod => prod.id !== action.payload),
                userProducts: state.userProducts.filter(prod => prod.id !== action.payload)
            }
        case CREATE_PRODUCT:
            const newProduct = new Product(
                action.payload.id,
                action.payload.ownerId,
                action.payload.title, 
                action.payload.imageUrl,
                action.payload.description,
                action.payload.price
            )
            return {
                ...state,
                availableProducts: state.availableProducts.concat(newProduct),
                userProducts: state.userProducts.concat(newProduct)
            }
        case UPDATE_PRODUCT:
            const prodIndexUser = state.userProducts.findIndex(prod => prod.id === action.payload.prodId)
            const prodIndexAvilable = state.availableProducts.findIndex(prod => prod.id === action.payload.prodId)
            const updatedProduct = new Product (
                action.payload.prodId,
                state.userProducts[prodIndexUser].ownerId,
                action.payload.title,
                action.payload.imageUrl,
                action.payload.description,
                state.userProducts[prodIndexUser].price
            )
            const updatedUserProds = [...state.userProducts]
            const updatedAvailableProducts = [...state.availableProducts]
            updatedUserProds[prodIndexUser] = updatedProduct
            updatedAvailableProducts[prodIndexAvilable] = updatedProduct
            return {
                ...state,
                availableProducts: updatedAvailableProducts,
                userProducts: updatedUserProds
            }

    }
    return state
}

