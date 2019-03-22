import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Empty, List } from 'antd';
import './chatRoom.css';
import ChatRoomHeader from './chatRoomHeader';
import ChatMessage from './chatMessage';
import InputField from '../login-register-component/InputField';
import ButtonRed from '../login-register-component/Button-red';
import io from 'socket.io-client';
import axios from 'axios';

import InfiniteScroll from 'react-infinite-scroller';

class ChatRoom extends Component {
    constructor(props) {
        super(props);

        this.state = {
            empty: true,
            input: '',
            data: []
        };
        this.socket = io('http://ce23bb5c.ngrok.io');
        this.socket.on('addNewChat', data => {
            if (data.groupid === this.props.gid) {
                this.setState({ data: [...this.state.data, data] });
                this.sortData();
            }
        });
    }

    componentDidUpdate() {
        this.scrollToBottom();
    }

    async componentWillReceiveProps(nextProps) {
        // You don't have to do this check first, but it can help prevent an unneeded render
        if (nextProps.gid !== this.props.gid) {
            await this.fetchData(nextProps.gid);
        }
    }

    fetchData = async gid => {
        const data = {
            groupid: gid
        };
        await axios
            .post('http://ce23bb5c.ngrok.io/parallel/getChatByGroupID', data)
            .then(response => {
                this.setState({ data: response.data });
                this.sortData();
            })
            .catch(error => {
                console.log(error);
            });

        this.scrollToBottom();
    };

    sendText = () => {
        if (this.state.input !== '') {
            this.socket.emit('addNewChat', {
                username: this.props.username,
                userid: this.props.uid,
                message: this.state.input,
                groupid: this.props.gid,
                groupname: this.props.groupName
            });
            this.scrollToBottom();
            this.setState({ input: '' });
        }
    };

    leaveGroup = () => {
        this.props.resetGid();
        this.socket.emit('leave', {
            username: this.props.username,
            userid: this.props.uid,
            groupid: this.props.gid,
            groupname: this.props.groupName
        });
    };

    scrollToBottom = () => {
        const messagesContainer = ReactDOM.findDOMNode(this.messagesContainer);
        if (messagesContainer != null) {
            messagesContainer.scrollTop = messagesContainer.scrollHeight;
        }
    };

    sortData = () => {
        // console.log('sorttt', this.state.data);
        const filtered = this.state.data.filter(item => item.message !== ' ');
        const sorted_filtered = filtered.sort((item1, item2) => item1.timestamp >= item2.timestamp);
        this.setState({ data: sorted_filtered });
        console.log('sorteddd', this.state.data);
    };

    render() {
        return (
            <div className="chat-window-container">
                {this.props.gid === '' ? (
                    <Empty
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'center',
                            height: '100vh'
                        }}
                    />
                ) : (
                    <div>
                        <ChatRoomHeader
                            leaveGroup={this.leaveGroup}
                            gid={this.props.gid}
                            groupName={this.props.groupName}
                        />
                        <div
                            className="demo-infinite-container del-devider"
                            style={{
                                height: '82vh',
                                overflow: 'scroll'
                            }}
                            ref={el => {
                                this.messagesContainer = el;
                            }}
                        >
                            <InfiniteScroll initialLoad={false} pageStart={1} useWindow={false}>
                                <List
                                    dataSource={this.state.data}
                                    renderItem={item => (
                                        <List.Item key={item.id}>
                                            <ChatMessage
                                                name={item.username}
                                                msg={item.message}
                                                time={item.timestamp}
                                                isuser={this.props.username === item.username}
                                            />
                                        </List.Item>
                                    )}
                                />
                            </InfiniteScroll>
                        </div>

                        <div className="chat-box">
                            <InputField
                                value={this.state.input}
                                placeholder="Type your message here..."
                                onChange={e => this.setState({ input: e.target.value })}
                                onPressEnter={this.sendText}
                                style={{ width: '85%', height: '100%' }}
                            />
                            <ButtonRed
                                name="Send"
                                onClick={this.sendText}
                                style={{
                                    marginBottom: '10px',
                                    marginLeft: '10px',
                                    width: '10%',
                                    height: '100%'
                                }}
                            />
                        </div>
                    </div>
                )}
            </div>
        );
    }
}

export default ChatRoom;
