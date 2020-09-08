import React, { useEffect, useState, useCallback } from 'react'
import { View, Text, StyleSheet, FlatList, Image, Platform, Button, ActivityIndicator } from 'react-native'
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
    console.log('PRODUCTSSSSSSSSSSS: ', products)
    const dispatch = useDispatch()

    const [ fetching, setFetching ] = useState(false)
    const [ refreshing, setRefreshing ] = useState(false)
    const [ fetchError, setFetchError ] = useState(null)

    const fetchProducts = useCallback(async () => {
        setRefreshing(true)
        try {
            await setTimeout(() => {
                dispatch(productActions.fetchProducts()).then(setFetching(false))
            }, 2000)
        } catch (error) {
            setFetchError(error.message)
        }
        setRefreshing(false)
    }, [ dispatch, setFetching, setFetchError ]) 

    // dispatch will not change so the only time this will run is when the component is loaded
    // this is to fetch products initially
    useEffect(() => {
        setFetching(true)
        fetchProducts().then(() => setFetching(false))
    }, [dispatch, fetchProducts])

    // after the initial render
    useEffect(() => {
        const willFocusSub = props.navigation.addListener('willFocus', fetchProducts)

        // cleanup function
        return () => {
            willFocusSub.remove()
        }
    }, [fetchProducts])

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

    if (products.length === 0) {
        return (
            <View style={styles.centered}>
                <Text>No products yet</Text>
            </View>
        )
    }

    if (fetching) {
        return  (
        <View style={styles.centered}>
            <ActivityIndicator size='large' color={colors.primary} />
        </View>)
    }

    if (!fetching && products.length === 0) {
        return (
            <View style={styles.centered}>
                <Text>No items found</Text>
                <Button title='Try Again' onPress={fetchProducts} />
            </View>
        )
    }

    if (fetchError) {
        return (
            <View style={styles.centered}>
                <Text>There was an error: {fetchError}</Text>
                <Button title='Try Again' onPress={fetchProducts} />
            </View>
        )
    }

    return (
        <FlatList 
            onRefresh={fetchProducts} // products get fetched again when you pull down the screen
            refreshing={refreshing}
            data={products}
            keyExtractor={(item) => item.id}
            renderItem={renderProduct}
            // renderItem={itemData => <Text>{itemData.item.title}</Text>}
            style={{width: '100%'}}
        />    
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
    centered: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    button: {
        marginBottom: 50
    }
})

export default ProductsOverviewScreen
