import React, { Component } from 'react';

import Message from '../Message/';
import Input from '../Input';
import Login from '../Login';

import ReconnectingWebSocket from 'reconnecting-websocket';

const URL = 'wss://wssproxy.herokuapp.com/';

class Chat extends Component {
  constructor(props) {
    super(props);

    this.ws = new ReconnectingWebSocket(URL, null, {
      minReconnectionDelay: 5000,
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

  componentDidUpdate() {
    this.scrollToBottom();
  }

  handleOfflineMessages() {
    const offlineMessages = this.props.offlineMessages.length
      ? this.props.offlineMessages
      : JSON.parse(this.ls.getItem('offMessages'));

    this.ls.removeItem('offMessages');
    this.props.clearOfflineMessages();
    console.log(this.props.offlineMessages);

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

  scrollToBottom() {
    const messageContainer = document.querySelector('.message-container');
    messageContainer.scrollTop = messageContainer.scrollHeight;
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
      <div
        style={this.state.offline ? { opacity: '0.8' } : { opacity: '1' }}
        className="chat-container"
      >
        <Login handleSubmit={this.handleLoginSubmit} />

        <ul className="message-container">
          {messages.map(answer => {
            const { from, time, id, message } = answer;
            return (
              <Message
                isYourMessage={from === this.state.name}
                key={id}
                name={from}
                time={time}
                message={message}
              />
            );
          })}
        </ul>
        
        <Input offline={this.state.offline} sendMessage={this.sendMessage} />
      </div>
    );
  }
}

export default Chat;
