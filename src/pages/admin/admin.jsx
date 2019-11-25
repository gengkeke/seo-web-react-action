/*
后台管理主路由组件
*/
import React, {Component} from 'react';
import {Layout} from 'antd';
import {Redirect, Route, Switch} from 'react-router-dom';

import {connect} from "react-redux";
import Header from '../../components/header';
import LeftNav from '../../components/left-nav';
import Alarm from '../alarm/alarm';
import Home from '../home/home';
import Integral from '../integral/integral';
import KeywordMarket from '../keyword/market';
import KeywordRank from '../keyword/rank';
import KeywordUser from '../keyword/user';
import Log from '../log/log';
import Permission from '../permission/permission';
import RecordConsume from '../record/consume';
import RecordRecharge from '../record/recharge';
import Site from '../site/site';
import User from '../user/user';
import Role from '../role/role';
import NotFound from '../404/404';

const {Footer, Sider, Content} = Layout;

class Admin extends Component {
    render() {
        const user = this.props.user;
        if (!user || !user.name) {
            return <Redirect to='/login'/>;
        }
        return (
            <Layout style={{minHeight: '100%'}}>
                <Sider width='210px' style={{boxShadow: 'rgba(0, 21, 41, 0.35) 2px 0px 6px'}}>
                    <LeftNav/>
                </Sider>
                <Layout>
                    <Header/>
                    <Content style={{margin: '20px 20px 0', backgroundColor: '#fff'}}>
                        <Switch>
                            <Redirect from='/' to='/home' exact/>
                            <Route path='/home' component={Home}/>
                            <Route path='/alarm' component={Alarm}/>
                            <Route path='/integral' component={Integral}/>
                            <Route path='/keyword/market' component={KeywordMarket}/>
                            <Route path='/keyword/rank' component={KeywordRank}/>
                            <Route path='/keyword/user' component={KeywordUser}/>
                            <Route path='/keyword' component={KeywordMarket}/>
                            <Route path='/log' component={Log}/>
                            <Route path='/permission' component={Permission}/>
                            <Route path='/record/recharge' component={RecordRecharge}/>
                            <Route path='/record/consume' component={RecordConsume}/>
                            <Route path='/record' component={RecordConsume}/>
                            <Route path='/site' component={Site}/>
                            <Route path='/user' component={User}/>
                            <Route path='/role' component={Role}/>
                            <Route component={NotFound}/>

                        </Switch>
                    </Content>
                    <Footer style={{textAlign: 'center'}}>Copyright
                        © 2019 上海皓逗网络科技有限公司出品</Footer>
                </Layout>
            </Layout>
        );
    }
}

export default connect(
    state => ({user: state.user})
)(Admin)

