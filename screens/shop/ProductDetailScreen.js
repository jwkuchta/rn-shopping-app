import React from 'react'
import { View, Text, StyleSheet, ScrollView, Button, Image } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import * as cartActions from '../../store/actions/cart'

const ProductDetailScreen = props => {

    const productId = props.navigation.getParam('productId')
    const availableProducts = useSelector(state => state.products.availableProducts)
    const selectedProduct = availableProducts.find(product => product.id === productId)

    const dispatch = useDispatch()

    return (
        <ScrollView>
            <Image source={{uri: selectedProduct.imageUrl}} style={styles.image} />
            <View style={styles.actions}>
                <Button title='Add to Cart' onPress={() => dispatch(cartActions.addToCart(selectedProduct))} />
            </View>
            <Text style={styles.price} >${selectedProduct.price}</Text>
            <Text style={styles.description} >{selectedProduct.description}</Text>
        </ScrollView>
    )
}

ProductDetailScreen.navigationOptions = navData => {
    
    return {
        headerTitle: navData.navigation.getParam('productTitle')
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
        marginVertical: 20,
        fontFamily: 'open-sans'
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