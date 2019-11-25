import React, {Component} from 'react';
import {HashRouter, Switch, Route} from 'react-router-dom';
import Login from './pages/login/login';
import Logout from './pages/login/logout';
import Register from './pages/login/register';
import Admin from './pages/admin/admin';

export default class App extends Component {
    render() {
        return (
            <HashRouter>
                <Switch>
                    <Route path='/login' component={Login}/>
                    <Route path='/logout' component={Logout}/>
                    <Route path='/register' component={Register}/>
                    <Route path='/' component={Admin}/>
                </Switch>
            </HashRouter>
        )
    }
}
