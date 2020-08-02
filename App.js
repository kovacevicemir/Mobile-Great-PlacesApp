import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import PlacesNavigator from './navigation/PlacesNavigator'
import {createStore, combineReducers, applyMiddleware, compose} from 'redux'
import {Provider} from 'react-redux'
import ReduxThunk from 'redux-thunk'
import PlacesReducer from './store/places-reducer'
import { init } from './helpers/db'

init().then(()=>{
  console.log('initialized database')
}).catch(err=>{
  console.log('initializing db failed.')
  console.log(err)
});

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({
  places:PlacesReducer
})

const store = createStore(
  rootReducer,
  composeEnhancer(applyMiddleware(ReduxThunk)),
);


export default function App() {
  return (
    <Provider store={store}>
      <PlacesNavigator />
    </Provider>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
