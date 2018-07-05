import React, { Component } from 'react';
import { StyleSheet, View, Text, ScrollView } from 'react-native';
import { Icon, List } from 'react-native-elements';
import { connect } from 'react-redux';
import _ from 'lodash';
import * as actions from '../actions/index';
import { getCircularProgress, filterBySearch } from '../actions/CommonFunctions';

import FriendsItem from '../components/FriendItem';
import ChatsHeader from '../components/ChatsHeader';

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
    if (_.isEmpty(this.props.searchFriends)) {
      return (
        <View>
          <Text>You have no more friends to add</Text>
        </View>
      );
    }
    let friendsAvailable = _.values(this.props.searchFriends);
    if (this.state.searchTerm !== '' && friendsAvailable && !_.isEmpty(friendsAvailable))
      friendsAvailable = filterBySearch(friendsAvailable, this.state.searchTerm);
    return (
      friendsAvailable.map((friend) => {
        return (
          <FriendsItem key={friend.email}
            friend={friend} addAsFriend={this.addAsFriend} />
        )
      })
    );
  }

  render() {
    return (
      <View style={styles.container}>
        <View>
          <ChatsHeader searchContact={this.changeSearchContact}
            navigateToRoute={this.navigateToRoute} />
        </View>
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
    backgroundColor: '#373d47',
    paddingTop: 25,
    // alignItems: 'center',
    // justifyContent: 'center',
  },
});

function mapStateToProps(state) {
  return {
    user: state.user,
    contactList: state.contactList,
    searchFriends: state.searchFriends
  };
}

export default connect(mapStateToProps, actions)(FriendsScreen);


{/* <div className="center">
<MuiThemeProvider>
  <div className="center">

    <Snackbar open={this.state.gesture} message={this.state.gestureText}
      autoHideDuration={4000} onRequestClose={this.handleRequestClose} />


    <FlatButton className="pull-left back-button-user-info" label="Back" primary={true} onClick={this.backClick}>
      <BackIcon className="pull-left back-user-info" />
    </FlatButton>

      <h1>Search Friends</h1>
      <div className="search-chats">
        <input className="form-control text-input" placeholder="Search" name="searchTerm"
          value={this.state.searchTerm} onChange={this.handleChange} />
      </div>
    {this.state.loading ? getCircularProgress() : <span />}

    <List>
      {this.renderList()}
    </List>

  </div>
</MuiThemeProvider>
</div> */}