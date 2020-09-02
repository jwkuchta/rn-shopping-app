import React from 'react'
import { View, Text, StyleSheet, FlatList, Image } from 'react-native'
import { useSelector } from 'react-redux'
import ProductItem from '../../components/shop/ProductItem'

const ProductsOverviewScreen = props => {

    const products = useSelector(state => state.products.availableProducts)
    
    const renderProduct = product => {
        return (
            <ProductItem 
            image={product.item.imageUrl} 
            price={product.item.price} 
            title={product.item.price}
            onViewDetail={() => {}}
            onAddToCart={() => {}}
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