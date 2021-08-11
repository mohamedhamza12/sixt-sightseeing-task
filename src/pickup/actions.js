export const SET_SELECTED_PICKUP = 'SET_SELECTED_PICKUP';
export const setSelectedPickup = pickupLocation => ({
    type: SET_SELECTED_PICKUP,
    payload: { pickupLocation }
});

export const RESET_SELECTED_PICKUP = 'RESET_SELECTED_PICKUP';
export const resetSelectedPickup = () => ({
    type: RESET_SELECTED_PICKUP
});

export const START_LOADING = 'START_LOADING';
export const startLoading = () => ({
    type: START_LOADING
});

export const END_LOADING = 'END_LOADING';
export const endLoading = () => ({
    type: END_LOADING
});