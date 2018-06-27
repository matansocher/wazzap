import React, { Component } from 'react';
import { StyleSheet, View, Text, TextInput } from 'react-native';
import { Button, Icon } from 'react-native-elements';
import fire from '../firebase';
import * as actions from '../actions/index';

class SignUpScreen extends Component {
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
      name: '',
      password: '',
      avatar: 'default.png',
      loading: false
    }
  }

  componentDidMount() {
    // if(_.isEmpty(this.props.avatars)) {
    //   this.setState({ loading: true }, () => {
    //     this.props.actionFetchAvatars(() => {
    //       this.setState({ loading: false });
    //     });
    //   });
    // }
  }

  singUpClick = () => {
    // this.setState({ loading: true }, () => {
    //   let signUpMessage = '';
    //   const { email, password, name, avatar } = this.state;
    //   if (validatePassword(password) === 'short') {
    //     signUpMessage = `Password should contain at least 6 chars`;
    //     this.setState({ loading: false, signUpMessage });
    //     return;
    //   }
    //   if (!name || name.length === 0) {
    //     signUpMessage = `Name is empty`;
    //     this.setState({ loading: false, signUpMessage });
    //     return;
    //   }
    //   if (validateEmail(email) && validatePassword(password)) {
    //     fire.auth().createUserWithEmailAndPassword(email, password)
    //       .then(user => {
    //         this.props.actionSignUpUser(email, name, avatar, user.uid, () => {
    //           this.props.navigation.navigate('Chats');
    //         });
    //       }).catch(e => {
    //         signUpMessage = e.message;
    //         this.setState({ loading: false, signUpMessage });
    //       });
    //   } else {
    //     signUpMessage = `Oops, something went wrong, please try again`;
    //     this.setState({ loading: false, signUpMessage });
    //   }
    // });
  }

  signInClick = () => {
    this.props.navigation.navigate('SignIn');
  }

  // handleChange = (e) => {
  //   var change = {};
  //   change[e.target.name] = e.target.value;
  //   this.setState(change);
  // }

  changeAvatar = (avatar) => {
    // console.log(avatar);
    // this.setState({ avatar });
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>SignUpScreen</Text>
        <Text>SignUpScreen</Text>
        <Text>SignUpScreen</Text>
        <Text>SignUpScreen</Text>
        <Text>SignUpScreen</Text>
        <Text>SignUpScreen</Text>

        <TextInput
          style={{height: 40}}
          placeholder="Email"
          onChangeText={(text) => this.setState({ email: text })}
        />

        <TextInput
          style={{height: 40}}
          placeholder="Name"
          onChangeText={(text) => this.setState({ name: text })}
        />

        <TextInput
          style={{height: 40}}
          placeholder="Password"
          onChangeText={(text) => this.setState({ password: text })}
        />

        <Button
          onPress={this.singInClick}
          title="Sign Up"
          color="#841584"
          accessibilityLabel="Sign Up button"
        />

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
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default connect(null, actions)(SignUpScreen);
