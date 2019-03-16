import React, { Component } from "react";
import "./chatList.css";
import { Button } from "antd";
import { List, message, Avatar, Spin } from "antd";
import reqwest from "reqwest";
import InfiniteScroll from "react-infinite-scroller";
import { Badge } from "antd";

class ChatList extends Component {
  state = {
    data: [
      { name: "eye", message: "eyeayeeye", unseenCount: 30 },
      { name: "eye", message: "eyeayeeye", unseenCount: 30 },
      { name: "eye", message: "eyeayeeye", unseenCount: 30 },
      { name: "eye", message: "eyeayeeye", unseenCount: 30 },
      { name: "eye", message: "eyeayeeye", unseenCount: 30 },
      { name: "eye", message: "eyeayeeye", unseenCount: 30 },
      { name: "eye", message: "eyeayeeye", unseenCount: 30 },
      { name: "eye", message: "eyeayeeye", unseenCount: 30 },
      { name: "eye", message: "eyeayeeye", unseenCount: 30 },
      { name: "eye", message: "eyeayeeye", unseenCount: 30 },
      { name: "eye", message: "eyeayeeye", unseenCount: 30 },
      { name: "eye", message: "eyeayeeye", unseenCount: 30 },
      { name: "eye", message: "eyeayeeye", unseenCount: 30 },
      { name: "eye", message: "eyeayeeye", unseenCount: 30 },
      { name: "eye", message: "eyeayeeye", unseenCount: 30 },
      { name: "eye", message: "eyeayeeye", unseenCount: 30 },
      { name: "eye", message: "eyeayeeye", unseenCount: 30 },
      { name: "eye", message: "eyeayeeye", unseenCount: 30 },
      { name: "eye", message: "eyeayeeye", unseenCount: 30 },
      { name: "eye", message: "eyeayeeye", unseenCount: 30 },
      { name: "eye", message: "eyeayeeye", unseenCount: 30 },
      { name: "eye", message: "eyeayeeye", unseenCount: 30 },
      { name: "eye", message: "eyeayeeye", unseenCount: 30 }
    ],
    loading: false,
    hasMore: true
  };
  //   componentDidMount() {
  //     this.fetchData(res => {
  //       this.setState({
  //         data: res.results
  //       });
  //     });
  //   }

  handleInfiniteOnLoad = () => {
    let data = this.state.data;
    this.setState({
      loading: true
    });
    if (data.length > 14) {
      message.warning("Infinite List loaded all");
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

  render() {
    console.log(this.state.data);
    return (
      <div className="container">
        <div className="chat-bar">
          <div style={{ width: "20%" }} />
          <div className="create-group-button">
            <div className="button">Create Group</div>
          </div>
          <div className="join-button">
            <div className="button">Join Group</div>
          </div>
          <div className="logout-button">
            <div className="button">Logout</div>
          </div>
        </div>

        <div className="demo-infinite-container">
          <InfiniteScroll
            initialLoad={false}
            pageStart={0}
            loadMore={this.handleInfiniteOnLoad}
            hasMore={!this.state.loading && this.state.hasMore}
            useWindow={false}
          >
            <List
              dataSource={this.state.data}
              renderItem={item => (
                <List.Item key={item.id}>
                  <List.Item.Meta
                    avatar={
                      <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                    }
                    title={item.name}
                    description={item.message}
                  />
                  <Badge
                    count={item.unseenCount}
                    style={{ marginTop: "25px" }}
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
      </div>
    );
  }
}

export default ChatList;
