import { combineReducers } from 'redux';
import { REQUEST_MESSAGES, RECEIVE_MESSAGES, RECEIVE_MESSAGE, SEND_MESSAGE } from '../actions/';

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

function sendMessages(state = [], action) {
  switch (action.type) {
    case SEND_MESSAGE:
      return [...state, action.message];
    case REQUEST_MESSAGES:
      return [];
    default:
      return state;
  }
}

const messages = combineReducers({
  receiveMessages,
  sendMessages,
})

export default messages