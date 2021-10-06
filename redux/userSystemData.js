import * as ActionTypes from './ActionTypes';

export const userSystemData = (state = {
    isLoading: true,
    errMess: false,
    data: []
}, action) => {
    switch(action.type) {
        case ActionTypes.USR_GET_LOAD:
            return {...state, isLoading: true, errMess: false, data: []}
        case ActionTypes.USR_GET_SUCCESS:
            let temp = [];
            temp.push(action.payload);
            return {...state, isLoading: false, errMess: null, data: temp};
        case ActionTypes.USR_GET_ERR:
            return {...state, isLoading: false, errMess: action.payload, data: []};

        default:
            return state;
    }
}