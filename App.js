import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { createStore, combineReducers, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import productsReducer from './store/reducers/products'
import cartsReducer from './store/reducers/cart'
import ShopNavigator from './navigation/ShopNavigator'
import { AppLoading } from 'expo'
import * as Font from 'expo-font'
import { composeWithDevTools } from 'redux-devtools-extension'
import ordersReducer from './store/reducers/orders'
import ReduxThunk from 'redux-thunk'
import authReducer from './store/reducers/auth'
import NavigationContainer from './navigation/NavigationContainer';

const rootReducer = combineReducers({
  products: productsReducer,
  carts: cartsReducer,
  orders: ordersReducer,
  auth: authReducer
})
                                      // remove when ready for deployment
const store = createStore(rootReducer, applyMiddleware(ReduxThunk)) 

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
      <NavigationContainer />
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
