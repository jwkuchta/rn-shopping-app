import React from 'react'
import { HeaderButtons } from 'react-navigation-header-buttons'
import { Ionicons } from '@expo/vector-icons'
import Colors from '../../constants/Colors'
import { Platform } from 'react-native'

const CustomHeaderButton = props => {
    return (
        <HeaderButtons 
        {...props}  
        IconComponent={Ionicons}
        iconSize={23}
        color={Platform.OS === 'android' ? 'white' : Colors.primary}
        />
    ) 
}

export default CustomHeaderButton