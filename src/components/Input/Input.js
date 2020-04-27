import React, { Component } from "react";
import './input.css';

const keyCodeEnter = 13;

class Input extends Component {
  constructor(props) {
    super(props);

    this.state = {
      input: ''
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInput = this.handleInput.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    // if (!this.state.input) return;

    this.props.sendMessage(this.state.input);
    this.setState({input: ''});
  }

  handleInput(e) {
    this.setState({ input: e.target.value });
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit} className="input-container">
        <input
          onKeyPress={(e) => e.keyCode === keyCodeEnter && this.handleSubmit}
          className="input-field"
          onChange={this.handleInput}
          value={this.state.input}
          placeholder={this.props.offline
            ? "Chat is offline but you can send messages..."
            : "Enter a message..."}
        />
        <button className="submit-button" type="submit">Send</button>
      </form>
    );
  }
}

export default Input;
