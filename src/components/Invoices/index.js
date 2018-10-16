import React, { Component } from 'react';
import { View } from 'react-native';
import { withNavigation } from 'react-navigation';
import { List, ListItem } from 'react-native-elements';

import i18n from '../../locale/i18n';
import keyValues from '../../locale/keyValues';
import { PrimaryButton } from '../../common/Buttons';

class Index extends Component {
  render() {
    const categoryId = this.props.categoryId;
    return (
      <View>
        <List>
          {
            this.props.invoiceList.map((item) => (
              <ListItem
                key={item.id}
                title={item.fields.invoicePrice}
                onPress={() => this.props.navigation.navigate('UpdateInvoice', { categoryId, invoiceDetails : item })}
              />
            ))
          }
        </List>
        <PrimaryButton
          onPress={() => this.props.navigation.navigate('AddInvoice', { categoryId })}
          title={i18n.t(keyValues.add_invoice)}
        />
      </View>
    );
  }
}

export default withNavigation(Index);
