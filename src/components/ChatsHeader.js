import React, { Component } from 'react';
import { View, Text, TextInput } from 'react-native';
import { Icon } from 'react-native-elements';
// import { Ionicons } from '@expo/vector-icons';
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
    const { primaryColor, primaryBackgroundColor } = this.props.theme;
    return (
      <View style={[ styles.container, { backgroundColor: primaryBackgroundColor }]}>
        <Icon
          style={ styles.iconStyle }
          name='search'
          size={24}
          color={ primaryColor } />

        <TextInput
          style={ styles.textInputStyle }
          placeholder="Search Contacts"
          placeholderTextColor={ primaryColor }
          onChangeText={this.handleChangeSearchTerm}
        />
      </View>
    );
  }
}

const styles = {
  container: {
    height: 45,
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  textInputStyle: {
    flex: 8, 
    height: 40, 
    padding: 10, 
    fontSize: 16, 
    borderColor: 'grey', 
    borderWidth: 2, 
    borderRadius: 10
  },
  iconStyle: {
    flex: 1, 
    padding: 10, 
  }
}

function mapStateToProps(state) {
  return { theme: state.theme }
}

export default connect(mapStateToProps, actions)(ChatsHeader);