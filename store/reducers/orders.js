import { ADD_ORDER, SET_ORDERS } from "../actions/orders"
import Order from '../../models/order'

const initState = {
    orders: []
}

export default ordersReducer = (state = initState, action) => {
    switch(action.type) {
        case ADD_ORDER:
            const newOrder = new Order(
                action.payload.id,
                action.payload.items,
                action.payload.total,
                action.payload.date
            )
            return {
                ...state,
                orders: state.orders.concat(newOrder)
            }
        case SET_ORDERS:
            return {
                ...state,
                orders: action.payload
            }
        default:
            return state
    }
}

// import { ADD_ORDER, SET_ORDERS } from '../actions/orders';
// import Order from '../../models/order';

// const initialState = {
//   orders: []
// };

// export default (state = initialState, action) => {
//   switch (action.type) {
//     case SET_ORDERS:
//       return {
//         orders: action.orders
//       };
//     case ADD_ORDER:
//       const newOrder = new Order(
//         action.orderData.id,
//         action.orderData.items,
//         action.orderData.amount,
//         action.orderData.date
//       );
//       return {
//         ...state,
//         orders: state.orders.concat(newOrder)
//       };
//   }

//   return state;
// };

