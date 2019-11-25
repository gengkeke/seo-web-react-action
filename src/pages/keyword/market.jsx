import React, {Component} from 'react';
import LinkButton from "../../components/link-button";
import {Button, Form, Input, Modal, notification, Table} from "antd";
import {reqKeywords, reqSaveKeyword, reqUpdateKeyword, reqDeleteKeyword} from "../../api";
import SaveForm from "../keyword/market-save-form";
import UpdateForm from "../keyword/market-update-form";

export default class Market extends Component {

    state = {
        loading: false,
        keywords: [],
        total: 0,
        keywordName: '',
        pageNum: 1,
        pageSize: 10,
        showStatus: 0,/*标识添加更新确认框是否显示 0隐藏 1显示新增 2显示修改*/
    };

    initColumns = () => {
        this.columns = [
            {
                title: '关键词',
                dataIndex: 'keywordName',
            },
            {
                title: '参考价格',
                dataIndex: 'proposedPrice',
            },
            {
                title: '创建时间',
                dataIndex: 'createdAt',
            },
            {
                title: '创建人',
                dataIndex: 'createdBy',
            },
            {
                title: '修改时间',
                dataIndex: 'modifyAt',
            },
            {
                title: '修改人',
                dataIndex: 'modifyBy',
            },
            {
                title: '操作',
                render: (keyword) => (/**如何向事件回调函数传递参数，先定义一个匿名函数，在函数调用处理的函数并传入数据**/
                    <span>
                        <LinkButton onClick={() => this.showUpdateModal(keyword)}>修改</LinkButton>
                        <LinkButton onClick={() => this.delete(keyword.id)}>删除</LinkButton>
                    </span>
                )
            },
        ];
    };

    delete = (id) => {
        Modal.confirm({
            title: '确认删除?',
            okText: '确认',
            cancelText: '取消',
            onOk: () => {
                reqDeleteKeyword(id);
                this.getKeywords();
            },
        });
    };
    /*查询*/
    getKeywords = async (pageNum) => {
        this.setState({loading: true});
        const result = await reqKeywords(pageNum, this.state.pageSize, this.state.keywordName);
        const {list, total} = result.data;
        this.setState({total, keywords: list, loading: false});
    };
    /*显示添加框*/
    showSaveModal = () => {
        this.setState({
            showStatus: 1
        })
    };
    /*显示修改框*/
    showUpdateModal = (keyword) => {
        this.keyword = keyword;
        this.setState({
            showStatus: 2
        })
    };
    /*点击取消，隐藏确认框*/
    handleCancel = () => {
        if (this.updateForm) {
            this.updateForm.resetFields();
        }
        if (this.saveForm) {
            this.saveForm.resetFields();
        }
        this.setState({
            showStatus: 0
        })
    };
    /*添加*/
    save = () => {
        /*表单验证*/
        this.saveForm.validateFields(async (error, values) => {
            if (!error) {
                this.setState({
                    showStatus: 0
                });
                const result = await reqSaveKeyword(values);
                this.saveForm.resetFields();/*清除输入数据*/
                if (result.code === 0) {
                    notification['success']({
                        message: '新增成功',
                    });
                    this.getKeywords();
                }
            }

        });

    };
    update = () => {
        /*表单验证*/
        this.updateForm.validateFields(async (error, values) => {
            if (!error) {
                this.setState({
                    showStatus: 0
                });
                const {keywordName, proposedPrice} = values;
                const id = this.keyword.id;
                this.updateForm.resetFields();/*清除输入数据*/
                const result = await reqUpdateKeyword({id, proposedPrice, keywordName});
                if (result.code === 0) {
                    notification['success']({
                        message: '修改成功',
                    });
                }
                this.getKeywords();
            }
        });


    };

    componentWillMount() {
        this.initColumns();
    }

    componentDidMount() {
        this.getKeywords(1);
    }

    render() {
        const {keywords, loading, total, showStatus, keywordName, pageNum, pageSize} = this.state;
        const keyword = this.keyword;
        return (
            <div style={{padding: '20px 20px 0'}}>
                <div className='content-search'>
                    <Form layout="inline">
                        <Form.Item label='关键词'>
                            <Input value={keywordName}
                                   onChange={event => this.setState({keywordName: event.target.value})}/>
                        </Form.Item>
                        <Form.Item>
                            <Button type='primary' onClick={() => {
                                this.getKeywords(1);
                                this.setState({pageNum: 1})
                            }}>查询</Button>
                        </Form.Item>
                    </Form>
                </div>
                <div className='add-button'><Button type='primary' onClick={this.showSaveModal}>新增</Button></div>
                <Table rowKey='id' dataSource={keywords} columns={this.columns} loading={loading}
                       pagination={{
                           defaultCurrent: 1,
                           current: pageNum,
                           defaultPageSize: pageSize,
                           total: total,
                           onChange: (value) => {
                               this.getKeywords(value);
                               this.setState({pageNum: value})
                           }
                       }}/>
                <Modal
                    title="新增关键词"
                    visible={showStatus === 1}
                    okText='确定'
                    cancelText='取消'
                    onOk={this.save}
                    onCancel={this.handleCancel}>
                    <SaveForm setForm={(form) => {
                        this.saveForm = form
                    }}/>
                </Modal>
                <Modal
                    title="修改关键词"
                    visible={showStatus === 2}
                    okText='确定'
                    cancelText='取消'
                    onOk={this.update}
                    onCancel={this.handleCancel}>
                    <UpdateForm keyword={keyword} setForm={(form) => {
                        this.updateForm = form
                    }}/>
                </Modal>
            </div>

        )
    }
}
