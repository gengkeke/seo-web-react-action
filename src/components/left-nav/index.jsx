import React, {Component} from 'react';
import {Link, withRouter} from 'react-router-dom'
import {Menu, Icon} from 'antd';
import menuList from '../../config/menuConfig';

import './index.less'
import logo from "../../assets/images/logo.svg";

const {SubMenu} = Menu;

/*
左侧导航组件
*/
class LeftNav extends Component {
    componentWillMount() {
        this.menuNodes = this.getMenuNodes(menuList);
    }


    render() {
        const selectKey = this.props.location.pathname;
        const openKey = this.openKey;
        return (
            <div className="left-nav">
                <Link to="/" className="left-nav-header">
                    <img src={logo} alt='logo'/>
                    <h1>快排系统</h1>
                </Link>
                <Menu selectedKeys={[selectKey]}
                      defaultOpenKeys={[openKey]}
                      mode="inline"
                      theme="dark">
                    {/*
                    <Menu.Item key="/home">
                        <Link to='/home'>
                            <Icon type="pie-chart"/>
                            <span>首页</span>
                        </Link>
                    </Menu.Item>
                    <SubMenu key="sub1" title={
                        <span>
                            <Icon type="mail"/>
                            <span>Navigation One</span>
                            </span>
                    }>
                        <Menu.Item key="5">Option 5</Menu.Item>
                    </SubMenu>
                    */}
                    {
                        this.menuNodes
                    }
                </Menu>
            </div>
        )
    }

    /*根据数据数组生成标签数组**/
    getMenuNodes = (menuList) => {
        const path = this.props.location.pathname;
        return menuList.map(item => {
            if (!item.children) {
                return (
                    <Menu.Item key={item.key}>
                        <Link to={item.key}>
                            <Icon type={item.icon}/>
                            <span>{item.title}</span>
                        </Link>
                    </Menu.Item>
                )
            } else {
                // 如果当前请求路由与当前菜单的某个子菜单的 key 匹配 , 将菜单的 key 保存为 openKey
                if (item.children.find(cItem => path.indexOf(cItem.key) === 0)) {
                    this.openKey = item.key
                }
                return (
                    <SubMenu key={item.key} title={
                        <span>
                            <Icon type={item.icon}/>
                            <span>{item.title}</span>
                        </span>
                    }>
                        {this.getMenuNodes(item.children)}
                    </SubMenu>
                )
            }
        })
    }

}

export default withRouter(LeftNav);
