import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';
import { combineReducers } from '@reduxjs/toolkit';
import { configureStore } from '@reduxjs/toolkit';
import cartReducer, { getTotals } from './features/cartSlice';

const persistConfig = {
    key : 'root',
    version: 1,
    storage,
};

const reducer = combineReducers({
    cart: cartReducer,
});

const pesistedReducer = persistReducer(persistConfig, reducer);

const store = configureStore({
    reducer: pesistedReducer,
    devTools: true,
});
store.dispatch(getTotals());


export default store;