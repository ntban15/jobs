import { 
    FB_LOGIN_SUCCESS,
    FB_LOGIN_FAIL } from '../actions/types';

// format of a reducer
// 1st argument is default state
// 2nd argument is action dispatched by Action Creator
export default function(state = {}, action) {
    switch(action.type) {
        case FB_LOGIN_SUCCESS: 
            return { token: action.payload };
        case FB_LOGIN_FAIL:
            return { token: null };
        default: 
            return state;
    }
};