import React, { Component } from "react";
import PropTypes from 'prop-types';

import Message from "../Message/";
import Input from "../Input";


const URL = "ws://st-chat.shas.tel";

class Chat extends Component {
  constructor(props) {
    super(props);

    this.webSocket = new WebSocket(URL);

    this.state = {
      name: "unknown",
      message: "",
      messages: []
    };

    this.sendMessage = this.sendMessage.bind(this);
  }

  componentDidMount() {
    this.props.getMessages();
  }

  componentDidUpdate() {
    const messageContainer = document.querySelector(".message-container");
    messageContainer.scrollTop = messageContainer.scrollHeight;
  }

  sendMessage(message) {
    this.props.sendMessage(this.state.name, message);

    this.webSocket.send(JSON.stringify({ from: this.state.name, message: message }));
  }

  render() {
    const { messages } = this.props;

    return (
      <div className="chat-container">
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
}

export default Chat;
