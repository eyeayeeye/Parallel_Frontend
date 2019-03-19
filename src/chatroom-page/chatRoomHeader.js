import React, { Component } from 'react';
import { Avatar } from 'antd';
import ButtonRed from '../login-register-component/Button-red';
import './chatRoomHeader.css';

class ChatRoomHeader extends Component {
  render() {
    return (
      <div className="chatroom-header">
        <div className="header-desc">
          <Avatar
            size="large"
            style={{
              color: '#f56a00',
              backgroundColor: '#fde3cf'
            }}
          >
            G
          </Avatar>
          <div className="header-name">
            <div>Group Name</div>
            <div style={{ fontSize: '12px' }}> group id</div>
          </div>
        </div>
        <ButtonRed
          name="leave group"
          onClick={() => this.props.leaveGroup()}
          style={{ marginBottom: '10px' }}
        />
      </div>
    );
  }
}

export default ChatRoomHeader;
