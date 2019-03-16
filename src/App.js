import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import ChatList from "./chatList";

class App extends Component {
  render() {
    return (
      <div className="App">
        <ChatList />
      </div>
    );
  }
}

export default App;
