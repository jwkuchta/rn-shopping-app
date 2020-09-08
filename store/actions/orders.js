// export const ADD_ORDER = 'ADD_ORDER'
// export const SET_ORDERS = 'SET_ORDERS'
// import Order from '../../models/order'

// const baseApiUrl = 'https://rn-app-9a6c1.firebaseio.com/orders'

// export const fetchOrders = () => {
//     return async dispatch => {
//         try {
//             const response = await fetch(`${baseApiUrl}/u1.json`)
//             if (!response.ok) {
//                 throw new Error('Something went wrong')
//             }
//             const data = await response.json()
//             const orders = []
//             for (let key in data) {
//                 orders.push(new Order(
//                     key, 
//                     data[key].cartItems,
//                     data[key].total,
//                     new Date(data[key].date) 
//                 ))
//             }
//             dispatch({ type: SET_ORDERS, payload: orders })
//         } catch (error) {
//             throw error
//         }   
//     }
// }

// export const addOrder = (cartItems, totalAmount) => {
//     console.log('in the addOrder action')
//     return async dispatch => {
//         const date = new Date()
//         const response = await fetch(`${baseApiUrl}/u1.json`, {
//             method: 'POST',
//             headers: {
//                 'Content-type': 'application/json'
//             },
//             body: JSON.stringify({
//                 cartItems,
//                 totalAmount,
//                 date: date.toISOString()
//             })
//         })
//         if (!response.ok) {
//             console.log('what went wrong: ', response.json())
//             throw new Error('Something went wrong!')
//         }
//         const data = await response.json()
//         dispatch({ type: ADD_ORDER, payload: {id: data.name, items: cartItems, total: totalAmount, date: date} })
//     }
// }

import Order from '../../models/order';

export const ADD_ORDER = 'ADD_ORDER';
export const SET_ORDERS = 'SET_ORDERS';

export const fetchOrders = () => {
  return async dispatch => {
    try {
      const response = await fetch(
        'https://rn-complete-guide.firebaseio.com/orders/u1.json'
      );

      if (!response.ok) {
        throw new Error('Something went wrong!');
      }

      const resData = await response.json();
      const loadedOrders = [];

      for (const key in resData) {
        loadedOrders.push(
          new Order(
            key,
            resData[key].cartItems,
            resData[key].totalAmount,
            new Date(resData[key].date)
          )
        );
      }
      dispatch({ type: SET_ORDERS, payload: loadedOrders });
    } catch (err) {
      throw err;
    }
  };
};

export const addOrder = (cartItems, totalAmount) => {
  return async dispatch => {
    const date = new Date();
    const response = await fetch(
      'https://rn-complete-guide.firebaseio.com/orders/u1.json',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          cartItems,
          totalAmount,
          date: date.toISOString()
        })
      }
    );

    if (!response.ok) {
      throw new Error('Something went wrong!');
    }

    const resData = await response.json();

    dispatch({
      type: ADD_ORDER,
      payload: {
        id: resData.name,
        items: cartItems,
        amount: totalAmount,
        date: date
      }
    });
  };
};
