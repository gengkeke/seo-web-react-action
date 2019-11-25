import React, {Component} from 'react';
import {Button, Form, Input, Table} from "antd";
import {reqKeywordsRank} from "../../api";

export default class Rank extends Component {

    state = {
        loading: false,
        keywords: [],
        total: 0,
        keywordName: '',
        pageNum: 1,
        pageSize: 10,
    };

    initColumns = () => {
        this.columns = [
            {
                title: '关键词',
                dataIndex: 'keywordName',
            },
            {
                title: '搜索引擎',
                dataIndex: 'engineName',
            },
            {
                title: '站点',
                dataIndex: 'siteName',
            },
            {
                title: '用户',
                dataIndex: 'loginName',
            },
            {
                title: '排名',
                dataIndex: 'rank',
            },
            {
                title: '排名时间',
                dataIndex: 'rankTime',
            }
        ];
    };

    /*查询*/
    getkeywords = async (pageNum) => {
        this.setState({loading: true});
        const result = await reqKeywordsRank(pageNum, this.state.pageSize, this.state.keywordName);
        const {list, total} = result.data;
        this.setState({total, keywords: list, loading: false});
    };

    componentWillMount() {
        this.initColumns();
    }

    componentDidMount() {
        this.getkeywords(1);
    }

    render() {
        const {keywords, loading, total, keywordName, pageNum, pageSize} = this.state;
        return (
            <div  style={{padding:'20px 20px 0'}}>
                <div className='content-search'>
                    <Form layout="inline">
                        <Form.Item label='关键词'>
                            <Input value={keywordName}
                                   onChange={event => this.setState({keywordName: event.target.value})}/>
                        </Form.Item>
                        <Form.Item>
                            <Button type='primary' onClick={() => {
                                this.getkeywords(1);
                                this.setState({pageNum: 1})
                            }}>查询</Button>
                        </Form.Item>
                    </Form>
                </div>
                <div className='add-button'/>
                <Table rowKey='id' dataSource={keywords} columns={this.columns} loading={loading}
                       pagination={{
                           defaultCurrent: 1,
                           current: pageNum,
                           defaultPageSize: pageSize,
                           total: total,
                           onChange: (value) => {
                               this.getkeywords(value);
                               this.setState({pageNum: value})
                           }
                       }}/>
            </div>

        )
    }
}