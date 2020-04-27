import React, { Component } from 'react';
import './chat.css';

import Message from '../Message/';
import Input from '../Input';
import Login from '../Login';

class Chat extends Component {
	messageRef = React.createRef();

  componentDidUpdate() {
    this.scrollToBottom();
	}

  scrollToBottom() {
    this.messageRef.current.scrollTop = this.messageRef.current.scrollHeight;
  }

  render() {
		const { messages, sendMessage, handleLoginSubmit, offline, name } = this.props;

    return (
      <div
        style={offline ? { opacity: '0.8' } : { opacity: '1' }}
        className="chat-container"
      >
        <Login handleSubmit={handleLoginSubmit} />

        <ul className="message-container" ref={this.messageRef}>
          {messages.map(answer => {
            const { from, time, id, message } = answer;
						const isYourMessage = from === name;

            return (
              <Message
                isYourMessage={isYourMessage}
                key={id}
                name={from}
                time={time}
                message={message}
              />
            );
          })}
        </ul>

        <Input offline={offline} sendMessage={sendMessage} />
      </div>
    );
  }
}

export default Chat;
