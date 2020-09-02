import React from 'react'
import { View, Text, StyleSheet, FlatList, Button } from 'react-native'
import { useSelector } from 'react-redux'
import { colors } from '../../constants/colors'

const CartScreen = props => {

    const cartTotal = useSelector(state => state.carts.total)

    return (
        <View style={styles.screen}>
            <View style={styles.summary}>
                <Text style={styles.summaryText}>
                    <Text style={styles.amount}>Total: ${cartTotal}</Text>
                </Text>
                <Button title='Order Now'/>
            </View>
            <View>
                <Text>CART ITEMS</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        margin: 20
    },
    summary: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 20,
        padding: 10,
        shadowColor: 'black',
        shadowOpacity: 0.26,
        shadowOffset: {width: 0, height: 2},
        shadowRadius: 8,
        elevation: 5,
        borderRadius: 10,
        backgroundColor: 'white'
    },
    summaryText: {
        fontFamily: 'open-sans-bold',
        fontSize: 18
    },
    amount: {
        color: 'black'
    }
})

export default CartScreen