import 'react-native-gesture-handler';
import React from 'react';
import {Provider} from 'react-redux';
import store from './Store/Store';
import {AppRegistry} from 'react-native';
import {PaperProvider} from 'react-native-paper';
import MyStack from './Navigation/MyStack';
import Result from './Screens/Result';

const App = () => {
  return (
    <Provider store={store}>
      <PaperProvider>
        <MyStack />
      </PaperProvider>
    </Provider>
  );
};

export default App;
