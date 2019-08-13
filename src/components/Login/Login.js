import React from 'react';

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      input: '',
    };

    this.handleLogin = this.handleLogin.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleLogin(e) {
    this.setState({ input: e.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();

    this.props.handleSubmit(this.state.input);
    this.setState({input: ''});
  }

  render() {
    return (
      <form className="login-container" onSubmit={this.handleSubmit}>
        <input
          className="login-input"
          onChange={this.handleLogin}
          value={this.state.input}
          placeholder="Enter your name..."
        />
        <button className="login-button" type="submit">
          Change name
        </button>
      </form>
    );
  }
}

export default Login;