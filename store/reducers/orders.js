import { ADD_ORDER, SET_ORDERS } from "../actions/orders"
import Order from '../../models/order'
import { exp } from "react-native/Libraries/Animated/src/Easing"

const initState = {
    orders: []
}

const ordersReducer = (state = initState, action) => {
    debugger
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

export default ordersReducer


