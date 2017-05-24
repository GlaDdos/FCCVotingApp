'use strict';

import { 
    POLL_DATA_REQUEST,
    POLL_DATA_SUCCESS,
    POLL_DATA_FAILTURE
} from '../const';

const initialState = {
    isRequesting: false,
    isSuccess: false,
    statusText: null,
    poll: null
};

export default function( state = initialState, action){
    switch(action.type){
        case POLL_DATA_REQUEST:
            return Object.assign({}, state, {
                isRequesting: true,
                isSuccess: false,
                statusText: null
            });

        case POLL_DATA_SUCCESS:
            return Object.assign({}, state, {
                isRequesting: false,
                isSuccess: true,
                poll: action.payload.poll
            });

        case POLL_DATA_FAILTURE:
            return Object.assign({}, state, {
                isRequesting: false,
                isSuccess: false,
                poll: null,
                statusText: `Error while requesting data: ${action.payload.status} ${action.payload.statusText}`
            });

        default: 
            return state;

    }
}