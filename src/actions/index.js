import ReconnectingWebSocket from 'reconnecting-websocket';

export const CLEAR_OFFLINE_MESSAGES = 'CLEAR_OFFLINE_MESSAGES';
export const RECEIVE_MESSAGES = 'RECEIVE_MESSAGES';
export const RECEIVE_MESSAGE = 'RECEIVE_MESSAGE';
export const SEND_MESSAGE = 'SEND_MESSAGE';

const URL = 'wss://wssproxy.herokuapp.com/';

export function clearOfflineMessages() {
  return { type: CLEAR_OFFLINE_MESSAGES };
}

export function sendMessage(message) {
  return function(dispatch) {
    console.log('off');

    dispatch({ type: SEND_MESSAGE, message });
  };
}

export function receiveMessages() {
  return function(dispatch) {
    const ws = new ReconnectingWebSocket(URL, null, {
      minReconnectionDelay: 5000,
    });

    ws.addEventListener('message', e => {
      const receivedData = JSON.parse(e.data);

      if (receivedData.length !== 1) {
        const messages = receivedData.reverse();

        dispatch({ type: RECEIVE_MESSAGES, messages });
      } else {
        const message = receivedData;

        Notification.requestPermission(permission => {
          if (permission === 'granted') {
            if (document.hidden) {
              const name = message[0].from;
              const messageContent = message[0].message;

              const notifyOptions = {
                body: `${name}`,
                silent: true,
              };

              new Notification(`${messageContent}:`, notifyOptions);
            }
          }
        });

        dispatch({ type: RECEIVE_MESSAGE, message });
      }
    });
  };
}
