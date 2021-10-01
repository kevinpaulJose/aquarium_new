import * as ActionTypes from './ActionTypes';

export const userSystemData = (state = {
    isLoading: true,
    errMess: null,
    data: []
}, action) => {
    switch(action.type) {
        case ActionTypes.USR_GET_LOAD:
            return {...state, isLoading: true, errMess: null, data: []}
        case ActionTypes.USR_GET_SUCCESS:
            return {...state, isLoading: false, errMess: null, data: action.payload};
        case ActionTypes.USR_GET_ERR:
            return {...state, isLoading: false, errMess: action.payload, data: []};

        case ActionTypes.USR_OUT_LOAD:
            return {...state, isLoading: true, errMess: null, data: []}
        case ActionTypes.USR_OUT_SUCCESS:
            return {...state, isLoading: false, errMess: null, data: false};
        case ActionTypes.USR_OUT_ERR:
            return {...state, isLoading: false, errMess: action.payload, data: []};
        default:
            return state;
    }
}