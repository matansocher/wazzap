import React, { Component } from 'react';
import { View, Text } from 'react-native'
import { getCorrectHour } from '../actions/CommonFunctions';

class Message extends Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  deleteMessage = () => {
    this.props.deleteMessage(this.props.message);
  }

  render() {
    const { primaryColor } = this.props.theme;
    let { content, hour, sender } = this.props.message;
    const { user, currentChatUser } = this.props;
    const name = sender === user.uid ? user.name : currentChatUser.info.name;
    // const avatar = sender === user.uid ? user.avatar : currentChatUser.info.avatar;
    hour = getCorrectHour(hour);
    return (
      <View>
        <Text style={{ color: primaryColor }}>{content}</Text>
        <Text style={{ color: primaryColor }}>{hour}</Text>
      </View>
    );
  }
}

export default Message;