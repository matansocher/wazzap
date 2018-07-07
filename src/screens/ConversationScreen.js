import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import fire from '../firebase';
import _ from 'lodash';
import { connect } from 'react-redux';
import * as actions from '../actions/index';
import { Icon } from 'react-native-elements';
import { getCircularProgress, compareDates, getChatBubbleDate, raedMessage } from '../actions/CommonFunctions';
import ConversationHeader from '../components/ConversationHeader';
import ConversationFooter from '../components/ConversationFooter';

class ConversationScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {
      // gesture: false,
      // gestureText: "",
      loading: false
    }
  }

  componentDidMount() {
    this.scrollToBottom();
    if (!_.isEmpty(this.props.user)) {
      const useruid = this.props.user.uid;
      const contactid = this.props.currentChatUser.info.uid;
      raedMessage(useruid, contactid);
      this.preActionFetchChatData(useruid, this.props.currentChatUser, () => {})
      // this.props.actionMarkRaedUnraed(useruid, contact, "None", () => {});
    }
  }

  // preActionFetchChatData = (useruid, contact, callback) => {
  //   const chatData = { contact, messages: [] };
  //   const contactuid = contact.info.uid;
  //   fire.database().ref(`messages/${useruid}/${contactuid}`).on('value', messagesSnap => {
  //     chatData.messages = messagesSnap.val();
  //     this.props.actionFetchChatDataReady(chatData, callback)
  //   });
  // }

  componentDidUpdate() {
    this.scrollToBottom();
  }

  scrollToBottom = () => {
    // this.messagesEnd.scrollIntoView({ behavior: "smooth" });
  }

  navigateToRoute = (route) => {
    this.props.navigation.navigate(route);
  }

  deleteContactChat = (contact) => {
    this.setState({ loading: true }, () => {
      const useruid = this.props.user.uid;
      this.props.actionDeleteContactChat(useruid, contact, () => {
        this.setState({ loading: false, gestureText: "Chat Was Deleted Successfully", gesture: true });
      });
    });
  }

  sendMessage = (message, callback) => {
    const senderuid = this.props.user.uid;
    const recieveruid = this.props.currentChatUser.info.uid;
    message.sender = senderuid;
    console.log("message sent:", message.content)
    // this.props.actionSendMessage(senderuid, recieveruid, message, () => {
    //   callback();
    // });
  }

  deleteMessage = (message) => {
    this.setState({ loading: true }, () => {
      const senderuid = this.props.user.uid;
      const recieveruid = this.props.currentChatUser.uid;
      this.props.actionDeleteMessage(senderuid, recieveruid, message, () => {
        this.setState({ loading: false, gestureText: "Message Was Deleted Successfully", gesture: true });
      });
    });
  }

  renderMessages() {
    let messages = this.props.currentChatMessages;
    if (!messages || messages.length === 0) {
      return;
    }
    return (
      messages.map((message, index, messages) => {
        if (message && message.content !== " ") {
          let arrayToReturn = [];
          if (index !== messages.length - 1) { // not the last message
            if (!compareDates(message.date, messages[index + 1].date)) { // need to show another bubble 
              arrayToReturn.push(getChatBubbleDate(messages[index + 1]));
            }
          }
          arrayToReturn.push(
            <Message key={message.id} message={message}
              user={this.props.user} currentChatUser={this.props.currentChatUser}
              deleteMessage={this.deleteMessage} />
          );
          return arrayToReturn;
        }
        return <View key={1} />
      })
    );
  }

  render() {
    return (
      <View style={styles.container}>
        <View>
          <ConversationHeader user={this.props.user}
            currentChatUser={this.props.currentChatUser}
            backToChats={this.navigateToRoute}
            contactInfoShow={this.navigateToRoute}
            deleteContactChat={this.deleteContactChat}
            navigateToRoute={this.navigateToRoute} />
        </View>
        <View>
          {this.state.loading ? getCircularProgress() : <View />}
          {this.renderMessages()}
        </View>
        <View>
          <ConversationFooter 
            user={this.props.user}
            currentChatUser={this.props.currentChatUser}
            sendMessage={this.sendMessage} />
        </View>
        <Text>ConversationScreen</Text>
        <Text>ConversationScreen</Text>
        <Text>ConversationScreen</Text>
        <Text>ConversationScreen</Text>
        <Text>ConversationScreen</Text>
        <Text>ConversationScreen</Text>
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
    theme: state.theme,
    currentChatUser: state.currentChatUser,
    currentChatMessages: state.currentChatMessages,
    user: state.user
  };
}

export default connect(mapStateToProps, actions)(ConversationScreen);
