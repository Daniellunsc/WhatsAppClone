
import React, { Component } from 'react';
import {
  Text,
  View
} from 'react-native';

import firebase from 'firebase';
import ReduxThunk from 'redux-thunk'

import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux';

import Routes from './Routes';
import reducers from './Reducers/';

export default class App extends Component {

  componentWillMount() {
    var config = {
      apiKey: "AIzaSyBiUQUs9k8rqxEdqK-Rd5CIoJk6IpX0xvA",
      authDomain: "whatsappclone-e0af4.firebaseapp.com",
      databaseURL: "https://whatsappclone-e0af4.firebaseio.com",
      projectId: "whatsappclone-e0af4",
      storageBucket: "whatsappclone-e0af4.appspot.com",
      messagingSenderId: "203874358230"
    };
    firebase.initializeApp(config);
  }

  render() {
    return (
        <Provider store={createStore(reducers, {}, applyMiddleware(ReduxThunk))}>
            <Routes />
        </Provider>
    );
  }
}
