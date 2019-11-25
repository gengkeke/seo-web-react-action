import React, {Component} from 'react';
import {Button, Form, Input, Table} from "antd";
import {reqRechargeRecords} from "../../api";

export default class Recharge extends Component {

    state = {
        loading: false,
        rechargeRecords: [],
        total: 0,
        loginName: '',
        pageNum: 1,
        pageSize: 10,
    };

    initColumns = () => {
        this.columns = [
            {
                title: '充值用户',
                dataIndex: 'loginName',
            },
            {
                title: '充值积分',
                dataIndex: 'rechargeAmount',
            },
            {
                title: '充值时间',
                dataIndex: 'rechargeTime',
            }
        ];
    };

    /*查询*/
    getRechargeRecords = async (pageNum) => {
        this.setState({loading: true});
        const result = await reqRechargeRecords(pageNum, this.state.pageSize, this.state.loginName);
        const {list, total} = result.data;
        this.setState({total, rechargeRecords: list, loading: false});
    };

    componentWillMount() {
        this.initColumns();
    }

    componentDidMount() {
        this.getRechargeRecords(1);
    }

    render() {
        const {rechargeRecords, loading, total, loginName, pageNum, pageSize} = this.state;
        return (
            <div style={{padding:'20px 20px 0'}}>
                <div className='content-search'>
                    <Form layout="inline">
                        <Form.Item label='用户名'>
                            <Input value={loginName} onChange={event => this.setState({loginName: event.target.value})}/>
                        </Form.Item>
                        <Form.Item>
                            <Button type='primary' onClick={() => {
                                this.getRechargeRecords(1);
                                this.setState({pageNum: 1})
                            }}>查询</Button>
                        </Form.Item>
                    </Form>
                </div>
                <div className='add-button'/>
                <Table rowKey='id' dataSource={rechargeRecords} columns={this.columns} loading={loading}
                       pagination={{
                           defaultCurrent: 1,
                           current: pageNum,
                           defaultPageSize: pageSize,
                           total: total,
                           onChange: (value) => {
                               this.getRechargeRecords(value);
                               this.setState({pageNum: value})
                           }
                       }}/>
            </div>

        )
    }
}
