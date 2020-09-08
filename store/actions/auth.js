// export const SIGNUP = 'SIGNUP'
// export const LOGIN = 'LOGIN'
// import { FIREBASE_API_KEY as apiKey} from '../../constants/_api_keys'

// const authSignupUrl = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${apiKey}`
// const authLoginUrl = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${apiKey}`

// export const signup = (email, password) => {
//     return async dispatch => {
//         const response = await fetch(authSignupUrl, {
//             method: 'POST',
//             headers: {
//                 'content-type': 'application/json'
//             },
//             body: JSON.stringify({
//                 email: email, 
//                 password: password,
//                 returnSecureToken: true
//             })
//         })
//         if (!response.ok) {
//             throw new Error('something went wrong')
//         }
//         const resData = await response.json()
//         console.log(resData)
//         dispatch({ type: SIGNUP })
//     }
// }

// export const login = (email, password) => {
//     console.log('in the login action')
//     return async dispatch => {
//         const response = await fetch(authSignupUrl, {
//             method: 'POST',
//             headers: {
//                 'content-type': 'application/json'
//             },
//             body: JSON.stringify({
//                 email: email, 
//                 password: password,
//                 returnSecureToken: true
//             })
//         })
//         console.log('response from login action', response.json())
//         if (!response.ok) {
//             throw new Error('something went wrong')
//         }
//         const resData = await response.json()
//         console.log(resData)
//         dispatch({ type: LOGIN })
//     }
// }


export const SIGNUP = 'SIGNUP';
export const LOGIN = 'LOGIN';

export const signup = (email, password) => {
  return async dispatch => {
    const response = await fetch(
      'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBY8UJq_xLD0nEe1HZHuvEOUfYIS9gg4pA',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: email,
          password: password,
          returnSecureToken: true
        })
      }
    );

    if (!response.ok) {
      throw new Error('Something went wrong!');
    }

    const resData = await response.json();
    console.log(resData);
    dispatch({ type: SIGNUP });
  };
};

export const login = (email, password) => {
    return async dispatch => {
      const response = await fetch(
        'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBY8UJq_xLD0nEe1HZHuvEOUfYIS9gg4pA',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            email: email,
            password: password,
            returnSecureToken: true
          })
        }
      );
  
      if (!response.ok) {
        throw new Error('Something went wrong!');
      }
  
      const resData = await response.json();
      console.log(resData);
      dispatch({ type: LOGIN });
    };
  };