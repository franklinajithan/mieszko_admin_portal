import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // Default storage (localStorage for web)

// Import slices
import counterReducer from './slices/counterSlice';
import notificationReducer from './slices/notificationSlice';
import authReducer from './slices/authSlice';
import filterReducer from './slices/filterSlice';

// Configurations for persisted reducers
const authPersistConfig = {
  key: 'auth',
  storage,
  whitelist: ['user'], // Only persist specific parts of the state if needed
};

const filterPersistConfig = {
  key: 'filter',
  storage,
};

// Wrap reducers with persistReducer where needed
const persistedAuthReducer = persistReducer(authPersistConfig, authReducer);
const persistedFilterReducer = persistReducer(filterPersistConfig, filterReducer);

const store = configureStore({
  reducer: {
    counter: counterReducer,
    notifications: notificationReducer,
    auth: persistedAuthReducer,  // Persisted auth reducer
    filter: persistedFilterReducer,  // Persisted filter reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
