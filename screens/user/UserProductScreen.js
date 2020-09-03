import React from 'react'
import { FlatList, Platform, Button } from 'react-native'
import ProductItem from '../../components/shop/ProductItem'
import { useSelector, useDispatch } from 'react-redux'
import { Ionicons } from '@expo/vector-icons'
import colors from '../../constants/colors'
import { deleteProduct } from '../../store/actions/products'


const UserProductsScreen = props => {

    const userProducts = useSelector(state => state.products.availableProducts)
    const dispatch = useDispatch()

    const productHandler = (id) => {
        props.navigation.navigate('EditProduct', {id: id})
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
                color={colors.primary}
                />
                <Button 
                title='Delete' 
                onPress={() => dispatch(deleteProduct(itemData.item.id))} 
                color={colors.primary} 
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
                color={Platform.OS === 'android' ? 'white' : colors.primary}
                onPress={() => navData.navigation.toggleDrawer()}
            />
        ),
        headerRight: () => (
            <Ionicons 
                name={Platform.OS === 'android' ? 'md-create' : 'ios-create'} 
                size={23}
                style={{marginRight: 15}}
                color={Platform.OS === 'android' ? 'white' : colors.primary}
                onPress={() => navData.navigation.navigate('EditProduct')}
            />
        )
    }
    
}

export default UserProductsScreen