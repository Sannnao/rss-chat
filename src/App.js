import React from 'react';
import './App.css';

import Chat from './components/Chat';

import ReconnectingWebSocket from 'reconnecting-websocket';

const URL = 'wss://wssproxy.herokuapp.com/';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.ws = new ReconnectingWebSocket(URL, null, {
      minReconnectionDelay: 1000,
    });
    this.ls = window.localStorage;

    this.state = {
      name: 'unknown monkey',
      offline: true,
    };

    this.sendMessage = this.sendMessage.bind(this);
    this.handleLoginSubmit = this.handleLoginSubmit.bind(this);
  }

  componentDidMount() {
    this.props.receiveMessages();

    this.ws.addEventListener('open', () => {
      this.handleOfflineMessages();

      console.log('open');
      this.setState({ offline: false });
    });

    this.ws.addEventListener('close', () => {
      console.log('Socket is closed. Reconnect will be attempted soon...');
      this.setState({ offline: true });
    });

    window.onbeforeunload = () => {
      this.ls.setItem(
        'offMessages',
        JSON.stringify(this.props.offlineMessages)
      );
    };

    if (this.ls.getItem('nickname')) {
      this.setState({ name: this.ls.getItem('nickname') });
    }
  }

  handleOfflineMessages() {
    const offlineMessages = this.props.offlineMessages.length
      ? this.props.offlineMessages
      : JSON.parse(this.ls.getItem('offMessages'));

    this.ls.removeItem('offMessages');
    this.props.clearOfflineMessages();

    if (offlineMessages) {
      for (let i = 0; i < offlineMessages.length; i++) {
        setTimeout(() => {
          this.ws.send(
            JSON.stringify({
              from: this.state.name,
              message: offlineMessages[i],
            })
          );
        }, 2000);
      }
    }
  }

  sendMessage(message) {
    if (this.ws.readyState === 1) {
      this.ws.send(JSON.stringify({ from: this.state.name, message: message }));
    } else if (this.ws.readyState === 3) {
      this.props.sendMessage(message);
    }
  }

  handleLoginSubmit(name) {
    this.ls.setItem('nickname', name);

    this.setState({ name: this.ls.getItem('nickname') });
  }

  render() {
    const { messages } = this.props;

    return (
      <div className="app-container">
        <Chat
				  name={this.state.name}
          messages={messages}
          offline={this.state.offline}
          handleLoginSubmit={this.handleLoginSubmit}
          sendMessage={this.sendMessage}
        />
      </div>
    );
  }
}

export default App;
