import React from "react";
import "./App.css";

import Chat from "./components/Chat/";

class App extends React.Component {
  render() {
    return (
      <div className="app-container">
        <Chat />
      </div>
    );
  }
}

export default App;
