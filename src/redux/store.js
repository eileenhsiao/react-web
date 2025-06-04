import { configureStore } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';
import cartReducer from './cartSlice';
import colorReducer from './colorSlice';
import followReducer from './followSlice';

const persistConfig = {
  key: 'shoppingCart',
  storage,
};

const persistedCartReducer = persistReducer(persistConfig, cartReducer);
const persistedColorReducer = persistReducer(persistConfig, colorReducer);


export const store = configureStore({
  reducer: {
    cart: persistedCartReducer,
    color: persistedColorReducer,
    follow: followReducer,
  },
  devTools: process.env.NODE_ENV !== 'production',
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }).concat(/* 其他middleware */),
});


export const persistor = persistStore(store);
