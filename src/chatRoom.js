import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Icon, Button, Input, Empty, Card, Avatar } from 'antd';
import './chatRoom.css';
import ChatRoomHeader from './chatRoomHeader';
import ChatMessage from './chatMessage';
import io from 'socket.io-client';

import { List, message, Spin } from 'antd';
// import reqwest from 'reqwest';

import InfiniteScroll from 'react-infinite-scroller';

const fakeDataUrl =
  'https://randomuser.me/api/?results=5&inc=name,gender,email,nat&noinfo';

class chatRoom extends Component {
  state = {
    empty: false,
    user: 'mild',
    data: [
      {
        name: 'mild',
        msg:
          "hello, it's meeeeeeeeeeeeeee.hello, it's meeeeeeeeeeeeeee.hello, it's meeeeeeeeeeeeeee.hello, it's meeeeeeeeeeeeeee."
      },
      { name: 'zen', msg: 'I was wondering' },
      { name: 'mild', msg: "hello, it's me." },
      { name: 'zen', msg: "hello, it's me." },
      { name: 'mild', msg: "hello, it's me." },
      { name: 'mild', msg: "hello, it's me." },
      { name: 'mild', msg: "hello, it's me." },
      { name: 'boss', msg: "hello, it's me." },
      { name: 'boss', msg: "hello, it's me." },
      { name: 'mild', msg: "hello, it's me." },
      { name: 'zen', msg: "hello, it's me." },
      { name: 'mild', msg: "hello, it's me." },
      { name: 'boss', msg: "hello, it's me." }
    ],
    loading: false,
    hasMore: true
  };

  // componentDidMount() {
  //   // this.fetchData(res => {
  //   //   this.setState({
  //   //     data: res.results
  //   //   });
  //   // });
  // }

  // this.socket = io("http://localhost:8000");

  componentDidMount() {
    this.scrollToBottom();
  }

  componentDidUpdate() {
    this.scrollToBottom();
  }

  fetchData = callback => {
    // reqwest({
    //   url: fakeDataUrl,
    //   type: 'json',
    //   method: 'get',
    //   contentType: 'application/json',
    //   success: res => {
    //     callback(res);
    //   }
    // });
  };

  handleInfiniteOnLoad = () => {
    let data = this.state.data;
    this.setState({
      loading: true
    });
    if (data.length > 5) {
      // message.warning('Infinite List loaded all');
      this.setState({
        hasMore: false,
        loading: false
      });
      return;
    }
    this.fetchData(res => {
      data = data.concat(res.results);
      this.setState({
        data,
        loading: false
      });
    });
  };

  scrollToBottom() {
    const messagesContainer = ReactDOM.findDOMNode(this.messagesContainer);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
  }

  render() {
    return (
      <div className="chat-window-container">
        {this.state.empty ? (
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
            <ChatRoomHeader />
            {/* <div
              style={{
                height: '82vh',
                margin: '20px 20px 20px 20px'
              }}
            >
              <ChatMessage />
            </div> */}
            <div
              className="demo-infinite-container del-devider"
              style={{
                height: '82vh',
                // display: 'flex',
                // justifyContent: 'center',
                // alignItems: 'center',
                overflow: 'scroll'
              }}
              ref={el => {
                this.messagesContainer = el;
              }}
            >
              <InfiniteScroll
                initialLoad={false}
                pageStart={1}
                loadMore={this.handleInfiniteOnLoad}
                hasMore={!this.state.loading && this.state.hasMore}
                useWindow={false}
              >
                <List
                  dataSource={this.state.data}
                  renderItem={item => (
                    <List.Item key={item.id}>
                      <ChatMessage
                        name={item.name}
                        msg={item.msg}
                        isuser={this.state.user === item.name}
                      />
                    </List.Item>
                  )}
                >
                  {this.state.loading && this.state.hasMore && (
                    <div className="demo-loading-container">
                      <Spin />
                    </div>
                  )}
                </List>
              </InfiniteScroll>
            </div>

            <div className="chat-box">
              <Input suffix={<Button type="primary">send</Button>} />
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default chatRoom;
