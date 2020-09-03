import React from 'react'
import { Text, View, StyleSheet, FlatList, Platform } from 'react-native'
import { useSelector } from 'react-redux'
import { Ionicons } from '@expo/vector-icons'
import OrderItem from '../../components/shop/OrderItem'

const OrdersScreen = props => {

    const orders = useSelector(state => state.orders.orders)

    return (
        <FlatList 
        data={orders}
        keyExtractor={item => item.id}
        deletable={false}
        renderItem={itemData => (
            <OrderItem  
            total={itemData.item.total} 
            date={itemData.item.readableDate}
            title={itemData.item.title}
            items={itemData.item.items}
            />
        )}
        />
    ) 
}

OrdersScreen.navigationOptions = (navData) => {
    return {
        headerTitle: 'Your Orders',
        headerLeft: () => (
            <Ionicons 
                name={Platform.OS === 'android' ? 'md-menu' : 'ios-menu'} 
                size={23}
                style={{marginLeft: 15}}
                color={Platform.OS === 'android' ? 'white' : colors.primary}
                onPress={() => navData.navigation.toggleDrawer()}
            />
        ),
    }
    
}

export default OrdersScreen

const style = StyleSheet.create({

})