import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/index';
import _ from 'lodash';
import { getLastSeenString } from '../actions/CommonFunctions';
import { View, Text } from 'react-native';
import { Icon } from 'react-native-elements';
import UserAvatar from './common/UserAvatar';

class ConversationHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  deleteContactChat = () => {
    this.props.deleteContactChat(this.props.currentChatUser);
  }

  infoClicked = () => {
    this.props.navigateToRoute('ContactInfo');
  }

  render() {
    if (_.isEmpty(this.props.currentChatUser)) {
      return null;
    }
    const { name, avatar, lastSeen, isTyping } = this.props.currentChatUser.info;
    const { primaryBackgroundColor, primaryColor } = this.props.theme;
    const lastSeenString = getLastSeenString(isTyping, lastSeen);
    return (
      <View style={[styles.container, { backgroundColor: primaryBackgroundColor }]}>

        <View style={styles.contactDetails} onPress={this.infoClicked}>
          <View style={styles.contactImage}>
            <UserAvatar avatar={avatar} />
          </View>
          <View style={styles.contactTexts}>
            <Text style={{ color: primaryColor, fontWeight: 'bold' }}>
              {name}
            </Text>
            <Text style={{ color: primaryColor }}>
              {lastSeenString}
            </Text>
          </View>
        </View>

        <View style={styles.contactActions}>
          <Icon name="android" size={20} color={primaryColor} />
          <Icon name="flight-land" size={20} color={primaryColor} />
          <Icon name="fingerprint" size={20} color={primaryColor} />
        </View>

      </View>
    );
  }
}

const styles = {
  container: {
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  contactDetails: {
    flex: 2,
    flexDirection: 'row',
  },
  contactImage: {
    flex: 1,
    padding: 5
  },
  contactTexts: {
    flex: 3,
    flexDirection: 'column',
    padding: 10
  },
  contactActions: {
    flex: 1,
    padding: 5,
    flexDirection: 'row',
    justifyContent: 'space-between'
  }
};

function mapStateToProps(state) {
  return {
    currentChatUser: state.currentChatUser
  };
}

export default connect(mapStateToProps, actions)(ConversationHeader);