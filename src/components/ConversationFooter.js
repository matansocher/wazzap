import React, { Component } from 'react';
import { View, TextInput } from 'react-native';
import { Icon } from 'react-native-elements';
import { makeMessageID, updateStatusInConversation } from '../actions/CommonFunctions';


class ConversationFooter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: '',
      smileyShow: false,
      timeout: null
    }
  }

  componentDidMount() {

  }

  sendMessage = (e) => {
    const content = this.state.message.trim();

    if (content === '') {
      console.log('empty')
      return;
    }
    var date = new Date();
    const message = {
      id: makeMessageID(),
      content: this.state.message,
      hour: `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`,
      date: `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
    }
    this.props.sendMessage(message, () => {
      this.setState({ message: '' });
    });
  }

  createSetTimeout = (userid, contactid) => {
    this.setState({
      timeout: setTimeout(() => {
        updateStatusInConversation(userid, contactid, false); // stopped typing
        this.clearTimeout(this.state.timeout);
        this.setState({ timeout: null });
      }, 3000)
    });
  }

  updateStatus = () => {
    const { timeout } = this.state;
    const userid = this.props.user.uid;
    const contactid = this.props.currentChatUser.info.uid;
    if (timeout) {
      this.clearTimeout(timeout);
      this.setState({ timeout: null });
    } else {
      updateStatusInConversation(userid, contactid, true); // typing
    }
    this.createSetTimeout(userid, contactid);
  }

  handleChange = (value) => {
    this.setState({ message: value });
    // this.updateStatus(); // in order the update the status to "Typing"
  }

  // toggleSmiley = () => {
  //   // document.getElementById("scrollable-conversation").classList.toggle('scrollable-conversation-short');
  //   // document.getElementById("conversation-footer").classList.toggle('conversation-footer-long');
  //   // this.setState({ smileyShow: !this.state.smileyShow });
  // }

  // returnEmoji = (id) => {
  //   return (
  //     <span dangerouslySetInnerHTML={{
  //       __html: Emoji({
  //         html: true, set: 'apple', emoji: { id }, size: 20
  //       })
  //     }}></span>
  //   );
  //   // <Emoji emoji={{ id: {id}, skin: 3 }} size={20} />
  // }

  // addEmojiToMessage = (emoji) => {
  //   console.log(emoji);
  //   let { message } = this.state;
  //   message += this.returnEmoji(emoji.id);
  //   this.setState({ message });
  // }

  render() {
    const { primaryBackgroundColor, primaryColor } = this.props.theme;
    return (
      <View style={[styles.container, { backgroundColor: primaryBackgroundColor }]}>
        <Icon name="mood" size={30} containerStyle={styles.iconStyle} />
        <TextInput
          style={styles.textInputStyle}
          placeholderTextColor={primaryColor}
          placeholder="Type a message"
          onChangeText={this.handleChange}
        />
        <Icon name="send" size={30}
          containerStyle={styles.sendButtonStyle} onPress={this.sendMessage} />
      </View>
    );
  }
}

const styles = {
  container: {
    flex: 1,
    flexDirection: 'row',
    padding: 10
  },
  textInputSytle: {
    flex: 7,
    height: 50,
    padding: 15,
    fontSize: 20,
    borderColor: 'grey',
    borderWidth: 1,
    borderRadius: 10
  },
  iconStyle: {
    flex: 1,
    alignItems: 'flex-start',
    padding: 5
  },
  sendButtonStyle: {
    flex: 1,
    alignItems: 'flex-end',
    padding: 5
  }
};

export default ConversationFooter;