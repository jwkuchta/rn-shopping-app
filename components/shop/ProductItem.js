import React from 'react'
import { View, Text, StyleSheet, Image, Button } from 'react-native'

const ProductItem = props => {
    
    return (
        <View style={styles.product}>
            <View style={styles.imageContainer}>
                <Image source={{uri: props.image}} style={styles.image} />
            </View>
            
            <View style={styles.detail}>
            <Text style={styles.title}>{props.title}</Text>
            <Text style={styles.price}>{props.price.toFixed(2)}</Text>
            </View>
            <View style={styles.actions}>
                <Button title='view details' onPress={props.onViewDetail} />
                <Button title='add to cart' onPress={props.onAddToCart} />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    buttons: {
        flexDirection: 'row'
    },
    product: {
        shadowColor: 'black',
        shadowOpacity: 0.26,
        shadowOffset: {width: 0, height: 2},
        shadowRadius: 8,
        elevation: 5,
        borderRadius: 10,
        backgroundColor: 'white',
        height: 300,
        margin: 20
    },
    image: {
        width: '100%',
        height: '60%',

    },
    title: {
        fontSize: 18,
        marginVertical: 4
    },
    price: {
        fontSize: 14,
        color: '#888'
    },
    actions: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: '25%',
        paddingHorizontal: 20
    },
    detail: {
        alignItems: 'center',
        height: '15%',
        padding: 10
    },
    imageContainer: {
        width: '100%',
        height: '60%',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        overflow: 'hidden'
    }
})

export default ProductItem