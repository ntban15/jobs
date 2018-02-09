import { uniqBy } from 'lodash';
import { REHYDRATE } from 'redux-persist/lib/constants'
import { LIKE_JOB, RESET_LIKES } from '../actions/types';

// state start as an empty array
export default function(state = [], action) {
    switch (action.type) {
        // BIG GOTCHA: the type of state must be consistent when using persist
        // if there is some changes in the structure of data
        // must use migration. See reduxt-persist migration
        case REHYDRATE: // when redux is warming up and persist is loading state from storage
            if (action.payload && action.payload.likedJobs) // where our previous state is stored
                return action.payload.likedJobs; // it can be null (first time running)
            else
                return []; // return empty array when null
        case LIKE_JOB:
        // this function from lodash help making array duplicate-free
            return uniqBy([
                action.payload, ...state // spread the current array and add a new element
            ], 'id'); // the second argument is the property to keep the uniqueness of elements
        case RESET_LIKES: {
            return [];
        }
        default:
            return state;
    }
}