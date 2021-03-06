import React, { Component } from 'react';
import { StyleSheet, View, Text, TextInput, Button, TouchableOpacity, Dimensions } from 'react-native';
import { Icon } from 'react-native-elements';
import fire from '../firebase';
import _ from 'lodash';
import { connect } from 'react-redux';
import * as actions from '../actions/index';
import { validateEmail, validatePassword } from '../actions/CommonFunctions';
import AvatarPicker from '../components/AvatarPicker';
import DividerContacts from '../components/common/DividerContacts';
import CircularProgress from '../components/common/CircularProgress';
import UserAvatar from '../components/common/UserAvatar';

const width = Dimensions.get('window').width;

class SignUpScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {
      email: '',
      name: '',
      password: '',
      avatar: 'default.png',
      loading: false
    }
  }

  componentDidMount() {
    if (_.isEmpty(this.props.avatars)) {
      this.setState({ loading: true }, () => {
        this.props.actionFetchAvatars(() => {
          this.setState({ loading: false });
        });
      });
    }
  }

  singUpClick = () => {
    this.setState({ loading: true }, () => {
      let signUpMessage = '';
      const { email, password, name, avatar } = this.state;
      if (validatePassword(password) === 'short') {
        signUpMessage = `Password should contain at least 6 chars`;
        this.setState({ loading: false, signUpMessage });
        return;
      }
      if (!name || name.length === 0) {
        signUpMessage = `Name is empty`;
        this.setState({ loading: false, signUpMessage });
        return;
      }
      console.log("before if")
      if (validateEmail(email) && validatePassword(password)) {
        console.log("inside if")
        fire.auth().createUserWithEmailAndPassword(email, password)
          .then(user => {
            console.log("created user")
            this.props.actionSignUpUser(email, name, avatar, user.uid, () => {
              this.props.navigation.navigate('Chats');
            });
          }).catch(e => {
            signUpMessage = e.message;
            this.setState({ loading: false, signUpMessage });
          });
      } else {
        signUpMessage = `Oops, something went wrong, please try again`;
        this.setState({ loading: false, signUpMessage });
      }
    });
  }

  signUpClick = () => {
    this.props.navigation.navigate('SignIn');
  }

  // handleChange = (e) => {
  //   var change = {};
  //   change[e.target.name] = e.target.value;
  //   this.setState(change);
  // }

  changeAvatar = (avatar) => {
    this.setState({ avatar });
  }

  render() {
    const { avatar } = this.state;
    const { primaryBackgroundColor, primaryColor, secondaryColor } = this.props.theme;
    return (
      <View style={[styles.container, { backgroundColor: primaryBackgroundColor }]}>

        {this.state.loading ? <CircularProgress /> : <View />}

        <TextInput
          style={styles.textInput}
          placeholderTextColor={primaryColor}
          placeholder="Email"
          onChangeText={(text) => this.setState({ email: text })}
        />

        <TextInput
          style={styles.textInput}
          placeholderTextColor={primaryColor}
          placeholder="Name"
          onChangeText={(text) => this.setState({ name: text })}
        />

        <TextInput
          style={styles.textInput}
          placeholderTextColor={primaryColor}
          secureTextEntry={true}
          placeholder="Password"
          onChangeText={(text) => this.setState({ password: text })}
        />

        <UserAvatar avatar={avatar} />

        {/* <Divider style={{ backgroundColor: 'blue' }} /> */}
        <DividerContacts color={'blue'} />

        <AvatarPicker avatars={this.props.avatars} avatar={this.state.avatar}
          changeAvatar={this.changeAvatar} />

        {/* <Divider style={{ backgroundColor: 'blue' }} /> */}
        <DividerContacts color={'blue'} />

        {this.state.signInMessage ?
          <Text style={{ color: 'red', fontWeight: 'bold' }}>
            {this.state.signInMessage}
          </Text>
          : <View />}

        <TouchableOpacity
          onPress={this.singUpClick}
          style={[styles.signUpButton, { backgroundColor: secondaryColor }]}
        >
          <Icon name="pregnant-woman" size={30} color='#000000' />

          <Text style={{ fontSize: 24 }} > Sign Up </Text>
        </TouchableOpacity>

        <Button
          title='Already A Member? Sign In'
          onPress={this.signUpClick}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  signUpButton: {
    flexDirection: 'row',
    height: 40,
    width: 140,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    marginBottom: 10,
    borderRadius: 10
  },
  textInput: {
    height: 40,
    width: width * 0.5,
    fontSize: 24
  }
});

function mapStateToProps(state) {
  return {
    theme: state.theme,
    avatars: state.avatars
  };
}

export default connect(mapStateToProps, actions)(SignUpScreen);
