import React from 'react';
import { StyleSheet } from 'react-native';
import { Provider } from 'react-redux';
import { createBottomTabNavigator, createStackNavigator } from 'react-navigation';

import store from './src/store';

import InfoScreen from './src/screens/InfoScreen';
import ChatsScreen from './src/screens/ChatsScreen';
import FriendsScreen from './src/screens/FriendsScreen';
import SettingsScreen from './src/screens/SettingsScreen';
import ConversationScreen from './src/screens/ConversationScreen';
import ContactInfoScreen from './src/screens/ContactInfoScreen';

import SignInScreen from './src/screens/SignInScreen';
import SignUpScreen from './src/screens/SignUpScreen';

import AuthNStatusHOC from './src/components/AuthNStatusHOC';

class App extends React.Component {

  // componentDidMount() {

  // }

  render() {

    // const MainNavigator = TabNavigator({
    //   welcome: { screen: WelcomeScreen },
    //   auth: { screen: AuthScreen },
    //   main: {
    //     screen: TabNavigator({
    //       map: { screen: MapScreen },
    //       deck: { screen: DeckScreen },
    //       review: {
    //         screen: StackNavigator({
    //           review: { screen: ReviewScreen },
    //           settings: { screen: SettingsScreen }
    //         })
    //       }
    //     }, {
    //       tabBarPosition: 'bottom',
    //       tabBarOptions: {
    //         labelStyle: { fontSize: 12 }
    //       }
    //     })
    //   }
    // }, {
    //   navigationOptions: {
    //     tabBar: { visible: false }
    //   },
    //   lazyLoad: true
    // });

    
    const MainNavigator = createBottomTabNavigator({
      Chats: { screen: createBottomTabNavigator({
        Info: InfoScreen,
        Friends: FriendsScreen,
        Chats: {
          screen: createStackNavigator({
            Chats: { screen: ChatsScreen },
            Conversation: { screen: ConversationScreen },
            ContactInfo: { screen: ContactInfoScreen },
          })
        }, 
        Settings: SettingsScreen
      })},
      SignIn: SignInScreen,
      SignUp: SignUpScreen,
    }, {
      navigationOptions: {
        // tabBarVisible: false
      },
      // lazyLoad: true
    });

    return (
      <Provider store={store}>  
        <MainNavigator />
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

export default App;