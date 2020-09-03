import React from 'react'
import { View, Text, StyleSheet, FlatList, Image, Platform, Button } from 'react-native'
import { useSelector } from 'react-redux'
import ProductItem from '../../components/shop/ProductItem'
import { useDispatch } from 'react-redux'
import * as cartActions from '../../store/actions/cart'
// import { HeaderButtons, Item } from 'react-navigation-header-buttons'
// import HeaderButton from '../UI/HeaderButton'
import { Ionicons } from '@expo/vector-icons'
import colors from '../../constants/colors'

const EditProductScreen = props => {
    return (
        <View>
            <Text>Edit Product Screen</Text>
        </View>
    )
}

const styles = StyleSheet.create({

})

export default EditProductScreen