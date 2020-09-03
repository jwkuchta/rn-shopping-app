import React from 'react'
import { View, FlatList, StyleSheet, Text, Platform } from 'react-native'
import ProductItem from '../../components/shop/ProductItem'
import { useSelector } from 'react-redux'
import { Ionicons } from '@expo/vector-icons'

const UserProductsScreen = props => {

    const userProducts = useSelector(state => state.products.availableProducts)
    return (
        <FlatList 
        data={userProducts}
        keyExtractor={product => product.id}
        renderItem={itemData => (
            <ProductItem 
            image={itemData.item.imageUrl}
            title={itemData.item.title}
            price={itemData.item.price}
            onViewDetail={() => {}}
            onAddToCart={() => {}}
            />
        )}
        />
    )
}

UserProductsScreen.navigationOptions = (navData) => {
    return {
        headerTitle: 'Your Products', 
        headerLeft: () => (
            <Ionicons 
                name={Platform.OS === 'android' ? 'md-menu' : 'ios-menu'} 
                size={23}
                style={{marginLeft: 15}}
                color={Platform.OS === 'android' ? 'white' : colors.primary}
                onPress={() => navData.navigation.toggleDrawer()}
            />
        ),
        // headerRight: () => (
        //     <Ionicons 
        //         name={Platform.OS === 'android' ? 'md-cart' : 'ios-cart'} 
        //         size={23}
        //         style={{marginRight: 15}}
        //         color={Platform.OS === 'android' ? 'white' : colors.primary}
        //         onPress={() => navData.navigation.navigate('Cart')}
        //     />
        // )
    }
    
}

export default UserProductsScreen