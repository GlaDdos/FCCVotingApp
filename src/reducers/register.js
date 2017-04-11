'use strict';

import { REGISTER_REQUEST, REGISTER_SUCCESS, REGISTER_FAILTURE } from '../const';

const initialState = {
    isRegistering: false,
    isRegistered: false,
    errorMessage: null
};

export default function (state = initialState, action){
    switch(action.type){
        case REGISTER_REQUEST: 
            return Object.assign({}, state, {
                isRegistering: true,
                isRegistered: false,
                errorMessage: null
            });

        case REGISTER_FAILTURE:
            return Object.assign({}, state, {
                isRegistering: false,
                isRegistered: false,
                errorMessage: `Error: ${action.payload.statusText}`
            });

        case REGISTER_SUCCESS:
            return Object.assign({}, status, {
                isRegistering: false,
                isRegistered: true,
                errorMessage: null
            });

        default:
            return state;
    }
}