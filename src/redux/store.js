

import { combineReducers, configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'reduxjs-toolkit-persist';
import storage from 'reduxjs-toolkit-persist/lib/storage'
import autoMergeLevel1 from 'reduxjs-toolkit-persist/lib/stateReconciler/autoMergeLevel1';
import accessTokenReducer from "./tokenSlice"
import userReducer from "./userSlice"
import gameReducer from "./gameSlice"
import invoiceReducer from "./invoiceSlice"
import processReducer from "./processSlice"
// import { persistCombineReducers } from 'reduxjs-toolkit-persist';
const persistConfig = {
    key: 'root',
    storage: storage,
    version: 1,
    stateReconciler: autoMergeLevel1,
}
const reducers = combineReducers({
    accessToken: accessTokenReducer,
    user: userReducer,
    game: gameReducer,
    invoice: invoiceReducer,
    process: processReducer
})


const _persistedReducer = persistReducer(persistConfig, reducers);
const rootReducer = (state, action) => {
    if (action.type === 'accessToken/userlogout') {
        // to remove state of persist store,for all keys defined in your persistConfig(s)
        storage.removeItem('persist:root')

        return _persistedReducer(undefined, action);
    }
    return _persistedReducer(state, action);
};

const store = configureStore({
    reducer: rootReducer,

    middleware: getDefaultMiddleware({
        serializableCheck: {
            /* ignore persistance actions */
            ignoredActions: [
                FLUSH,
                REHYDRATE,
                PAUSE,
                PERSIST,
                PURGE,
                REGISTER
            ],
        },
    }),

});

export default store

// without persist version 
// const store = configureStore({
//     reducer: {
//         accessToken: accessTokenReducer,
//         user: userReducer
//     }
// })
// export default store
