import { configureStore } from '@reduxjs/toolkit'
import MapReducer from './Map/Map.reducer';

export const injectReducers = (reducers) => {
  return Object.entries(reducers).reduce(
    (accumulator, [name, reducer]) => {
      accumulator[name] = reducer;
      return accumulator;
    },
    {},
  );
}

export const getStaticReducers = () => ({
  MapReducer,
});

export const store = configureStore({
  reducer: injectReducers(getStaticReducers()),
});

export const getStore = () => store;

export default store;
