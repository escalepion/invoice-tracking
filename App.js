import React from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';

import reducers from './src/reducers';
import { rootSaga } from './src/sagas/sagas';

import ProviderApp from './ProviderApp';
const sagaMiddleware = createSagaMiddleware();

console.ignoredYellowBox = ['Setting a timer'];

const store = createStore(
  reducers,
  applyMiddleware(sagaMiddleware)
);

sagaMiddleware.run(rootSaga);

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <ProviderApp />
      </Provider>
    );
  }
}
