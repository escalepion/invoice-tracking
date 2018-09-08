import React from 'react';
import firebase from 'firebase';
import { translate } from 'react-i18next';

import i18n from './src/locale/i18n';
import { createRootNavigator } from './src/navigation/routes';

class ProviderApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userLogged: false
    }
  }
  componentWillMount() {
    const config = {
      apiKey: 'AIzaSyDUklbfVJX7MLVJoFlX5S-gerLeNXyEM6Y',
      authDomain: 'bill-9f1de.firebaseapp.com',
      databaseURL: 'https://bill-9f1de.firebaseio.com',
      projectId: 'bill-9f1de',
      storageBucket: 'bill-9f1de.appspot.com',
      messagingSenderId: '303406810101'
    };
    firebase.initializeApp(config);
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({ userLogged: true });
      } else {
        this.setState({ loading: false });
      }
    });
  }
  render() {
    const RootNavigator = createRootNavigator(this.state.userLogged);
    const WrappedStack = ({t}) => {
      return <RootNavigator screenProps={{ t }} />;
    }
    const ReloadAppOnLanguageChange = translate('common', {
      bindI18n: 'languageChanged',
      bindStore: false
    })(WrappedStack);
    return <ReloadAppOnLanguageChange />;
  }
}

export default ProviderApp;