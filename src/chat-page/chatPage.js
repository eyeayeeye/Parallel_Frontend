import React, { Component } from 'react';
import ChatRoom from './chatRoom';
import ChatList from './chatList';
import './chatPage.css';
import { withRouter } from 'react-router-dom';

class ChatPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      uid: this.props.uid,
      username: this.props.username,
      gid: ''
    };
  }

  handleSelectChat = gid => {
    this.setState({ gid });
  };

  render() {
    return (
      <div className="main">
        <ChatList
          handleSelectChat={this.handleSelectChat}
          uid={this.state.uid}
          username={this.state.username}
        />
        <ChatRoom
          uid={this.state.uid}
          username={this.state.username}
          gid={this.state.gid}
        />
      </div>
    );
  }
}

export default withRouter(ChatPage);
