import * as React from "react";
import { View, Text } from "react-native";
import Main from './components/MainComponent';
import { Provider } from 'react-redux';
import {ConfigureStore} from './redux/configureStore';
import { PersistGate } from 'redux-persist/es/integration/react';
import Nav from './components/NavComponent'

const { persistor, store } = ConfigureStore();

export default class App extends React.Component {

  render() {
    return (
      <Provider store={store}>
        <PersistGate
          persistor={persistor} >
          <Nav />
        </PersistGate>

      </Provider>
    );
  }

}
