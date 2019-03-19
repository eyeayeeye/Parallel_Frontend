import './App.css';
import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import ChatRoom from './chatroom-page/chatRoom';
import Login from './login-page/Login';
import Register from './register-page/Register';

class App extends Component {
  state = { uid: '', username: '' };

  setUserData = (uid, username) => {
    this.setState({ uid, username });
  };

  render() {
    return (
      <div className="App">
        <Route
          path="/"
          component={() => <Login setUserData={this.setUserData} />}
          exact
        />
        <Route
          path="/home"
          component={() => (
            <div className="main">
              <div style={{ width: '30%', height: '100hv' }} />
              <ChatRoom uid={this.state.uid} username={this.state.username} />
            </div>
          )}
          exact
        />
        <Route path="/register" component={() => <Register />} exact />
      </div>
    );
  }
}

export default App;
