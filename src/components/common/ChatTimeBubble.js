import React from 'react';
import { View, Text } from 'react-native';
import { getLastMessageTime } from '../../actions/CommonFunctions'

const ChatTimeBubble = ({ nextMessage, theme }) => {
  let lastTime = getLastMessageTime(nextMessage);
  lastTime = lastTime.includes(":") ? "Toady" : lastTime;
  return (
    <Text style={{ color: theme.primaryColor }}>{lastTime}</Text>
  )
}

export default ChatTimeBubble;