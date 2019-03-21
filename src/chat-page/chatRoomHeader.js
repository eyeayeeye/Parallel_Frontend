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
                        {this.props.groupName[0].toUpperCase()}
                    </Avatar>
                    <div className="header-name">
                        <div>{this.props.groupName}</div>
                        <div style={{ fontSize: '12px' }}>Group ID: {this.props.gid}</div>
                    </div>
                </div>

                <div className="button" onClick={this.props.leaveGroup}>
                    Leave Group
                </div>
            </div>
        );
    }
}

export default ChatRoomHeader;
