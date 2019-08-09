import { createStore } from 'redux';

const messages = (state = [], action) => {
  switch (action.type) {
    case "SEND_MESSAGE":
      return [...state, ...action.message];
    default:
      return state;
  }
};

const store = createStore(messages);

export default store;