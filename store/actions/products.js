export const DELETE_PRODUCT = 'DELETE_PRODUCT'
export const CREATE_PRODUCT = 'CREATE_PRODUCT'
export const UPDATE_PRODUCT = 'UPDATE_PRODUCT'

const baseApiUrl = 'https://rn-app-9a6c1.firebaseio.com/'

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

