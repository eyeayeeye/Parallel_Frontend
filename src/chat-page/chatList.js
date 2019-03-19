import React, { Component } from "react";
import "./chatList.css";
import { List, message, Avatar, Spin } from "antd";
import reqwest from "reqwest";
import InfiniteScroll from "react-infinite-scroller";
import { Badge } from "antd";
import { Modal, Button } from "antd";
import { Form, Input, Icon } from "antd";
import io from "socket.io-client";
import axios from "axios";

class ChatList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [
        { username: "eye", message: "eyeayeeye", unseenCount: 30 },
        { username: "eye", message: "eyeayeeye", unseenCount: 30 },
        { username: "eye", message: "eyeayeeye", unseenCount: 30 }
      ],
      username: "eyeaye",
      uid: 1234,
      loading: false,
      hasMore: true,
      visibleCreateGroup: false,
      confirmLoadingJoinGroup: false,
      visibleJoinGroup: false,
      joinGID: -1,
      createdgroupName: ""
    };

    this.socket = io("http://localhost:8000");
    this.socket.on("getAllChat", data => {
      // console.log(data);
      this.setState({ data: data });
      // console.log(this.state.data);

      // this.updateChat(data);
    });
    this.socket.on("addNewChat", data => {
      console.log(data);
      const filtered = this.state.data.filter(
        group => group.groupid !== data.groupid
      );
      this.setState({ data: [data, ...filtered] });
      console.log(this.state.data);

      // this.updateChat(data);
    });
  }
  // componentDidMount = () => {};

  // updateChat = data => {
  //   console.log(data);
  //   this.setState({ data: [data, ...this.state.data] });
  //   console.log(this.state.data);
  // };
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

  handleOkCreateGroup = async (uid, username, groupName) => {
    console.log(uid, groupName);
    try {
      const response = await axios.post(
        "http://localhost:8000/parallel/createGroup",
        {
          userid: uid,
          username: username,
          groupname: groupName
        }
      );
    } catch (error) {
      console.log(error);
    }
    // this.socket.emit("createGroup", {
    //   uid: this.state.uid,
    //   groupName: this.state.createdgroupName
    // });
    this.setState({
      createdgroupName: "",
      confirmLoadingCreateGroup: true
    });

    // this.socket.emit("addNewChat", {
    //   username: this.state.uid,
    //   message: "เจด6",
    //   groupid: 1
    // });

    setTimeout(() => {
      this.setState({
        visibleCreateGroup: false,
        confirmLoadingCreateGroup: false
      });
    }, 1000);
  };

  handleCancelCreateGroup = () => {
    console.log("Clicked cancel button");
    this.setState({
      visibleCreateGroup: false
    });
  };

  onChangeCreateGroup = e => {
    this.setState({ createdgroupName: e.target.value });
  };

  showModalJoinGroup = () => {
    this.setState({
      visibleJoinGroup: true
    });
  };

  handleOkJoinGroup = () => {
    // console.log(this.state.joinGID);
    this.socket.emit("joinGroup", {
      username: this.state.username,
      userid: this.state.uid,
      groupid: this.state.joinGID
    });
    this.setState({
      joinGID: -1,
      confirmLoadingJoinGroup: true
    });
    setTimeout(() => {
      this.setState({
        visibleJoinGroup: false,
        confirmLoadingJoinGroup: false
      });
    }, 1000);
  };

  handleCancelJoinGroup = () => {
    this.setState({
      visibleJoinGroup: false
    });
  };

  onChangeJoinGroup = e => {
    this.setState({ joinGID: e.target.value });
  };

  // handleInfiniteOnLoad = () => {
  //   let data = this.state.data;
  //   this.setState({
  //     loading: true
  //   });
  //   if (data.length > 14) {
  //     message.warning("Infinite List loaded all");
  //     this.setState({
  //       hasMore: false,
  //       loading: false
  //     });
  //     return;
  //   }
  //   // this.fetchData(res => {
  //   //   data = data.concat(res.results);
  //   //   this.setState({
  //   //     data,
  //   //     loading: false
  //   //   });
  //   // });
  // };

  render() {
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
                    title={item.username}
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
          onOk={() =>
            this.handleOkCreateGroup(
              this.state.uid,
              this.state.username,
              this.state.createdgroupName
            )
          }
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
