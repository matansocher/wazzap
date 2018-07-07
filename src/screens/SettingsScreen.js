import React, { Component } from 'react';
import { StyleSheet, View, Text, Switch } from 'react-native';
import { Icon, ListItem, Avatar } from 'react-native-elements';
import { connect } from 'react-redux';
import * as actions from '../actions/index';

class SettingsScreen extends Component {
  static navigationOptions = {
    title: 'Settings',
    tabBarIcon: ({ tintColor }) => {
      return <Icon name="settings" size={30} color={tintColor} />;
    }
  }

  constructor(props) {
    super(props);
    this.state = {
      darkModeSwitch: false,
      notificationsSwitch: false
    }
  }

  darkModeSwitchChange = (value) => {
    this.setState({ darkModeSwitch: value });
    this.props.actionChangeTheme(value); // true - dark, false - light
  }

  notificationsSwitchChange = (value) => {
    this.setState({ notificationsSwitch: value });
  }

  render() {
    return (
      <View style={[styles.container, { backgroundColor: this.props.theme.primaryBackgroundColor }]}>
        <Text>Dark Mode</Text>
        <Switch
          onValueChange={this.darkModeSwitchChange}
          value={this.state.darkModeSwitch} />
        <Text>notifications</Text>
        <Switch
          onValueChange={this.notificationsSwitchChange}
          value={this.state.notificationsSwitch}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  }
});

function mapStateToProps(state) {
  return { theme: state.theme };
}

export default connect(mapStateToProps, actions)(SettingsScreen);
