import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Icon } from 'react-native-elements';
// import { connect } from 'react-redux';

class SettingsScreen extends Component {
  static navigationOptions = {
    title: 'Settings',
    tabBarIcon: ({ tintColor }) => {
      return <Icon name="favorite" size={30} color={tintColor} />;
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>Dark Mode</Text>
        <Text>Starred Messages</Text>
        <Text>notifications</Text>
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

// function mapStateToProps(state) {
//   return { likedJobs: state.likedJobs };
// }

// export default connect(mapStateToProps)(SettingsScreen);
export default SettingsScreen;