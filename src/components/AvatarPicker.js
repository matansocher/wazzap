import React, { Component } from 'react';
import { View, Picker, Dimensions } from 'react-native';
import { Divider } from 'react-native-elements';
// import { connect } from 'react-redux';
// import * as actions from '../actions/index';
import _ from 'lodash';
import { getAvatarsNames } from '../actions/CommonFunctions';
import { getCircularProgress } from '../actions/CommonFunctions';

const width = Dimensions.get('window').width;

class AvatarPicker extends Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  changeAvatar = (value, index) => {
    this.props.changeAvatar(value);
  }

  renderAvatars() {
    const avatars = getAvatarsNames();
    if (_.isEmpty(avatars)) {
      return;
    }
    return (
      avatars.map(avatar => {
        return (
          <Picker.Item color="#9295b5" key={avatar} value={avatar} label={avatar} />
        );
      })
    );
  }

  // leftIcon={
  //   <Avatar size={100} src={require(`../avatars/${avatar}`)} value={avatar}
  //     style={{ borderColor: '#000000', borderStyle: 'solid', borderWidth: 2 }} />
  // }

  render() {
    if (_.isEmpty(this.props.avatars)) {
      return getCircularProgress()
    }
    return (
      <View style={{ backgroundColor: '#262B34' }}>
        <Divider style={{ backgroundColor: '#9295b5' }} />
        <Picker 
          selectedValue={this.props.avatar}
          onValueChange={this.changeAvatar}
          style={{ width: width - 100 }}>
          {this.renderAvatars()}
        </Picker>
        <Divider style={{ backgroundColor: '#9295b5' }} />
      </View>
    );
  }
}

export default AvatarPicker;

// function mapStateToProps(state) {
//   return {
//     avatars: state.avatars
//   };
// }

// export default connect(mapStateToProps, actions)(AvatarPicker);