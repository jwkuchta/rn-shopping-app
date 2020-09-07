export const SIGNUP = 'SIGNUP'
import { FIREBASE_API_KEY as apiKey} from '../../constants/_api_keys'

const firebaseAuth = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${apiKey}`

export const signup = (email, password) => {
    console.log('firebaseauth', firebaseAuth)
    return async dispatch => {
        const response = await fetch(firebaseAuth, {
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
