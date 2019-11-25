/*
用户登陆的路由组件
*/
import React, {Component} from 'react';
import {Form, Icon, Input, Button, Checkbox} from 'antd';
import {Redirect} from 'react-router-dom';
import './login.less';
import logo from '../../assets/images/logo.svg';
import {connect} from "react-redux";
import {login, resetRegister} from '../../actions';

class Login extends Component {
    handleSubmit = (event) => {
        //阻止事件的默认行为
        event.preventDefault();
        //得到form对象
        const form = this.props.form;
        form.validateFields((err, values) => {
            if (!err) {
                const {username, password} = values;
                this.props.login(username, password);
            } else {
                console.log('校验失败', values);
            }
        });
    };
    registerJump = () => {
        //event.preventDefault();
        this.props.history.push('/register')
    };

    //对密码进行自定义验证
    validatorPassword = (rule, value, callback) => {
        const length = value && value.length;
        const pwdReg = /^[a-zA-Z0-9_]+$/;
        if (!value) { // callback 如果不传参代表校验成功，如果传参代表校验失败，并且会提示错误
            callback('密码必须输入')
        } else if (length < 6) {
            callback('密码至少6位')
        } else if (length > 12) {
            callback('密码最多12位')
        } else if (!pwdReg.test(value)) {
            callback('密码必须是英文、数组或下划线组成')
        } else {
            callback();//验证通过 必须调用 callback
        }
    }

    render() {
        this.props.resetRegister();
        // 如果用户已经登陆, 自动跳转到 admin
        const user = this.props.user;
        if (user && user.name) {
            return <Redirect to='/'/>
        }
        //得到具有强大功能的form对象
        const form = this.props.form;
        const {getFieldDecorator} = form;

        return (
            <div id="login">
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
                    <Form onSubmit={this.handleSubmit} className="login-form">
                        <Form.Item>
                            {getFieldDecorator("username", {//配置对象：属性名是特定的一些名称
                                //声明式验证：直接使用别人定义好的验证规则
                                rules: [
                                    {request: true, whitespace: true, message: "用户名必须输入"},
                                    {min: 4, message: "用户名至少4位"},
                                    {max: 20, message: "用户名最多20位"},
                                    {pattern: /^[a-zA-Z0-9_]+$/, message: "用户名必须是英文、数字或者下划线组成"},
                                ]
                            })(
                                <Input
                                    prefix={<Icon type="user" style={{color: 'rgba(0,0,0,.25)'}}/>}
                                    placeholder="用户名admin"
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
                                <Input
                                    prefix={<Icon type="lock" style={{color: 'rgba(0,0,0,.25)'}}/>}
                                    type="password"
                                    placeholder="密码123456"
                                />
                            )}
                        </Form.Item>
                        <Form.Item>
                            <Checkbox>自动登录</Checkbox>
                            <Button type="link" className="login-form-forgot" onClick={this.test}>忘记密码</Button>
                            <Button type="primary" htmlType="submit" className="login-form-button"
                                    size="large">确定</Button>
                            <Button type="link" onClick={this.registerJump}>注册账户</Button>
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

/*
1. 高阶函数
    1). 一类特别的函数
        a. 接受函数类型的参数
        b. 返回值是函数
    2). 常见
        a. 定时器: setTimeout()/setInterval()
        b. Promise: Promise(() => {}) then(value => {}, reason => {})
        c. 数组遍历相关的方法: forEach()/filter()/map()/reduce()/find()/findIndex()
        d. 函数对象的bind()
        e. Form.create()() / getFieldDecorator()()
    3). 高阶函数更新动态, 更加具有扩展性

2. 高阶组件
    1). 本质就是一个函数
    2). 接收一个组件(被包装组件), 返回一个新的组件(包装组件), 包装组件会向被包装组件传入特定属性
    3). 作用: 扩展组件的功能

3. 高阶组件与高阶函数的关系
    高阶组件是特别的高阶函数
    接收一个组件函数, 返回是一个新的组件函数
*/
/*
包装Form组件生成一个新的组件Form(Login)
新组件会向Form组件传递一个强大的对象属性：form
*/
const WrappedNormalLoginForm = Form.create()(Login);
export default connect(
    state => ({user: state.user}),
    {login, resetRegister}
)(WrappedNormalLoginForm);
