import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import './chat.css';

import { Message, Input, Login } from '..';

export const Chat = () => {
  const messages = useSelector((state) => state.receiveMessages);
  const isOnline = useSelector((state) => state.isOnline);
  const messageRef = useRef();

  useEffect(() => {
    const scrollToBottom = () => {
      messageRef.current.scrollTop = messageRef.current.scrollHeight;
    };

    scrollToBottom();
  }, [messages]);

  return (
    <div
      style={isOnline ? { opacity: '1' } : { opacity: '0.8' }}
      className="chat-container"
    >
      <Login />

      <ul className="message-container" ref={messageRef}>
        {messages.map((answer) => {
          const { id, ...messageData } = answer;

          return <Message key={id} messageData={messageData} />;
        })}
      </ul>

      <Input />
    </div>
  );
};
