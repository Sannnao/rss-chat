import { REQUEST_MESSAGES, RECEIVE_MESSAGES, SEND_MESSAGE } from '../actions/';

const initialState = [];

export function messages(state = initialState, action) {
  switch (action.type) {
    case SEND_MESSAGE:
      return [...state, action.message];
    case REQUEST_MESSAGES:
      return state;
    case RECEIVE_MESSAGES:
      return [...state, ...action.messages];
    default:
      return state;
  }
}