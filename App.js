import React from 'react';
import AppMain from './srcs/navigator/index';
import {Provider} from 'react-redux';
import store from './srcs/redux/store/index';
import {MenuProvider} from 'react-native-popup-menu';
const App = () => {
  return (
    <>
      <Provider store={store}>
        <MenuProvider>
          <AppMain />
        </MenuProvider>
      </Provider>
    </>
  );
};

export default App;
