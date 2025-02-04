import { configureStore, combineReducers } from '@reduxjs/toolkit';
import themeReducer from './theme/themeSlice';
import orderReducer from './order/orderSlice';
import mapReducer from './map/mapSlice';
import { persistReducer, persistStore, PersistConfig } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { locationApi } from './services/locationService';
import { truckCategoryApi } from './services/truckCategoryService';
import { priceApi } from './services/priceService';
import { orderApi } from './services/orderService';

const rootReducer = combineReducers({
  theme: themeReducer,
  order: orderReducer,
  map: mapReducer,
  [locationApi.reducerPath]: locationApi.reducer,
  [truckCategoryApi.reducerPath]: truckCategoryApi.reducer,
  [priceApi.reducerPath]: priceApi.reducer,
  [orderApi.reducerPath]: orderApi.reducer
});

const persistConfig: PersistConfig<any> = {
  key: 'root',
  storage,
  version: 1,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware: any) =>
    getDefaultMiddleware({ serializableCheck: false }).concat(locationApi.middleware).concat(truckCategoryApi.middleware).concat(priceApi.middleware).concat(orderApi.middleware), 
});

export const persistor = persistStore(store);
