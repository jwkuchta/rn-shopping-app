import React from 'react'
import { View, Text, StyleSheet, FlatList, Image, Platform } from 'react-native'
import { useSelector } from 'react-redux'
import ProductItem from '../../components/shop/ProductItem'
import { useDispatch } from 'react-redux'
import * as cartActions from '../../store/actions/cart'
// import { HeaderButtons, Item } from 'react-navigation-header-buttons'
// import HeaderButton from '../UI/HeaderButton'
import { Ionicons } from '@expo/vector-icons'
import colors from '../../constants/colors'

const ProductsOverviewScreen = props => {

    const products = useSelector(state => state.products.availableProducts)

    const dispatch = useDispatch()

    const addItemToCart = item => {
        dispatch(cartActions.addToCart(item))
    }
    
    const renderProduct = product => {
        return (
            <ProductItem 
            image={product.item.imageUrl} 
            price={product.item.price} 
            title={product.item.price}
            onViewDetail={() => {
                props.navigation.navigate('ProductDetail', {
                    productId: product.item.id, 
                    productTitle: product.item.title
                })
            }}
            onAddToCart={() => dispatch(cartActions.addToCart(product.item))}
            />
        )
    }
    return (
        <View style={styles.screen}>
            <FlatList 
            data={products}
            keyExtractor={(item) => item.id}
            renderItem={renderProduct}
            // renderItem={itemData => <Text>{itemData.item.title}</Text>}
            style={{width: '100%'}}
            />
        </View>
    )
}

ProductsOverviewScreen.navigationOptions = (navData) => {
    return {
        headerTitle: 'All Products', 
        headerRight: () => (
            <Ionicons 
                name={Platform.OS === 'android' ? 'md-cart' : 'ios-cart'} 
                size={23}
                style={{marginRight: 15}}
                color={Platform.OS === 'android' ? 'white' : colors.primary}
                onPress={() => navData.navigation.navigate('Cart')}
            />
        )
    }
    
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
})

export default ProductsOverviewScreen
