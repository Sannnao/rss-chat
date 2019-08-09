import React from "react";

const Message = props => {
  const { time, name, message } = props;

  const messageTime = new Date(time).toISOString().split('T')[1].split('.')[0];

  return (
    <li className="message-wrap">
      <div className="message-header">
        <h2 className="message-name">{name}</h2>
        <p className="message-time">{messageTime}</p>
      </div>
      <p>{message}</p>
    </li>
  );
};

export default Message;
