import React, { Component } from 'react';
import { View, Text, TextInput } from 'react-native';
// import { Icon } from 'react-native-elements';
import { Ionicons } from '@expo/vector-icons';
// import Icon from 'react-native-vector-icons/FontAwesome';
import { connect } from 'react-redux';
import * as actions from '../actions/index';
import firebase from '../firebase';

class ChatsHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: this.props.user,
      searchTerm: ''
    }
  }

  logout = () => {
    firebase.auth().signOut().then(() => {
      this.props.actionLogoutUser();
      this.props.navigateToRoute('SignIn');
    }, error => {
      console.log(error);
    });
  }

  userInfoClicked = () => {
    this.props.navigateToRoute('Info');
  }

  searchFriendsClicked = () => {
    this.props.navigateToRoute('Friends');
  }

  settingsClicked = () => {
    this.props.navigateToRoute('Settings');
  }

  handleChangeSearchTerm = (searchTerm) => {
    this.setState({ searchTerm });
    this.props.searchContact(searchTerm);
  }

  render() {
    return (
      <View style={{ backgroundColor: '#373d47', padding: 15 }}>
        <Ionicons
          style={{ paddingLeft: 10, }}
          name='md-search'
          size={24}
          color='#ffffff' />

        <TextInput
          style={{ height: 50, padding: 15, fontSize: 20, borderColor: 'gray', borderWidth: 1, borderRadius: 10 }}
          placeholder="Search Contacts"
          onChangeText={this.handleChangeSearchTerm}
        />
      </View>
    );
  }
}

export default connect(null, actions)(ChatsHeader);