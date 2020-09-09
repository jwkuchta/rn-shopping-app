import React, { useState } from 'react'
import { View, Text, StyleSheet, FlatList, Button, ActivityIndicator, ColorPropType } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import Colors from '../../constants/Colors'
import CartItem from '../../components/shop/CartItem'
import * as cartActions from '../../store/actions/cart'
import * as orderActions from '../../store/actions/orders'
import Card from '../../components/UI/Card'

const CartScreen = props => {

    const dispatch = useDispatch()

    const [ isLoading, setIsLoading ] = useState(false)

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
        return cartItemsArr.sort((a, b) => a.productId - b.productId)
    })

    const addOrderHandler = async () => {
        setIsLoading(true)
        await dispatch(orderActions.addOrder(cartItems, cartTotal))
        setIsLoading(false)
    }

    return (
        <View style={styles.screen}>
            <Card style={styles.summary}>
                <Text style={styles.summaryText}>
                    <Text style={styles.amount}>Total: ${Math.round(cartTotal.toFixed(2) * 100) / 100}</Text>
                </Text>
                {isLoading ? <ActivityIndicator size='small' color={Colors.primary} /> : 
                <Button 
                title='Order Now' 
                disabled={cartItems.length === 0 ? true : false}
                onPress={addOrderHandler}
                />
            }
            </Card>
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
                        deletable={true}
                        onRemove={() => {
                            dispatch(cartActions.removeFromCart(itemData.item.productId))
                        }}
                        />
                    )
                }}
                />
            </View>
        </View>
    )
}

CartScreen.navigationOptions = {
    headerTitle: 'Your Cart'
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
        padding: 10
    },
    summaryText: {
        fontFamily: 'open-sans-bold',
        fontSize: 18
    },
    amount: {
        color: Colors.primary
    }
})

export default CartScreen

