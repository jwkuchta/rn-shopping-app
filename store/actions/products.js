export const DELETE_PRODUCT = 'DELETE_PRODUCT'
export const CREATE_PRODUCT = 'CREATE_PRODUCT'
export const UPDATE_PRODUCT = 'UPDATE_PRODUCT'
export const SET_PRODUCTS = 'SET_PRODUCTS'
import * as Notifications from 'expo-notifications'
import * as Permissions from 'expo-permissions'

import Product from '../../models/product'

const baseApiUrl = 'https://rn-app-9a6c1.firebaseio.com/products'

export const fetchProducts = () => {
    return async (dispatch, getState) => {
        const userId = getState().auth.userId
        try {
            const response = await fetch(`${baseApiUrl}.json`)
            if (!response.ok) {
                throw new Error('Something went wrong')
            }
            const data = await response.json()
            const products = []
            for (let key in data) {
                products.push(new Product(
                    key, 
                    data[key].ownerId,
                    data[key].title,
                    data[key].imageUrl,
                    data[key].description,
                    data[key].price,
                    data[key].ownerPushToken
                ))
            }
            dispatch({ 
                type: SET_PRODUCTS, 
                payload: {
                    products: products,
                    userProducts: products.filter(prod => prod.ownerId === userId)
                }  
            })
        } catch (error) {
            throw error
        }   
    }
}

export const createProduct = (title, imageUrl, description, price) => {

    return async (dispatch, getState) => {
        let pushToken
        // check whether a permission was granted or not
        let statusObj = await Permissions.getAsync(Permissions.NOTIFICATIONS)
        if (statusObj.status !== 'granted') {
            statusObj = await Permissions.askAsync(Permissions.NOTIFICATIONS)
        }
        if (statusObj.status !== 'granted') {
            pushToken = null
        } else {
            pushToken = (await Notifications.getExpoPushTokenAsync()).data
            console.log('push token in create action line 60', pushToken)
        }
        const token = getState().auth.token
        const userId = getState().auth.userId
        console.log('token and user id', token, userId)
        const response = await fetch(`${baseApiUrl}.json?auth=${token}`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                title,
                imageUrl,
                description,
                price,
                ownerId: userId,
                ownerPushToken: pushToken
            })
        })
        if (!response.ok) {
            console.log('response on line 79', response)
            throw new Error('Something went wrong!')
        }
        const data = await response.json()
        console.log('data line 83', data)
        dispatch({ 
            type: CREATE_PRODUCT, 
            payload: { 
                id: data.name,
                title, 
                imageUrl, 
                description, 
                price,
                ownerId: userId,
                ownerPushToken: pushToken
            } 
        })
    }
}

//  getState() gives access to the full Redux store from within the action!
export const updateProduct = (prodId, title, imageUrl, description) => {
    return async (dispatch, getState) => {
        const token = getState().auth.token
        // we can now add this token to our patch request so firebase allows the update
        const response = await fetch(`${baseApiUrl}/${prodId}.json?auth=${token}`, {
            method: 'PATCH',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({
                title: title, 
                imageUrl: imageUrl, 
                description: description
            })
        })
        const resData = await response.json()
        // had to comment it out cause the dispatch was not rea
        if (!response.ok) {
            throw new Error('Something went wrong!')
        } 
        dispatch({ 
            type: UPDATE_PRODUCT, 
            payload: { 
                prodId: prodId, 
                title: resData.title, 
                imageUrl: resData.imageUrl, 
                description: resData.description 
            }
        })
    }    
}

export const deleteProduct = productId => {
    return async (dispatch, getState) => {
        const token = getState().auth.token
        const response = await fetch(`${baseApiUrl}/${productId}.json?auth=${token}`, { method: 'DELETE' })
        if (!response.ok) {
            throw new Error('Something went wrong!')
        }
        dispatch({ type: DELETE_PRODUCT, payload: productId })
    }  
}

