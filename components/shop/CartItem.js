import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Platform  } from 'react-native'
import { Ionicons } from '@expo/vector-icons'

const CartItem = props => {

    console.log(props)

    // console.log(props)
    return (
        <View style={styles.cartItem}>
            <Text style={styles.itemData}>
            <Text style={styles.quantity}>{props.quantity}  </Text><Text style={styles.mainText}>{props.title}</Text>
            </Text>
            <View>
                <Text style={styles.mainText}>${props.total.toFixed(2)}</Text>
                {props.deletable && // this comp is used in two spots, we don't want this button to show on the OrdersScreen
                <TouchableOpacity onPress={props.onRemove} style={styles.deleteButton}>
                    <Ionicons 
                    name={Platform.OS === 'android' ? 'md-trash' : 'ios-trash'}
                    size={23}
                    color='red'
                    />
                </TouchableOpacity>
                }
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    cartItem: {
        padding: 10,
        flexDirection: 'row',
        backgroundColor: 'white',
        justifyContent: 'space-between',
        marginHorizontal: 20
    },
    itrmData: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    quantity: {
        fontFamily: 'open-sans',
        color: '#888',
        fontSize: 16
    },
    mainText: {
        fontFamily: 'open-sans-bold',
        fontSize: 16,
        color: 'black'
    }
})

export default CartItem