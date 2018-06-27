import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Icon } from 'react-native-elements';
import { connect } from 'react-redux';
import * as actions from '../actions/index';

class FriendsScreen extends Component {
  static navigationOptions = {
    title: 'Friends',
    tabBarIcon: ({ tintColor }) => {
      return <Icon name="favorite" size={30} color={tintColor} />;
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>FriendsScreen</Text>
        <Text>FriendsScreen</Text>
        <Text>FriendsScreen</Text>
        <Text>FriendsScreen</Text>
        <Text>FriendsScreen</Text>
        <Text>FriendsScreen</Text>
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
    user: state.user,
    contactList: state.contactList,
    searchFriends: state.searchFriends
  };
}

export default connect(mapStateToProps, actions)(FriendsScreen);
