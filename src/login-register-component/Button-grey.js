import React, { Component } from 'react';
import { Button } from 'antd';
import './Button-grey.css';

class ButtonGrey extends Component {
  render() {
    return (
      <button
        className="button-grey"
        style={{
          ...this.props.style
        }}
        onClick={this.props.onClick}
      >
        {this.props.name}
      </button>
    );
  }
}

export default ButtonGrey;
