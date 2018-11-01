import React, { Component } from 'react';
import { Modal, View, StyleSheet } from 'react-native';
import { Icon } from 'react-native-elements';

class OpenModal extends Component {
    render() {
        const { visible, closeModal } = this.props;
        return (
            <Modal
                animationType={'slide'}
                transparent
                visible={visible}
                onRequestClose={() => { }}
            >
                <View style={styles.container}>
                    <View style={styles.contentContainer}>
                      <View style={styles.closeModalIcon}><Icon name="close" onPress={closeModal}/></View>
                      <View style={styles.content}>
                        {this.props.children}
                      </View>
                    </View>
                </View>
            </Modal>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'rgba(0, 0, 0, 0.75)',
        position: 'relative',
        flex: 1,
        justifyContent: 'center'
    },
    contentContainer: {
        backgroundColor: '#ffffff'
    },
    content: {
        minHeight: 300,
        padding: 20
    },
    closeModalIcon: {
      alignItems: 'flex-end'
    }
});

export default OpenModal;