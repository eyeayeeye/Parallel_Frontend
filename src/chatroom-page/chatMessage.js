import React, { Component } from 'react';
import { Avatar } from 'antd';

class ChatMessage extends Component {
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
                display: 'flex',
                alignSelf: 'flex-end',
                color: '#707070',
                fontWeight: '300',
                fontSize: '10px'
              }}
            >
              0:00
            </div>
            <div
              style={{
                maxWidth: '40%',
                borderRadius: '20px',
                backgroundColor: '#d9d9d9',
                color: 'black',
                textAlign: 'left',
                padding: '15px',
                marginLeft: '10px'
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
                  maxWidth: '50%',
                  display: 'flex',
                  flexDirection: 'row'
                }}
              >
                <div
                  style={{
                    borderRadius: '20px',
                    backgroundColor: '#b13d3d',
                    color: 'white',
                    textAlign: 'left',
                    padding: '15px',
                    marginLeft: '10px',
                    marginRight: '10px'
                  }}
                >
                  {this.props.msg}
                </div>
                <div
                  style={{
                    display: 'flex',
                    alignSelf: 'flex-end',
                    color: '#707070',
                    fontWeight: '300',
                    fontSize: '10px'
                  }}
                >
                  0:00
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default ChatMessage;
