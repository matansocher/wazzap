import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
// import propTypes from 'proptypes';
import { updateLastSeen, getDateHourString } from '../actions/CommonFunctions';

export default function (ComposedComponent) {
  class AuthNStatus extends Component {

    // static contextTypes = {
    //   router: propTypes.object
    // }

    // componentWillMount() {
    //   if (_.isEmpty(this.props.user)) {
    //     this.context.navigation.navigate('Chats')
    //   }
    //   this.onUnload();
    // }

    // componentWillUpdate(nextProps) {
    //   if (_.isEmpty(nextProps.user)) {
    //     this.context.navigation.navigate('Chats')
    //   }
    // }

    // componentWillUnmount() {
    //   this.onUnload();
    // }

    // onUnload = e => {
    //   const { uid } = this.props.user;
    //   const lastSeen = getDateHourString();
    //   updateLastSeen(uid, lastSeen, () => { });
    // }

    render() {
      return <ComposedComponent {...this.props} />
    }
  }

  function mapStateToProps(state) {
    return { user: state.user }
  }

  return connect(mapStateToProps)(AuthNStatus);
}