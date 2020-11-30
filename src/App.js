import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { initialLoading } from './actions';
import './App.css';

import Chat from './components/Chat';

import ReconnectingWebSocket from 'reconnecting-websocket';

const URL = 'wss://wssproxy.herokuapp.com/';

const App = () => {
  const [name, setName] = useState('unknown monkey');
  const messages = useSelector(state => state.receiveMessages);
  const isOnline = useSelector(state => state.isOnline);
  const dispatch = useDispatch();

  useEffect(() => {
    const ws = new ReconnectingWebSocket(URL, null, {
      minReconnectionDelay: 1000,
    });

    dispatch(initialLoading(ws));

    // this.handleOfflineMessages();

    // window.onbeforeunload = () => {
    //   this.ls.setItem(
    //     'offMessages',
    //     JSON.stringify(this.props.offlineMessages)
    //   );
    // };
  }, []);

  useEffect(() => {
    const savedUser = localStorage.getItem('nickname');

    if (savedUser) {
      setName(savedUser);
    }
  }, []);

  // handleOfflineMessages() {
  //   const offlineMessages = this.props.offlineMessages.length
  //     ? this.props.offlineMessages
  //     : JSON.parse(this.ls.getItem('offMessages'));

  //   this.ls.removeItem('offMessages');
  //   this.props.clearOfflineMessages();

  //   if (offlineMessages) {
  //     for (let i = 0; i < offlineMessages.length; i++) {
  //       setTimeout(() => {
  //         this.ws.send(
  //           JSON.stringify({
  //             from: this.state.name,
  //             message: offlineMessages[i],
  //           })
  //         );
  //       }, 2000);
  //     }
  //   }
  // }

  const sendMessage = (message) => {
    if (this.ws.readyState === 1) {
      this.ws.send(JSON.stringify({ from: this.state.name, message: message }));
    } else if (this.ws.readyState === 3) {
      this.props.sendMessage(message);
    }
  };

  const handleLoginSubmit = (name) => {
    this.ls.setItem('nickname', name);

    this.setState({ name: this.ls.getItem('nickname') });
  };

  return (
    <div className="app-container">
      <Chat
        name={name}
        messages={messages}
        offline={!isOnline}
        handleLoginSubmit={handleLoginSubmit}
        sendMessage={sendMessage}
      />
    </div>
  );
};

export default App;
