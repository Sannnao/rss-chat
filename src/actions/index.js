import { handleNotifications } from '../utils/handleNotifications';

export const INITIAL_LOADING = 'INITIAL_LOADING';
export const CLEAR_OFFLINE_MESSAGES = 'CLEAR_OFFLINE_MESSAGES';
export const RECEIVE_MESSAGES = 'RECEIVE_MESSAGES';
export const RECEIVE_MESSAGE = 'RECEIVE_MESSAGE';
export const SEND_OFFLINE_MESSAGE = 'SEND_OFFLINE_MESSAGE';
export const SET_IS_ONLINE = 'SET_IS_ONLINE';
export const SET_NAME = 'SET_NAME';

export const initialLoading = (ws) => {
  return (dispatch, getState) => {
    window.addEventListener('beforeunload', () => {
      const { offlineMessages } = getState();

      localStorage.setItem('offlineMessages', JSON.stringify(offlineMessages));
    });

    ws.addEventListener('open', () => {
      console.log('open');

      const name = localStorage.getItem('nickname');

      if (name) {
        dispatch(setName(name));
      }

      dispatch(handleOfflineMessages(ws));
      dispatch(setIsOnline(true));
    });

    dispatch(receiveMessages(ws));

    ws.addEventListener('close', () => {
      console.log('Socket is closed. Reconnect will be attempted soon...');

      dispatch(setIsOnline(false));
    });
  };
};

export function handleOfflineMessages(ws) {
  return (_, getState) => {
    const { offlineMessages, name } = getState();
    let messages;

    if (offlineMessages.length) {
      messages = offlineMessages;
      clearOfflineMessages();
    } else {
      messages = JSON.parse(localStorage.getItem('offlineMessages'));
      localStorage.removeItem('offlineMessages');
    }

    if (messages) {
      for (let i = 0; i < messages.length; i++) {
        setTimeout(() => {
          ws.send(
            JSON.stringify({
              from: name,
              message: messages[i],
            })
          );
        }, 0);
      }
    }
  };
}

export function setName(name) {
  return { type: SET_NAME, payload: name };
}

export function setIsOnline(isOnline) {
  return { type: SET_IS_ONLINE, payload: isOnline };
}

export function clearOfflineMessages() {
  return { type: CLEAR_OFFLINE_MESSAGES };
}

export function sendMessage(ws, name, message) {
  return function (dispatch) {
    if (ws.readyState === 1) {
      ws.send(JSON.stringify({ from: name, message }));
    } else if (ws.readyState === 3) {
      dispatch(sendOfflineMessage(message));
    }
  };
}

export function sendOfflineMessage(message) {
  return { type: SEND_OFFLINE_MESSAGE, message };
}

export function receiveMessages(ws) {
  return function (dispatch) {
    ws.addEventListener('message', (e) => {
      const receivedData = JSON.parse(e.data);

      if (receivedData.length !== 1) {
        const messages = receivedData.reverse();

        dispatch({ type: RECEIVE_MESSAGES, messages });
      } else {
        handleNotifications(receivedData);

        dispatch({ type: RECEIVE_MESSAGE, message: receivedData });
      }
    });
  };
}
