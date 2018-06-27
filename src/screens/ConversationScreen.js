import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import fire from '../firebase';
import { connect } from 'react-redux';
import * as actions from '../actions/index';
import { Icon } from 'react-native-elements';

class ConversationScreen extends Component {
  static navigationOptions = {
    title: 'Chats',
    tabBarIcon: ({ tintColor }) => {
      return <Icon name="favorite" size={30} color={tintColor} />;
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>ConversationScreen</Text>
        <Text>ConversationScreen</Text>
        <Text>ConversationScreen</Text>
        <Text>ConversationScreen</Text>
        <Text>ConversationScreen</Text>
        <Text>ConversationScreen</Text>
      </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

function mapStateToProps(state) {
  return {
    currentChatUser: state.currentChatUser,
    currentChatMessages: state.currentChatMessages,
    user: state.user
  };
}

export default connect(mapStateToProps, actions)(ConversationScreen);
