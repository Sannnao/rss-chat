import ReconnectingWebSocket from 'reconnecting-websocket';

export const REQUEST_MESSAGES = 'REQUEST_MESSAGES';
export const RECEIVE_MESSAGES = 'RECEIVE_MESSAGES';
export const SEND_MESSAGE = 'SEND_MESSAGE';

const URL = 'wss://wssproxy.herokuapp.com/';

export function requestMessages() {
  return { type: REQUEST_MESSAGES };
}

export function sendMessage(name, message) {
  return function(dispatch) {
    const ws = new ReconnectingWebSocket(URL, null, {
      minReconnectionDelay: 10000,
    });

    // if (ws.readyState === 1) {
    //   ws.send(JSON.stringify({ from: name, message: message }));
    // } else if (ws.readyState === 3)  {
    //   dispatch({ type: SEND_MESSAGE, message });
    // }
    console.log('off');

    dispatch({ type: SEND_MESSAGE, message });
  };
}

export function getMessages() {
  return function(dispatch) {
    const ws = new ReconnectingWebSocket(URL, null, {
      minReconnectionDelay: 10000,
    });

    ws.addEventListener('message', e => {
      const messages = JSON.parse(e.data).reverse();

      if (document.hidden) {
        const notifyOptions = {
          body: `${messages[messages.length - 1].message}`,
          silent: true,
        };

        const notifyMessage = new Notification(
          `${messages[messages.length - 1].from}:`,
          notifyOptions
        );
      }

      dispatch({ type: RECEIVE_MESSAGES, messages });
    });
  };
}
