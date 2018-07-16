import React, { Component } from 'react';
import { StyleSheet, View, Text, ScrollView } from 'react-native';
import { Icon, List } from 'react-native-elements';
import { connect } from 'react-redux';
import _ from 'lodash';
import * as actions from '../actions/index';
import { filterBySearch } from '../actions/CommonFunctions';

import FriendsItem from '../components/FriendItem';
import ChatsHeader from '../components/ChatsHeader';
import CircularProgress from '../components/common/CircularProgress';

class FriendsScreen extends Component {
  static navigationOptions = {
    title: 'Friends',
    tabBarIcon: ({ tintColor }) => {
      return <Icon name="contacts" size={30} color={tintColor} />;
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
    if (_.isEmpty(this.props.user)) {
      this.props.navigation.navigate('Chats');
      return;
    }

    if (_.isEmpty(this.props.searchFriends)) {
      this.setState({ loading: true }, () => {
        const { uid } = this.props.user;
        const friendsUids = _.map(this.props.contactList, f => f.key);
        friendsUids.push(uid); // current user
        this.props.actionSearchFriends(uid, friendsUids, () => {
          this.setState({ loading: false });
        });
      });
    }
  }

  addAsFriend = (friend) => {
    this.setState({ loading: true }, () => {
      this.props.actionAddAsFriend(this.props.user.uid, friend, () => {
        this.setState({ loading: false, gestureText: "Friend Was Added Successfully", gesture: true });
      });
    });
  }

  changeSearchContact = (searchTerm) => {
    this.setState({ searchTerm });
  }

  navigateToRoute = (route) => {
    this.props.navigation.navigate(route);
  }

  renderList() {
    const { primaryColor, primaryBackgroundColor } = this.props.theme;
    if (_.isEmpty(this.props.searchFriends)) {
      return (
        <View style={[styles.emptyContainer, { backgroundColor: primaryBackgroundColor }]}>
          <Text style={[styles.emptyText, { color: primaryColor }]}>
            You have no more friends to add
          </Text>
        </View>
      );
    }
    let friendsAvailable = _.values(this.props.searchFriends);
    if (this.state.searchTerm !== '' && friendsAvailable && !_.isEmpty(friendsAvailable))
      friendsAvailable = filterBySearch(friendsAvailable, this.state.searchTerm);
    return (
      friendsAvailable.map((friend) => {
        return (
          <FriendsItem key={friend.email} theme={this.props.theme}
            friend={friend} addAsFriend={this.addAsFriend} />
        )
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
        {this.state.loading ? <CircularProgress /> : <View />}
        <ScrollView>
          <List>
            {this.renderList()}
          </List>
        </ScrollView>
      </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 25,
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyText: {
    fontSize: 24
  }
});

function mapStateToProps(state) {
  return {
    theme: state.theme,
    user: state.user,
    contactList: state.contactList,
    searchFriends: state.searchFriends
  };
}

export default connect(mapStateToProps, actions)(FriendsScreen);