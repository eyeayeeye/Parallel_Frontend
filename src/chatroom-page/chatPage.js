import React, { Component } from 'react';
import ChatRoom from './chatRoom';
import './chatPage.css';
import { withRouter } from 'react-router-dom';

class ChatPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      uid: this.props.uid,
      username: this.props.username
    };
  }

  render() {
    return (
      <div className="main">
        <div style={{ width: '30%', height: '100hv' }} />
        <ChatRoom uid={this.state.uid} username={this.state.username} />
      </div>
    );
  }
}

export default withRouter(ChatPage);
