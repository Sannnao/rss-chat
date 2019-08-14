import React from 'react';
import './App.css';

import ChatContainer from './containers/ChatContainer';

class App extends React.Component {
  render() {
    return (
      <div className="app-container">
        <ChatContainer />
      </div>
    );
  }
}

export default App;
