
import React, { Component } from 'react';
import {
  Text,
  View
} from 'react-native';

import { Provider } from 'react-redux'
import { createStore } from 'redux';

import Routes from './Routes';
import reducers from './Reducers/';

export default class App extends Component {
  render() {
    return (
        <Provider store={createStore(reducers)}>
            <Routes />
        </Provider>
    );
  }
}
