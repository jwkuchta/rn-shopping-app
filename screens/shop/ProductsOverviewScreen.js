import React from 'react'
import { View, Text, StyleSheet, FlatList, Image } from 'react-native'
import { useSelector } from 'react-redux'
import ProductItem from '../../components/shop/ProductItem'
import { useDispatch } from 'react-redux'
import * as cartActions from '../../store/actions/cart'

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
            // onAddToCart={(product) => addItemToCart(product.item)}
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

ProductsOverviewScreen.navigationOptions = {
    headerTitle: 'All Products'
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
})

export default ProductsOverviewScreen

// import React from 'react';
// import { FlatList, Text } from 'react-native';
// import { useSelector } from 'react-redux';

// const ProductsOverviewScreen = props => {
//   const products = useSelector(state => state.products.availableProducts);
//   return (
//     <FlatList
//       data={products}
//       keyExtractor={item => item.id}
//       renderItem={itemData => <Text>{itemData.item.title}</Text>}
//     />
//   );
// };

// ProductsOverviewScreen.navigationOptions = {
//   headerTitle: 'All Products'
// };

// export default ProductsOverviewScreen;