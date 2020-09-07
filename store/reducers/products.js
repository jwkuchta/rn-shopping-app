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
                availableProducts: action.payload,
                userProducts: action.payload.filter(prod => prod.ownerId === 'u1')
            }
        case DELETE_PRODUCT:
            return {
                ...state,
                availableProducts: state.availableProducts.filter(prod => prod.id !== action.payload),
                userProducts: action.payload.filter(prod => prod.id !== action.payload)
            }
        case CREATE_PRODUCT:
            const newProduct = new Product(
                action.payload.id,
                'u1', // hardcoded for now til we have a database
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
            const prodIndexUser = state.userProducts.findIndex(prod => prod.id === 'p1')
            // console.log(action.payload.prodId, state.userProducts, prodIndexUser, state.userProducts[prodIndexUser])
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

// import PRODUCTS from '../../data/dummy-data';
// import {
//   DELETE_PRODUCT,
//   CREATE_PRODUCT,
//   UPDATE_PRODUCT
// } from '../actions/products';
// import Product from '../../models/product';

// const initialState = {
//   availableProducts: PRODUCTS,
//   userProducts: PRODUCTS.filter(prod => prod.ownerId === 'u1')
// };

// export default (state = initialState, action) => {
//     switch (action.type) {
//       case CREATE_PRODUCT:
//         const newProduct = new Product(
//           new Date().toString(),
//           'u1',
//           action.payload.title,
//           action.payload.imageUrl,
//           action.payload.description,
//           action.payload.price
//         );
//         return {
//           ...state,
//           availableProducts: state.availableProducts.concat(newProduct),
//           userProducts: state.userProducts.concat(newProduct)
//         };
//       case UPDATE_PRODUCT:
//         const productIndex = state.userProducts.indexOf(
//           prod => prod.id === action.payload
//         );
//         const updatedProduct = new Product(
//           action.payload,
//           state.userProducts[productIndex].ownerId,
//           action.payload.title,
//           action.payload.imageUrl,
//           action.payload.description,
//           state.userProducts[productIndex].price
//         );
//         const updatedUserProducts = [...state.userProducts];
//         updatedUserProducts[productIndex] = updatedProduct;
//         const availableProductIndex = state.availableProducts.indexOf(
//           prod => prod.id === action.payload
//         );
//         const updatedAvailableProducts = [...state.availableProducts];
//         updatedAvailableProducts[availableProductIndex] = updatedProduct;
//         return {
//           ...state,
//           availableProducts: updatedAvailableProducts,
//           userProducts: updatedUserProducts
//         };
//       case DELETE_PRODUCT:
//         return {
//           ...state,
//           userProducts: state.userProducts.filter(
//             product => product.id !== action.payload
//           ),
//           availableProducts: state.availableProducts.filter(
//             product => product.id !== action.payload
//           )
//         };
//     }
//     return state;
//   };
  

