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

import SignInScreen from './src/screens/SignInScreen';
import SignUpScreen from './src/screens/SignUpScreen';

export default class App extends React.Component {

  // componentDidMount() {

  // }

  render() {

    const MainNavigator = TabNavigator({
      welcome: { screen: WelcomeScreen },
      auth: { screen: AuthScreen },
      main: {
        screen: TabNavigator({
          map: { screen: MapScreen },
          deck: { screen: DeckScreen },
          review: {
            screen: StackNavigator({
              review: { screen: ReviewScreen },
              settings: { screen: SettingsScreen }
            })
          }
        }, {
          tabBarPosition: 'bottom',
          tabBarOptions: {
            labelStyle: { fontSize: 12 }
          }
        })
      }
    }, {
      navigationOptions: {
        tabBar: { visible: false }
      },
      lazyLoad: true
    });


    const MainNavigator = createBottomTabNavigator({
      main: {
        screen: createBottomTabNavigator({
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
        // tabBarVisible: false
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

