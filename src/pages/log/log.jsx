import React, {Component} from 'react';
import LinkButton from "../../components/link-button";
import {Button, Form, Input, Modal, notification, Table} from "antd";
import {reqDeleteSite, reqSaveSite, reqSites, reqUpdateSite} from "../../api";
import SaveForm from "../site/save-form";
import UpdateForm from "../site/update-form";

export default class Log extends Component {

    state = {
        loading: false,
        sites: [],
        total: 0,
        siteName: '',
        pageNum: 1,
        pageSize: 10,
        showStatus: 0,/*标识添加更新确认框是否显示 0隐藏 1显示新增 2显示修改*/
    };

    initColumns = () => {
        this.columns = [
            {
                title: '站点名',
                dataIndex: 'siteName',
            },
            {
                title: '站点标识',
                dataIndex: 'siteMark',
            },
            {
                title: 'PR值',
                dataIndex: 'pr',
            },
            {
                title: '域名',
                dataIndex: 'domain',
            },
            {
                title: '后台地址',
                dataIndex: 'backgroundAddress',
            },
            {
                title: '用户名称',
                dataIndex: 'userId',
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
                render: (site) => (/**如何向事件回调函数传递参数，先定义一个匿名函数，在函数调用处理的函数并传入数据**/
                    <span>
                        <LinkButton onClick={() => this.showUpdateModal(site)}>修改</LinkButton>
                        <LinkButton onClick={() => this.deleteSite(site.id)}>删除</LinkButton>
                    </span>
                )
            },
        ];
    };

    deleteSite = (id) => {
        Modal.confirm({
            title: '确认删除?',
            okText: '确认',
            cancelText: '取消',
            onOk: () => {
                reqDeleteSite(id);
                this.getSites();
            },
        });
    };
    /*站点查询*/
    getSites = async (pageNum) => {
        this.setState({loading: true});
        const result = await reqSites(pageNum, this.state.pageSize, this.state.siteName);
        const {list, total} = result.data;
        this.setState({total, sites: list, loading: false});
    };
    /*显示添加框*/
    showSaveModal = () => {
        this.setState({
            showStatus: 1
        })
    };
    /*显示修改框*/
    showUpdateModal = (site) => {
        this.site = site;
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
    /*添加站点*/
    saveSite = () => {
        /*表单验证*/
        this.saveForm.validateFields(async (error, values) => {
            if (!error) {
                this.setState({
                    showStatus: 0
                });
                const result = await reqSaveSite(values);
                this.saveForm.resetFields();/*清除输入数据*/
                if (result.code === 0) {
                    notification['success']({
                        message: '新增成功',
                    });
                    this.getSites();
                }
            }

        });

    };
    /*更新站点*/
    updateSite = () => {
        /*表单验证*/
        this.updateForm.validateFields(async (error, values) => {
            if (!error) {
                this.setState({
                    showStatus: 0
                });
                const {siteName, pr, domain, backgroundAddress} = values;
                if (siteName) {
                    this.site.siteName = siteName;
                }
                if (pr) {
                    this.site.pr = pr;
                }
                if (domain) {
                    this.site.domain = domain;
                }
                if (backgroundAddress) {
                    this.site.backgroundAddress = backgroundAddress;
                }
                this.updateForm.resetFields();/*清除输入数据*/
                const result = await reqUpdateSite(this.site);
                if (result.code === 0) {
                    notification['success']({
                        message: '修改成功',
                    });
                }
                this.getSites();
            }
        });


    };

    componentWillMount() {
        this.initColumns();
    }

    componentDidMount() {
        this.getSites(1);
    }

    render() {
        const {sites, loading, total, showStatus, siteName, pageNum, pageSize} = this.state;
        const site = this.site;
        return (
            <div style={{padding: '20px 20px 0'}}>
                <div className='content-search'>
                    <Form layout="inline">
                        <Form.Item label='站点名称'>
                            <Input value={siteName} onChange={event => this.setState({siteName: event.target.value})}/>
                        </Form.Item>
                        <Form.Item>
                            <Button type='primary' onClick={() => {
                                this.getSites(1);
                                this.setState({pageNum: 1})
                            }}>查询</Button>
                        </Form.Item>
                    </Form>
                </div>
                <div className='add-button'><Button type='primary' onClick={this.showSaveModal}>新增</Button></div>
                <Table rowKey='id' dataSource={sites} columns={this.columns} loading={loading}
                       pagination={{
                           defaultCurrent: 1,
                           current: pageNum,
                           defaultPageSize: pageSize,
                           total: total,
                           onChange: (value) => {
                               this.getSites(value);
                               this.setState({pageNum: value})
                           }
                       }}/>
                <Modal
                    title="新增站点"
                    visible={showStatus === 1}
                    okText='确定'
                    cancelText='取消'
                    onOk={this.saveSite}
                    onCancel={this.handleCancel}>
                    <SaveForm setForm={(form) => {
                        this.saveForm = form
                    }}/>
                </Modal>
                <Modal
                    title="修改站点"
                    visible={showStatus === 2}
                    okText='确定'
                    cancelText='取消'
                    onOk={this.updateSite}
                    onCancel={this.handleCancel}>
                    <UpdateForm site={site} setForm={(form) => {
                        this.updateForm = form
                    }}/>
                </Modal>
            </div>

        )
    }
}