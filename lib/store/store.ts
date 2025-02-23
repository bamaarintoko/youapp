import logger from 'redux-logger'
import { Middleware } from "@reduxjs/toolkit";
import storage from 'redux-persist/lib/storage'
import { persistReducer, persistStore } from 'redux-persist'
import { combineReducers, configureStore } from '@reduxjs/toolkit'
import youapp from './slice/youapp'
import { apiAuth } from './api/apiAuth';

const middlewares: Middleware[] = [];

if (process.env.NODE_ENV === `development`) {
    // const { logger } = require(`redux-logger`)
    middlewares.push(logger as Middleware)
}

const appReducers = combineReducers({
    youapp,
    [apiAuth.reducerPath]: apiAuth.reducer
})

const persistConfig = {
    key: 'youapp',
    storage: storage,
    whitelist: [
        'sliceUser'
    ]
}

const persistedReducer = persistReducer(persistConfig, appReducers)

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: {
            ignoredActions: ['persist/PERSIST'],
        }
    }).concat(
       ...middlewares,
        apiAuth.middleware)
})
export const persistor = persistStore(store)
export type RootState = ReturnType<typeof store.getState>;