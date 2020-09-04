import React from 'react'
import { View, Text, StyleSheet, Image, TouchableOpacity, TouchableNativeFeedback, Platform } from 'react-native'
import Card from '../UI/Card'

const ProductItem = props => {

    let Touchable = Platform.OS === 'android' ? TouchableNativeFeedback : TouchableOpacity
    
    return (
        <Card style={styles.product}>
            <Touchable onPress={props.onSelect} useForeground>
                <View style={styles.product}>
                    <View style={styles.imageContainer}>
                        <Image source={{uri: props.image}} style={styles.image} />
                    </View>
                    
                    <View style={styles.detail}>
                    <Text style={styles.title}>{props.title}</Text>
                    <Text style={styles.price}>{props.price.toFixed(2)}</Text>
                    </View>
                    <View style={styles.actions}>
                        {props.children}
                    </View>
                </View>
            </Touchable>
        </Card>
        
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
        height: 300,
        margin: 20
    },
    image: {
        width: '100%',
        height: '60%',

    },
    title: {
        fontSize: 18,
        marginVertical: 2,
        fontFamily: 'open-sans-bold'
    },
    price: {
        fontSize: 14,
        color: '#888',
        fontFamily: 'open-sans'
    },
    actions: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: '23%',
        paddingHorizontal: 20
    },
    detail: {
        alignItems: 'center',
        height: '17%',
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