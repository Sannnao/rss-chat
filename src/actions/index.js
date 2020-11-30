export const INITIAL_LOADING = 'INITIAL_LOADING';
export const CLEAR_OFFLINE_MESSAGES = 'CLEAR_OFFLINE_MESSAGES';
export const RECEIVE_MESSAGES = 'RECEIVE_MESSAGES';
export const RECEIVE_MESSAGE = 'RECEIVE_MESSAGE';
export const SEND_MESSAGE = 'SEND_MESSAGE';
export const SET_IS_ONLINE = 'SET_IS_ONLINE';

export const initialLoading = (ws) => {
  return (dispatch) => {
    ws.addEventListener('open', () => {
      console.log('open');

      dispatch(setIsOnline(true));
      dispatch(receiveMessages(ws));
    });

    ws.addEventListener('close', () => {
      console.log('Socket is closed. Reconnect will be attempted soon...');

      dispatch(setIsOnline(false));
    });
  }
}

export function setIsOnline(isOnline) {
  return { type: SET_IS_ONLINE, payload: isOnline };
}

export function clearOfflineMessages() {
  return { type: CLEAR_OFFLINE_MESSAGES };
}

export function sendMessage(message) {
  return function (dispatch) {
    dispatch({ type: SEND_MESSAGE, message });
  };
}

export function receiveMessages(ws) {
  return function (dispatch) {
    ws.addEventListener('message', (e) => {
      const receivedData = JSON.parse(e.data);

      if (receivedData.length !== 1) {
        const messages = receivedData.reverse();

        dispatch({ type: RECEIVE_MESSAGES, messages });
      } else {
        const { from, message } = receivedData[0];

        Notification.requestPermission((permission) => {
          if (permission === 'granted' && document.hidden) {

            const notifyOptions = {
              body: `${from}`,
              silent: true,
            };

            new Notification(`${message}:`, notifyOptions);
          }
        });

        dispatch({ type: RECEIVE_MESSAGE, message: receivedData });
      }
    });
  };
}
