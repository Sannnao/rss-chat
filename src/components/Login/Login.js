import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setName } from '../../actions';
import './login.css';

const Login = () => {
  const [input, setInput] = useState('');
  const dispatch = useDispatch()

  const handleLogin = (e) => {
    setInput(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input) return;

    localStorage.setItem('nickname', input);

    dispatch(setName(input));
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
