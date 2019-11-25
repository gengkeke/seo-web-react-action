import React, {Component} from 'react';
import {Table} from "antd";
import {reqRoles} from "../../api";

export default class Role extends Component {
    state = {
        loading: false,
        roles: [],
    };

    initColumns = () => {
        this.columns = [
            {
                title: '角色名',
                dataIndex: 'roleName',
            },
            {
                title: '角色标识',
                dataIndex: 'roleMark',
            },
            {
                title: '创建人',
                dataIndex: 'createdBy',
            },
            {
                title: '创建时间',
                dataIndex: 'createdAt',
            }
        ];
    };

    /*查询*/
    getRoles = async () => {
        this.setState({loading: true});
        const result = await reqRoles();
        this.setState({roles: result.data, loading: false});
    };

    componentWillMount() {
        this.initColumns();
    }

    componentDidMount() {
        this.getRoles();
    }

    render() {
        const {roles, loading} = this.state;
        return (
            <div style={{padding: '20px 20px 0'}}>
                <div className='add-button'></div>
                <Table rowKey='id' dataSource={roles} columns={this.columns} loading={loading}
                       pagination={{
                           hideOnSinglePage: true
                       }}/>
            </div>

        )
    }
}
