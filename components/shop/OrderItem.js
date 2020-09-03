import React, { useState } from 'react'
import { View, Text, StyleSheet, Button } from 'react-native'
import CartItem from '../shop/CartItem'
import colors from '../../constants/colors'

const OrderItem = props => {

    const [ showDetails, setShowDetails ] = useState(false)
    
    return (
        <View style={styles.orderItem}>
            <View style={styles.summary}>
                <Text style={styles.total}>{props.total.toFixed(2)}</Text>
                <Text style={styles.date}>{props.date}</Text>
            </View>
            <Button 
            color={colors.primary} 
            title={showDetails ? 'Hide Details' : 'Show Details'}
            onPress={() => setShowDetails(!showDetails)} 
            />
            {showDetails && (
                <View style={styles.detail}>{props.items.map(item => (
                    <CartItem 
                    key={item.productId}
                    quantity={item.quantity} 
                    total={item.total} 
                    title={item.productTitle} 
                    />
                ))}</View>
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    orderItem: {
        shadowColor: 'black',
        shadowOpacity: 0.26,
        shadowOffset: {width: 0, height: 2},
        shadowRadius: 8,
        elevation: 5,
        borderRadius: 10,
        backgroundColor: 'white',
        margin: 20,
        padding: 10,
        alignItems: 'center'
    },
    summary: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%'
    }, 
    total: {
        fontFamily: 'open-sans-bold',
        fontSize: 16
    },
    date: {
        fontFamily: 'open-sans',
        fontSize: 16,
        color: '#888'
    },
    detail: {
        width: '100%'
    }

})

export default OrderItem