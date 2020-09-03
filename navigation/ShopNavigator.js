import React from 'react'
import { createStackNavigator } from 'react-navigation-stack'
import { createDrawerNavigator } from 'react-navigation-drawer'
import { createTabsNavigator } from 'react-navigation-tabs'
import { createAppContainer } from 'react-navigation'
import ProductsOverviewScreen from '../screens/shop/ProductsOverviewScreen'
import colors from '../constants/colors'
import { Platform } from 'react-native'
import ProductDetailScreen from '../screens/shop/ProductDetailScreen'
import CartScreen from '../screens/shop/CartScreen'
import OrdersScreen from '../screens/shop/OrdersScreen'

const defaultNavOptions = {
    headerStyle: {
        backgroundColor: Platform.OS === 'android' ? colors.primary : ''
    },
    headerTintColor: Platform.OS === 'android' ? 'white' : colors.primary,
    headerTitleStyle: {
        fontFamily: 'open-sans-bold'
    },
    headerBackTitleStyle: {
        fontFamily: 'open-sans'
    }
}

const ProducstNavigator = createStackNavigator({
    ProductsOverview: ProductsOverviewScreen,
    ProductDetail: ProductDetailScreen,
    Cart: CartScreen
}, {
    defaultNavigationOptions: defaultNavOptions
})

const OrdersNavigator = createStackNavigator({
    Orders: OrdersScreen
}, {
    defaultNavigationOptions: defaultNavOptions
})

const ShopNavigator = createDrawerNavigator({
    Products: ProducstNavigator,
    Orders: OrdersNavigator
}, {
    contentOptions: {
        activeTintColor: colors.primary
    }
})

export default createAppContainer(ShopNavigator)