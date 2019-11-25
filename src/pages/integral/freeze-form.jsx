import React, {Component} from 'react';
import {Form, Input, InputNumber} from 'antd';
import PropTypes from 'prop-types';

const Item = Form.Item;

class FreezeForm extends Component {

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
                <Item label="可用积分">
                    {
                        getFieldDecorator("availableIntegral", {
                            initialValue: integral.availableIntegral
                        })(
                            <InputNumber disabled={true}
                                         formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                         parser={value => value.replace(/\$\s?|(,*)/g, '')}/>
                        )
                    }
                </Item>
                <Item label="冻结积分" required="true">
                    {
                        getFieldDecorator("freezeValue", {
                            initialValue: 0,
                            rules: [
                                {required: true, message: '冻结积分必须输入'}
                            ]
                        })(
                            <InputNumber placeholder="请输入冻结积分"
                                         formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                         parser={value => value.replace(/\$\s?|(,*)/g, '')}
                                         precision={2} min={0}/>
                        )
                    }
                </Item>
            </Form>
        )
    }
}

export default Form.create()(FreezeForm);
