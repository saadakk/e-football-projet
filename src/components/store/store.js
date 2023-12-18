// import { configureStore } from "@reduxjs/toolkit";
// import slice from "../reducers/slice";


// export const store = configureStore(
//     {
//     reducer:slice
//     }
// )
// store.js
import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for the web

import slice from '../reducers/slice'; // Import your slice or rootReducer

const persistConfig = {
  key: 'root',
  storage,
};

const persistedReducer = persistReducer(persistConfig, slice); // Wrap your reducer with the persistReducer

export const store = configureStore({
  reducer: persistedReducer,
});

export const persistor = persistStore(store);