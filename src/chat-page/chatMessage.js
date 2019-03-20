import React, { Component } from 'react';
import { Avatar } from 'antd';

class ChatMessage extends Component {
    convertTimeToString = unix_timestamp => {
        const date = new Date(unix_timestamp);
        // Hours part from the timestamp
        const hours = date.getHours();
        // Minutes part from the timestamp
        const minutes = '0' + date.getMinutes();

        // Will display time in 10:30:23 format
        const formattedTime = hours + ':' + minutes.substr(-2);

        return formattedTime;
    };
    render() {
        console.log(this.props);
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
                            {this.convertTimeToString(this.props.time)}
                        </div>

                        <div
                            style={{
                                maxWidth: '40%',
                                wordWrap: 'break-word',
                                backgroundColor: '#b13d3d',
                                padding: '9px 16px 9px 16px',
                                borderRadius: '15px',
                                color: 'white',
                                textAlign: 'left',
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
                            <Avatar style={{ backgroundColor: {} }}>{this.props.name[0].toUpperCase()}</Avatar>
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
                                    display: 'flex',
                                    flexDirection: 'row',
                                    width: '100%'
                                }}
                            >
                                <div
                                    style={{
                                        maxWidth: '40%',
                                        wordWrap: 'break-word',
                                        borderRadius: '20px',
                                        backgroundColor: '#d9d9d9',
                                        color: 'black',
                                        textAlign: 'left',
                                        padding: '9px 16px 9px 16px',
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
                                    {this.convertTimeToString(this.props.time)}
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
