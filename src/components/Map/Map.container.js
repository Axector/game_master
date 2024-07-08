import { PureComponent } from "react";
import { connect } from "react-redux";
import MapComponent from "./Map.component";
import { updateMapStore } from "../../store/Map/Map.action";
import MapDispatcher from "../../store/Map/Map.dispatcher";

export const mapStateToProps = (state) => ({
  map: state.MapReducer.map,
  mapCellSize: state.MapReducer.mapCellSize,
  mapSize: state.MapReducer.mapSize,
  spaceBetweenMapCells: state.MapReducer.spaceBetweenMapCells,
});

export const mapDispatchToProps = (dispatch) => ({
  updateSelectedCell: (selectedCell) => dispatch(updateMapStore({ selectedCell })),
});

export class MapContainer extends PureComponent {
  state = {
    currentMapSize: this.props.mapSize,
  }

  containerFunctions = {
    openCellConfig: this.openCellConfig.bind(this),
    handleMapSizeChange: this.handleMapSizeChange.bind(this),
  };

  containerProps() {
    const {
      map,
      mapCellSize,
      mapSize,
      spaceBetweenMapCells,
    } = this.props;
    const { currentMapSize } = this.state;

    return ({
      map,
      mapCellSize,
      mapSize,
      spaceBetweenMapCells,
      currentMapSize,
    });
  }

  openCellConfig({ x, y }) {
    const {
      toggleMapCellOverlay,
      mapCellSize,
      map,
      mapSize,
      updateSelectedCell,
    } = this.props;

    const xPos = Math.floor((x - mapSize.x) / mapCellSize);
    const yPos = Math.floor((y - mapSize.y) / mapCellSize);

    updateSelectedCell({ ...map[yPos][xPos], x: xPos, y: yPos });
    toggleMapCellOverlay(true);
  }

  handleMapSizeChange(value, type) {
    const { mapSize } = this.props;

    const newMapSize = { ...mapSize };
    newMapSize[type] = Math.min(Math.max(value, 1), 50);

    this.setState({ currentMapSize: newMapSize });
    MapDispatcher.updateMapSize(newMapSize);
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
