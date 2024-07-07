import { UPDATE_MAP_STORE } from './Map.action';

const getInitialState = () => ({
  map: [[]],
  mapSize: { x: 7, y: 7 },
  mapCellSize: 0,
  spaceBetweenMapCells: 1,
  selectedCell: {},
  defaultCell: { type: "color", data: "rgb(119,119,119)" }
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
