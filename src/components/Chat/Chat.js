import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Message from '../Message/';
import Input from '../Input';
import Login from '../Login';

import ReconnectingWebSocket from 'reconnecting-websocket';

const URL = 'wss://wssproxy.herokuapp.com/';

class Chat extends Component {
  constructor(props) {
    super(props);

    this.ls = window.localStorage;

    this.state = {
      name: 'unknown monkey',
      message: '',
      messages: [],
      ws: new ReconnectingWebSocket(URL, null, { minReconnectionDelay: 9000 }),
    };

    this.sendMessage = this.sendMessage.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.props.getMessages();

    this.state.ws.addEventListener('open', () => {
      console.log('open');

      const offlineMessages = this.props.offlineMessages.length
        ? this.props.offlineMessages
        : JSON.parse(this.ls.getItem('offMessages'));

      this.ls.removeItem('offMessages');
      this.props.requestMessages();
      console.log(this.props.offlineMessages);

      if (offlineMessages) {
        for (let i = 0; i < offlineMessages.length; i++) {
          setTimeout(() => {
            this.state.ws.send(
              JSON.stringify({
                from: this.state.name,
                message: offlineMessages[i],
              })
            );
          }, 2000);
        }
      }
    });

    this.state.ws.addEventListener('close', () => {
      console.log('Socket is closed. Reconnect will be attempted in 5 second.');
    });

    window.onbeforeunload = () => {
      this.ls.setItem(
        'offMessages',
        JSON.stringify(this.props.offlineMessages)
      );
    };

    this.setState({ name: this.ls.getItem('nickname') });
  }

  componentDidUpdate() {
    const messageContainer = document.querySelector('.message-container');
    messageContainer.scrollTop = messageContainer.scrollHeight;
  }

  sendMessage(message) {
    if (this.state.ws.readyState === 1) {
      this.state.ws.send(
        JSON.stringify({ from: this.state.name, message: message })
      );
    } else if (this.state.ws.readyState === 3) {
      this.props.sendMessage(this.state.name, message);
    }
  }

  handleSubmit(name) {
    this.ls.setItem('nickname', name);

    this.setState({ name: this.ls.getItem('nickname') });
  }

  render() {
    const { messages } = this.props;

    return (
      <div className="chat-container">
        <Login handleSubmit={this.handleSubmit} />
        <ul className="message-container">
          {messages.map(answer => {
            const { from, time, id, message } = answer;
            return (
              <Message key={id} name={from} time={time} message={message} />
            );
          })}
        </ul>
        <Input sendMessage={this.sendMessage} />
      </div>
    );
  }
}

Chat.propTypes = {
  messages: PropTypes.array.isRequired,
  sendMessage: PropTypes.func.isRequired,
  getMessages: PropTypes.func.isRequired,
};

export default Chat;
