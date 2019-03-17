import React, { Component } from 'react';
import ChatRoom from './chatRoom';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="main">
          <div style={{ width: '30%', height: '100hv' }} />
          <ChatRoom />
        </div>
      </div>
    );
  }
}

export default App;
