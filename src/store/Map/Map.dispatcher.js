import { getStore } from "..";
import { updateMapStore } from "./Map.action";

export class MapDispatcher {
  dispatch = getStore().dispatch;

  initMap() {
    const {
      mapSize,
      defaultCell,
    } = getStore().getState().MapReducer;

    const map = new Array(mapSize.y);
    for (let i = 0; i < mapSize.y; ++i) {
      map[i] = new Array(mapSize.x).fill(defaultCell);
    }

    this.dispatch(updateMapStore({ map }));

    return map;
  }

  initMapCellSize() {
    const {
      mapSize,
      spaceBetweenMapCells,
    } = getStore().getState().MapReducer;

    const mapWrapper = document.getElementsByClassName('Map-Wrapper')[0];
    const mapWrapperWidth = mapWrapper.getBoundingClientRect().width;
    const mapCellSize = Math.floor(mapWrapperWidth / mapSize.x - spaceBetweenMapCells);

    this.dispatch(updateMapStore({ mapCellSize }));
  }

  updateMapSize(newMapSize) {
    const {
      map: currentMap,
      defaultCell,
    } = getStore().getState().MapReducer;

    const map = new Array(newMapSize.y);
    for (let i = 0; i < newMapSize.y; ++i) {
      map[i] = new Array(newMapSize.x).fill(defaultCell);
    }

    currentMap.forEach((mapLine, y) => {
      mapLine.forEach((cell, x) => {
        if (y >= newMapSize.y || x >= newMapSize.x) {
          return;
        }

        map[y][x] = cell;
      });
    });

    this.dispatch(updateMapStore({
      mapSize: newMapSize,
      map,
    }));

    this.initMapCellSize();
  }

  updateSpaceBetweenMapCells(newSpaceBetweenMapCells) {
    this.dispatch(updateMapStore({ spaceBetweenMapCells: newSpaceBetweenMapCells }));
    this.initMapCellSize();
  }
}

const mapDispatcher = new MapDispatcher();

export default mapDispatcher;