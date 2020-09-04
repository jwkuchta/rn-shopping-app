import React, { useState, useEffect, useCallback } from 'react'
import { View, Text, StyleSheet, TextInput, ScrollView, Platform } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import { Ionicons } from '@expo/vector-icons'
import colors from '../../constants/colors'
import * as productActions from '../../store/actions/products'

const EditProductScreen = props => {

    // console.log(props.navigation.getParam('id'))

    const prodId = props.navigation.getParam('id')
    const editedProd = useSelector(state => state.products.userProducts.find(prod => prod.id === prodId))

    console.log('editedProd', editedProd)

    const [ title, setTitle ] = useState(editedProd ? editedProd.title : '')
    const [ imageUrl, setImageUrl ] = useState(editedProd ? editedProd.imageUrl : '')
    const [ price, setPrice ] = useState('') // price should not be edited, unless new product
    const [ description, setDescription ] = useState(editedProd ? editedProd.description : '')

    const dispatch = useDispatch()

    const submitHandler = useCallback(() => {
        if (editedProd) {
            dispatch(productActions.updatedProduct(prodId, title, imageUrl, description))
        } else {
            dispatch(productActions.createProduct(title, imageUrl, description, +price))
        }
        props.navigation.goBack()
    }, [dispatch, prodId, title, description, imageUrl, price])

    useEffect(() => {
        props.navigation.setParams({ submit: submitHandler })
    }, [submitHandler])

    return (
        <ScrollView>
            <View style={styles.form}>
                <View style={styles.formControl}>
                    <Text style={styles.label}>Title</Text>
                    <TextInput 
                    style={styles.input} 
                    value={title}
                    onChangeText={input => setTitle(input)} 
                    />
                </View>
                <View style={styles.formControl}>
                    <Text style={styles.label}>Image URL</Text>
                    <TextInput 
                    style={styles.input} 
                    value={imageUrl} 
                    onChangeText={input => setImageUrl(input)}
                    />
                </View>
                {!editedProd && (
                    <View style={styles.formControl}>
                    <Text style={styles.label}>Price</Text>
                    <TextInput 
                    style={styles.input} 
                    value={price} 
                    onChangeText={input => setPrice(input)}
                    />
                </View>
                )}
                <View style={styles.formControl}>
                    <Text style={styles.label}>Description</Text>
                    <TextInput 
                    style={styles.input} 
                    value={description} 
                    onChangeText={input => setDescription(input)}
                    />
                </View>
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
    },
    formControl: {
        width: '100%'
    },
    label: {
        fontFamily: 'open-sans-bold',
        marginVertical: 8
    },
    input: {
        paddingHorizontal: 2,
        paddingVertical: 5,
        borderBottomColor: '#ccc',
        borderBottomWidth: 1
    }
})

export default EditProductScreen

