import React, {Component} from 'react';
import {Form, Icon, Input, Button, notification} from 'antd';
import './login.less';
import logo from '../../assets/images/logo.svg';
import {connect} from "react-redux";
import {register} from '../../actions';
import {Redirect} from 'react-router-dom';

class Register extends Component {
    handleSubmit = (event) => {
        event.preventDefault();
        const form = this.props.form;
        form.validateFields((err, values) => {
            if (!err) {
                this.props.register(values);
            } else {
                console.log('校验失败', values);
            }
        });
    };

    loginJump = () => {
        this.props.history.push('/login')
    };

    validatorPassword = (rule, value, callback) => {
        const length = value && value.length;
        const pwdReg = /^[a-zA-Z0-9_]+$/;
        if (!value) {
            callback('密码必须输入')
        } else if (length < 6) {
            callback('密码至少6位')
        } else if (length > 20) {
            callback('密码最多20位')
        } else if (!pwdReg.test(value)) {
            callback('密码必须是英文、数组或下划线组成')
        } else {
            callback();
        }
    }

    compareToFirstPassword = (rule, value, callback) => {
        const {form} = this.props;
        if (value && value !== form.getFieldValue('password')) {
            callback('您输入的两个密码不一致!');
        } else {
            callback();
        }
    };

    render() {

        const registerUser = this.props.registerUser
        if (registerUser && registerUser.loginName) {
            return <Redirect to='/login'/>
        }
        const {getFieldDecorator} = this.props.form;
        return (
            <div id="register">
                <header>
                    <div className="logo">
                        <a href='/'>
                            <img src={logo} alt="logo"/>
                            <span>快排系统</span>
                        </a>
                    </div>
                    <div className="desc">以客户为中心，以结果和效率为导向，致力于服务企业</div>
                </header>
                <section>
                    <h2>注册</h2>
                    <Form onSubmit={this.handleSubmit} className="login-form">
                        <Form.Item>
                            {getFieldDecorator("loginName", {
                                rules: [
                                    {request: true, whitespace: true, message: "用户名必须输入"},
                                    {min: 4, message: "用户名至少4位"},
                                    {max: 20, message: "用户名最多20位"},
                                    {pattern: /^[a-zA-Z0-9_]+$/, message: "用户名必须是英文、数字或者下划线组成"},
                                ]
                            })(
                                <Input
                                    prefix={<Icon type="user-add" style={{color: 'rgba(0,0,0,.25)'}}/>}
                                    placeholder="用户名"
                                />
                            )}
                        </Form.Item>

                        <Form.Item>
                            {getFieldDecorator("realName", {})(
                                <Input
                                    prefix={<Icon type="user" style={{color: 'rgba(0,0,0,.25)'}}/>}
                                    placeholder="姓名"
                                />
                            )}
                        </Form.Item>

                        <Form.Item>
                            {getFieldDecorator("password", {
                                rules: [
                                    {
                                        validator: this.validatorPassword
                                    }
                                ]
                            })(
                                <Input.Password
                                    prefix={<Icon type="lock" style={{color: 'rgba(0,0,0,.25)'}}/>}
                                    type="password"
                                    placeholder="至少6位密码,区分大小写"
                                />
                            )}
                        </Form.Item>

                        <Form.Item>
                            {getFieldDecorator("password2", {
                                rules: [
                                    {
                                        required: true,
                                        message: '请确认密码',
                                    },
                                    {
                                        validator: this.compareToFirstPassword,
                                    }
                                ]
                            })(
                                <Input.Password
                                    prefix={<Icon type="lock" style={{color: 'rgba(0,0,0,.25)'}}/>}
                                    type="password"
                                    placeholder="确认密码"
                                />
                            )}
                        </Form.Item>

                        <Form.Item>
                            {getFieldDecorator("mobilePhone", {
                                rules: [
                                    {required: true, message: '请输入手机号!'}
                                ]
                            })(
                                <Input
                                    prefix={<Icon type="mobile" style={{color: 'rgba(0,0,0,.25)'}}/>}
                                    placeholder="手机号"
                                />
                            )}
                        </Form.Item>

                        <Form.Item>
                            {getFieldDecorator("email", {
                                rules: [
                                    {
                                        type: 'email',
                                        message: '邮箱格式不合法!',
                                    },
                                ]
                            })(
                                <Input
                                    prefix={<Icon type="mail" style={{color: 'rgba(0,0,0,.25)'}}/>}
                                    placeholder="邮箱"
                                />
                            )}
                        </Form.Item>

                        <Form.Item>
                            {getFieldDecorator("companyName", {})(
                                <Input
                                    prefix={<Icon type="home" style={{color: 'rgba(0,0,0,.25)'}}/>}
                                    placeholder="公司名"
                                />
                            )}
                        </Form.Item>


                        <Form.Item>
                            <Button type="primary" htmlType="submit" className="register-form-button"
                                    size="large">注册</Button>
                            <Button type="link" className="register-to-login" onClick={this.loginJump}>使用已有账户登录</Button>
                        </Form.Item>
                    </Form>
                </section>
                <footer>
                    <div className="links">
                        <a>帮助</a>
                        <a>隐私</a>
                        <a>条款</a>
                    </div>
                    <div className="copyright">
                        Copyright © 2019 上海皓逗网络科技有限公司出品
                    </div>
                </footer>
            </div>
        )
    }
}

export default connect(
    state => ({registerUser: state.registerUser}),
    {register})(Form.create()(Register))

