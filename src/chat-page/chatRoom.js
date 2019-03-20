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
      // console.log(data);
      this.setState({ data: [...this.state.data, data] });
      // console.log(this.state.data);
    });
  }

  componentDidMount() {
    // this.fetchData();
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
      message: this.props.input,
      groupid: this.props.gid
    });
    this.scrollToBottom();
    this.setState({ input: '' });
  };

  leaveGroup = () => {
    this.props.resetGid();
    // this.socket.emit('leave', {
    //   username: this.props.username,
    //   userid: this.props.uid,
    //   groupid: this.props.gid
    // });
  };

  scrollToBottom() {
    const messagesContainer = ReactDOM.findDOMNode(this.messagesContainer);
    if (messagesContainer != null) {
      messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }
  }

  render() {
    console.log('gid ka', this.props.gid);
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
            <ChatRoomHeader leaveGroup={this.leaveGroup} gid={this.state.gid} />
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
              <InfiniteScroll
                initialLoad={false}
                pageStart={1}
                useWindow={false}
              >
                <List
                  dataSource={this.state.data.filter(
                    item => item.message !== ' '
                  )}
                  renderItem={item => (
                    <List.Item key={item.id}>
                      <ChatMessage
                        name={item.username}
                        msg={item.message}
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
                name="send"
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
