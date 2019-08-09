import React, { Component } from "react";

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
      messages: [],
    };

    this.sendMessage = this.sendMessage.bind(this);
  }

  

  componentDidMount() {
    this.webSocket.onopen = () => {
      console.log('Connected...');
    };

    this.webSocket.onmessage = e => {
      const recivedData = JSON.parse(e.data);

      this.setState(state => ({messages: [...recivedData, ...state.messages]}));
    };

    this.webSocket.onclose = () => {
      console.log('disconnected');
      this.setState({
        webSocket: new WebSocket(URL),
      })
    } 
  }

  componentDidUpdate() {
    const messageContainer = document.querySelector('.message-container');
    messageContainer.scrollTop = messageContainer.scrollHeight;
  }

  sendMessage(message) {
    this.webSocket.send(
      JSON.stringify({ from: this.state.name, message: message })
    );

    this.setState(state => ({messages: [...state.messages]}));
  }

  render() {
    const reversedMessages = [...this.state.messages].reverse();

    return (
      <div className="chat-container">
        <ul className="message-container">
          {reversedMessages.map(answer => {
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

export default Chat;
