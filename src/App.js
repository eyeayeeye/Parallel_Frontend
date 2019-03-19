import './App.css';
import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import Login from './login-page/Login';
import Register from './register-page/Register';
import ChatPage from './chatroom-page/chatPage';

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
            <ChatPage uid={this.state.uid} username={this.state.username} />
          )}
          exact
        />
        <Route path="/register" component={() => <Register />} exact />
      </div>
    );
  }
}

export default App;
