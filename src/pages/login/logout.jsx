import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';
import './login.less';
import {connect} from "react-redux";
import {logout} from '../../actions';

class Logout extends Component {
    render() {
        this.props.logout();
        return <Redirect to='/login'/>;
    }
}

export default connect(
    state => ({user: state.user}),
    {logout}
)(Logout);
