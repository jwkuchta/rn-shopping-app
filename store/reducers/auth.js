import { LOGOUT, AUTHENTICATE } from "../actions/auth"

const initialState = {
    token: null,
    userId: null
}

export default (state = initialState, action) => {
    switch (action.type) {
        case AUTHENTICATE:
            console.log('IN THE AUTHENTICATE REDUCER, PAYLOAD: ', action.payload)
            return {
                token: action.payload.token,
                userId: action.payload.userId
            }
        case LOGOUT:
            console.log('IN THE LOGOUT REDUCER')
            return initialState
        default:
            return state
    }
}