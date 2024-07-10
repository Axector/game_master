import { getStore } from "..";
import { updateMapStore } from "./Map.action";
import { getMapData, saveMapData } from "../../db/firebase";

export class MapDispatcher {
  dispatch = getStore().dispatch;

  async initMap() {
    const mapData = await getMapData();

    if (mapData) {
      const {
        mapSize: fetchedMapSize,
        spaceBetweenMapCells: fetchedSpaceBetweenMapCells,
        map: fetchedMap,
      } = mapData;

      this.dispatch(updateMapStore({
        map: fetchedMap,
        mapSize: fetchedMapSize,
        spaceBetweenMapCells: fetchedSpaceBetweenMapCells,
      }));

      return;
    }

    const {
      mapSize,
      defaultCell,
    } = getStore().getState().MapReducer;

    const map = new Array(mapSize.y);
    for (let i = 0; i < mapSize.y; ++i) {
      map[i] = new Array(mapSize.x).fill(defaultCell);
    }

    this.dispatch(updateMapStore({ map }));
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

  saveMap() {
    const {
      mapSize,
      map,
      spaceBetweenMapCells,
    } = getStore().getState().MapReducer;

    const mapObject = {};
    map.forEach((mapLine, i) => {
      mapObject[i] = mapLine;
    });

    saveMapData({
      spaceBetweenMapCells: spaceBetweenMapCells,
      mapSize: mapSize,
      map: mapObject
    });

    this.dispatch(updateMapStore({ isLoading: true }));
  }
}

const mapDispatcher = new MapDispatcher();

export default mapDispatcher;