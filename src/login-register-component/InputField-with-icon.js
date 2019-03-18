import React, { Component } from 'react'
import './InputField-with-icon.css'
import { Input } from 'antd'
import { Icon } from 'antd'

class InputFieldWithIcon extends Component {
  render() {
    return (
      <Input
        className={!this.props.className ? 'input-field' : this.props.className}
        placeholder={this.props.placeholder}
        prefix={<Icon type={this.props.icon_type} />}
        onChange={this.props.onChange}
        style={this.props.style}
        value={this.props.value}
        type={this.props.type}
      />
    )
  }
}

export default InputFieldWithIcon
