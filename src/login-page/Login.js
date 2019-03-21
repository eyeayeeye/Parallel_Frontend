import React, { Component } from 'react';
import './Login.css';
import Container from '../login-register-component/Container';
import InputFieldWithIcon from '../login-register-component/InputField-with-icon';
import ButtonRed from '../login-register-component/Button-red';
import ButtonGrey from '../login-register-component/Button-grey';
import { Divider, message } from 'antd';
import { withRouter } from 'react-router-dom';
import axios from 'axios';

class Login extends Component {
    state = {
        username: '',
        password: ''
    };

    onInputChange = field_name => e => {
        this.setState({ [field_name]: e.target.value });
    };

    handleLogin = async () => {
        const data = {
            username: this.state.username,
            password: this.state.password
        };
        await axios
            .post('http://localhost:8000/parallel/login', data)
            .then(response => {
                if (response.data === 'Again Pls') {
                    message.error('Your username or password are invalid');
                    this.setState({ username: '', password: '' });
                } else {
                    this.props.setUserData(response.data.userid, response.data.username);
                    this.props.history.push('/home');
                }
            })
            .catch(error => {
                console.log(error);
            });
    };

    goRegister = () => {
        this.props.history.push('/register');
    };

    render() {
        return (
            <div className="page-container">
                <div className="content-container">
                    <Container>
                        <InputFieldWithIcon
                            value={this.state.username}
                            placeholder="username"
                            icon_type="user"
                            onChange={e => this.onInputChange('username')(e)}
                            style={{ marginBottom: '10px' }}
                        />
                        <InputFieldWithIcon
                            value={this.state.password}
                            type="password"
                            placeholder="password"
                            icon_type="lock"
                            onChange={e => this.onInputChange('password')(e)}
                            style={{ marginBottom: '10px' }}
                        />
                        <ButtonRed
                            name="Login"
                            onClick={e => {
                                this.handleLogin();
                            }}
                            style={{ marginBottom: '10px', width: '220px', height: '40px' }}
                        />
                        <Divider
                            style={{
                                height: '0em',
                                fontSize: '16px',
                                fontWeight: '300',
                                color: '#b7b7b7',
                                marginTop: '-5px',
                                marginBottom: '10px'
                            }}
                        >
                            or
                        </Divider>
                        <ButtonGrey
                            style={{ marginBottom: '0px', width: '220px', height: '40px' }}
                            name="Register"
                            onClick={e => this.goRegister()}
                        />
                    </Container>
                </div>
            </div>
        );
    }
}

export default withRouter(Login);
