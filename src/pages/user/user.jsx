import React, {Component} from 'react';
import LinkButton from "../../components/link-button";
import {Button, Form, Input, Modal, notification, Table} from "antd";
import {reqDeleteUser, reqUsers, reqUpdateUser} from "../../api";
import UpdateForm from "../user/update-form";

export default class User extends Component {
    state = {
        loading: false,
        users: [],
        total: 0,
        userName: '',
        pageNum: 1,
        pageSize: 10,
        showStatus: 0,/*标识添加更新确认框是否显示 0隐藏 2显示修改*/
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
                title: '电话',
                dataIndex: 'mobilePhone',
            },
            {
                title: '邮箱',
                dataIndex: 'email',
            },
            {
                title: '公司名称',
                dataIndex: 'companyName',
            },
            {
                title: '角色',
                dataIndex: 'roleName',
            },
            {
                title: '备注',
                dataIndex: 'description',
            },
            {
                title: '创建人',
                dataIndex: 'createdBy',
            },
            {
                title: '创建时间',
                dataIndex: 'createdAt',
            },
            {
                title: '操作',
                render: (user) => (/**如何向事件回调函数传递参数，先定义一个匿名函数，在函数调用处理的函数并传入数据**/
                    <span>
                        <LinkButton onClick={() => this.showUpdateModal(user)}>修改</LinkButton>
                        <LinkButton onClick={() => this.deleteUser(user.id)}>删除</LinkButton>
                    </span>
                )
            },
        ];
    };

    deleteUser = (id) => {
        Modal.confirm({
            title: '确认删除?',
            okText: '确认',
            cancelText: '取消',
            onOk: () => {
                reqDeleteUser(id);
                this.getUsers();
            },
        });
    };
    /*查询*/
    getUsers = async (pageNum) => {
        this.setState({loading: true});
        const result = await reqUsers(pageNum, this.state.pageSize, this.state.userName);
        const {list, total} = result.data;
        this.setState({total, users: list, loading: false});
    };
    /*显示修改框*/
    showUpdateModal = (user) => {
        this.user = user;
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
    /*更新*/
    updateUser = () => {
        /*表单验证*/
        this.updateForm.validateFields(async (error, values) => {
            if (!error) {
                this.setState({
                    showStatus: 0
                });
                const {realName, mobilePhone, email, companyName, description} = values;
                if (realName) {
                    this.user.realName = realName;
                }
                if (mobilePhone) {
                    this.user.mobilePhone = mobilePhone;
                }
                if (email) {
                    this.user.email = email;
                }
                if (companyName) {
                    this.user.companyName = companyName;
                }
                if (description) {
                    this.user.description = description;
                }
                this.updateForm.resetFields();/*清除输入数据*/
                const result = await reqUpdateUser(this.user);
                if (result.code === 0) {
                    notification['success']({
                        message: '修改成功',
                    });
                }
                this.getUsers();
            }
        });
    };

    componentWillMount() {
        this.initColumns();
    }

    componentDidMount() {
        this.getUsers(1);
    }

    render() {
        const {users, loading, total, showStatus, userName, pageNum, pageSize} = this.state;
        const user = this.user;
        return (
            <div style={{padding: '20px 20px 0'}}>
                <div className='content-search'>
                    <Form layout="inline">
                        <Form.Item label='用户名'>
                            <Input value={userName}
                                   onChange={event => this.setState({userName: event.target.value})}/>
                        </Form.Item>
                        <Form.Item>
                            <Button type='primary' onClick={() => {
                                this.getUsers(1);
                                this.setState({pageNum: 1})
                            }}>查询</Button>
                        </Form.Item>
                    </Form>
                </div>
                <div className='add-button'/>
                <Table rowKey='id' dataSource={users} columns={this.columns} loading={loading}
                       pagination={{
                           defaultCurrent: 1,
                           current: pageNum,
                           defaultPageSize: pageSize,
                           total: total,
                           onChange: (value) => {
                               this.getUsers(value);
                               this.setState({pageNum: value})
                           }
                       }}/>
                <Modal
                    title="修改用户信息"
                    visible={showStatus === 2}
                    okText='确定'
                    cancelText='取消'
                    onOk={this.updateUser}
                    onCancel={this.handleCancel}>
                    <UpdateForm user={user} setForm={(form) => {
                        this.updateForm = form
                    }}/>
                </Modal>
            </div>

        )
    }
}
