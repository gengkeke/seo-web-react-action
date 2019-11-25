import {RECEIVE_USER, RESET_USER, REGISTER_USER,RESET_REGISTER_USER} from '../constant'
import {reqLogin, reqLogout, reqRegister} from '../api'
import storageUtils from "../utils/storageUtils";
import {notification} from "antd";

export const receiveUser = (user) => ({type: RECEIVE_USER, user})

export const registerUser = (user) => ({type: REGISTER_USER, user})
/*
登陆的异步 action
*/
export const login = (username, password) => {
    return async dispatch => {
        const result = await reqLogin(username, password)
        if (result.code === 0) {
            const user = result.data
            storageUtils.saveUser(user)
            dispatch(receiveUser(user))
        }
    }
}

/*
退出登陆的同步 action
*/
export const logout = () => {
    return async dispatch => {
        const result = await reqLogout()
        if (result.code === 0) {
            storageUtils.removeUser()
            dispatch({type: RESET_USER})
        }
    }
}

/*
注册
*/
export const register = (user) => {
    return async dispatch => {
        const {loginName, password, realName, mobilePhone, email, companyName} = user
        const result = await reqRegister(loginName, password, realName, mobilePhone, email, companyName)
        if (result.code === 0) {
            notification['success']({
                message: '注册成功',
            });
            dispatch(registerUser(user))
        }
    }
}

/*
注册
*/
export const resetRegister = () => {
    return async dispatch => {
        dispatch({type: RESET_REGISTER_USER})
    }
}

