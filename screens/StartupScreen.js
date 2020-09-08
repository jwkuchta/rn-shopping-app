import React, { useEffect } from 'react'
import { View, ActivityIndicator, AsyncStorage, StyleSheet } from 'react-native'
import colors from '../constants/colors'
import { useDispatch } from 'react-redux'
import { authenticate } from '../store/actions/auth'

const StartupScreen = props => {

    const dispatch = useDispatch()

    useEffect(() => {
        // check for valid token
        const tryLogin = async () => {
            const userData = await AsyncStorage.getItem('userData')
            if (!userData) {
                props.navigation.navigate('Auth')
                return
            }
            const parsedData = JSON.parse(userData)
            const { token, userId, tokenExpirationDate } = parsedData
            const expirationDate = new Date(tokenExpirationDate)

            if (expirationDate <= new Date() || !token || !userId) {
                props.navigation.navigate('Auth')
                return
            }
            props.navigation.navigate('Shop')
            dispatch(authenticate(userId, token))
        }
        tryLogin()
    }, [])

    return (
        <View>
            <ActivityIndicator size='large' color={colors.primary}/>
        </View>
    )
}

const styles = StyleSheet.create({
    centered: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
})

export default StartupScreen