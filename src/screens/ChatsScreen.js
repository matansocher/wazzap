import React, { Component } from 'react';
import { AsyncStorage, StyleSheet, View, Text, Button, ScrollView } from 'react-native';
import { Icon, List } from 'react-native-elements';
import { connect } from 'react-redux';
import * as actions from '../actions/index';
import fire from '../firebase';
import _ from 'lodash';
import { filterBySearch, sortContactsByLastMessageTime, splitToPinned } from '../actions/CommonFunctions'

import Contact from '../components/Contact';
import ChatsHeader from '../components/ChatsHeader';
import CircularProgress from '../components/common/CircularProgress';

class ChatsScreen extends Component {

  static navigationOptions = {
    title: 'Chats',
    tabBarIcon: ({ tintColor }) => {
      return <Icon name="chat" size={30} color={tintColor} />;
    }
  }

  constructor(props) {
    super(props);
    this.state = {
      searchTerm: '',
      // gesture: false,
      // gestureText: "",
      loading: false
    }
  }

  componentDidMount() {
    // window.addEventListener("beforeunload", this.onUnload);
    console.log("did mount")
    this.setTheme();
    fire.auth().onAuthStateChanged(user => {
      if (user) {
        this.fetchData(user.uid);
        // this.preActionFetchFriendsList(user.uid, () => { });
      } else {
        this.props.actionLogoutUser();
        this.props.navigation.navigate('SignIn');
      }
    });
  }

  setTheme = async () => {
    // let theme = await AsyncStorage.getItem('isDarkTheme'); // boolean
    // console.log("theme: " +theme)
    let theme = true;
    this.props.actionChangeTheme(theme);
  }

  fetchData = (uid) => {
    console.log(uid)
    this.setState({ loading: true }, () => {
      this.props.actionFetchFriendsList(uid, () => {
        this.props.actionFetchUserData(uid, () => {
          // console.log("2")
          // updateLastSeen(uid, "Online", () => {
          this.setState({ loading: false });
          // })
        });
      });
    });
  }

  fetchChatData = (contact) => {
    this.setState({ loading: true }, () => {
      const useruid = this.props.user.uid;
      console.log(useruid)
      console.log(contact)
      this.props.actionFetchChatData(useruid, contact, () => {
        this.setState({ loading: false })
        this.props.navigation.navigate('Conversation');
      });
    })
  }

  deleteContactChat = (contact) => {
    this.setState({ loading: true }, () => {
      const useruid = this.props.user.uid;
      this.props.actionDeleteContactChat(useruid, contact, () => {
        this.setState({ loading: false, gestureText: "Chat Was Deleted Successfully", gesture: true });
      });
    });
  }

  pinUnpinChat = (contact, isPinned) => {
    this.setState({ loading: true }, () => {
      const useruid = this.props.user.uid;
      this.props.actionPinUnpinChat(useruid, contact, isPinned, () => {
        const pinnedText = isPinned ? "Pinned" : "Unpinned";
        contact.pinned = isPinned;
        this.setState({ loading: false, gestureText: `Friend Was ${pinnedText} Successfully`, gesture: true });
      });
    });
  }

  markAsUnraed = (contact, raedUnraed) => {
    this.setState({ loading: true }, () => {
      const useruid = this.props.user.uid;
      contact.isUnraed = 0;
      console.log(contact)
      this.props.actionMarkUnraed(useruid, contact, () => {
        this.setState({ loading: false, gestureText: `Message Was Marked As Unraed`, gesture: true });
      });
    });
  }

  navigateToRoute = (route) => {
    this.props.navigation.navigate(route);
  }

  changeSearchContact = (searchTerm) => {
    this.setState({ searchTerm });
  }

  renderContacts() {
    if (_.isEmpty(this.props.contactList) && !this.state.loading) {
      if (!this.state.loading) {
        const { primaryBackgroundColor } = this.props.theme;
        return (
          <View style={[styles.emptyList, { backgroundColor: primaryBackgroundColor }]}>
            <Text>You have no conversations yet</Text>
            <Button
              onPress={() => this.navigateToRoute('Friends')}
              title="Find Friends"
              color="#841584"
              accessibilityLabel="Find Friends button"
            />
          </View>
        );
      } else
        return (<CircularProgress />);
    }
    let contacts = _.values(this.props.contactList);
    if (this.state.searchTerm !== '' && contacts && !_.isEmpty(contacts))
      contacts = filterBySearch(contacts, this.state.searchTerm);
    contacts = sortContactsByLastMessageTime(contacts);
    contacts = splitToPinned(contacts);
    return (
      contacts.map(contact => {
        return <Contact key={contact.info.email}
          contact={contact}
          theme={this.props.theme}
          lastMessage={contact.lastMessage}
          fetchChatData={this.fetchChatData}
          deleteContactChat={this.deleteContactChat}
          pinUnpinChat={this.pinUnpinChat}
          markAsUnraed={this.markAsUnraed} />
      })
    );
  }

  render() {
    return (
      <View style={[styles.container, { backgroundColor: this.props.theme.primaryBackgroundColor }]}>
        <View>
          <ChatsHeader searchContact={this.changeSearchContact}
            navigateToRoute={this.navigateToRoute} />
        </View>
        <ScrollView>
          {this.state.loading ? <CircularProgress /> : <View />}
          <List>
            {this.renderContacts()}
          </List>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // height: 100,
    paddingTop: 25,
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  emptyList: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

function mapStateToProps(state) {
  return {
    theme: state.theme,
    contactList: state.contactList,
    user: state.user
  };
}

export default connect(mapStateToProps, actions)(ChatsScreen);