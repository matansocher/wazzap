// import _ from 'lodash';
import { CHANGE_THEME } from '../actions/types';
import { darkTheme } from '../CONSTANTS';

const INITIAL_STATE = darkTheme;

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case CHANGE_THEME:
      return action.payload;
    default:
      return state;
  }
}
