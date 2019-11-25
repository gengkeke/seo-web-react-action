import React, {Component} from 'react';
import Line from './line';
import Donut from './donut';
import Basiccolumn from './basiccolumn';
import {Divider, Statistic, Card, Col, Row, Icon, Tooltip} from 'antd';
import './home.less'

const RMBSvg = () => (
    <svg width="1em" height="1em" fill="currentColor" viewBox="0 0 1024 1024">
        <path
            d="M787.669861 62.749836h-65.742653l-210.480106 375.237589L298.62537 62.749836h-65.917737L454.915321 454.536484H224.561601v49.146496h253.973731v149.487257H224.561601v49.146496h253.973731v257.529684h66.552546V702.316733h257.045387v-49.146496H545.087878v-149.487257h257.045387v-49.146496H567.906187z"
            fill="" p-id="1113"></path>
    </svg>
);
export default class Home extends Component {

    render() {


        return (
            <div style={{backgroundColor: '#f0f2f5', height: '100%'}}>
                <Row gutter={16}>
                    <Col span={6}>
                        <Card bordered={false} style={{padding: '20px 24px 8px'}} title='可用积分'
                              headStyle={{
                                  borderBottom: '0',
                                  fontSize: '14px',
                                  color: 'rgba(0, 0, 0, 0.45)',
                                  padding: '0 24px'
                              }}
                              bodyStyle={{padding: '0 24px 15px'}}
                              extra={<Tooltip placement="top" title={'可用积分'}><Icon
                                  type="exclamation-circle"/></Tooltip>}>
                            <Statistic value={112893} prefix={<Icon component={RMBSvg}/>}/>
                            <Divider style={{margin: '12px 0'}}/>
                            <span>日消费积分</span>
                            <Statistic style={{display: 'inline-block'}}
                                       valueStyle={{fontSize: '14px', marginLeft: '10px'}}
                                       value={12452} prefix={<Icon component={RMBSvg}/>}/>
                        </Card>
                    </Col>
                    <Col span={6}>
                        <Card bordered={false} style={{padding: '20px 24px 8px'}} title='项目数'
                              headStyle={{
                                  borderBottom: '0',
                                  fontSize: '14px',
                                  color: 'rgba(0, 0, 0, 0.45)',
                                  padding: '0 24px'
                              }}
                              bodyStyle={{padding: '0 24px 15px'}}
                              extra={<Tooltip placement="top" title={'项目数'}><Icon
                                  type="exclamation-circle"/></Tooltip>}>
                            <Statistic value={323}/>
                            <Divider style={{margin: '12px 0'}}/>
                            <span>项目数</span>
                            <Statistic style={{display: 'inline-block'}}
                                       valueStyle={{fontSize: '14px', marginLeft: '10px'}}
                                       value={2}/>
                        </Card>
                    </Col>
                    <Col span={6}>
                        <Card bordered={false} style={{padding: '20px 24px 8px'}} title='关键词数'
                              headStyle={{
                                  borderBottom: '0',
                                  fontSize: '14px',
                                  color: 'rgba(0, 0, 0, 0.45)',
                                  padding: '0 24px'
                              }}
                              bodyStyle={{padding: '0 24px 15px'}}
                              extra={<Tooltip placement="top" title={'关键词数'}><Icon
                                  type="exclamation-circle"/></Tooltip>}>
                            <Statistic value={100}/>
                            <Divider style={{margin: '12px 0'}}/>
                            <span>关键词数</span>
                            <Statistic style={{display: 'inline-block'}}
                                       valueStyle={{fontSize: '14px', marginLeft: '10px'}}
                                       value={12}/>
                        </Card>
                    </Col>
                    <Col span={6}>
                        <Card bordered={false} style={{padding: '20px 24px 8px'}} title='访问量'
                              headStyle={{
                                  borderBottom: '0',
                                  fontSize: '14px',
                                  color: 'rgba(0, 0, 0, 0.45)',
                                  padding: '0 24px'
                              }}
                              bodyStyle={{padding: '0 24px 15px'}}
                              extra={<Tooltip placement="top" title={'访问量'}><Icon
                                  type="exclamation-circle"/></Tooltip>}>
                            <Statistic value={121512}/>
                            <Divider style={{margin: '12px 0'}}/>
                            <span>日访问量</span>
                            <Statistic style={{display: 'inline-block'}}
                                       valueStyle={{fontSize: '14px', marginLeft: '10px'}}
                                       value={1245}/>
                        </Card>
                    </Col>
                </Row>
                <Card title="近期消费趋势" bordered={false} style={{marginTop: '24px'}}>
                    <Line/>
                </Card>

                <Row gutter={16}>
                    <Col span={12}>
                        <Card title="关键词消费占比TOP10" bordered={false} style={{marginTop: '24px'}}>
                            <Donut/>
                        </Card>
                    </Col>
                    <Col span={12}>
                        <Card title="访问量趋势" bordered={false} style={{marginTop: '24px'}}>
                            <Basiccolumn/>
                        </Card>
                    </Col>
                </Row>
            </div>
        )
    }
}
