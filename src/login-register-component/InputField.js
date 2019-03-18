import React, { Component } from 'react';
import './InputField.css';
import { Input } from 'antd';

class InputField extends Component {
  render() {
    return (
      <Input
        className="input-field-without"
        placeholder={this.props.placeholder}
        onChange={this.props.onChange}
        style={this.props.style}
        value={this.props.value}
        onPressEnter={this.props.onPressEnter}
      />
    );
  }
}

export default InputField;
