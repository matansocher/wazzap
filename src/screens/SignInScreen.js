import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Button, Icon } from 'react-native-elements';
import fire from '../firebase';
import * as actions from '../actions/index';

class SignInScreen extends Component {
  static navigationOptions = {
    title: 'Chats',
    tabBarIcon: ({ tintColor }) => {
      return <Icon name="favorite" size={30} color={tintColor} />;
    }
  }

  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      loading: false
    }
  }

  singInClick = () => {
    // this.setState({ loading: true }, () => {
    //   let signInMessage = '';
    //   const { email, password } = this.state;
    //   fire.auth().signInWithEmailAndPassword(email, password).then(user => {
    //     this.props.actionLoginUser(user.uid, () => {
    //       this.props.navigation.navigate('Chats');
    //     });
    //   }).catch(e => {
    //     signInMessage = e.message;
    //     this.setState({ loading: false, signInMessage });
    //   });
    // });
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
        <Text>SignInScreen</Text>
        <Text>SignInScreen</Text>
        <Text>SignInScreen</Text>
        <Text>SignInScreen</Text>
        <Text>SignInScreen</Text>
        <Text>SignInScreen</Text>

        <TextInput
          style={{height: 40}}
          placeholder="Email"
          onChangeText={(text) => this.setState({ email: text })}
        />

        <TextInput
          style={{height: 40}}
          placeholder="Email"
          onChangeText={(text) => this.setState({ email: text })}
        />

        <Button
          onPress={this.singInClick}
          title="Sign In"
          color="#841584"
        />

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
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default connect(null, actions)(SignInScreen);
