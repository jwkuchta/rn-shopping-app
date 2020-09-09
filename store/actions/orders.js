export const ADD_ORDER = 'ADD_ORDER'
export const SET_ORDERS = 'SET_ORDERS'
import Order from '../../models/order'

const baseApiUrl = 'https://rn-app-9a6c1.firebaseio.com/orders'

export const fetchOrders = () => {
    return async (dispatch, getState) => {
        const userId = getState().auth.userId
        try {
            const response = await fetch(`${baseApiUrl}/${userId}.json`)
            if (!response.ok) {
                throw new Error('Something went wrong')
            }
            const data = await response.json()
            const orders = []
            for (let key in data) {
                orders.push(new Order(
                    key, 
                    data[key].cartItems,
                    data[key].total,
                    new Date(data[key].date) 
                ))
            }
            dispatch({ 
                type: SET_ORDERS, 
                payload: orders 
            })
        } catch (error) {
            throw error
        }   
    }
}

export const addOrder = (cartItems, totalAmount) => {
    return async (dispatch, getState) => {
        const token = getState().auth.token
        const userId = getState().auth.userId
        const date = new Date()
        const response = await fetch(`${baseApiUrl}/${userId}.json?auth=${token}`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                cartItems,
                totalAmount,
                date: date.toISOString()
            })
        })
        if (!response.ok) {
            throw new Error('Something went wrong!')
        }
        const data = await response.json()
        dispatch({ 
            type: ADD_ORDER, 
            payload: {
                id: data.name, 
                items: cartItems, 
                total: totalAmount, 
                date: date
            } 
        })
    }
}

