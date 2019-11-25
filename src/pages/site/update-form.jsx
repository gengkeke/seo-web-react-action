import React, {Component} from 'react';
import {Form, Input} from 'antd';
import PropTypes from 'prop-types';

const Item = Form.Item;

class UpdateForm extends Component {

    static propTypes = {
        site: PropTypes.object,
        setForm: PropTypes.func,
    };

    componentWillMount() {
        /*将form对象通过setForm传递给父组件*/
        this.props.setForm(this.props.form);
    }

    render() {
        const {site} = this.props;
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
        const tailFormItemLayout = {
            wrapperCol: {
                xs: {
                    span: 24,
                    offset: 0,
                },
                sm: {
                    span: 16,
                    offset: 8,
                },
            },
        };
        return (
            <Form  {...formItemLayout}>
                <Item label="站点名" required="true">
                    {
                        getFieldDecorator("siteName", {
                            initialValue: site.siteName,
                            rules: [
                                {required: true, message: '站点名必须输入'}
                            ]
                        })(
                            <Input placeholder="请输入站点名"/>
                        )
                    }
                </Item>
                <Item label="PR值">
                    {
                        getFieldDecorator("pr", {
                            initialValue: site.pr
                        })(
                            <Input placeholder="请输入PR值"/>
                        )
                    }
                </Item>
                <Item label="域名">
                    {
                        getFieldDecorator("domain", {
                            initialValue: site.domain
                        })(
                            <Input placeholder="请输入域名"/>
                        )
                    }
                </Item>
                <Item label="后台地址">
                    {
                        getFieldDecorator("backgroundAddress", {
                            initialValue: site.backgroundAddress
                        })(
                            <Input placeholder="请输入后台地址"/>
                        )
                    }
                </Item>
            </Form>
        )
    }
}

export default Form.create()(UpdateForm);
