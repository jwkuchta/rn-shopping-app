export const DELETE_PRODUCT = 'DELETE_PRODUCT'
export const CREATE_PRODUCT = 'CREATE_PRODUCT'
export const UPDATE_PRODUCT = 'UPDATE_PRODUCT'

export const deleteProduct = productId => {
    return { type: DELETE_PRODUCT, payload: productId }
}

export const createProduct = (title, imageUrl, description, price) => {
    return { type: CREATE_PRODUCT, payload: { title, imageUrl, description, price } }
}

export const updatedProduct = (prodId, title, imageUrl, description) => {
    return { type: UPDATE_PRODUCT, payload: { prodId, title, imageUrl, description } }
}

