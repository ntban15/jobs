import {
    FETCH_JOBS_COMPLETE
} from '../actions/types';

const INITIAL_STATE = {
    list: []
};

export default function (state = INITIAL_STATE, action) {
    switch (action.type) {
        case FETCH_JOBS_COMPLETE:
            return { list: action.payload }; // replace with new list of jobs everytime
        default:
            return state;
    }
}