import React from 'react'
import { createStackNavigator } from 'react-navigation-stack'
// import { createDrawerNavigator } from 'react-navigation-drawer'
// import { createTabsNavigator } from 'react-navigation-tabs'
import { createAppContainer } from 'react-navigation'
import ProductsOverviewScreen from '../screens/shop/ProductsOverviewScreen'
import colors from '../constants/colors'
import { Platform } from 'react-native'

const ProducstNavigator = createStackNavigator({
    ProductsOverview: ProductsOverviewScreen
}, {
    defaultNavigationOptions: {
        headerStyle: {
            backgroundColor: Platform.OS === 'android' ? colors.primary : ''
        },
        headerTintColor: Platform.OS === 'android' ? 'white' : colors.primary
    }
})

export default createAppContainer(ProducstNavigator)