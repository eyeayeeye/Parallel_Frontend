import React, { Component } from 'react';
import Container from '../login-register-component/Container';
import InputFieldWithIcon from '../login-register-component/InputField-with-icon';
import ButtonRed from '../login-register-component/Button-red';
import ButtonGrey from '../login-register-component/Button-grey';
import './Register.css';
import { message } from 'antd';
import { withRouter } from 'react-router-dom';
import axios from 'axios';

class Register extends Component {
    state = {
        checkpass: 1,
        username: '',
        password: '',
        repassword: null
    };

    async handleSubmit() {
        const data = {
            username: this.state.username,
            password: this.state.password
        };
        await axios
            .post('http://5b0457b7.ngrok.io/parallel/register', data)
            .then(response => {
                if (response.data === 'This username has already existed') {
                    message.error('This username has already existed');
                    this.clearState();
                } else {
                    this.goLogin();
                }
            })
            .catch(error => {
                console.log(error);
            });
    }

    onInputChange = field_name => e => {
        this.setState({ [field_name]: e.target.value });
    };

    goLogin = () => {
        this.props.history.push('/');
    };

    clearState = () => {
        this.setState({
            checkpass: 1,
            username: '',
            password: '',
            repassword: null
        });
    };

    checkPassword = () => {
        if (this.state.password === this.state.repassword) {
            this.setState({ checkpass: 1 });
            this.handleSubmit();
        } else {
            this.setState({ checkpass: 0 });
        }
    };

    render() {
        return (
            <div className="page-container">
                <div className="content-container">
                    <Container>
                        <InputFieldWithIcon
                            placeholder="username"
                            icon_type="user"
                            value={this.state.username}
                            onChange={this.onInputChange('username')}
                            style={{ marginBottom: '10px' }}
                        />
                        <InputFieldWithIcon
                            className={this.state.checkpass ? null : 'input-error'}
                            placeholder="password"
                            icon_type="lock"
                            type="password"
                            value={this.state.password}
                            onChange={this.onInputChange('password')}
                            style={{ marginBottom: '10px' }}
                        />

                        <InputFieldWithIcon
                            className={this.state.checkpass ? null : 'input-error'}
                            placeholder="re-password"
                            icon_type="lock"
                            type="password"
                            value={this.state.repassword}
                            onChange={this.onInputChange('repassword')}
                            style={{ marginBottom: '10px' }}
                        />
                        {this.state.checkpass ? (
                            <div />
                        ) : (
                            <div className="form-help">password and re-password does not match</div>
                        )}

                        <ButtonRed
                            name="Submit"
                            onClick={this.checkPassword}
                            style={{ marginBottom: '10px', width: '220px', height: '40px' }}
                        />
                        <ButtonGrey
                            name="Back"
                            onClick={() => {
                                this.clearState();
                                this.goLogin();
                            }}
                            style={{ marginBottom: '0px', width: '220px', height: '40px' }}
                        />
                    </Container>
                </div>
            </div>
        );
    }
}

export default withRouter(Register);
