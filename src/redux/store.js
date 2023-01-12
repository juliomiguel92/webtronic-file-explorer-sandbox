import { configureStore } from "@reduxjs/toolkit";
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';
import thunk from 'redux-thunk';
import fileReducer from "./slices/fileSlice";

const persistConfig = {
    key: 'root',
    storage,
}

const persistedFileReducer = persistReducer(persistConfig, fileReducer)

export const store = configureStore({
    reducer: persistedFileReducer,
    devTools: process.env.NODE_ENV !== 'production',
    middleware: [thunk]
});

export const persistor = persistStore(store)