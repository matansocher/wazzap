import React, { Component } from 'react';
import { TouchableOpacity, View, Text } from 'react-native';
import _ from 'lodash';
import { getLastMessageTime, getLastMessage } from '../actions/CommonFunctions';
import BadgeMessage from './common/BadgeMessage';
import DividerContacts from './common/DividerContacts';
import UserAvatar from './common/UserAvatar';
import { Icon } from 'react-native-elements';


class Contact extends Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  fetchChatData = () => {
    this.props.fetchChatData(this.props.contact);
  }

  deleteContactChat = () => {
    this.props.deleteContactChat(this.props.contact);
  }

  pinUnpinChat = () => {
    const { contact } = this.props;
    const isPinned = contact.pinned ? true : false;
    this.props.pinUnpinChat(contact, !isPinned); // reverse the pin bool
  }

  markAsUnraed = () => {
    this.props.markAsUnraed(this.props.contact, 0);
  }

  render() {
    const { name, avatar } = this.props.contact.info;
    const { pinned, isUnraed, isTyping } = this.props.contact;
    const { lastMessage } = this.props;
    const lastMessageTime = !_.isEmpty(lastMessage) ? getLastMessageTime(lastMessage) : " ";
    const lmContent = getLastMessage(isTyping, lastMessage || false, name);
    const { primaryBackgroundColor, primaryColor, thirdColor } = this.props.theme;
    return (
      <TouchableOpacity onPress={this.fetchChatData}>
        <View style={[styles.contactContainer, { backgroundColor: primaryBackgroundColor }]}>

          <View style={styles.avatarContainer}>
            <UserAvatar avatar={avatar} />
          </View>

          <View style={styles.textContainer}>
            <Text style={[styles.boldText, { color: primaryColor }]}>
              {name}
            </Text>
            <Text style={{ color: primaryColor }}>
              {lmContent}
            </Text>
          </View>

          <View style={styles.timeContainer}>
            <Text style={[styles.lastMessageTimeText, { color: primaryColor }]}>{lastMessageTime}</Text>

            {pinned ? <Icon name="star-border" size={30} color={primaryColor} /> : <View />}

            <BadgeMessage isUnraed={isUnraed}
              thirdColor={thirdColor} primaryColor={primaryColor} />
          </View>

          <View style={styles.nextArrowContainer}>
            <Icon name="navigate-next" size={30} color={primaryColor} />
          </View>
        </View>
        <DividerContacts color={primaryColor} /> >
      </TouchableOpacity>
    )
  }
}

const styles = {
  contactContainer: {
    height: 90,
    // borderWidth: 3,
    // borderColor: 'white',
    flexDirection: 'row'
  },
  boldText: {
    fontWeight: 'bold'
  },
  avatarContainer: {
    flex: 2,
    padding: 15
  },
  textContainer: {
    flex: 6,
    padding: 15
  },
  nextArrowContainer: {
    // backgroundColor: 'green',
    flex: 1,
    padding: 5,
    justifyContent: 'center',
    alignItems: 'flex-end'
  },
  timeContainer: {
    flexDirection: 'column',
    // backgroundColor: 'red',
    flex: 3,
    padding: 5,
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  lastMessageTimeText: {
    fontSize: 10
  }
}

export default Contact;