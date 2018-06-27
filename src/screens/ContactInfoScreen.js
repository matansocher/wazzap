import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Icon } from 'react-native-elements';
import { connect } from 'react-redux';
import * as actions from '../actions/index';

class ContactInfoScreen extends Component {
  static navigationOptions = {
    title: 'Chats',
    tabBarIcon: ({ tintColor }) => {
      return <Icon name="favorite" size={30} color={tintColor} />;
    }
  }

  componentWillMount() {
    if (_.isEmpty(this.props.currentChatUser)) {
      this.props.navigation.navigate('Chats');
    }
  }

  render() {
    return (
      <View style={styles.container}>
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
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

function mapStateToProps(state) {
  return {
    currentChatUser: state.currentChatUser
  };
}

export default connect(mapStateToProps, actions)(ContactInfoScreen);
