// export const SIGNUP = 'SIGNUP'
// export const LOGIN = 'LOGIN'
export const AUTHENTICATE = 'AUTHENTICATE'
export const LOGOUT = 'LOGOUT'

let timer

import { FIREBASE_API_KEY as apiKey} from '../../constants/_api_keys'
const authSignupUrl = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${apiKey}`
const authLoginUrl = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${apiKey}`

import { AsyncStorage } from 'react-native' // can be used to save data on the device (like the token)

export const authenticate = (userId, token, tokenExpTime) => {
    return dispatch => {
        dispatch(setLogoutTimer(tokenExpTime))
        dispatch({ 
            type: AUTHENTICATE, 
            payload: {
                userId: userId,
                token: token
            }
        })
    }
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
        dispatch(authenticate(
            resData.localId,
            resData.idToken,
            parseInt(resData.expiresIn) * 1000
            )
        )
        const expDate = new Date(new Date().getTime() + parseInt(resData.expiresIn) * 1000)
        saveDataToStorage(resData.idToken, resData.localId, expDate)
    }
}

export const login = (email, password) => {
    return async dispatch => {
        const response = await fetch(
          authLoginUrl, {
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
        dispatch(
            authenticate(
                resData.localId, 
                resData.idToken, 
                parseInt(resData.expiresIn) * 1000
            )
        )
        // after we dispatch login, we save the token
        const expirationDate = new Date(new Date().getTime() + parseInt(resData.expiresIn) * 1000)
        saveDataToStorage(resData.idToken, resData.localId, expirationDate)
    }
}

export const logout = () => {
    return async dispatch => {
        await clearLogoutTimer()
        await AsyncStorage.removeItem('userData')
        // await AsyncStorage.clear()
        dispatch({ type: LOGOUT }) 
    }
}

const clearLogoutTimer = () => {
    if (timer) {
        clearTimeout(timer)
    }
}

const setLogoutTimer = tokenExpTime => {
    return dispatch => {
        timer = setTimeout(() => {
            dispatch(logout())
        }, tokenExpTime)
    } 
}

const saveDataToStorage = (token, userId, expDate) => {
    AsyncStorage.setItem('userData', JSON.stringify({ // the second argument has to be a string !!!
        token: token,
        userId: userId,
        tokenExpDate: expDate.toISOString()
    }))
}

