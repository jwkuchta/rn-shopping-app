export const SIGNUP = 'SIGNUP'
export const LOGIN = 'LOGIN'
import { FIREBASE_API_KEY as apiKey} from '../../constants/_api_keys'

const authSignupUrl = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${apiKey}`
const authLoginUrl = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${apiKey}`

export const signup = (email, password) => {
    return async dispatch => {
        const response = await fetch(authSignupUrl, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({
                email: email, 
                password: password,
                returnSecureToken: true
            })
        })
        if (!response.ok) {
            throw new Error('something went wrong')
        }
        const resData = await response.json()
        console.log(resData)
        dispatch({ type: SIGNUP })
    }
}

export const login = (email, password) => {
    return async dispatch => {
        const response = await fetch(authLoginUrl, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({
                email: email, 
                password: password,
                returnSecureToken: true
            })
        })
        if (!response.ok) {
            const errorResData = await response.json()
            const errorId = errorResData.error.message;
            let message = 'Something went wrong!';
            if (errorId === 'EMAIL_NOT_FOUND') {
                message = 'This email could not be found!';
            } else if (errorId === 'INVALID_PASSWORD') {
                message = 'This password is not valid!';
            }
        throw new Error(message)
        }
        const resData = await response.json()
        console.log(resData)
        dispatch({ type: LOGIN })
    }
}

