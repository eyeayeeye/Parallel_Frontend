import React, { Component } from "react";
import "./chatList.css";
import { List, message, Avatar, Spin } from "antd";
import reqwest from "reqwest";
import InfiniteScroll from "react-infinite-scroller";
import { Badge } from "antd";
import { Modal, Button } from "antd";
import { Form, Input, Icon } from "antd";

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
    hasMore: true,
    visibleCreateGroup: false,
    confirmLoadingJoinGroup: false,
    visibleJoinGroup: false,
    confirmLoadingJoinGroup: false
  };
  //   componentDidMount() {
  //     this.fetchData(res => {
  //       this.setState({
  //         data: res.results
  //       });
  //     });
  //   }

  showModalCreateGroup = () => {
    this.setState({
      visibleCreateGroup: true
    });
  };

  handleOkCreateGroup = () => {
    this.setState({
      ModalCreateGroup: "The modal will be closed after two seconds",
      confirmLoadingCreateGroup: true
    });
    setTimeout(() => {
      this.setState({
        visibleCreateGroup: false,
        confirmLoadingCreateGroup: false
      });
    }, 2000);
  };

  handleCancelCreateGroup = () => {
    console.log("Clicked cancel button");
    this.setState({
      visibleCreateGroup: false
    });
  };

  onChangeCreateGroup = () => {
    //send something
  };

  showModalJoinGroup = () => {
    this.setState({
      visibleJoinGroup: true
    });
  };

  handleOkJoinGroup = () => {
    this.setState({
      ModalJoinGroup: "The modal will be closed after two seconds",
      confirmLoadingJoinGroup: true
    });
    setTimeout(() => {
      this.setState({
        visibleJoinGroup: false,
        confirmLoadingJoinGroup: false
      });
    }, 2000);
  };

  handleCancelJoinGroup = () => {
    console.log("Clicked cancel button");
    this.setState({
      visibleJoinGroup: false
    });
  };

  onChangeJoinGroup = () => {
    //send something
  };

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
            <div className="button" onClick={this.showModalCreateGroup}>
              Create Group
            </div>
          </div>
          <div className="join-button">
            <div className="button" onClick={this.showModalJoinGroup}>
              Join Group
            </div>
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
                      <Avatar
                        style={{ color: "#f56a00", backgroundColor: "#fde3cf" }}
                      >
                        U
                      </Avatar>
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
        <Modal
          title="Create Group"
          visible={this.state.visibleCreateGroup}
          onOk={this.handleOkCreateGroup}
          confirmLoading={this.state.confirmLoadingCreateGroup}
          onCancel={this.handleCancelCreateGroup}
        >
          <Input
            placeholder="Enter Group Name"
            onChange={this.onChangeCreateGroup}
          />
        </Modal>

        <Modal
          title="Join Group"
          visible={this.state.visibleJoinGroup}
          onOk={this.handleOkJoinGroup}
          confirmLoading={this.state.confirmLoadingJoinGroup}
          onCancel={this.handleCancelJoinGroup}
        >
          <Input
            placeholder="Enter Group ID"
            onChange={this.onChangeJoinGroup}
          />
        </Modal>
      </div>
    );
  }
}

export default ChatList;
