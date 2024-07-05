import { PureComponent } from "react";
import { connect } from "react-redux";
import MapComponent from "./Map.component";
import { updateMapStore } from "../../store/Map/Map.action";
import { debounce } from "../../utils/debounce";

export const mapStateToProps = (state) => ({
  map: state.MapReducer.map,
  mapCellSize: state.MapReducer.mapCellSize,
});

export const mapDispatchToProps = (dispatch) => ({
  updateSelectedCell: (selectedCell) => dispatch(updateMapStore({ selectedCell })),
  updateMapCellWidth: (mapCellSize) => dispatch(updateMapStore({ mapCellSize })),
});

export class MapContainer extends PureComponent {
  containerFunctions = {
    openCellConfig: this.openCellConfig.bind(this),
  };

  containerProps() {
    const {
      map,
      mapCellSize,
    } = this.props;

    return ({
      map,
      mapCellSize,
    });
  }

  componentDidMount() {
    this.setMapCellWidth();

    window.addEventListener('resize', debounce(this.setMapCellWidth.bind(this), 100));
  }

  setMapCellWidth() {
    const {
      map,
      updateMapCellWidth,
    } = this.props;

    const mapWrapper = document.getElementsByClassName('Map-Wrapper')[0];
    const mapWrapperWidth = mapWrapper.getBoundingClientRect().width;
    const cellSize = mapWrapperWidth / map[0].length;

    updateMapCellWidth(cellSize);
  }

  openCellConfig(mousePosition) {
    const {
      toggleMapCellOverlay,
      mapCellSize,
      map,
      updateSelectedCell,
    } = this.props;
    const { x, y } = mousePosition;

    const xPos = Math.floor((x - map[0].length) / mapCellSize);
    const yPos = Math.floor((y - map.length) / mapCellSize);

    updateSelectedCell({ ...map[yPos][xPos], x: xPos, y: yPos });
    toggleMapCellOverlay(true);
  }

  render() {
    return (
      <MapComponent
        {...this.containerProps()}
        {...this.containerFunctions}
      />
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MapContainer);
