export const SIGNUP = 'SIGNUP'
export const LOGIN = 'LOGIN'
export const AUTHENTICATE = 'AUTHENTICATE'

import { FIREBASE_API_KEY as apiKey} from '../../constants/_api_keys'

import { AsyncStorage } from 'react-native' // can be used to save data on the device (like the token)

const authSignupUrl = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${apiKey}`
const authLoginUrl = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${apiKey}`

export const authenticate = (userId, token) => {
    return { type: AUTHENTICATE, payload: {
        userId: userId,
        token: token
    }}
}

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
            const errorResData = await response.json();
            const errorId = errorResData.error.message;
            let message = 'Something went wrong!';
            if (errorId === 'EMAIL_EXISTS') {
             message = 'This email exists already!';
            }
            throw new Error(message);
        }
        const resData = await response.json()
        // dispatch({ 
        //     type: SIGNUP, payload: {
        //         token: resData.idToken,
        //         userId: resData.localId
        //     } 
        // })
        dispatch({ 
            type: AUTHENTICATE, payload: {
                token: resData.idToken,
                userId: resData.localId
            } 
        })
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
        // dispatch({ 
        //     type: LOGIN, payload: {
        //         token: resData.idToken,
        //         userId: resData.localId
        //     } 
        // })
        dispatch({ 
            type: AUTHENTICATE, payload: {
                token: resData.idToken,
                userId: resData.localId
            } 
        })
        // after we dispatch login, we save the token
        const expirationDate = new Date(new Date().getTime() + parseInt(resData.expiresIn) * 1000)
        saveToken(resData.idToken, resData.localId, expirationDate)
    }
}

const saveToken = (token, userId, expDate) => {
    AsyncStorage.setItem('userData', JSON.stringify({ // the second argument has to be a string
        token: token,
        userId: userId,
        tokenExpirationDate: expDate.toISOString()
    }))
}

