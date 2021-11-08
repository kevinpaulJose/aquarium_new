import * as ActionTypes from './ActionTypes';

export const addressData = (state = {
    isLoading: true,
    errMess: null,
    data: []
}, action) => {
    switch(action.type) {
        case ActionTypes.ADD_GET_LOAD:
            return {...state, isLoading: true, errMess: null, data: []};
        case ActionTypes.ADD_GET_SUCCESS:
            return {...state, isLoading: false, errMess: null, data: action.payload};
        case ActionTypes.ADD_GET_ERR:
            return {...state, isLoading: true, errMess: action.payload, data: []};
        default:
            return state;
    }
}