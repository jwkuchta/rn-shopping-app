import React, { useEffect, useState } from 'react'
import { Text, View, StyleSheet, FlatList, Platform , ActivityIndicator} from 'react-native'
import { useSelector } from 'react-redux'
import { Ionicons } from '@expo/vector-icons'
import colors from '../../constants/colors'
import OrderItem from '../../components/shop/OrderItem'
import { useDispatch } from 'react-redux'
import { fetchOrders } from '../../store/actions/orders'

const OrdersScreen = props => {

    const [ isLoading, setIsLoading ] = useState()

    const orders = useSelector(state => state.orders.orders)
    console.log('ORDERS IN THE ORDERS SCREEN: ', orders)
    const dispatch = useDispatch()

    useEffect(() => {
        setIsLoading(true)
        dispatch(fetchOrders()).then(() => setIsLoading(false))
    }, [dispatch])

    if (isLoading) {
        return (
            <View style={styles.centered}>
                <ActivityIndicator size='large' color={colors.primary} />
            </View>
        )
    }

    if (orders.length === 0) {
        return (
            <View style={styles.centered}>
                <Text>No orders to show yet. Order something!</Text>
            </View>
        )
    }

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
        )
    } 
}

export default OrdersScreen

const styles = StyleSheet.create({
    centered: {
        flex: 1,
        justifyContent: 'center', 
        alignItems: 'center'
    }
})

