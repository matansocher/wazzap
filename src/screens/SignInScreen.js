import React, { Component } from 'react';
import { StyleSheet, View, Text, TextInput, Image, Button, TouchableOpacity, Dimensions } from 'react-native';
import { Icon } from 'react-native-elements';
// import { Ionicons } from '@expo/vector-icons';
import fire from '../firebase';
import { connect } from 'react-redux';
import * as actions from '../actions/index';
import { getCircularProgress } from '../actions/CommonFunctions';

const width = Dimensions.get('window').width;

class SignInScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      loading: false
    }
  }

  singInClick = () => {
    this.setState({ loading: true }, () => {
      let signInMessage = '';
      const { email, password } = this.state;
      fire.auth().signInWithEmailAndPassword(email, password).then(user => {
        this.props.actionLoginUser(user.uid, () => {
          this.props.navigation.navigate('Chats');
        });
      }).catch(e => {
        signInMessage = e.message;
        this.setState({ loading: false, signInMessage });
      });
    });
  }

  signUpClick = () => {
    this.props.navigation.navigate('SignUp');
  }

  // handleChange = (text) => {
  //   var change = {};
  //   change[e.target.name] = e.target.value;
  //   this.setState(change, () => {
  //   });
  // }

  render() {
    return (
      <View style={styles.container}>
        <Image
          style={{ width: 100, height: 100 }}
          source={require('../assets/logo.png')}
        />

        {this.state.loading ? getCircularProgress() : <View />}

        <TextInput
          style={styles.textInput}
          placeholder="Email"
          onChangeText={(email) => this.setState({ email })}
        />

        <TextInput
          style={styles.textInput}
          placeholder="Password"
          secureTextEntry={true}
          onChangeText={(password) => this.setState({ password })}
        />

        {this.state.signInMessage ?
          <Text style={{ color: 'red', fontWeight: 'bold' }}>
            {this.state.signInMessage}
          </Text>
          : <View />}

        <TouchableOpacity
          onPress={this.singInClick}
          style={styles.signInButton}
        >
          <Icon name="pregnant-woman" size={30} color='#000000' />

          <Text style={{ fontSize: 24 }} > Sign In </Text>
        </TouchableOpacity>

        <Button
          title='Sign Up For Wazzap'
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
    backgroundColor: '#373d47',
    alignItems: 'center',
    // justifyContent: 'center',
  },
  signInButton: {
    // flex: 1,
    flexDirection: 'row',
    height: 40,
    width: 140,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    marginBottom: 10,
    borderRadius: 10,
    backgroundColor: '#00A865'
  },
  textInput: {
    height: 40,
    width: width * 0.5,
    fontSize: 24
  }
});

export default connect(null, actions)(SignInScreen);
