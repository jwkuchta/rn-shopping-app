import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { NavigationActions } from 'react-navigation';
import ShopNavigator from './ShopNavigator';

const NavigationContainer = props => {
    
    const navRef = useRef();
    // why the double bang here ???
    const isAuth = useSelector(state => !!state.auth.token);

    useEffect(() => {
        if (!isAuth) {
            navRef.current.dispatch(
            NavigationActions.navigate({ routeName: 'Auth' }) // here the object and routeName is required !!!
            )   
        }
    }, [isAuth])
    return <ShopNavigator ref={navRef} />
}

export default NavigationContainer

// this components sole purpose is to wrap the ShopNavigator and access redux from outside ShopNavigator
// we can then check if the redux state has a token and take the user back to the AuthScreen otherwise
// https://www.udemy.com/course/react-native-the-practical-guide/learn/lecture/15675530#questions
