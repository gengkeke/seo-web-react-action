import {combineReducers} from 'redux'
import {RECEIVE_USER, RESET_USER, REGISTER_USER, RESET_REGISTER_USER} from '../constant'
import storageUtils from "../utils/storageUtils";

const initUser = storageUtils.getUser();

function user(state = initUser, action) {
    switch (action.type) {
        case RECEIVE_USER:
            return action.user
        case RESET_USER:
            return {}
        default:
            return state
    }
}

function registerUser(state = {}, action) {
    switch (action.type) {
        case REGISTER_USER:
            return action.user
        case RESET_REGISTER_USER:
            return null
        default:
            return state
    }
}

export default combineReducers({
    user, registerUser,
})
