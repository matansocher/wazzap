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
    const { primaryColor, secondaryColor, secondaryBackgroundColor } = this.props.theme;
    let { content, hour, sender } = this.props.message;
    const { user, currentChatUser } = this.props;
    const name = sender === user.uid ? user.name : currentChatUser.info.name;
    // const avatar = sender === user.uid ? user.avatar : currentChatUser.info.avatar;
    const bgColor = sender === user.uid ? secondaryColor : secondaryBackgroundColor;
    console.log(bgColor)
    hour = getCorrectHour(hour);
    return (
      <View style={[styles.container, { backgroundColor: bgColor }]}>
        <Text style={[styles.contectText, { color: primaryColor }]}>{content}</Text>
        <Text style={[styles.hourText, { color: primaryColor }]}>{hour}</Text>
      </View>
    );
  }
}

const styles = {
  container: {
    zIndex: 100,
    width: '80%',
    borderRadius: 10,
    margin: 4
  },
  contectText: {
    padding: 5
  },
  hourText: {
    padding: 5,
    position: 'absolute',
    right: 0,
    bottom: 0
  }
}

export default Message;