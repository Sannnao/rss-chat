import { combineReducers } from 'redux';
import { REQUEST_MESSAGES, RECEIVE_MESSAGES, SEND_MESSAGE } from '../actions/';

function receiveMessages(state = [], action) {
  switch (action.type) {
    case REQUEST_MESSAGES:
      return state;
    case RECEIVE_MESSAGES:
      return [...state, ...action.messages];
    default:
      return state;
  }
}

function sendMessages(state = [], action) {
  switch (action.type) {
    case SEND_MESSAGE:
      return [...state, action.message];
    default:
      return state;
  }
}

const messages = combineReducers({
  receiveMessages,
  sendMessages,
})

export default messages