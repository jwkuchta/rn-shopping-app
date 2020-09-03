import { ADD_ORDER } from "../actions/orders"
import Order from '../../models/order'

const initState = {
    orders: []
}

export default ordersReducer = (state = initState, action) => {
    switch(action.type) {
        case ADD_ORDER:
            const newOrder = new Order(
                new Date().toString(), // dummy id, later when we have backend it will be generated
                action.payload.items,
                action.payload.total,
                new Date()
            )
            return {
                ...state,
                orders: state.orders.concat(newOrder)
            }
        default:
            return state
    }
}