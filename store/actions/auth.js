export const SIGNUP = 'SIGNUP'
import { FIREBASE_API_KEY as apiKey} from '../../constants/_api_keys'

const firebaseAuth = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithCustomToken?key=${apiKey}`

export const signup = (email, password) => {
    return async dispatch => {
        dispatch({ type: SIGNUP })
    }
}