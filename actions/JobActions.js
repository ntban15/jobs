import reverseGeocode from 'latlng-to-zip'; // library to convert lat and lng to zip code

import {
    FETCH_JOBS_COMPLETE
} from './types';

export const fetchJobs = region => async dispatch => {
    try {
        let zip = await reverseGeocode(region);
    }
    catch(e) { 
        console.log(e); 
    }
};