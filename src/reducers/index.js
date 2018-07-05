import { combineReducers } from 'redux';
import theme from './reducer_theme';
import user from './reducer_user';
import contactList from './reducer_contact_list';
import currentChatUser from './reducer_current_chat_user';
import currentChatMessages from './reducer_current_chat_messages';
import searchFriends from './reducer_search_friends';
import avatars from './reducer_avatars';

const rootReducer = combineReducers({
  theme,
  user,
  contactList,
  currentChatUser,
  currentChatMessages,
  searchFriends,
  avatars
});

export default rootReducer;
