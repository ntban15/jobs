// store reducers for Redux
import { combineReducers } from 'redux';
import AuthReducer from './AuthReducer';
import JobReducer from './JobReducer';
import LikesReducer from './LikesReducer';

export default combineReducers({
    auth: AuthReducer, // to get access to the content of AuthReducer: state.auth.bla
    jobs: JobReducer, // state.jobs.list
    likedJobs: LikesReducer // state.likedJobs
});