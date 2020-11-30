import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { WebsocketContext } from './context/websocketContext';
import { initialLoading } from './actions';
import './App.css';

import { Chat } from './components';

import ReconnectingWebSocket from 'reconnecting-websocket';
const URL = 'wss://wssproxy.herokuapp.com/';

const App = () => {
  const [ws, setWs] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const ws = new ReconnectingWebSocket(URL, null, {
      minReconnectionDelay: 1000,
    });

    setWs(ws);
    dispatch(initialLoading(ws));
  }, [dispatch]);

  return (
    <WebsocketContext.Provider value={ws}>
      <div className="app-container">
        <Chat />
      </div>
    </WebsocketContext.Provider>
  );
};

export default App;
