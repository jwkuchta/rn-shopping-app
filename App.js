import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createStore, combineReducers } from 'redux'
import { Provider } from 'react-redux'
import productsReducer from './store/reducers/products'
import cartsReducer from './store/reducers/cart'
import ShopNavigator from './navigation/ShopNavigator'
import { AppLoading } from 'expo'
import * as Font from 'expo-font'
import { composeWithDevTools } from 'redux-devtools-extension'
import ordersReducer from './store/reducers/orders'

const rootReducer = combineReducers({
  products: productsReducer,
  carts: cartsReducer,
  orders: ordersReducer
})
                                      // remove when ready for deployment
const store = createStore(rootReducer, composeWithDevTools()) 

const fetchFonts = () => {
  return Font.loadAsync({
    'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
    'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf')
  })
}

export default function App() {

  const [ fontLoaded, setFontLoaded ] = useState(false)

  if(!fontLoaded) {
    return (
      <AppLoading // prolongs the loading until the fonts are loaded and available to use
        startAsync={fetchFonts} // expecuted when the component is first rendered
        onFinish={() => {
          setFontLoaded(true)
        }}
      />
    )
  }
  return (
    <Provider store={store}>
      <ShopNavigator />
    </Provider>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
