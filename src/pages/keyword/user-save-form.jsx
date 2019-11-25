import React, {Component} from 'react';
import {Form, Input, InputNumber, Select} from 'antd';
import PropTypes from "prop-types";
import {reqUserKeywordsList, reqSitesList} from "../../api";

const Item = Form.Item;
const {Option} = Select;

class UserKeywordSaveForm extends Component {
    static propTypes = {
        setForm: PropTypes.func,
    };

    state = {
        keywords: [],
        sites: [],
    };
    /*关键词下拉*/
    getKeywordsList = async () => {
        const result = await reqUserKeywordsList();
        const {data} = result;
        this.setState({keywords: data});
    };
    /*站点下拉*/
    getSitesList = async () => {
        const result = await reqSitesList();
        const {data} = result;
        this.setState({sites: data});
    };

    componentWillMount() {
        this.props.setForm(this.props.form);
        this.getKeywordsList();
        this.getSitesList();
    }

    render() {
        const {getFieldDecorator} = this.props.form;
        const keywordOptions = this.state.keywords.map(d => <Option key={d.id}>{d.keywordName}({d.proposedPrice})</Option>);
        const siteOptions = this.state.sites.map(d => <Option key={d.id}>{d.siteName}</Option>);
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
            <Form  {...formItemLayout} >
                <Item label="关键词" required="true">
                    {
                        getFieldDecorator("pr", {
                            initialValue: '',
                            rules: [
                                {required: true, message: '关键词必须输入'}
                            ]
                        })(
                            <Select
                                showSearch
                                style={{width: 200}}
                                placeholder="选择一个关键词"
                                optionFilterProp="children"
                                filterOption={(input, option) =>
                                    option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                }
                            >
                                {keywordOptions}
                            </Select>
                        )
                    }
                </Item>
                <Item label="价格">
                    {
                        getFieldDecorator("price", {
                            initialValue: '',
                        })(
                            <InputNumber placeholder="价格" style={{ width: 200 }}
                                         formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                         parser={value => value.replace(/\$\s?|(,*)/g, '')}
                                         precision={2} min={0}/>
                        )
                    }
                </Item>
                <Item label="站点" required="true">
                    {
                        getFieldDecorator("siteId", {
                            initialValue: '',
                            rules: [
                                {required: true, message: '关键词必须输入'}
                            ]
                        })(
                            <Select
                                showSearch
                                style={{width: 200}}
                                placeholder="选择一个关键词"
                                optionFilterProp="children"
                                filterOption={(input, option) =>
                                    option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                }
                            >
                                {siteOptions}
                            </Select>
                        )
                    }
                </Item>
            </Form>
        )
    }
}

export default Form.create()(UserKeywordSaveForm);
