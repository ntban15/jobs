import { uniqBy } from 'lodash';
import { LIKE_JOB, RESET_LIKES } from '../actions/types';

// state start as an empty array
export default function(state = [], action) {
    switch (action.type) {
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