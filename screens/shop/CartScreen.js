import React from 'react'
import { View, Text, StyleSheet, FlatList, Button } from 'react-native'
import { useSelector } from 'react-redux'
import colors from '../../constants/colors'
import CartItem from '../../components/shop/CartItem'

const CartScreen = props => {

    const cartTotal = useSelector(state => state.carts.total)
    const cartItems = useSelector(state => {
        const cartItemsArr = []
        for (let key in state.carts.items) {
            cartItemsArr.push({
                productId: key,
                productTitle: state.carts.items[key].productTitle,
                productPrice: state.carts.items[key].productPrice,
                quantity: state.carts.items[key].quantity,
                total: state.carts.items[key].total
            })
        }
        return cartItemsArr
    })

    return (
        <View style={styles.screen}>
            <View style={styles.summary}>
                <Text style={styles.summaryText}>
                    <Text style={styles.amount}>Total: ${cartTotal.toFixed(2)}</Text>
                </Text>
                <Button title='Order Now' disabled={cartItems.length === 0 ? true : false}/>
            </View>
            <View>
                <FlatList 
                data={cartItems}
                keyExtractor={(item) => item.productId}
                renderItem={itemData => {
                    return (
                        <CartItem 
                        quantity={itemData.item.quantity} 
                        total={itemData.item.total} 
                        title={itemData.item.productTitle}
                        onRemove={() => {}}
                        />
                    )
                }}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    screen: {
        // flex: 1,
        // alignItems: 'center',
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
        color: colors.primary
    }
})

export default CartScreen

