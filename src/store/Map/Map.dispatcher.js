import { getStore } from "..";
import { updateMapStore } from "./Map.action";
import { debounce } from '../../utils/debounce';

export class MapDispatcher {
  dispatch = getStore().dispatch;

  init() {
    this.initMap();
    this.initMapCellSize();

    window.addEventListener('resize', debounce(this.initMapCellSize.bind(this), 100));
  }

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
}

const mapDispatcher = new MapDispatcher();

export default mapDispatcher;