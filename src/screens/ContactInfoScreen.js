import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Icon } from 'react-native-elements';
import { connect } from 'react-redux';
import * as actions from '../actions/index';

class ContactInfoScreen extends Component {

  componentWillMount() {
    if (_.isEmpty(this.props.currentChatUser)) {
      this.props.navigation.navigate('Chats');
    }
  }

  render() {
    return (
      <View style={[styles.container, { backgroundColor: this.props.theme.primaryBackgroundColor }]}>
        <Text>ContactInfoScreen</Text>
        <Text>ContactInfoScreen</Text>
        <Text>ContactInfoScreen</Text>
        <Text>ContactInfoScreen</Text>
        <Text>ContactInfoScreen</Text>
        <Text>ContactInfoScreen</Text>
      </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

function mapStateToProps(state) {
  return {
    theme: state.theme,
    currentChatUser: state.currentChatUser
  };
}

export default connect(mapStateToProps, actions)(ContactInfoScreen);
