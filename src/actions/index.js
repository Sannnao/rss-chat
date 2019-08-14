import ReconnectingWebSocket from 'reconnecting-websocket';

export const REQUEST_MESSAGES = 'REQUEST_MESSAGES';
export const RECEIVE_MESSAGES = 'RECEIVE_MESSAGES';
export const RECEIVE_MESSAGE = 'RECEIVE_MESSAGE';
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

export function receiveMessages() {
  return function(dispatch) {
    const ws = new ReconnectingWebSocket(URL, null, {
      minReconnectionDelay: 10000,
    });

    ws.addEventListener('message', e => {
      const receivedData = JSON.parse(e.data);

      if (receivedData.length !== 1) {
        const messages = receivedData.reverse();

        dispatch({ type: RECEIVE_MESSAGES, messages });
      } else {
        const message = receivedData;

        if (document.hidden) {
          const name = message[0].from;
          const messageContent = message[0].message;

          const notifyOptions = {
            body: `${name}`,
            silent: true,
          };

          const notifyMessage = new Notification(
            `${messageContent}:`,
            notifyOptions
          );
        }

        dispatch({ type: RECEIVE_MESSAGE, message });
      }
    });
  };
}
