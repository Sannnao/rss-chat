import React, { useState, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { WebsocketContext } from '../../context/websocketContext';
import { sendMessage } from '../../actions';
import './input.css';

export const Input = () => {
  const [input, setInput] = useState('');
  const ws = useContext(WebsocketContext);
  const name = useSelector(state => state.name);
  const isOnline = useSelector((state) => state.isOnline);
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input) return;

    dispatch(sendMessage(ws, name, input));
    setInput('');
  };

  const handleInput = (e) => {
    setInput(e.target.value);
  };

  return (
    <form onSubmit={handleSubmit} className="input-container">
      <input
        className="input-field"
        onChange={handleInput}
        value={input}
        placeholder={
          isOnline
            ? 'Enter a message...'
            : 'Chat is offline but you can send messages...'
        }
      />
      <button className="submit-button" type="submit">
        Send
      </button>
    </form>
  );
};
