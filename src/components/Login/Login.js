import React, { useState } from 'react';
import './login.css';

const Login = ({ handleLoginSubmit }) => {
  const [input, setInput] = useState('');

  const handleLogin = (e) => {
    setInput(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input) return;

    handleLoginSubmit(input);
    setInput('');
  };


    return (
      <form className="login-container" onSubmit={handleSubmit}>
        <input
          className="login-input"
          onChange={handleLogin}
          value={input}
          placeholder="Enter your name..."
        />
        <button className="login-button" type="submit">
          Change name
        </button>
      </form>
    );
}

export default Login;
