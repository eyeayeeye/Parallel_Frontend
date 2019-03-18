import React, { Component } from 'react';
import { Button } from 'antd';
import './Button-red.css';

class ButtonRed extends Component {
  render() {
    return (
      <button
        className="button-red"
        style={{
          ...this.props.style
        }}
        onClick={this.props.onClick}
        disabled={this.props.disabled}
      >
        {this.props.name}
      </button>
    );
  }
}

export default ButtonRed;
