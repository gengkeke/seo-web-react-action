import React, {Component} from 'react';
import {Form, Input, InputNumber} from 'antd';
import PropTypes from 'prop-types';

const Item = Form.Item;

class UpdateForm extends Component {

    static propTypes = {
        keyword: PropTypes.object,
        setForm: PropTypes.func,
    };

    componentWillMount() {
        /*将form对象通过setForm传递给父组件*/
        this.props.setForm(this.props.form);
    }

    render() {
        const {keyword} = this.props;
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
                <Item label="关键词名" required="true">
                    {
                        getFieldDecorator("keywordName", {
                            initialValue: keyword.keywordName,
                            rules: [
                                {required: true, message: '关键词名必须输入'}
                            ]
                        })(
                            <Input placeholder="请输入关键词名"/>
                        )
                    }
                </Item>
                <Item label="参考价格">
                    {
                        getFieldDecorator("proposedPrice", {
                            initialValue: keyword.proposedPrice,
                            rules: [
                                {required: true, message: '参考价格必须输入'}
                            ]
                        })(
                            <InputNumber placeholder="参考价格"
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

export default Form.create()(UpdateForm);
