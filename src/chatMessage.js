import React, { Component } from 'react';
import { Card, Avatar } from 'antd';
import './chatMessage.css';

class chatMessage extends Component {
  render() {
    return (
      <div
        style={{
          width: '100%'
        }}
      >
        {this.props.isuser ? (
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'flex-start',
              justifyContent: 'flex-end',
              paddingRight: '10px',
              width: '100%'
            }}
          >
            <div
              style={{
                maxWidth: '40%',
                borderRadius: '20px',
                backgroundColor: '#d9d9d9',
                color: 'black',
                textAlign: 'left',
                padding: '15px'
              }}
            >
              {this.props.msg}
            </div>
          </div>
        ) : (
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'flex-start',
              justifyContent: 'flex-start',
              paddingLeft: '10px',
              width: '100%'
            }}
          >
            <div
              style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center'
              }}
            >
              <Avatar icon="user" />
            </div>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
                justifyContent: 'flex-start',
                width: '100%'
              }}
            >
              <div
                style={{
                  textAlign: 'center',
                  paddingLeft: '10px',
                  paddingRight: '10px',
                  marginBottom: '10px'
                }}
              >
                {this.props.name}
              </div>

              <div
                style={{
                  maxWidth: '40%',
                  borderRadius: '20px',
                  backgroundColor: '#b13d3d',
                  color: 'white',
                  textAlign: 'left',
                  padding: '15px',
                  marginLeft: '10px'
                }}
              >
                {this.props.msg}
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default chatMessage;
