import { ADD_ORDER, SET_ORDERS } from "../actions/orders"
import Order from '../../models/order'

const initState = {
    orders: []
}

export default ordersReducer = (state = initState, action) => {
    switch(action.type) {
        case ADD_ORDER:
            const newOrder = new Order(
                action.payload.id, // dummy id, later when we have backend it will be generated
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


