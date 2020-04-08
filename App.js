import React from 'react';
import AppMain from './srcs/navigator/index';
import {Provider} from 'react-redux';
import store from './srcs/redux/store/index';

const App = () => {
  return (
    <>
      <Provider store={store}>
        <AppMain />
      </Provider>
    </>
  );
};

export default App;
