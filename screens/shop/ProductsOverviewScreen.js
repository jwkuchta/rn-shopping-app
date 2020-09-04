import React, { useEffect } from 'react'
import { View, Text, StyleSheet, FlatList, Image, Platform, Button } from 'react-native'
import { useSelector } from 'react-redux'
import ProductItem from '../../components/shop/ProductItem'
import { useDispatch } from 'react-redux'
import * as cartActions from '../../store/actions/cart'
// import { HeaderButtons, Item } from 'react-navigation-header-buttons'
// import HeaderButton from '../UI/HeaderButton'
import { Ionicons } from '@expo/vector-icons'
import colors from '../../constants/colors'
import * as productActions from '../../store/actions/products'

const ProductsOverviewScreen = props => {

    const products = useSelector(state => state.products.availableProducts)
    const dispatch = useDispatch()

    // dispatch will not change so the only time this will run is when the component is loaded
    useEffect(() => {
        dispatch(productActions.fetchProducts())
    }, [dispatch])

    const selectItemHandler = (id, title) => {
        props.navigation.navigate('ProductDetail', {
            productId: id, 
            productTitle: title
        })
    }

    const renderProduct = product => {
        return (
            <ProductItem 
            image={product.item.imageUrl} 
            price={product.item.price} 
            title={product.item.title}
            onSelect={() => selectItemHandler(product.item.id, product.item.title)}
            >
                <Button 
                style={styles.button}
                title='view details' 
                onPress={() => selectItemHandler(product.item.id, product.item.title)} 
                color={colors.primary}
                />
                <Button 
                style={styles.button}
                title='add to cart' 
                onPress={() => dispatch(cartActions.addToCart(product.item))} 
                color={colors.primary} 
                />
            </ProductItem>
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
        headerLeft: () => (
            <Ionicons 
                name={Platform.OS === 'android' ? 'md-menu' : 'ios-menu'} 
                size={23}
                style={{marginLeft: 15}}
                color={Platform.OS === 'android' ? 'white' : colors.primary}
                onPress={() => navData.navigation.toggleDrawer()}
            />
        ),
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
    },
    button: {
        marginBottom: 50
    }
})

export default ProductsOverviewScreen
