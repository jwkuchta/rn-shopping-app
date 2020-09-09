import React, { useEffect } from 'react'
import { View, ActivityIndicator, AsyncStorage, StyleSheet } from 'react-native'
import Colors from '../constants/Colors'
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
            const { token, userId, tokenExpDate } = parsedData
            const expirationDate = new Date(tokenExpDate)

            if (expirationDate <= new Date() || !token || !userId) {
                props.navigation.navigate('Auth')
                return
            }

            const tokenExpTime = expirationDate.getTime() - new Date().getTime()
            props.navigation.navigate('Shop')
            dispatch(authenticate(userId, token, tokenExpTime))
        }
        tryLogin()
    }, [dispatch])

    return (
        <View>
            <ActivityIndicator size='large' color={Colors.primary}/>
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