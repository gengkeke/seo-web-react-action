import React, {Component} from 'react';
import {Form, Input} from 'antd';
import PropTypes from 'prop-types';

const Item = Form.Item;

class UpdateForm extends Component {

    static propTypes = {
        user: PropTypes.object,
        setForm: PropTypes.func,
    };

    componentWillMount() {
        /*将form对象通过setForm传递给父组件*/
        this.props.setForm(this.props.form);
    }

    render() {
        const {user} = this.props;
        const form = this.props.form;
        const {getFieldDecorator} = form;
        const formItemLayout = {
            labelCol: {
                xs: {span: 24},
                sm: {span: 4},
            },
            wrapperCol: {
                xs: {span: 24},
                sm: {span: 18},
            },
        };
        return (
            <Form  {...formItemLayout}>
                <Item label="用户名" required="true">
                    {
                        getFieldDecorator("loginName", {
                            initialValue: user.loginName,
                            rules: [
                                {required: true, message: '站点名必须输入'}
                            ]
                        })(
                            <Input disabled="true"/>
                        )
                    }
                </Item>
                <Item label="姓名">
                    {
                        getFieldDecorator("realName", {
                            initialValue: user.realName
                        })(
                            <Input placeholder="请输入姓名" />
                        )
                    }
                </Item>
                <Item label="手机号" required="true">
                    {
                        getFieldDecorator("mobilePhone", {
                            initialValue: user.mobilePhone,
                            rules: [
                                {required: true, message: '手机号必须输入'}
                            ]
                        })(
                            <Input placeholder="请输入手机号"/>
                        )
                    }
                </Item>
                <Item label="邮箱">
                    {
                        getFieldDecorator("email", {
                            initialValue: user.email
                        })(
                            <Input placeholder="请输入邮箱"/>
                        )
                    }
                </Item>


                <Item label="公司名称">
                    {
                        getFieldDecorator("companyName", {
                            initialValue: user.companyName
                        })(
                            <Input placeholder="请输入公司名称"/>
                        )
                    }
                </Item>

                <Item label="备注">
                    {
                        getFieldDecorator("description", {
                            initialValue: user.description
                        })(
                            <Input placeholder="请输入备注"/>
                        )
                    }
                </Item>
            </Form>
        )
    }
}

export default Form.create()(UpdateForm);
