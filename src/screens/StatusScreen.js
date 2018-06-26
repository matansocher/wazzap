import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Icon } from 'react-native-elements';
// import { connect } from 'react-redux';

class StatusScreen extends Component {
  static navigationOptions = {
    title: 'Status',
    tabBarIcon: ({ tintColor }) => {
      return <Icon name="favorite" size={30} color={tintColor} />;
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>StatusScreen</Text>
        <Text>StatusScreen</Text>
        <Text>StatusScreen</Text>
        <Text>StatusScreen</Text>
        <Text>StatusScreen</Text>
        <Text>StatusScreen</Text>
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

// export default connect(mapStateToProps)(StatusScreen);
export default StatusScreen;