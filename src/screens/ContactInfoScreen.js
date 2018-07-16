import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Icon } from 'react-native-elements';
import { connect } from 'react-redux';
import * as actions from '../actions/index';
import UserAvatar from '../components/common/UserAvatar';

class ContactInfoScreen extends Component {

  componentWillMount() {
    if (_.isEmpty(this.props.currentChatUser)) {
      this.props.navigation.navigate('Chats');
    }
  }

  render() {
    const { primaryColor, primaryBackgroundColor } = this.props.theme;
    const { name, avatar, email } = this.props.currentChatUser.info;
    return (
      <View style={[styles.container, { backgroundColor: primaryBackgroundColor }]}>
        <UserAvatar avatar={avatar} />
        <Text style={{ color: primaryColor }}>{name}</Text>
        <Text style={{ color: primaryColor }}>{email}</Text>
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
