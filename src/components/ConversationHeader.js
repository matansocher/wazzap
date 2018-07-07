import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/index';
import _ from 'lodash';
import { getLastSeenString, getAvatar } from '../actions/CommonFunctions';
import { View, Text } from 'react-native';
import { Card, CardItem, Left, Thumbnail, Body } from 'native-base';
// import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
// import { ListItem } from 'material-ui/List';
// import Avatar from 'material-ui/Avatar';
// import IconMenu from 'material-ui/IconMenu';
// import MenuItem from 'material-ui/MenuItem';
// import IconButton from 'material-ui/IconButton';
// import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
// import BackIcon from 'material-ui/svg-icons/navigation/arrow-back';

class ConversationHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  deleteContactChat = () => {
    this.props.deleteContactChat(this.props.currentChatUser);
  }

  backClick = () => {
    this.props.navigateToRoute('/');
  }

  infoClicked = () => {
    this.props.navigateToRoute('ContactInfo');
  }

  render() {
    if (_.isEmpty(this.props.currentChatUser)) {
      return;
    }
    const { name, avatar, lastSeen, isTyping } = this.props.currentChatUser.info;
    return (
      <View>
        <Card onPress={this.infoClicked}>
          <CardItem>
            <Left>
              <Thumbnail source={getAvatar(avatar)} />
              <Body>
                <Text>{name}</Text>
                <Text>{getLastSeenString(isTyping, lastSeen)}</Text>
              </Body>
            </Left>
          </CardItem>
        </Card>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  conversationFooter: {
    flex: 1,
    flexDirection: 'row',
    padding: 10
  }
});

function mapStateToProps(state) {
  return {
    currentChatUser: state.currentChatUser
  };
}

export default connect(mapStateToProps, actions)(ConversationHeader);

{/* <MuiThemeProvider>
        <div>

          <BackIcon className="pull-left icon back-icon"
            onClick={this.backClick} />

          <ListItem
            className="contact-info"
            primaryText={name}
            secondaryText={<Text style={{ color: '#ffffff' }}>{getLastSeenString(isTyping, lastSeen)}</Text>}
            onClick={this.infoClicked}
            style={{ color: '#ffffff' }}
            leftAvatar={
              <Avatar size={45} src={require(`../avatars/${avatar}`)}
                style={{ borderColor: '#000000', borderStyle: 'solid', borderWidth: 2 }} />
            }
          />
          <IconMenu
            className="three-dots-conversation-header"
            iconButtonElement={<IconButton><MoreVertIcon /></IconButton>}
            anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
            targetOrigin={{ horizontal: 'right', vertical: 'top' }}
          >
            <MenuItem onClick={this.deleteContactChat} primaryText="Delete Chat" />
          </IconMenu>

        </div>
      </MuiThemeProvider> */}