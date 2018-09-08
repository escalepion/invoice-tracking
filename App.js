import React from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

import reducers from './src/reducers';

import ProviderApp from './ProviderApp';

export default class App extends React.Component {
  render() {
    return (
      <Provider store={createStore(reducers)}>
        <ProviderApp />
      </Provider>
    );
  }
}
