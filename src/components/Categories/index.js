import React, { Component } from 'react';
import { View } from 'react-native';
import { withNavigation } from 'react-navigation';
import { List, ListItem } from 'react-native-elements';

import i18n from '../../locale/i18n';
import keyValues from '../../locale/keyValues';
import { PrimaryButton } from '../../common/Buttons';

class Index extends Component {
  render() {
    return (
      <View>
        <List>
          {
            this.props.categoryList.map((item) => (
              <ListItem
                key={item.id}
                title={item.categoryName}
                onPress={() => this.props.navigation.navigate('CategoryDetail', { id: item.id })}
              />
            ))
          }
        </List>
        <PrimaryButton
          onPress={() => this.props.navigation.navigate('AddCategory')}
          title={i18n.t(keyValues.add_invoice_category_text)}
        />
      </View>
    );
  }
}

export default withNavigation(Index);
