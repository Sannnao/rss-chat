import { combineReducers } from 'redux';
import {
  CLEAR_OFFLINE_MESSAGES,
  RECEIVE_MESSAGES,
  RECEIVE_MESSAGE,
  SEND_OFFLINE_MESSAGE,
  SET_IS_ONLINE,
  SET_NAME,
} from '../actions/';

function receiveMessages(state = [], action) {
  switch (action.type) {
    case RECEIVE_MESSAGES:
      return [...action.messages];
    case RECEIVE_MESSAGE:
      return [...state, ...action.message];
    default:
      return state;
  }
}

function offlineMessages(state = [], action) {
  switch (action.type) {
    case SEND_OFFLINE_MESSAGE:
      return [...state, action.message];
    case CLEAR_OFFLINE_MESSAGES:
      return [];
    default:
      return state;
  }
}

function isOnline(state = false, action) {
  if (action.type === SET_IS_ONLINE) {
    return action.payload;
  }

  return state;
}

function name(state = 'unknown monkey', action) {
  if (action.type === SET_NAME) {
    return action.payload;
  }

  return state;
}

const messages = combineReducers({
  name,
  isOnline,
  receiveMessages,
  offlineMessages,
})

export default messages
