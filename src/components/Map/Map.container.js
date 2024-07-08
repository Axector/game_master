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
    currentSpaceBetweenCells: this.props.spaceBetweenMapCells,
  }

  containerFunctions = {
    openCellConfig: this.openCellConfig.bind(this),
    handleMapSizeChange: this.handleMapSizeChange.bind(this),
    handleSpaceBetweenCellsChange: this.handleSpaceBetweenCellsChange.bind(this),
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

  openCellConfig(x, y) {
    const {
      toggleMapCellOverlay,
      mapCellSize,
      map,
      mapSize,
      updateSelectedCell,
      spaceBetweenMapCells,
    } = this.props;

    const canvasWidth = mapSize.x * mapCellSize + mapSize.x * spaceBetweenMapCells;
    const canvasHeight = mapSize.y * mapCellSize + mapSize.y * spaceBetweenMapCells;

    const xPos = Math.floor((x / canvasWidth) * mapSize.x);
    const yPos = Math.floor((y / canvasHeight) * mapSize.y);

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

  handleSpaceBetweenCellsChange(value) {
    const processedValue = Math.min(Math.max(value, 0), 10)

    this.setState({ currentSpaceBetweenCells: processedValue });
    MapDispatcher.updateSpaceBetweenMapCells(processedValue);
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
