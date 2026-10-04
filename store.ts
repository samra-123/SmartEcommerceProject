import { configureStore } from '@reduxjs/toolkit';
import cartSlice from '../../ReduxFolder/cartSlice';
import UserSlice from '../../ReduxFolder/UserSlice';
import { persistedCartSlice } from '../../ReduxFolder/Persisted/PersistConfig';
//import { persistStore } from 'redux-persist';

import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from 'redux-persist'

export const store = configureStore({
    reducer: {
        cartSlice: persistedCartSlice,
        UserSlice,

    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
})

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;

