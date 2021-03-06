import React from 'react'
import { createStackNavigator } from 'react-navigation-stack'
import { createDrawerNavigator, DrawerItems } from 'react-navigation-drawer'
import { createSwitchNavigator, createAppContainer } from 'react-navigation'
// import { createTabsNavigator } from 'react-navigation-tabs'
import ProductsOverviewScreen from '../screens/shop/ProductsOverviewScreen'
import Colors from '../constants/Colors'
import { Platform, SafeAreaView, Button, View } from 'react-native'
import ProductDetailScreen from '../screens/shop/ProductDetailScreen'
import CartScreen from '../screens/shop/CartScreen'
import OrdersScreen from '../screens/shop/OrdersScreen'
import { Ionicons } from '@expo/vector-icons'
import UserProductsScreen from '../screens/user/UserProductScreen'
import EditProductScreen from '../screens/user/EditProductScreen'

import AuthScreen from '../screens/user/AuthScreen'
import StartupScreen from '../screens/StartupScreen'
import { useDispatch } from 'react-redux'
import { logout } from '../store/actions/auth'

const defaultNavOptions = {
    headerStyle: {
        backgroundColor: Platform.OS === 'android' ? Colors.primary : ''
    },
    headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primary,
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
    navigationOptions: {
        drawerIcon: drawerConfig => (
            <Ionicons 
            name={Platform.OS === 'android' ? 'md-cart' : 'ios-cart'}
            size={23}
            // color={drawerConfig.activeTintColor}
            color={drawerConfig.tintColor}
            />
        ) 
    },
    defaultNavigationOptions: defaultNavOptions
})

const OrdersNavigator = createStackNavigator({
    Orders: OrdersScreen
}, {
    navigationOptions: {
        drawerIcon: drawerConfig => (
            <Ionicons 
            name={Platform.OS === 'android' ? 'md-list' : 'ios-list'}
            size={23}
            // color={drawerConfig.activeTintColor}
            color={drawerConfig.tintColor}
            />
        ) 
    },
    defaultNavigationOptions: defaultNavOptions
})

const AdminNavigator = createStackNavigator({
    UserProducts: UserProductsScreen,
    EditProduct: EditProductScreen
}, {
    navigationOptions: {
        drawerIcon: drawerConfig => (
            <Ionicons 
            name={Platform.OS === 'android' ? 'md-list' : 'ios-list'}
            size={23}
            // color={drawerConfig.activeTintColor}
            color={drawerConfig.tintColor}
            />
        ) 
    },
    defaultNavigationOptions: defaultNavOptions
})

const ShopNavigator = createDrawerNavigator({
    Products: ProducstNavigator,
    Orders: OrdersNavigator,
    Admin: AdminNavigator
}, {
    contentOptions: {
        activeTintColor: Colors.primary
    },
    // allows you to add a custom button to the drawer
    // this is a react componrnt and we can use useDispatch to dispatch the logout action from it
    contentComponent: (props) => {
        const dispatch = useDispatch()
        return (
            <View style={{flex: 1, paddingTop: 20}}>
                <SafeAreaView forceInset={{top: 'always', horizontal: 'never'}}>
                    <DrawerItems {...props} />
                    <Button 
                    title="Logout" 
                    color={Colors.primary} 
                    onPress={() => {
                        dispatch(logout())
                        // we are now clearing the store and navigating away in ShopNavigator
                        // props.navigation.navigate('Auth')
                    }} 
                    />
                </SafeAreaView>
            </View>
        )
    }
})

const AuthNavigator = createStackNavigator({
    Auth: AuthScreen
    }, {
    defaultNavigationOptions: defaultNavOptions
    }
)

const MainNavigator = createSwitchNavigator({
    Startup: StartupScreen,
    Auth: AuthNavigator,
    Shop: ShopNavigator
})

export default createAppContainer(MainNavigator)

