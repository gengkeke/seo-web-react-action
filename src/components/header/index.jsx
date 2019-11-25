import React, {Component} from 'react';
import {Link, withRouter} from 'react-router-dom';
import './index.less';
import LinkButton from "../link-button"
import {Modal, Breadcrumb} from 'antd';
import menuList from "../../config/menuConfig";
import {connect} from "react-redux";
import {logout} from '../../actions';

/*
头部组件
*/
class Header extends Component {
    logout = () => {
        Modal.confirm({
            title: '确认退出?',
            okText: '确认',
            cancelText: '取消',
            onOk: () => {
                this.props.logout()
            },
        });
    };
    getBreadcrumbNodes = (menuList) => {
        const path = this.props.location.pathname;
        return menuList.map(item => {
            if (item.key === path) {
                this.title = item.title;
                return (<Breadcrumb.Item key={item.key}>{item.title}</Breadcrumb.Item>)
            } else if (item.children) {
                return this.getBreadcrumbNodes(item.children);
            }
            return (<Breadcrumb.Item key='0'></Breadcrumb.Item>);
        })
    };

    render() {
        const {realName} =this.props.user.principal;
        const breadcrumbNodes = this.getBreadcrumbNodes(menuList);
        return (
            <div className='header'>
                <div className='header-top'>
                    <div className='header-top-right'>
                    <span className='ant-avatar-image'>
                        <img src="https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png"
                             alt='img'/>
                    </span>
                        <span>{realName}</span>
                        <span><LinkButton onClick={this.logout}>退出</LinkButton></span>
                    </div>
                </div>
                <div className='header-page'>
                    <div className='header-page-breadcrumb'>
                        <Breadcrumb>
                            <Breadcrumb.Item>
                                <Link to='/'>首页</Link>
                            </Breadcrumb.Item>
                            {breadcrumbNodes}
                        </Breadcrumb>
                    </div>
                    <div className='header-page-heading'>
                        <span>{this.title}</span>
                    </div>

                </div>
            </div>
        )
    }
}

export default connect(
    state => ({
        user: state.user,
    }),
    {logout}
)(withRouter(Header));
