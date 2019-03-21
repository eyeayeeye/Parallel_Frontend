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
            gid: '',
            groupName: ''
        };
    }

    handleSelectedChat = (gid, groupName) => {
        this.setState({ gid, groupName });
    };

    handleLogout = () => {
        this.resetGid();
        this.props.history.push('/');
    };

    resetGid = () => {
        this.setState({ gid: '', groupName: '' });
    };

    render() {
        return (
            <div className="main">
                <ChatList
                    handleSelectedChat={this.handleSelectedChat}
                    handleLogout={this.handleLogout}
                    uid={this.state.uid}
                    username={this.state.username}
                />
                <ChatRoom
                    uid={this.state.uid}
                    username={this.state.username}
                    gid={this.state.gid}
                    groupName={this.state.groupName}
                    resetGid={this.resetGid}
                />
            </div>
        );
    }
}

export default withRouter(ChatPage);
