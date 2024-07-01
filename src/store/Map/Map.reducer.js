import { UPDATE_MAP_STORE } from './Map.action';

const getInitialState = () => ({
  mapWidth: 0,
  mapHeight: 0,
});

export const MapReducer = (state = getInitialState(), action) => {
  const { state: newState, type } = action;

  if (type !== UPDATE_MAP_STORE) {
    return state;
  }

  return {
    ...state,
    ...newState,
  };
};

export default MapReducer;
