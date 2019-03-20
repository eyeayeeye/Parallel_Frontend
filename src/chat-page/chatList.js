import React, { Component } from "react";
import "./chatList.css";
import { List, message, Avatar, Spin } from "antd";
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
        // { username: 'eye', message: 'eyeayeeye', gid: 2, unseenCount: 30 },
        // { username: 'eye', message: 'eyeayeeye', gid: 3, unseenCount: 30 },
        // { username: 'eye', message: 'eyeayeeye', gid: 4, unseenCount: 30 }
      ],
      username: this.props.username,
      uid: this.props.uid,
      loading: false,
      hasMore: true,
      visibleCreateGroup: false,
      confirmLoadingJoinGroup: false,
      visibleJoinGroup: false,
      joinGID: -1,
      createdgroupName: ""
    };

    this.socket = io("http://localhost:8000");

    // this.socket.on('getAllChat', data => {
    //   // console.log(data);
    //   this.setState({ data: data });
    //   // console.log(this.state.data);

    //   // this.updateChat(data);
    // });
    this.socket.on("addNewChat", data => {
      // console.log(655555);
      console.log("new chat", data);
      const filtered = this.state.data.filter(
        group => group.groupid !== data.groupid
      );
      const sum_filtered = [data, ...filtered];
      const sorted_filtered = sum_filtered.sort(
        (item1, item2) => item1.logicalTime >= item2.localTime
      );
      this.setState({ data: sorted_filtered });
      // console.log(this.state.data);

      // this.updateChat(data);
    });

    this.socket.on("leave", data => {
      // console.log(655555);
      console.log("leave", data);
      const filtered = this.state.data.filter(
        group => group.groupid !== data.groupid
      );

      const sorted_filtered = filtered.sort(
        (item1, item2) => item1.logicalTime >= item2.localTime
      );
      this.setState({ data: sorted_filtered });
      // console.log(this.state.data);

      // this.updateChat(data);
    });

    this.socket.on("joinGroupChat", data => {
      // console.log(655555);
      console.log("data", data);
      const filtered = this.state.data.filter(
        group => group.groupid !== data.groupid
      );
      console.log("filter", filtered);

      const sum_filtered = [data, ...filtered];
      console.log("sum", sum_filtered);

      const sorted_filtered = sum_filtered.sort(
        (item1, item2) => item1.logicalTime >= item2.localTime
      );
      this.setState({ data: sorted_filtered });
      // console.log(this.state.data);

      // this.updateChat(data);
    });
  }
  componentDidMount = () => {
    this.fetchData();
  };

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

  fetchData = async () => {
    // console.log(this.state.uid);
    try {
      const response = await axios.post(
        "http://localhost:8000/parallel/getAllCurrentChat",
        {
          userid: this.state.uid
        }
      );
      console.log(555);
      console.log("datafetched", response.data);
      this.setState({ data: response.data });
    } catch (error) {
      console.log(error);
    }
  };

  showModalCreateGroup = () => {
    this.setState({
      visibleCreateGroup: true
    });
  };

  handleOkCreateGroup = async (uid, username, groupName) => {
    console.log(uid, username, groupName);

    await axios
      .post("http://localhost:8000/parallel/createGroup", {
        userid: uid,
        username: username,
        groupname: groupName
      })
      .then(response => {
        console.log(response);
        this.state.data = [response.data, ...this.state.data];
        // const filtered = this.state.data.filter(
        //   group => group.groupid !== response.groupid
        // );
        const sorted_filtered = this.state.data.sort(
          (item1, item2) => item1.logicalTime >= item2.logicalTime
        );
        this.setState({ data: sorted_filtered });
        console.log(this.state.data);
      })
      .catch(error => {
        console.log(error);
      });

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
    // console.log('555');
    // console.log(this.props.uid);
    return (
      <div className="container-chat-list">
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
                <List.Item
                  key={item.id}
                  onClick={() => this.props.handleSelectedChat(item.groupid)}
                >
                  <List.Item.Meta
                    avatar={
                      <Avatar
                        style={{ color: "#f56a00", backgroundColor: "#fde3cf" }}
                      >
                        {item.groupname[0].toUpperCase()}
                      </Avatar>
                    }
                    title={item.groupname + " (Group ID:" + item.groupid + ")"}
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
