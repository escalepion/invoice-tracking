import React, { Component } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import firebase from 'firebase';

import i18n from '../locale/i18n';
import keyValues from '../locale/keyValues';
import { PrimaryButton } from '../common/Buttons';
import { DELETE_CATEGORY, DELETE_CATEGORY_SUCCESS } from '../sagas/types';

class CategorySettings extends Component {
  componentDidUpdate() {
    if(this.props.invoices.deleteCategorySuccess) {
      this.props.dispatch({ type: DELETE_CATEGORY_SUCCESS, payload: false });
      this.props.navigation.navigate('Index');
    }
  }
  onDelete() {
    const categoryId = this.props.navigation.getParam('id', 'noid');
    const uid = firebase.auth().currentUser.uid;
    if(categoryId !== 'noid') {
      this.props.dispatch({ type: DELETE_CATEGORY, uid, categoryId });
    }
  }

  render() {
    return (
      <View>
        <PrimaryButton
          onPress={this.onDelete.bind(this)}
          title={i18n.t(keyValues.delete)}
        />
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  return {invoices: state.invoices};
};

export default connect(mapStateToProps,null)(CategorySettings);
