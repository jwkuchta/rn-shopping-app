import React from 'react'
import { View, Text, StyleSheet, ScrollView, Button, Image } from 'react-native'
import { useSelector } from 'react-redux'

const ProductDetailScreen = props => {

    const productId = props.navigation.getParam('productId')
    const availableProducts = useSelector(state => state.products.availableProducts)
    const selectedProduct = availableProducts.find(product => product.id === productId)

    return (
        <ScrollView>
            <Image source={{uri: selectedProduct.imageUrl}} style={styles.image} />
            <View style={styles.actions}>
                <Button title='Add to Cart' onPress={() => {}} />
            </View>
            <Text style={styles.price} >${selectedProduct.price.toFixed(2)}</Text>
            <Text style={styles.description} >{selectedProduct.description}</Text>
        </ScrollView>
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
    },
    image: {
        width: '100%',
        height: 300,

    },
    price: {
        fontSize: 20,
        color: '#888',
        textAlign: 'center',
        marginVertical: 20
    },
    description: {
        fontSize: 16,
        textAlign: 'center',
        marginHorizontal: 20
    },
    actions: {
        marginVertical: 10,
        alignItems: 'center'
    }
})

export default ProductDetailScreen