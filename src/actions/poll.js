'use strict';

import fetch from 'isomorphic-fetch';
import { browserHistory } from 'react-router';
import {
    POLL_DATA_REQUEST,
    POLL_DATA_SUCCESS,
    POLL_DATA_FAILTURE,
    POLL_UPDATE_REQUEST,
    POLL_UPDATE_SUCCESS,
    POLL_UPDATE_FAILTURE,

    POLL_ADD_OPTION_ENABLE,
    POLL_ADD_OPTION_DISABLE,

    DISMISS_ERROR,
    API_URL
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
        type: POLL_DATA_FAILTURE,
        payload: {
            status: error.status,
            statusText: error.statusText
        }
    };
}

export function pollUpdateRequest(){
    return {
        type: POLL_UPDATE_REQUEST
    };
}

export function pollUpdateSuccess(poll){
    return {
        type: POLL_UPDATE_SUCCESS,
        payload: {
            poll
        }
    };
}

export function pollUpdateFailture(error) {
    return {
        type: POLL_UPDATE_FAILTURE,
        payload: {
            status: error.status,
            statusText: error.statusText
        }
    };
}

export function dismissError(){
    return {
        type: DISMISS_ERROR
    };
}

export function pollAddOptionEnable(){
    return {
        type: POLL_ADD_OPTION_ENABLE
    };
}

export function pollAddOptionDisable(){
    return {
        type: POLL_ADD_OPTION_DISABLE
    };
}

export function getPoll(pollId){
    return function(dispatch) {
        dispatch(pollDataRequest());
            return fetch(API_URL + `/api/poll/${pollId}`, {
                method: 'GET'
            })
            .then( response => {
                    if(response.status == '404'){
                        return response.json().then( json => {throw new Error('404')});
                    }
                    else {
                        return response.json()}
                    }
                )
            .then( json => dispatch(pollDataSuccess(json)))
            .catch( err => {
                if(err.message == '404'){
                    browserHistory.push('/404');
                } else {
                    const payload = {
                        status: "Connection error.",
                        statusText: "Server is not responding. Please try again later."
                    }

                    dispatch(pollDataFailture(payload));
                }
            });
    };
}

export function updatePoll(token, pollId, option){
    return function (dispatch) {
        dispatch(pollUpdateRequest());
        
        return fetch(API_URL + `/api/poll/${pollId}`, {
            method: 'POST',
            headers: new Headers({
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `${token}`
            }),
            body: JSON.stringify(option)
        })
        .then( response => response.json())
        .then( json => dispatch(pollUpdateSuccess(json)))
        .then( dispatch(pollAddOptionDisable()))
        .catch( err => {
            const payload = {
                status: "Connection error.",
                statusText: "Server is not responding. Please try again later."
            };

            dispatch(pollUpdateFailture(payload));
        });
    };
}