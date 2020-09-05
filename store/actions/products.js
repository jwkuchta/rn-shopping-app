export const DELETE_PRODUCT = 'DELETE_PRODUCT'
export const CREATE_PRODUCT = 'CREATE_PRODUCT'
export const UPDATE_PRODUCT = 'UPDATE_PRODUCT'
export const SET_PRODUCTS = 'SET_PRODUCTS'

import Product from '../../models/product'

const baseApiUrl = 'https://rn-app-9a6c1.firebaseio.com/'

export const fetchProducts = () => {
    return async dispatch => {
        try {
            const response = await fetch(`${baseApiUrl}/products.json`)
            if (!response.ok) {
                throw new Error('Something went wrong')
            }
            const data = await response.json()
            const products = []
            for (let key in data) {
                products.push(new Product(
                    key, 
                    'u1',
                    data[key].title,
                    data[key].imageUrl,
                    data[key].description,
                    data[key].price
                ))
            }
            dispatch({ type: SET_PRODUCTS, payload: products })
        } catch (error) {
            throw error
        }
        
    }
}

export const deleteProduct = productId => {
    return { type: DELETE_PRODUCT, payload: productId }
}

export const createProduct = (title, imageUrl, description, price) => {
    return async dispatch => {
        const response = await fetch(`${baseApiUrl}/products.json`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                title,
                description,
                imageUrl,
                price
            })
        })
        const data = await response.json()
        console.log('response data', data)
        dispatch({ 
            type: CREATE_PRODUCT, 
            payload: { 
                id: data.name,
                title, 
                imageUrl, 
                description, 
                price 
            } 
        })
    }
}

export const updatedProduct = (prodId, title, imageUrl, description) => {
    return { type: UPDATE_PRODUCT, payload: { prodId, title, imageUrl, description } }
}

