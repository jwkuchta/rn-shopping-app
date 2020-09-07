import React from 'react'
import { ScrollView, View, KeyboardAvoidingView, StyleSheet, Text, Button } from 'react-native'
import Input from '../../components/UI/Input'
import Card from '../../components/UI/Card'
import colors from '../..//constants/colors'
import { LinearGradient } from 'expo-linear-gradient' // you can use it to set colors between transions

const AuthScreen = props => {
    return (
        <KeyboardAvoidingView 
        behavior='padding' 
        keyboardVerticalOffset={50}
        style={styles.screen}
        >
            <LinearGradient colors={['#ffedff', '#ffe3ff']} style={styles.gradient}>
                {/* <View style={styles.screen}> */}
                <Card style={styles.authContainer}>
                    <ScrollView>
                        <Input 
                        id='email' 
                        label='Email' 
                        keyboardType='email-address' 
                        required 
                        autoCapitalize='none'
                        errorMessage="Please enter a valid email address."
                        onInputChange={() => {}} 
                        initialValue=''
                        />
                        <Input 
                        id='password' 
                        label='Password' 
                        keyboardType='default' 
                        secureTextEntry
                        required 
                        minLength={8}
                        autoCapitalize='none'
                        errorMessage="Please enter a valid email password."
                        onInputChange={() => {}} 
                        initialValue=''
                        />
                    </ScrollView>
                    <View style={styles.button}>
                        <Button  title='Log In' color={colors.primary} onPress={() => {}}/>
                    </View>
                    <View style={styles.button}>
                        <Button  title='Switch to Sign-Up' color={colors.accent} onPress={() => {}} />
                    </View>
                </Card>
            {/* </View> */}
            </LinearGradient>
        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    screen: {
        flex: 1
    },
    authContainer: {
        width: '80%',
        maxWidth: 400,
        maxHeight: 400,
        padding: 20
    },
    gradient: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    button: {
        marginTop: 10
    }
})

AuthScreen.navigationOptions = {
    headerTitle: 'Authenticate'
}

export default AuthScreen