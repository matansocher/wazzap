import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Icon } from 'react-native-elements';
import { connect } from 'react-redux';
import * as actions from '../actions/index';

class InfoScreen extends Component {
  static navigationOptions = {
    title: 'Info',
    tabBarIcon: ({ tintColor }) => {
      return <Icon name="favorite" size={30} color={tintColor} />;
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>InfoScreen</Text>
        <Text>InfoScreen</Text>
        <Text>InfoScreen</Text>
        <Text>InfoScreen</Text>
        <Text>InfoScreen</Text>
        <Text>InfoScreen</Text>
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

function mapStateToProps(state) {
  return { 
    user: state.user,
    avatars: state.avatars
  };
}

export default connect(mapStateToProps, actions)(InfoScreen);