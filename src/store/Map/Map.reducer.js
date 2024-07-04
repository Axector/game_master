import { UPDATE_MAP_STORE } from './Map.action';

const getInitialState = () => ({
  map: [
    [{ type: "color", data: "#777777" }, { type: "color", data: "#777777" }],
    [{ type: "image", data: "https://letsenhance.io/static/8f5e523ee6b2479e26ecc91b9c25261e/1015f/MainAfter.jpg" }, { type: "color", data: "#777777" }],
  ]
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
