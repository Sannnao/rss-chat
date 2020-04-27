import React from 'react';

const Message = props => {
	const { time, name, message, isYourMessage } = props;

  const messageTime = new Date(time)
    .toISOString()
    .split('T')[1]
		.split('.')[0];

	const style = isYourMessage ? { alignSelf: 'flex-end' } : { alignSelf: 'flex-start' };

  return (
    <li
      style={style}
      className="message-wrap"
    >
      <div className="message-header">
        <h2 className="message-name">{name}</h2>
        <p className="message-time">{messageTime}</p>
      </div>
      <p className="message">{message}</p>
    </li>
  );
};

export default Message;
