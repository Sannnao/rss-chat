import React from "react";
import "./App.css";

import Test from "./containers/Test";

class App extends React.Component {
  render() {
    return (
      <div className="app-container">
        <Test />
      </div>
    );
  }
}

export default App;
