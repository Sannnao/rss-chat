import React from 'react';
import { useSelector } from 'react-redux';

const Message = ({ messageData: { time, from, message }}) => {
  const name = useSelector((state) => state.name);

  const messageTime = new Date(time)
    .toISOString()
    .split('T')[1]
    .split('.')[0];

  const isYourMessage = from === name;
  const style = isYourMessage
    ? { alignSelf: 'flex-end' }
    : { alignSelf: 'flex-start' };

  return (
    <li style={style} className="message-wrap">
      <div className="message-header">
        <h2 className="message-name">{from}</h2>
        <p className="message-time">{messageTime}</p>
      </div>
      <p className="message">{message}</p>
    </li>
  );
};

export default Message;
