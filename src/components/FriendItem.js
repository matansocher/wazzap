import React, { Component } from 'react';
import { View, Text, Alert } from 'react-native';
import _ from 'lodash';
import { Icon } from 'react-native-elements';
import DividerContacts from './common/DividerContacts';
import UserAvatar from './common/UserAvatar';

class FriendItem extends Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  addAsFriend = () => {
    console.log("add as friend triggered")
    // this.props.addAsFriend(this.props.friend);
  }

  handleFriendPress = () => {
    Alert.alert(
      'Alert',
      'Are you sure you want to add that contact?',
      [
        { text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
        { text: 'Yes', onPress: () => this.addAsFriend },
      ],
      { cancelable: false }
    )
  }

  render() {
    console.log(this.props.friend)
    const { friend } = this.props;
    if (_.isEmpty(friend) || !friend.name || !friend.avatar) {
      return <View />
    }
    const { name, avatar } = friend;
    const { primaryColor, primaryBackgroundColor } = this.props.theme;
    return (
      <View>
        <View onPress={this.handleFriendPress} style={[styles.contactContainer, { backgroundColor: primaryBackgroundColor }]}>

          <View style={styles.avatarContainer}>
            <UserAvatar avatar={avatar} />
          </View>

          <View style={styles.textContainer}>
            <Text style={[styles.boldText, { color: primaryColor }]}>
              {name}
            </Text>
          </View>

          <View style={styles.nextArrowContainer}>
            <Icon name="navigate-next" size={30} color={primaryColor} />
          </View>
        </View>
        <DividerContacts color={primaryColor} />
      </View>
    );
  }
}

const styles = {
  contactContainer: {
    height: 90,
    flexDirection: 'row'
  },
  avatarContainer: {
    flex: 2,
    padding: 15
  },
  textContainer: {
    flex: 6,
    padding: 15
  },
  boldText: {
    fontWeight: 'bold'
  },
  nextArrowContainer: {
    flex: 1,
    padding: 5,
    justifyContent: 'center',
    alignItems: 'flex-end'
  }
}

export default FriendItem;