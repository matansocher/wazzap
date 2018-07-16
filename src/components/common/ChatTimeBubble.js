import React from 'react';
import { View, Text } from 'react-native';
import { getLastMessageTime } from '../../actions/CommonFunctions'

const ChatTimeBubble = ({ nextMessage, theme }) => {
  let lastTime = getLastMessageTime(nextMessage);
  lastTime = lastTime.includes(":") ? "Toady" : lastTime;
  return (
    <View style={[styles.container, { backgroundColor: theme.thirdColor }]}>
      <Text style={{ color: theme.primaryColor }}>
        {lastTime}
      </Text>
    </View>
  )
}

const styles = {
  container: {
    width: '35%',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center'
  }
}

export default ChatTimeBubble;