import {SET_YEAR, GET_PHOTOS_REQUEST, GET_PHOTOS_SUCCESS} from '../constants/Header';

const initialState = {
    year: 2016,
    photos: 'qwerty22',
    fetching: false
};

export default function header(state = initialState, action) {
    switch (action.type) {
        case GET_PHOTOS_REQUEST:
            return { ...state, year: action.payload, fetching: true };

        case GET_PHOTOS_SUCCESS:
            return { ...state, photos: action.payload, fetching: false };

        default:
            return state;
    }
};