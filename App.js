import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Provider } from 'react-redux';
import { createBottomTabNavigator, createStackNavigator } from 'react-navigation';

import store from './src/store';

import InfoScreen from './src/screens/InfoScreen';
import ChatsScreen from './src/screens/ChatsScreen';
import ConversationScreen from './src/screens/ConversationScreen';
import ContactInfoScreen from './src/screens/ContactInfoScreen';
import FriendsScreen from './src/screens/FriendsScreen';
import SettingsScreen from './src/screens/SettingsScreen';
import StatusScreen from './src/screens/StatusScreen';

import SignInScreen from './src/screens/SignInScreen';
import SignUpScreen from './src/screens/SignUpScreen';

export default class App extends React.Component {

  // componentDidMount() {

  // }

  render() {
    const MainNavigator = createBottomTabNavigator({
      main: {
        screen: createBottomTabNavigator({
          Status: StatusScreen,
          Info: InfoScreen,
          Friends: FriendsScreen,
          Chats: createStackNavigator({
            Chats: { screen: ChatsScreen },
            Conversation: { screen: ConversationScreen },
            ContactInfo: { screen: ContactInfoScreen }
          }),
          Settings: SettingsScreen,
        })
      },
      SignIn: SignInScreen,
      SignUp: SignUpScreen,
    }, {
      navigationOptions: {
        tabBarVisible: false
      },
      lazyLoad: true
    });

    return (
      <Provider store={store}>
        <View style={styles.container}>
          <MainNavigator />
        </View>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
});

