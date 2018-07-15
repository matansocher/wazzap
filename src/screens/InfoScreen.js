import React, { Component } from 'react';
import { StyleSheet, View, Text, TextInput, Button, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';
import { connect } from 'react-redux';
import * as actions from '../actions/index';
import _ from 'lodash';
import AvatarPicker from '../components/AvatarPicker';
import UserAvatar from '../components/common/UserAvatar';

class InfoScreen extends Component {
  static navigationOptions = {
    title: 'Info',
    tabBarIcon: ({ tintColor }) => {
      return <Icon name="info" size={30} color={tintColor} />;
    }
  }

  constructor(props) {
    super(props);
    const { name, email, avatar } = this.props.user;
    this.state = {
      name,
      email,
      avatar,
      editingAvatar: false,
      // gesture: false,
      // gestureText: "",
      loading: false
    }
  }

  componentDidMount() {
    if (_.isEmpty(this.props.avatars)) {
      this.setState({ lodaing: true }, () => {
        this.props.actionFetchAvatars(() => {
          this.setState({ lodaing: false });
        });
      });
    }
  }

  saveClick = () => {
    this.setState({ loading: true }, () => {
      const { name, email, avatar } = this.state;
      const { uid } = this.props.user;
      const newUser = { uid, name, email, avatar, lastSeen: "Online" };
      console.log(newUser)
      // this.props.actionUpdateUserData(newUser, () => {
      //   this.setState({ loading: false, gestureText: "Changes Saved Successfully", gesture: true });
      // });
    })
  }

  changeAvatar = (avatar) => {
    console.log(avatar)
    this.setState({ avatar });
  }

  handleEditAvatar = () => {
    this.setState({ editingAvatar: !this.state.editingAvatar });
  }

  render() {
    const { email, name, avatar } = this.state;
    const { primaryBackgroundColor, primaryColor, secondaryColor } = this.props.theme;
    return (
      <View style={[styles.container, { backgroundColor: primaryBackgroundColor }]}>
        <UserAvatar avatar={avatar} />

        <Button
          title={this.state.editingAvatar ? "Save" : "Edit Avatar"}
          onPress={this.handleEditAvatar}
          accessibilityLabel="Update Avatar"
        />

        {this.state.editingAvatar ?
          <AvatarPicker avatars={this.props.avatars} avatar={this.state.avatar}
            changeAvatar={this.changeAvatar} /> : <View />
        }

        <TextInput
          style={styles.textInput}
          placeholderTextColor={primaryColor}
          placeholder="Email"
          value={email}
          onChangeText={(email) => this.setState({ email })}
        />

        <TextInput
          style={styles.textInput}
          placeholderTextColor={primaryColor}
          placeholder="Name"
          value={name}
          onChangeText={(name) => this.setState({ name })}
        />

        <TouchableOpacity
          onPress={this.saveClick}
          style={[styles.saveButton, { backgroundColor: secondaryColor }]}
        >
          <Icon name="save" size={30} color={primaryBackgroundColor} />

          <Text style={{ fontSize: 24, color: primaryBackgroundColor }} > Update Info </Text>
        </TouchableOpacity>
      </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 50
    // justifyContent: 'center',
  },
  textInput: {
    height: 40,
    padding: 15,
    borderWidth: 0.3,
    borderRadius: 10,
    width: '80%',
    marginTop: 10,
    marginBottom: 10,
    fontSize: 18,
    color: 'white'
  },
  saveButton: {
    flexDirection: 'row',
    height: 40,
    width: 170,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    marginBottom: 10,
    borderRadius: 10
  }
});

function mapStateToProps(state) {
  return {
    theme: state.theme,
    user: state.user,
    avatars: state.avatars
  };
}

export default connect(mapStateToProps, actions)(InfoScreen);