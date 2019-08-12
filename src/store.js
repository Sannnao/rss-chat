import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const middlewares = [thunkMiddleware];

const enhancer = composeEnhancers(applyMiddleware(...middlewares));

function rootReducer(state = [], action) {
  console.log('reducer', state, action);
  switch(action.type) {
    case 'RECEIVE_MESSAGES':
      return [...state, ...action.messages];
    case 'SEND_MESSAGES':
      return [...state, action.message];
    default:
      return state;
  }
}

const store = createStore(rootReducer, enhancer);

export default store;