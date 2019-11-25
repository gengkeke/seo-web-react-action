import React, {Component} from 'react';
import {Form, Input, InputNumber} from 'antd';
import PropTypes from 'prop-types';

const Item = Form.Item;

class UpdateForm extends Component {

    static propTypes = {
        integral: PropTypes.object,
        setForm: PropTypes.func,
    };

    componentWillMount() {
        /*将form对象通过setForm传递给父组件*/
        this.props.setForm(this.props.form);
    }

    render() {
        const {integral} = this.props;
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
                            initialValue: integral.loginName
                        })(
                            <Input disabled={true}/>
                        )
                    }
                </Item>
                <Item label="姓名">
                    {
                        getFieldDecorator("realName", {
                            initialValue: integral.realName
                        })(
                            <Input disabled={true}/>
                        )
                    }
                </Item>
                <Item label="折扣比例">
                    {
                        getFieldDecorator("rebateScale", {

                            initialValue: integral.rebateScale
                        })(
                            <InputNumber placeholder="请输入折扣比例"
                                         formatter={value => `${value}%`}
                                         parser={value => value.replace('%', '')}
                                         precision={2} min={0}/>
                        )
                    }
                </Item>
            </Form>
        )
    }
}

export default Form.create()(UpdateForm);
