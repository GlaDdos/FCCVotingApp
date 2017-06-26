'use strict';

import { 
    POLL_DATA_REQUEST,
    POLL_DATA_SUCCESS,
    POLL_DATA_FAILTURE,
    POLL_UPDATE_REQUEST,
    POLL_UPDATE_SUCCESS,
    POLL_UPDATE_FAILTURE,

    POLL_ADD_OPTION_ENABLE,
    POLL_ADD_OPTION_DISABLE,

    DISMISS_ERROR
} from '../const';

const initialState = {
    isRequesting: false,
    updateRequesting: false,
    updateSuccess: false,
    updateFailture: false,
    isSuccess: false,
    addOption: false,
    poll: null,
    error: {
        isError: false,
        status: "",
        statusText: ""
    }
};

export default function( state = initialState, action){
    switch(action.type){
        case POLL_DATA_REQUEST:
            return Object.assign({}, state, {
                isRequesting: true,
                isSuccess: false,
                statusText: null,
                error: {
                    isError: false
                }
            });

        case POLL_DATA_SUCCESS:
            return Object.assign({}, state, {
                isRequesting: false,
                isSuccess: true,
                poll: action.payload.poll,
                error: {
                    isError: false
                }
            });

        case POLL_DATA_FAILTURE:
            return Object.assign({}, state, {
                isRequesting: false,
                isSuccess: false,
                poll: null,
                error: {
                    isError: true,
                    status: `${action.payload.status}`,
                    statusText: `${action.payload.statusText}`
                }
            });

        case POLL_UPDATE_REQUEST:
            return Object.assign({}, state, {
                updateRequesting: true,
                updateSuccess: false,
                updateFailture: false
            });

        case POLL_UPDATE_SUCCESS:
         return Object.assign({}, state, {
             updateRequesting: false,
             updateSuccess: true,
             poll: action.payload.poll
         });

        case POLL_UPDATE_FAILTURE:
            return Object.assign({}, state, {
                updateRequesting: false,
                updateSuccess: false,
                error: {
                    isError: true,
                    status: `${action.payload.status}`,
                    statusText: `${action.payload.statusText}`
                }
            });

        case POLL_ADD_OPTION_ENABLE:
            return Object.assign({}, state, {
                addOption: true
            });

        case POLL_ADD_OPTION_DISABLE:
            return Object.assign({}, state, {
                addOption: false
            });

        case DISMISS_ERROR:
            return Object.assign({}, state, {
                error: {
                    isError: false,
                    status: '',
                    statusText: ''
                }
            });

        default: 
            return state;

    }
}