import React, { useState } from 'react'
import { View, Text, StyleSheet, TextInput, ScrollView, Platform } from 'react-native'
import { useSelector } from 'react-redux'
import { Ionicons } from '@expo/vector-icons'
import colors from '../../constants/colors'

const EditProductScreen = props => {

    const prodId = props.navigation.getParam('id')
    const editedProd = useSelector(state => state.products.userProducts.find(prod => prod.id === prodId))

    const [ title, setTitle ] = useState(editedProd ? editedProd.title : '')
    const [ imageUrl, setImageUrl ] = useState(editedProd ? editedProd.imageUrl : '')
    const [ price, setPrice ] = useState('') // price should not be edited, unless new product
    const [ description, setDescription ] = useState(editedProd ? editedProd.description : '')

    return (
        <ScrollView>
            <View style={styles.form}>
                <View style={styles.formControl}>
                    <Text style={styles.label}>Title</Text>
                    <TextInput 
                    style={styles.input} 
                    value={title}
                    onChange={input => setTitle(input)} 
                    />
                </View>
                <View style={styles.formControl}>
                    <Text style={styles.label}>Image URL</Text>
                    <TextInput 
                    style={styles.input} 
                    value={imageUrl} 
                    onChange={input => setImageUrl(input)}
                    />
                </View>
                {!editedProd && (
                    <View style={styles.formControl}>
                    <Text style={styles.label}>Price</Text>
                    <TextInput 
                    style={styles.input} 
                    value={price} 
                    onChange={input => setPrice(input)}
                    />
                </View>
                )}
                <View style={styles.formControl}>
                    <Text style={styles.label}>Description</Text>
                    <TextInput 
                    style={styles.input} 
                    value={description} 
                    onChange={input => setDescription(input)}
                    />
                </View>
            </View>   
        </ScrollView>  
    )
}

EditProductScreen.navigationOptions = (navData) => {
    return {
        headerTitle: navData.navigation.getParam('id') ? 'Edit Product' : 'Add Product', 
        // headerLeft: () => (
        //     <Ionicons 
        //         name={Platform.OS === 'android' ? 'md-menu' : 'ios-menu'} 
        //         size={23}
        //         style={{marginLeft: 15}}
        //         color={Platform.OS === 'android' ? 'white' : colors.primary}
        //         onPress={() => navData.navigation.toggleDrawer()}
        //     />
        // ),
        headerRight: () => (
            <Ionicons 
                name={Platform.OS === 'android' ? 'md-save' : 'ios-save'} 
                // headerTitle='save'
                // label='save'
                size={23}
                style={{marginRight: 15}}
                color={Platform.OS === 'android' ? 'white' : colors.primary}
                onPress={() => {}}
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