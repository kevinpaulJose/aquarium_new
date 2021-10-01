import * as ActionTypes from './ActionTypes';

export const userData = (state = {
    isLoading: true,
    errMess: null,
    data: []
}, action) => {
    switch(action.type) {
        case ActionTypes.USR_CREATE_LOAD:
            return {...state, isLoading: true, errMess: null, data: []};
        case ActionTypes.USR_CREATE_SUCCESS:
            return {...state, isLoading: false, errMess: null, data: action.payload};
        case ActionTypes.USR_CREATE_ERR:
            return {...state, isLoading: false, errMess: action.payload, data: []};
        default:
            return state;
    }
}