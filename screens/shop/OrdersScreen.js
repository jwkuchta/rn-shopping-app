import React from 'react'
import { Text, View, StyleSheet, FlatList, Platform } from 'react-native'
import { useSelector } from 'react-redux'
import { Ionicons } from '@expo/vector-icons'

const OrdersScreen = props => {
    const orders = useSelector(state => state.orders.orders)

    return (
        <FlatList 
        data={orders}
        keyExtractor={item => item.id}
        renderItem={itemData => <Text>{itemData.item.total}</Text>}
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