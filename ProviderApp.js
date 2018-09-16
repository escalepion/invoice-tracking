import React from 'react';
import firebase from 'firebase';
import { translate } from 'react-i18next';
import { createRootNavigator } from './src/navigation/routes';

import FullPageSpinner from './src/common/FullPageSpinner';

class ProviderApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      userLogged: false
    }
  }
  componentDidMount() {
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
        this.setState({ userLogged: true, loading: false });
      } else {
        this.setState({ userLogged: false, loading: false });
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
    if(this.state.loading) {
      return <FullPageSpinner />;
    }
    return <ReloadAppOnLanguageChange />;
  }
}

export default ProviderApp;