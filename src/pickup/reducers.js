import { RESET_SELECTED_PICKUP, SET_SELECTED_PICKUP, START_LOADING, END_LOADING } from './actions';

const defaultState = {
    name: null,
    address: null,
    googlePlaceId: null
}

export const selectedPickupLocation = (state = defaultState, action) => {
    const { type, payload } = action;

    switch (type) {
        case SET_SELECTED_PICKUP: {
            const { pickupLocation } = payload;
            return pickupLocation;
        }
        case RESET_SELECTED_PICKUP: {
            return defaultState;
        }
        default:
            return state;
    }
}

export const loading = (state = false, action) => {
    const { type } = action;

    switch (type) {
        case START_LOADING:
            return true;
        case END_LOADING:
            return false;
        default:
            return state;
    }
}