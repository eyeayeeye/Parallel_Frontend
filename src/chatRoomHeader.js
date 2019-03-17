import React, { Component } from 'react';
import { Button, Avatar } from 'antd';
import { Icon } from 'antd';
import './chatRoomHeader.css';

class chatRoomHeader extends Component {
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
        <Button className="leave-btn" type="primary">
          leave group
        </Button>
      </div>
    );
  }
}

export default chatRoomHeader;
