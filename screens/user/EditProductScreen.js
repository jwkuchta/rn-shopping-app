import React, { useEffect, useCallback, useReducer } from 'react'
import { View, Text, StyleSheet, TextInput, ScrollView, Platform, Alert } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import { Ionicons } from '@expo/vector-icons'
import colors from '../../constants/colors'
import * as productActions from '../../store/actions/products'
import Input from '../../components/UI/Input'

// build it outside the component to avoid unnecessary rebuilding 
const formReducer = (state, action) => {
    if (action.type === 'FORM_UPDATE') {
        const updatedValues = {
            ...state.inputValues, // from 27032
            [action.input]: action.value
        }
        const updatedInputValidities = {
            ...state.inputValidities,
            [action.input]: action.isValid
        }
        let updatedFormIsValid = true
        for (let key in updatedInputValidities) {
            updatedFormIsValid = updatedFormIsValid && updatedInputValidities[key]
        }
        return {
            formIsValid: updatedFormIsValid,
            inputValues: updatedValues,
            inputValidities: updatedInputValidities
        }
    }
    return state
}

const EditProductScreen = props => {

    const prodId = props.navigation.getParam('id')
    const editedProd = useSelector(state => state.products.userProducts.find(prod => prod.id === prodId))

    const dispatch = useDispatch()

    // useReducer helps with state management when you have a lot of local state to manage
    // replaces useState()
    const [ formState, dispatchFormState ] = useReducer(formReducer, {
        inputValues: {
            title: editedProd ? editedProd.title : '',
            imageUrl: editedProd ? editedProd.imageUrl : '',
            price: '',
            description: editedProd ? editedProd.description : ''
        }, 
        inputValidities: {
            title: editedProd ? true : false,
            imageUrl: editedProd ? true : false,
            price: editedProd ? true : false,
            description: editedProd ? true : false
        },
        formIsValid: editedProd ? true : false
    })

    const submitHandler = useCallback(() => {
        if (!formState.formIsValid) {
            Alert.alert('Invalid title', 'Please submit a valid title', [{ text: 'Ok'}])
            return
        }
        if (editedProd) {
            dispatch(productActions.updatedProduct(
                prodId, 
                formState.inputValues.title, 
                formState.inputValues.imageUrl, 
                formState.inputValues.description
                ))
        } else {
            dispatch(productActions.createProduct(
                formState.inputValues.title, 
                formState.inputValues.imageUrl, 
                formState.inputValues.description, 
                +formState.inputValues.price))
        }
        props.navigation.goBack()
    }, [ dispatch, prodId, formState ])

    useEffect(() => {
        props.navigation.setParams({ submit: submitHandler })
    }, [submitHandler])

    const inputChangeHandler = (inputId, text) => {
        let isValid = false
        if (text.trim().length > 0) {
            isValid = true
        }
        dispatchFormState({ 
            type: 'FORM_UPDATE', 
            value: formState.inputValues[inputId],
            isValid: true,
            inputId: inputId
        })  
    }

    return (
        <ScrollView>
            <View style={styles.form}>
                <Input
                label="Title"
                errorText="Please enter a valid title"
                autoCapitalize="sentences" 
                returnKeyType="next"
                autoCorrect
                />
                <Input
                label="Image Url"
                errorText="Please enter a valid image URL"
                autoCapitalize="sentences" 
                returnKeyType="next"
                autoCorrect
                />
                {!editedProd && (
                    <Input
                    label="Price"
                    errorText="Please enter a valid price"
                    returnKeyType="next"
                    autoCorrect
                    keyboardType="decimal-pad"
                    />
                )}
                <Input
                label="Peoduct Description"
                errorText="Please enter a valid product description"
                autoCapitalize="sentences" 
                returnKeyType="next"
                autoCorrect
                numberOfLines={3}
                />
            </View>   
        </ScrollView>  
    )
}

EditProductScreen.navigationOptions = (navData) => {
    const submit = navData.navigation.getParam('submit')
    return {
        headerTitle: navData.navigation.getParam('id') ? 'Edit Product' : 'Add Product', 
        headerRight: () => (
            <Ionicons 
                name={Platform.OS === 'android' ? 'md-save' : 'ios-save'} 
                // headerTitle='save'
                // label='save'
                size={23}
                style={{marginRight: 15}}
                color={Platform.OS === 'android' ? 'white' : colors.primary}
                onPress={submit}
            />
        )
    }
}

const styles = StyleSheet.create({
    form: {
        margin: 20
    }
})

export default EditProductScreen

// look into Validate.js for more validations



