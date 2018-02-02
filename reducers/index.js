// store reducers for Redux
import { combineReducers } from 'redux';
import AuthReducer from './AuthReducer';

export default combineReducers({
    auth: AuthReducer // to get access to the content of AuthReducer: state.auth.bla
});