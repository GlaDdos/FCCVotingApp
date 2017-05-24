'use strict';

import fetch from 'isomorphic-fetch';
import {
    POLL_DATA_REQUEST,
    POLL_DATA_SUCCESS,
    POLLS_DATA_FAILTURE
} from '../const';

export function pollDataRequest(){
    return {
        type: POLL_DATA_REQUEST
    };
}

export function pollDataSuccess(poll){
    return {
        type: POLL_DATA_SUCCESS,
        payload: {
            poll
        }
    };
}

export function pollDataFailture(error){
    return {
        type: POLLS_DATA_FAILTURE,
        payload: {
            status: error.response.status,
            statusText: error.response.statusText
        }
    };
}

export function getPoll(pollId){
    return function(dispatch) {
        dispatch(pollDataRequest());
            return fetch(`http://localhost:3000/api/poll/${pollId}`, {
                method: 'GET'
            })
            .then( response => response.json())
            .then(json => dispatch(pollDataSuccess(json)));
    };
}