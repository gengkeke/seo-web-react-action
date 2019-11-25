import React, {Component} from 'react';
import LinkButton from "../../components/link-button";
import {Button, Form, Input, Modal, notification, Table} from "antd";
import {reqIntegrals, reqRechargeIntegral, reqFreezeIntegral, reqUpdateIntegral} from "../../api";
import UpdateForm from "../integral/update-form";
import RechargeForm from "../integral/recharge-form";
import FreezeForm from "../integral/freeze-form";

export default class Integral extends Component {

    state = {
        loading: false,
        integrals: [],
        total: 0,
        loginName: '',
        pageNum: 1,
        pageSize: 10,
        showStatus: 0,/*标识添加更新确认框是否显示 0隐藏 1充值 2冻结 3修改*/
    };

    initColumns = () => {
        this.columns = [
            {
                title: '用户名',
                dataIndex: 'loginName',
            },
            {
                title: '姓名',
                dataIndex: 'realName',
            },
            {
                title: '可用积分',
                dataIndex: 'availableIntegral',
            },
            {
                title: '冻结积分',
                dataIndex: 'freezeIntegral',
            },
            {
                title: '总积分',
                dataIndex: 'totalIntegral',
            },
            {
                title: '折扣比例',
                dataIndex: 'rebateScale',
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
                render: (integral) => (/**如何向事件回调函数传递参数，先定义一个匿名函数，在函数调用处理的函数并传入数据**/
                    <span>
                        <LinkButton onClick={() => this.showRechargeModal(integral)}>充值</LinkButton>
                        <LinkButton onClick={() => this.showFreezeModal(integral)}>冻结</LinkButton>
                        <LinkButton onClick={() => this.showUpdateModal(integral)}>折扣</LinkButton>
                    </span>
                )
            },
        ];
    };

    /*查询*/
    getIntegrals = async (pageNum) => {
        this.setState({loading: true});
        const result = await reqIntegrals(pageNum, this.state.pageSize, this.state.loginName);
        const {list, total} = result.data;
        this.setState({total, integrals: list, loading: false});
    };

    showRechargeModal = (integral) => {
        this.integral = integral;
        this.setState({
            showStatus: 1
        })
    };

    showFreezeModal = (integral) => {
        this.integral = integral;
        this.setState({
            showStatus: 2
        })
    };
    /*显示修改框*/
    showUpdateModal = (integral) => {
        this.integral = integral;
        this.setState({
            showStatus: 3
        })
    };

    /*点击取消，隐藏确认框*/
    handleCancel = () => {
        if (this.updateForm) {
            this.updateForm.resetFields();
        }
        if (this.rechargeForm) {
            this.rechargeForm.resetFields();
        }
        if (this.freezeForm) {
            this.freezeForm.resetFields();
        }
        this.setState({
            showStatus: 0
        })
    };
    /*充值*/
    rechargeIntegral = () => {
        this.rechargeForm.validateFields(async (error, values) => {
            if (!error) {
                this.setState({
                    showStatus: 0
                });
                const {rechargeValue} = values;
                this.rechargeForm.resetFields();/*清除输入数据*/
                const id = this.integral.id;
                const result = await reqRechargeIntegral({id, rechargeValue});
                if (result.code === 0) {
                    notification['success']({
                        message: '充值成功',
                    });
                }
                this.getIntegrals();
            }
        });
    };
    /*冻结*/
    freezeIntegral = () => {
        this.freezeForm.validateFields(async (error, values) => {
            if (!error) {
                this.setState({
                    showStatus: 0
                });
                const {freezeValue} = values;
                const id = this.integral.id;
                this.freezeForm.resetFields();/*清除输入数据*/
                const result = await reqFreezeIntegral({freezeValue, id});
                if (result.code === 0) {
                    notification['success']({
                        message: '冻结成功',
                    });
                }
                this.getIntegrals();
            }
        });
    };
    /*更新*/
    updateIntegral = () => {
        this.updateForm.validateFields(async (error, values) => {
            if (!error) {
                this.setState({
                    showStatus: 0
                });
                const {rebateScale} = values;
                const id = this.integral.id;
                this.updateForm.resetFields();/*清除输入数据*/
                const result = await reqUpdateIntegral({id, rebateScale});
                if (result.code === 0) {
                    notification['success']({
                        message: '修改成功',
                    });
                }
                this.getIntegrals();
            }
        });
    };

    componentWillMount() {
        this.initColumns();
    }

    componentDidMount() {
        this.getIntegrals(1);
    }

    render() {
        const {integrals, loading, total, showStatus, loginName, pageNum, pageSize} = this.state;
        const integral = this.integral;
        return (
            <div style={{padding: '20px 20px 0'}}>
                <div className='content-search'>
                    <Form layout="inline">
                        <Form.Item label='用户名'>
                            <Input value={loginName}
                                   onChange={event => this.setState({loginName: event.target.value})}/>
                        </Form.Item>
                        <Form.Item>
                            <Button type='primary' onClick={() => {
                                this.getIntegrals(1);
                                this.setState({pageNum: 1})
                            }}>查询</Button>
                        </Form.Item>
                    </Form>
                </div>
                <div className='add-button'/>
                <Table rowKey='id' dataSource={integrals} columns={this.columns} loading={loading}
                       pagination={{
                           defaultCurrent: 1,
                           current: pageNum,
                           defaultPageSize: pageSize,
                           total: total,
                           onChange: (value) => {
                               this.getIntegrals(value);
                               this.setState({pageNum: value})
                           }
                       }}/>
                <Modal
                    title="充值"
                    visible={showStatus === 1}
                    okText='确定'
                    cancelText='取消'
                    onOk={this.rechargeIntegral}
                    onCancel={this.handleCancel}>
                    <RechargeForm integral={integral} setForm={(form) => {
                        this.rechargeForm = form
                    }}/>
                </Modal>
                <Modal
                    title="冻结"
                    visible={showStatus === 2}
                    okText='确定'
                    cancelText='取消'
                    onOk={this.freezeIntegral}
                    onCancel={this.handleCancel}>
                    <FreezeForm integral={integral} setForm={(form) => {
                        this.freezeForm = form
                    }}/>
                </Modal>
                <Modal
                    title="修改折扣比例"
                    visible={showStatus === 3}
                    okText='确定'
                    cancelText='取消'
                    onOk={this.updateIntegral}
                    onCancel={this.handleCancel}>
                    <UpdateForm integral={integral} setForm={(form) => {
                        this.updateForm = form
                    }}/>
                </Modal>
            </div>

        )
    }
}
