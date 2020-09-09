import React from 'react'
import { FlatList, Platform, Button, Alert, View, Text, StyleSheet } from 'react-native'
import ProductItem from '../../components/shop/ProductItem'
import { useSelector, useDispatch } from 'react-redux'
import { Ionicons } from '@expo/vector-icons'
import Colors from '../../constants/Colors'
import { deleteProduct } from '../../store/actions/products'


const UserProductsScreen = props => {

    const userProducts = useSelector(state => state.products.availableProducts)
    const dispatch = useDispatch()

    const productHandler = (id) => {
        props.navigation.navigate('EditProduct', {id: id})
    }

    const deleteHandler = (id) => {
        Alert.alert(
            'Are you sure?', "Do you really want to delete this item?",
            [
                { text: 'No', style: 'default'},
                { text: 'Yes', style: 'destructive', onPress: () => dispatch(deleteProduct(id))}
            ]
        )
    }

    if (userProducts.length === 0) {
        return (
            <View style={styles.centered}>
                <Text>No products to show yet</Text>
            </View>
        )
    }
    return (
        <FlatList 
        data={userProducts}
        keyExtractor={product => product.id}
        renderItem={itemData => (
            <ProductItem 
            image={itemData.item.imageUrl}
            title={itemData.item.title}
            price={itemData.item.price}
            onSelect={() => {}}
            >
                <Button 
                title='Edit' 
                onPress={() => productHandler(itemData.item.id)} 
                color={Colors.primary}
                />
                <Button 
                title='Delete' 
                onPress={() => deleteHandler(itemData.item.id)} 
                color={Colors.primary} 
                />
            </ProductItem>
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
                color={Platform.OS === 'android' ? 'white' : Colors.primary}
                onPress={() => navData.navigation.toggleDrawer()}
            />
        ),
        headerRight: () => (
            <Ionicons 
                name={Platform.OS === 'android' ? 'md-create' : 'ios-create'} 
                size={23}
                style={{marginRight: 15}}
                color={Platform.OS === 'android' ? 'white' : Colors.primary}
                onPress={() => navData.navigation.navigate('EditProduct')}
            />
        )
    }
    
}

const styles = StyleSheet.create({
    centered: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
})

export default UserProductsScreen