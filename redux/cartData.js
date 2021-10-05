import * as ActionTypes from './ActionTypes';

export const cartData = (state = {
    isLoading: false,
    errMess: null,
    data: []
}, action) => {
    switch(action.type) {
        case ActionTypes.CRT_GET_LOAD:
            return {...state, isLoading: true, errMess: null, data: []};
        case ActionTypes.CRT_GET_SUCCESS:
            return {...state, isLoading: false, errMess: null, data: action.payload};
        case ActionTypes.CRT_GET_ERR:
            return {...state, isLoading: false, errMess: action.payload, data: []};
        default:
            return state;
    }
}