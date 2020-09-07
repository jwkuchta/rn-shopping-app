export const ADD_ORDER = 'ADD_ORDER'

const baseApiUrl = 'https://rn-app-9a6c1.firebaseio.com/orders'

export const addOrder = (cartItems, totalAmount) => {
    return async dispatch => {
        const date = new Date()
        const response = await fetch(`${baseApiUrl}.json`, {
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
        dispatch({ type: ADD_ORDER, payload: {id: data.name, items: cartItems, total: totalAmount, date: date} })
    }
}