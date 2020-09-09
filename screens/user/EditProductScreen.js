import React, { useEffect, useCallback, useReducer, useState } from 'react'
import { View, StyleSheet, ScrollView, Platform, Alert, ActivityIndicator } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import { Ionicons } from '@expo/vector-icons'
import Colors from '../../constants/Colors'
import * as productActions from '../../store/actions/products'
import Input from '../../components/UI/Input'

const FORM_UPDATE = 'FORM_UPDATE'

// build it outside the component to avoid unnecessary rebuilding 
const formReducer = (state, action) => {
    if (action.type === FORM_UPDATE) {
        const updatedValues = {
            ...state.inputValues, // from 27-32
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

    const [ isLoading, setIsLoading ] = useState(false)
    const [ error, setError ] = useState(null)

    const prodId = props.navigation.getParam('id')
    const editedProd = useSelector(state => state.products.userProducts.find(prod => prod.id === prodId))

    const dispatch = useDispatch()

    // useReducer helps with state management when you have a lot of local state to manage and replaces useState()
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

    useEffect(() => {
        if (error) {
            Alert.alert('error in edit product screen', error, [{text: 'okay'}])
        }
    }, [error])

    const submitHandler = useCallback(async () => {
        if (!formState.formIsValid) {
            Alert.alert('Invalid title', 'Please submit a valid title', [{ text: 'Ok'}])
            return
        }
        setIsLoading(true)
        setError(null)
        try {
            if (editedProd) {
                await dispatch(productActions.updateProduct(
                    prodId, 
                    formState.inputValues.title, 
                    formState.inputValues.imageUrl, 
                    formState.inputValues.description
                    ))
            } else {
                await dispatch(productActions.createProduct(
                    formState.inputValues.title, 
                    formState.inputValues.imageUrl, 
                    formState.inputValues.description, 
                    +formState.inputValues.price))
            }
            props.navigation.goBack()
        } catch (err) {
            setError(err.message)
            // why can't error be set here ???
            // Alert.alert('ERROR IN THE EDIT PRODUCT SCREEN', error, [{text: 'okay'}])
            // setError(null)
        }   
        setIsLoading(false)
    }, [ dispatch, prodId, formState ])

    useEffect(() => {
        props.navigation.setParams({ submit: submitHandler })
    }, [submitHandler])

    const inputChangeHandler = useCallback(
        (inputIdentifier, inputValue, inputValidity) => {
            dispatchFormState({
                type: FORM_UPDATE,
                value: inputValue,
                isValid: inputValidity,
                input: inputIdentifier
            })
        },
        [dispatchFormState]
    )

    if (isLoading) {
        return (
            <View style={styles.centered}>
                <ActivityIndicator size='large' color={Colors.primary} />
            </View>
        )
    }

    return (
        <ScrollView>
            <View style={styles.form}>
                <Input
                    id='title'
                    label="Title"
                    errorText="Please enter a valid title"
                    autoCapitalize="sentences" 
                    returnKeyType="next"
                    autoCorrect
                    returnKeyType="next"
                    onInputChange={inputChangeHandler}
                    initialValue={editedProd ? editedProd.title : ''}
                    initiallyValid={!!editedProd}
                    required
                />
                <Input
                    id='imageUrl'
                    label="Image Url"
                    errorText="Please enter a valid image URL"
                    autoCapitalize="sentences" 
                    returnKeyType="next"
                    onInputChange={inputChangeHandler}
                    initialValue={editedProd ? editedProd.imageUrl : ''}
                    initiallyValid={!!editedProd}
                    required
                />
                {!editedProd && (
                    <Input
                        id='price'
                        label="Price"
                        errorText="Please enter a valid price"
                        returnKeyType="next"
                        keyboardType="decimal-pad"
                        onInputChange={inputChangeHandler}
                        required
                        min={0.1}
                    />
                )}
                <Input
                    id='description'
                    label="Peoduct Description"
                    errorText="Please enter a valid product description"
                    autoCapitalize="sentences" 
                    autoCorrect
                    multiline
                    numberOfLines={3}
                    onInputChange={inputChangeHandler}
                    initialValue={editedProd ? editedProd.description : ''}
                    initiallyValid={!!editedProd}
                    required
                    minLength={10}
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
                name={Platform.OS === 'android' ? 'md-checkmark' : 'ios-save'} 
                size={23}
                style={{marginRight: 15}}
                color={Platform.OS === 'android' ? 'white' : Colors.primary}
                onPress={submit}
            />
        )
    }
}

const styles = StyleSheet.create({
    form: {
        margin: 20
    },
    centered: {
        flex: 1,
        justifyContent: 'center', 
        alignItems: 'center'
    }
})

export default EditProductScreen

// look into Validate.js for more validations



