import ReconnectingWebSocket from 'reconnecting-websocket';

export const REQUEST_MESSAGES = 'REQUEST_MESSAGES';
export const RECEIVE_MESSAGES = 'RECEIVE_MESSAGES';
export const SEND_MESSAGE = 'SEND_MESSAGE';

const URL = 'ws://st-chat.shas.tel';

export function requestMessages() {
  return { type: REQUEST_MESSAGES };
}

export function sendMessage(name, message) {
  return function(dispatch) {
    const ws = new ReconnectingWebSocket(URL);

    // if (ws.readyState === 1) {
    //   ws.send(JSON.stringify({ from: name, message: message }));
    // } else if (ws.readyState === 3)  {
    //   dispatch({ type: SEND_MESSAGE, message });
    // }
    ws.close();

    dispatch({ type: SEND_MESSAGE, message });
  };
}

export function getMessages() {
  return function(dispatch) {
    const ws = new ReconnectingWebSocket(URL);

    ws.addEventListener('message', e => {
      const messages = JSON.parse(e.data).reverse();

      dispatch({ type: RECEIVE_MESSAGES, messages });
    });
  };
}
