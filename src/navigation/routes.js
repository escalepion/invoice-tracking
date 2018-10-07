import React from 'react';
import { createStackNavigator, createDrawerNavigator, createBottomTabNavigator } from 'react-navigation';
import { Icon } from 'react-native-elements';

import i18n from '../locale/i18n';
import keyValues from '../locale/keyValues';

import Index from '../screens/Index';
import LogIn from '../screens/auth/LogIn';
import Signup from '../screens/auth/Signup';
import SignOut from '../screens/auth/SignOut';
import AddCategory from '../screens/AddCategory';
import InvoiceList from '../screens/InvoiceList';
import CategorySettings from '../screens/CategorySettings';

const renderCategoryTabIconNames = (routeName) => {
  switch(routeName) {
    case 'InvoiceList':
      return 'list';
    case 'CategorySettings':
      return 'settings';
    default:
      'list';
  }
}
const renderCategoryTabTitle = () => {
  return i18n.t(keyValues.invoices);
}

export const LoggedIn = createStackNavigator({
  Index: {
    screen: Index,
    navigationOptions: {
      headerLeft: null
    }
  },
  AddCategory: {
    screen: AddCategory
  },
  CategoryDetail: {
    screen: createBottomTabNavigator(
      {
        InvoiceList,
        CategorySettings,
      },
      {
        navigationOptions: ({ navigation }) => ({
          tabBarIcon: ({ tintColor }) => {
            const { routeName } = navigation.state;
            const iconName = renderCategoryTabIconNames(routeName);
            return <Icon name={iconName} size={35} color={tintColor} />
          },
        }),
        tabBarOptions: {
          activeTintColor: 'tomato',
          inactiveTintColor: 'gray',
          showLabel: false,
        },
      }
    ),
    navigationOptions: () => {
      const title = renderCategoryTabTitle();
      return { title }
    }
  }
});

export const DrawNav = createDrawerNavigator(
  {
    LoggedMain: {
      path: '/',
      screen: LoggedIn,
      navigationOptions: {
        drawerLabel: 'Main'
      }
    },
    SignOut: {
      path: '/sent',
      screen: SignOut,
      navigationOptions: {
        drawerLabel: 'Sign Out'
      }
    },
  },
  {
    initialRouteName: 'LoggedMain',
    contentOptions: {
      activeTintColor: '#e91e63',
    },
  }
);

export const LoggedOut = createStackNavigator({
  LogIn: {
    screen: LogIn
  },
  Signup: {
    screen: Signup
  }
});

export const createRootNavigator = (signedIn = false) => {
  return createStackNavigator(
    {
      SignedIn: {
        screen: DrawNav,
        navigationOptions: {
          gesturesEnabled: false
        }
      },
      SignedOut: {
        screen: LoggedOut,
        navigationOptions: {
          gesturesEnabled: false
        }
      }
    },
    {
      headerMode: "none",
      mode: "modal",
      initialRouteName: signedIn ? "SignedIn" : "SignedOut"
    }
  );
};