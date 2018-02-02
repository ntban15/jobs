import axios from 'axios';
import reverseGeocode from 'latlng-to-zip'; // library to convert lat and lng to zip code

import {
    FETCH_JOBS_COMPLETE
} from './types';

const GITHUB_JOBS_BASE_URL = 'https://jobs.github.com/positions.json';
// can declare params here for convinience
const GITHUB_JOBS_API_PARAMS = {
    description: 'java'
};

// can add a callback to this action creator
export const fetchJobs = (region, callback) => async dispatch => {
    try {
        let zip = await reverseGeocode(region);
        let { data } = await axios.get(GITHUB_JOBS_BASE_URL, {
            // we can pass additional params to request by using this
            params: { ...GITHUB_JOBS_API_PARAMS, location: zip }
        });
        dispatch({
            type: FETCH_JOBS_COMPLETE,
            payload: data
        });

        // invoke the callback
        callback();
    }
    catch(e) { 
        console.log(e); 
    }
};