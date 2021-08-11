import { createStore, combineReducers } from 'redux';
import { selectedPickupLocation, loading } from './pickup/reducers';

const reducers = {
    selectedPickupLocation,
    loading
};

const rootReducer = combineReducers(reducers);

export const configureStore = () => createStore(rootReducer);
