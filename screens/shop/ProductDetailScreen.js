import React from 'react'
import { View, Text, StyleSheet, ScrollView, Button, Image } from 'react-native'
import { useSelector } from 'react-redux'

const ProductDetailScreen = props => {

    const productId = props.navigation.getParam('productId')
    const availableProducts = useSelector(state => state.products.availableProducts)
    const selectedProduct = availableProducts.find(product => product.id === productId)

    return (
        <View style={styles.screen}>
            <Text>{selectedProduct.description}</Text>
            <Text>{selectedProduct.title}</Text>
        </View>
    )
}

ProductDetailScreen.navigationOptions = navData => {
    console.log(navData.navigation.getParam('productTitle'))
    
    return {
        headerTitle: navData.navigation.getParam('productTitle')
        // headerLeft: () => {
        //     return (
        //         <Button title='I am a button'></Button>
        //     )
        // }
    }
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
})

export default ProductDetailScreen