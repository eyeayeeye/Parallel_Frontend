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
        console.log('props', this.props);

        this.state = {
            empty: true,
            input: '',
            data: []
        };
        this.socket = io('http://localhost:8000');
        this.socket.on('addNewChat', data => {
            console.log('data wowww');
            console.log(data);
            if (data.groupid === this.props.gid) {
                this.setState({ data: [...this.state.data, data] });
                // this.sortData();
            }
            // console.log(this.state.data);
        });
    }

    componentDidUpdate() {
        this.scrollToBottom();
    }

    async componentWillReceiveProps(nextProps) {
        // You don't have to do this check first, but it can help prevent an unneeded render
        console.log('gidddd', nextProps);
        if (nextProps.gid !== this.props.gid) {
            console.log('gidddd', nextProps.gid);
            await this.fetchData(nextProps.gid);
        }
    }

    fetchData = async gid => {
        const data = {
            groupid: gid
        };
        await axios
            .post('http://localhost:8000/parallel/getChatByGroupID', data)
            .then(response => {
                console.log('resforgrouppp', response);

                this.setState({ data: response.data });
                // this.sortData();
            })
            .catch(error => {
                console.log(error);
            });

        this.scrollToBottom();
    };

    sendText = () => {
        // console.log(this.state.input);
        this.socket.emit('addNewChat', {
            username: this.props.username,
            userid: this.props.uid,
            message: this.state.input,
            groupid: this.props.gid
        });
        this.scrollToBottom();
        this.setState({ input: '' });
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
        console.log('sorttt', this.state.data);
        const filtered = this.state.data.filter(item => item.message !== ' ');
        const sorted_filtered = filtered.sort((item1, item2) => item1.logicalTime >= item2.logicalTime);
        this.setState({ data: sorted_filtered });
        console.log('sorteddd', this.state.data);
    };

    render() {
        console.log('pageeee', this.props.gid);
        console.log('pageeee', this.props.groupName);
        console.log('dataaaa', this.state.data);
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
